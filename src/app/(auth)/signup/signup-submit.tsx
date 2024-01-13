import { Button } from '@/components/ui/button';
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Box } from '@/components/ui/box';
import Divider from '@/components/ui/divider';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import {
  handleSubmitDataType,
  handleSubmitFinallyType,
  handleSubmitProceedType,
} from './page';

import { SecondForm, SubmitSchema } from './signup-forms';

const SignupSubmit = ({
  handleSubmitProceed,
  onSubmitData,
  submitData,
  submitFinally,
}: {
  handleSubmitProceed: handleSubmitProceedType;
  onSubmitData: handleSubmitDataType;
  submitData: SubmitSchema;
  submitFinally: handleSubmitFinallyType;
}) => {
  return (
    <>
      <CardHeader>
        <CardTitle className="tw-h-8 tw-flex tw-gap-2 tw-items-center">
          <Button
            className="tw-aspect-square tw-w-8 tw-h-8 !tw-p-2"
            onClick={() => handleSubmitProceed(false)}>
            <ArrowLeft />
          </Button>
          {'Back'}
        </CardTitle>
        <CardDescription>Welcome to minimum-social</CardDescription>
      </CardHeader>

      <CardContent className="tw-h-[410px] tw-flex tw-flex-col tw-justify-center">
        <SecondForm
          onSubmitData={onSubmitData}
          submitData={submitData}
          submitFinally={submitFinally}
        />

        <p className="tw-text-base tw-text-gray-500">
          Aleardy have an account?{' '}
          <Link
            href={'/signin'}
            className="tw-underline hover:tw-font-semibold">
            Sign In
          </Link>
        </p>
      </CardContent>
    </>
  );
};

export default SignupSubmit;
