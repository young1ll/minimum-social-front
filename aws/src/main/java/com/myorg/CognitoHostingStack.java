package com.myorg;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import software.amazon.awscdk.CfnOutput;
import software.amazon.awscdk.RemovalPolicy;
import software.amazon.awscdk.SecretValue;
import software.amazon.awscdk.Stack;
import software.amazon.awscdk.StackProps;
import software.amazon.awscdk.services.amplify.alpha.App;
import software.amazon.awscdk.services.amplify.alpha.Branch;
import software.amazon.awscdk.services.amplify.alpha.BranchOptions;
import software.amazon.awscdk.services.amplify.alpha.CustomRule;
import software.amazon.awscdk.services.amplify.alpha.GitHubSourceCodeProvider;
import software.amazon.awscdk.services.amplify.alpha.Platform;
import software.amazon.awscdk.services.amplify.alpha.RedirectStatus;
import software.amazon.awscdk.services.codebuild.BuildSpec;
import software.amazon.awscdk.services.cognito.AuthFlow;
import software.amazon.awscdk.services.cognito.AutoVerifiedAttrs;
import software.amazon.awscdk.services.cognito.CognitoDomainOptions;
import software.amazon.awscdk.services.cognito.DateTimeAttribute;
import software.amazon.awscdk.services.cognito.SignInAliases;
import software.amazon.awscdk.services.cognito.StandardAttribute;
import software.amazon.awscdk.services.cognito.StandardAttributes;
// import software.amazon.awscdk.Duration;
// import software.amazon.awscdk.services.sqs.Queue;
import software.amazon.awscdk.services.cognito.UserPool;
import software.amazon.awscdk.services.cognito.UserPoolClient;
import software.amazon.awscdk.services.cognito.UserPoolClientOptions;
import software.amazon.awscdk.services.cognito.UserPoolDomainOptions;
import software.amazon.awscdk.services.cognito.UserVerificationConfig;
import software.amazon.awscdk.services.cognito.VerificationEmailStyle;
import software.constructs.Construct;

public class CognitoHostingStack extends Stack {

  public CognitoHostingStack(final Construct scope, final String id) {
    this(scope, id, null);
  }

