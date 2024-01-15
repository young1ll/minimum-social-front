package com.myorg;

import software.constructs.Construct;
import java.util.Map;
import software.amazon.awscdk.CfnOutput;
import software.amazon.awscdk.RemovalPolicy;
import software.amazon.awscdk.Stack;
import software.amazon.awscdk.StackProps;
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

public class CognitoHostingStack extends Stack {
        public CognitoHostingStack(final Construct scope, final String id) {
                this(scope, id, null);
        }

        public CognitoHostingStack(final Construct scope, final String id, final StackProps props) {
                super(scope, id, props);

                UserPool userPool = UserPool.Builder.create(this, "minimumsocial-userpool")
                                .userPoolName("minimumsocial-userpool")
                                .removalPolicy(RemovalPolicy.DESTROY)
                                .signInAliases(SignInAliases.builder().email(true).build())
                                .selfSignUpEnabled(true)
                                .autoVerify(AutoVerifiedAttrs.builder().email(true).build())
                                .userVerification(UserVerificationConfig.builder()
                                                .emailSubject("Please verify your email")
                                                .emailBody("Thans for signing up. Your verification code is {####}")
                                                .emailStyle(VerificationEmailStyle.CODE).build())
                                .standardAttributes(StandardAttributes.builder()
                                                .email(StandardAttribute.builder().required(true)
                                                                .mutable(true).build())
                                                .familyName(StandardAttribute.builder()
                                                                .required(true).mutable(false)
                                                                .build())
                                                .build())
                                .customAttributes(Map.of("created_at", new DateTimeAttribute()))
                                .build();

                UserPoolClient client = userPool.addClient("minimumsocial-userpoolclient",
                                UserPoolClientOptions.builder()
                                                .userPoolClientName("minimumsocial-userpoolclient")
                                                .generateSecret(false)
                                                .authFlows(AuthFlow.builder().userSrp(true)
                                                                .userPassword(true).build())
                                                .build());

                userPool.addDomain("domain",
                                UserPoolDomainOptions.builder().cognitoDomain(CognitoDomainOptions
                                                .builder().domainPrefix("minimumsocial").build())

                                                .build());

                CfnOutput.Builder.create(this, "COGNITO_ID=").value(userPool.getUserPoolId())
                                .build();
                CfnOutput.Builder.create(this, "COGNITO_CLIENT_ID=")
                                .value(client.getUserPoolClientId()).build();
                // issue URL
        }
}
