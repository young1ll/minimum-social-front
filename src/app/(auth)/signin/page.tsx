import { Box } from '@/components/ui/box';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Divider from '@/components/ui/divider';
import Link from 'next/link';
import { SignInForm } from './signin-form';

/**
 * SignIn Page #6
 *
 */
const SigninPage = () => {
  return (
    <>
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>Welcome to minimum-social</CardDescription>
      </CardHeader>

      <CardContent>
        <SignInForm />

        <Divider lineProps={{ color: 'zinc' }}>
          <span className="tw-text-zinc-500">Or</span>
        </Divider>

        {/* OAuth Area */}
        <Box gap={'md'} className="">
          <Button>Github</Button>
          <Button>Google</Button>
        </Box>

        <p className="tw-text-base tw-text-gray-500">
          Don&apos;t have an account?{' '}
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

export default SigninPage;