  public CognitoHostingStack(final Construct scope, final String id, final StackProps props) {
    super(scope, id, props);
    UserPool userPool = UserPool.Builder.create(this, "minimumsocial-userpool")
        .userPoolName("minimumsocial-userpool").removalPolicy(RemovalPolicy.DESTROY)
        .signInAliases(SignInAliases.builder().email(true).build()).selfSignUpEnabled(true)
        .autoVerify(AutoVerifiedAttrs.builder().email(true).build())
        .userVerification(UserVerificationConfig.builder().emailSubject("Please verify your email")
            .emailBody("Thans for signing up. Your verification code is {####}")
            .emailStyle(VerificationEmailStyle.CODE).build())
        .standardAttributes(StandardAttributes.builder()
            .email(StandardAttribute.builder().required(true).mutable(true).build())
            // NOTE: auth-server(user-server)에서 담당
            // .nickname(StandardAttribute.builder().required(true)
            // .mutable(false).build())
            // NOTE: user-server에서 담당
            // .phoneNumber(StandardAttribute.builder().required(false).build())
            .build())
        .customAttributes(Map.of("created_at", new DateTimeAttribute())).build();

    UserPoolClient client = userPool.addClient("minimumsocial-userpoolclient",
        UserPoolClientOptions.builder().userPoolClientName("minimumsocial-userpoolclient")
            .generateSecret(false)
            .authFlows(AuthFlow.builder().userSrp(true).userPassword(true).build()).build());

    userPool.addDomain("domain",
        UserPoolDomainOptions.builder()
            .cognitoDomain(CognitoDomainOptions.builder().domainPrefix("minimumsocial").build())
            .build());

    CfnOutput.Builder.create(this, "COGNITO_ID=").value(userPool.getUserPoolId()).build();
    CfnOutput.Builder.create(this, "COGNITO_CLIENT_ID=").value(client.getUserPoolClientId())
        .build();
    // issuer URL OIDC: Google

    App amplifyApp =
        App.Builder.create(this, "minimumsocial-amplify").appName("minimumsocial-amplify")
            .sourceCodeProvider(GitHubSourceCodeProvider.Builder.create().owner("young1ll")
                .repository("minimum-social-front")
                .oauthToken(SecretValue.secretsManager("minimum-social/nextjs-amplify-repo-key"))
                .build())
            .autoBranchDeletion(true).platform(Platform.WEB_COMPUTE) // SSR
            .buildSpec(BuildSpec.fromObjectToYaml( // yaml #11
                new LinkedHashMap<>() {
                  {
                    put("version", "1.0");
                    put("applications", List.of(new LinkedHashMap<>() {
                      {
                        put("appRoot", "next-app"); // NOTE: mono-repo root
                        put("frontend", new LinkedHashMap<>() {
                          {
                            put("buildPath", "next-app");
                            put("phases", new LinkedHashMap<>() {
                              {
                                put("preBuild", new LinkedHashMap<>() {
                                  {
                                    put("commands", List.of("npm -g install pnpm"));
                                    // clean install
                                  }
                                });
                                put("build", new LinkedHashMap<>() {
                                  {
                                    put("commands", List.of(
                                        // node_modules hoisted
                                        // "pnpm config set node-linker hoisted",
                                        // packages 설치
                                        "pnpm i",
                                        // build
                                        // "pnpm --filter next-app build",
                                        "pnpm run build",
                                        "echo \"NEXTAUTH_SECRET=NL0O++ZnW42XdHgLrsxMqvT20M08VkZgPmxfMeAP260=\" >> .env.production",
                                        """
                                                if ["$AWS_BRANCH" = "main"]; then
                                                    echo "NEXTAUTH_URL=https://main.${AWS_APP_ID}.amplifyapp.com/" >> .env.production
                                                elif ["$AWS_BRANCH" = "develop"]; then
                                                    echo "NEXTAUTH_URL=https://dev.${AWS_APP_ID}.amplifyapp.com/" >> .env.production
                                                fi
                                            """,
                                        // 자동으로 위 스택에서 설정한 userPoolId, userPoolClientId 가져오기
                                        "echo \"COGNITO_USER_POOL_ID=" + userPool.getUserPoolId()
                                            + "\" >> .env.production",
                                        "echo \"COGNITO_APP_CLIENT_ID="
                                            + client.getUserPoolClientId()
                                            + "\" >> .env.production"));
                                  }
                                  // NOTE: 필요하면 postBuild 추가
                                });
                              }
                            });
                            put("artifacts", new LinkedHashMap<>() {
                              {
                                put("baseDirectory", ".next");
                                put("files", List.of("**/*"));
                              }
                            });
                            put("cache", new LinkedHashMap<>() {
                              {
                                put("paths", List.of("node_modules/**/*", ".next/cache/**/*"));
                              }
                            });
                          }
                        });
                      }
                    }));
                  }
                }))
            .build();

    amplifyApp.addCustomRule(CustomRule.Builder.create().source("/<*>").target("/index.html")
        .status(RedirectStatus.NOT_FOUND_REWRITE).build());

    // amplify deploy config #11
    amplifyApp.addEnvironment("COGNITO_USER_POOL_ID", userPool.getUserPoolId())
        .addEnvironment("COGNITO_APP_CLIENT_ID", client.getUserPoolClientId())
        .addEnvironment("_CUSTOM_IMAGE", "amplify:al2023") // nextjs 14
        .addEnvironment("_LIVE_UPDATES",
            "[{\"pkg\":\"next-version\",\"type\":\"internal\",\"version\":\"latest\"}]")
        .addEnvironment("AMPLIFY_MONOREPO_APP_ROOT", "next-app"); // mono-repo

    Branch main = amplifyApp.addBranch("main", BranchOptions.builder().stage("PRODUCTION").build());
    Branch develop = amplifyApp.addBranch("develop",
        BranchOptions.builder().stage("DEVELOPMENT").performanceMode(true).build());

  }
}
