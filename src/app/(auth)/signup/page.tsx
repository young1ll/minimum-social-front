'use client';
import { useState } from 'react';
import SignupIntro from './signup-intro';
import SignupSubmit from './signup-submit';
import { SubmitSchema } from './signup-forms';

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
 * 2 단계 회원가입
 * 1. signup-intro: get username, email
 * 2. signup-submit: get password, check confirm password
 * 3. submit new user: send username, email, password
 */

export type handleSubmitProceedType = (toggle: boolean) => void;
export type handleSubmitDataType = (data: SubmitSchema) => void;
export type handleSubmitFinallyType = () => void;

const SignupPage = () => {
  const [submitProceed, setSubmitProceed] = useState(false);
  const [submitData, setSubmitData] = useState({} as SubmitSchema);

  const handleSubmitProceed = (toggle: boolean) => {
    setSubmitProceed(toggle);
  };
  const handleSubmitData = (data: SubmitSchema) => {
    setSubmitData((prev) => ({ ...prev, ...data }));
  };

  const handleSubmitFinally = () => {
    console.log(submitData); // 데이터는 submitData를 사용
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
