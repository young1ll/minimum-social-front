import { SubmitSigninSchema } from './signin/signin-form';
import { SubmitSignupSchema } from './signup/signup-forms';

export type handleSubmitProceedType = (toggle: boolean) => void;
// Sign Up
export type handleSubmitSignupDataType = (data: SubmitSignupSchema) => void;
// Sign In
export type handleSubmitSigninDataType = (data: SubmitSigninSchema) => void;

export interface SignUpFormProps {
  handleSubmitProceed: handleSubmitProceedType;
  onSubmitData: handleSubmitSignupDataType;
  submitData: SubmitSignupSchema;
}
export type handleSubmitFinallyType = () => void;
