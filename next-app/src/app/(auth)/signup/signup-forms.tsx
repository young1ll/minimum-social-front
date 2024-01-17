"use client";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ArrowRight, Loader2 } from "lucide-react";

import { toast } from "@/components/ui/use-toast";
import { axios_user } from "@/lib/api";
import { cognitoCheckUserPool } from "@/lib/cognito/cognito-signup";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SignUpFormProps, handleSubmitFinallyType } from "../-form-types";

/**
 * SignUp Form #2 #4
 * 1. First Form
 * - username
 * - email
 *
 * 2. Second Form
 * - password
 * - check password(confirm password)
 *
 * 3. Feedback
 * - error: use-form-hook
 * - success: page
 *
 * @description
 * 사용자 입력과 관련된 내용만 담당하며, submit 이외의 로직은 외부(page)에서 수행
 */
export type SubmitSignupSchema = z.infer<typeof firstFormSchema | typeof secondFormSchema>;

const firstFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(32, {
      message: "Username must be less than 32 characters.",
    }),
  email: z.string().min(1, { message: "This field has to be filled" }).email({ message: "Invalid email address" }),
});

/**
 * ===============================================================
 * = First Form: password, check password
 * ===============================================================
 */
export const FirstForm = ({ handleSubmitProceed, onSubmitData, submitData }: SignUpFormProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof firstFormSchema>>({
    resolver: zodResolver(firstFormSchema),
    defaultValues: {
      username: submitData["username" as keyof SubmitSignupSchema], // 기본값 = 입력값
      email: submitData["email" as keyof SubmitSignupSchema],
    },
  });

  const signupProceeding = async (values: z.infer<typeof firstFormSchema>) => {
    // console.log(values);
    setIsLoading(true);
    onSubmitData(values);
    console.log(submitData);
    try {
      // NOTE: userpool에서 email 조회
      const checkEmailResult = await cognitoCheckUserPool({ email: submitData["email" as keyof SubmitSignupSchema] });
      // TODO: user-server에서 username 조회: 예외 처리
      const checkUsernameResult = await axios_user.get(`/user/${submitData["email" as keyof SubmitSignupSchema]}`);

      handleSubmitProceed(true);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Sign Up Failed",
        description: `Error: ${error}`,
      });
      setIsLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(signupProceeding)}>
          {Object.entries(firstFormSchema.shape).map(([key, value]) => (
            <FormField
              key={key}
              control={form.control}
              name={key as keyof z.infer<typeof firstFormSchema>}
              render={({ field }) => {
                let { value, ...rest } = field;
                return (
                  <FormItem>
                    <FormLabel htmlFor={key}>{key.toUpperCase()}</FormLabel>
                    <FormControl>
                      <Input id={key} type="text" placeholder={key} value={value} {...rest} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          ))}
          <Button className="tw-mt-4 tw-w-full tw-flex tw-gap-4" type="submit">
            {isLoading ? (
              <Loader2 className="tw-animate-spin" />
            ) : (
              <>
                {"Sign Up"}
                <ArrowRight
                  size={"16"}
                  // hover 시 표시
                />
              </>
            )}
          </Button>
        </form>
      </Form>
    </>
  );
};

const secondFormSchema = z
  .object({
    password: z
      .string()
      .min(8, {
        message: "Password must be at least 8 characters.",
      })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s])/, {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.",
      }),
    "check password": z.string(),
  })
  .superRefine(({ password, "check password": checkPassword }, ctx) => {
    if (password !== checkPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match.",
      });
    }
  });

/**
 * ===============================================================
 * = Second Form: password, check password
 * ===============================================================
 */
export const SecondForm = ({
  onSubmitData,
  submitData,
  submitFinally,
}: Omit<SignUpFormProps, "handleSubmitProceed"> & {
  submitFinally: handleSubmitFinallyType;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof secondFormSchema>>({
    resolver: zodResolver(secondFormSchema),
    defaultValues: {
      password: "", // 기본 값 항상 초기화
      "check password": "",
    },
  });

  //TODO: event preventDefault()
  const signupProceed = (values: z.infer<typeof secondFormSchema>) => {
    console.log(values);
    setIsLoading(true);
    try {
      onSubmitData(values);

      if (
        submitData["username" as keyof SubmitSignupSchema] &&
        submitData["email" as keyof SubmitSignupSchema] &&
        submitData["password" as keyof SubmitSignupSchema]
      ) {
        submitFinally(); // page에 저장된 값을 제출
      }
    } catch (error) {
      // Handle error if onSubmitData fails
      console.error("Error during signupProceed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(signupProceed)}>
        <FormField
          key={"password"}
          control={form.control}
          name={"password"}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={"password"}>{"PASSWORD"}</FormLabel>
              <FormControl>
                <Input id={"password"} type="password" placeholder={"Password"} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          key={"check_password"}
          control={form.control}
          name={"check password"}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={"check_password"}>{"CONFIRM PASSWORD"}</FormLabel>
              <FormControl>
                <Input id={"check_password"} type="password" placeholder={"Confirm Password"} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="tw-mt-4 tw-w-full">
          {isLoading ? <Loader2 className="tw-animate-spin" /> : "Submit"}
        </Button>
      </form>
    </Form>
  );
};
