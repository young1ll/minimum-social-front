import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Divider from "@/components/ui/divider";
import Link from "next/link";
import { SignInForm } from "./signin-form";

/**
 * SignIn Page #6
 *
 * @description
 * SignIn Page는 SignUp Page와 달리 Form 내부에서 SignIn 실행
 */
const SigninPage = () => {
  return (
    <>
      <CardHeader className="tw-pb-0">
        <CardTitle className="tw-h-8 tw-flex tw-gap-2 tw-items-center">
          Sign In
        </CardTitle>
        <CardDescription>Welcome to minimum-social</CardDescription>
      </CardHeader>

      <CardContent className="tw-h-[450px] tw-flex tw-flex-col tw-justify-between">
        {/* Sign In Form */}
        <SignInForm />

        {/* TODO: Seperator */}
        <Divider lineProps={{ color: "zinc" }}>
          <span className="tw-text-zinc-500">Or</span>
        </Divider>

        {/* OAuth Area */}
        <Box gap={"md"} className="">
          <Button disabled>Github</Button>
          <Button disabled>Google</Button>
        </Box>

        <p className="tw-text-base tw-text-gray-500">
          Don&apos;t have an account?{" "}
          <Link
            href={"/signup"}
            className="tw-underline hover:tw-font-semibold"
          >
            Sign Up
          </Link>
        </p>
      </CardContent>
    </>
  );
};

export default SigninPage;
