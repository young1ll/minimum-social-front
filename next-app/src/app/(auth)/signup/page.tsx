"use client";
import { useState } from "react";
import SignupIntro from "./signup-intro";
import SignupSubmit from "./signup-submit";
import { SubmitSignupSchema } from "./signup-forms";
import { cognitoSignup } from "@/lib/cognito/cognito-signup";
import { axios_user } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

/**
 * SignupPage #2 #4
 * - signup-intro
 * - signup-submit
 * - signup-forms
 *
 * - submitData: username, email, password
 * - return email sended message #4
 * - : 회원가입 성공시, 사용자에게 이메일 전송 완료, otp 인증 요청 페이지로 리다이렉트 #5
 *
 * @description
 * 회원가입: 2 steps
 * 1. signup-intro: get username, email
 * 2. signup-submit: get password, check confirm password
 * 3. submit new user: send username, email, password
 */
const SignupPage = () => {
  const router = useRouter();

  const [submitProceed, setSubmitProceed] = useState(false);
  const [submitData, setSubmitData] = useState({} as SubmitSignupSchema);

  const { toast } = useToast();

  const handleSubmitProceed = (toggle: boolean) => {
    setSubmitProceed(toggle);
  };
  const handleSubmitData = (data: SubmitSignupSchema) => {
    setSubmitData((prev) => ({ ...prev, ...data }));
  };

  /**
   * Submit Finally: submitData
   * 최종적으로 submitData를 server로 제출
   */
  const handleSubmitFinally = async () => {
    // console.log("Signup Submit Data: ", submitData); // 데이터는 submitData를 사용
    try {
      const submitCognito = {
        username: submitData["username" as keyof SubmitSignupSchema], // db에 저장
        email: submitData["email" as keyof SubmitSignupSchema],
        password: submitData["password" as keyof SubmitSignupSchema],
      };
      console.log(submitCognito);

      const result = await cognitoSignup(submitCognito);
      // console.log({ message: "Welcome!", result, submitCognito });

      const submitServer = {
        pk: result.UserSub,
        email: submitCognito.email,
        username: submitCognito.username,
        profileImage: "",
        phone: "",
        bio: "",
        darkmode: false,
      };

      const serverResult = await axios_user.post("/user", submitServer);

      if (serverResult) {
        toast({
          // variant: "success",
          title: "Welcome!",
          description: "You have successfully signed up.",
        });
        router.push("/signin");
      }
    } catch (error) {
      // console.log("Error during handleSubmitFinally:", error);
      toast({
        variant: "destructive",
        title: "Signup Failed",
        description: "Please try again.",
      });
    }
  };
  return (
    <>
      {!submitProceed ? (
        <SignupIntro
          handleSubmitProceed={handleSubmitProceed} // next step
          onSubmitData={handleSubmitData} // set data
          submitData={submitData} // data for remember
        />
      ) : (
        <SignupSubmit
          handleSubmitProceed={handleSubmitProceed} // prev step
          onSubmitData={handleSubmitData} // set data
          submitData={submitData} // data for submit finally
          submitFinally={handleSubmitFinally}
        />
      )}

      {/* <pre>{JSON.stringify(submitData, null, 2)}</pre> */}
    </>
  );
};

export default SignupPage;
