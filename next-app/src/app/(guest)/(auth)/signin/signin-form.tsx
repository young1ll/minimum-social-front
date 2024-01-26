"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { Input, PasswordInput } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { getSession, signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { useAuthStore } from "@/lib/zustand/store";

export type SubmitSigninSchema = z.infer<
  typeof signinSchema | typeof signinSchema
>;

const signinSchema = z.object({
  email: z
    .string()
    .min(1, { message: "This field has to be filled" })
    .email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s])/, {
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    }),
});

export const SignInForm = () => {
  const router = useRouter();
  const store = useAuthStore();
  // const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();
  const form = useForm<z.infer<typeof signinSchema>>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signinProceeding = async (values: z.infer<typeof signinSchema>) => {
    setIsLoading(true);
    const { email, password } = values;
    console.log({ messages: "entered values", values });

    try {
      const result = await signIn("credentials", {
        redirect: false,
        callbackUrl: "/feeds",
        email,
        password,
      });

      console.log(result);

      if (result?.ok) {
        // 로그인 성공으로 저장된 세션의 정보를 global strore에 저장
        const session = await getSession();
        const { id, username, email, darkmode, locale, profileImage } =
          session?.user || {};
        store.setUser({
          authenticated: true,
          id,
          username,
          profileImage,
          email,
          darkmode,
          locale,
        });

        // console.log("Login Success", result);
        toast({
          variant: "default",
          title: "Login Success",
          description: "Login Success",
        });
        router.push("/feeds"); // feeds 페이지로 이동
      } else {
        toast({
          variant: "destructive",
          title: "Login Failed",
          description: result?.error,
        });
        // console.log("Login Failed", result?.error);
      }
      setIsLoading(false);
    } catch (error) {
      // console.log(error);
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: error?.toString(),
      });
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(signinProceeding)}>
          <FormField
            key={"email"}
            control={form.control}
            name={"email"}
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel htmlFor={"email"}>{"Email"}</FormLabel>
                  <FormControl>
                    <Input
                      id={"email"}
                      type="email"
                      placeholder={"Email"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            key={"password"}
            control={form.control}
            name={"password"}
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel htmlFor={"password"}>{"Password"}</FormLabel>
                  <FormControl>
                    <PasswordInput
                      id={"password"}
                      placeholder={"Password"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <Button className="tw-mt-4 tw-w-full tw-flex tw-gap-4" type="submit">
            {isLoading ? <Loader2 className="tw-animate-spin" /> : "Sign In"}
          </Button>
        </form>
      </Form>
    </>
  );
};
