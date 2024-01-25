import Link from "next/link";
import { Box } from "@/components/ui/box";
import Divider from "@/components/ui/divider";
import { Button } from "@/components/ui/button";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SignUpFormProps } from "../-form-types";
import { FirstForm } from "./signup-forms";

const SignupIntro = ({ handleSubmitProceed, onSubmitData, submitData }: SignUpFormProps) => {
  return (
    <>
      <CardHeader className="tw-pb-0">
        <CardTitle className="tw-h-8 tw-flex tw-gap-2 tw-items-center">Sign Up</CardTitle>
        <CardDescription>Welcome to minimum-social</CardDescription>
      </CardHeader>

      <CardContent className="tw-h-[450px] tw-flex tw-flex-col tw-justify-between">
        <FirstForm handleSubmitProceed={handleSubmitProceed} onSubmitData={onSubmitData} submitData={submitData} />

        {/* TODO: Seperator */}
        <Divider lineProps={{ color: "zinc" }}>
          <span className="tw-text-zinc-500">Or</span>
        </Divider>

        {/* OAuth Area */}
        <Box gap={"md"} className="">
          <Button>Github</Button>
          <Button>Google</Button>
        </Box>

        <p className="tw-text-base tw-text-gray-500">
          Aleardy have an account?{" "}
          <Link href={"/signin"} className="tw-underline hover:tw-font-semibold">
            Sign In
          </Link>
        </p>
      </CardContent>
    </>
  );
};

export default SignupIntro;
