"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input, PasswordInput } from "@/components/ui/input";
import { EyeNoneIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export type SubmitSigninSchema = z.infer<typeof signinSchema | typeof signinSchema>;

const signinSchema = z.object({
  email: z.string().min(1, { message: "This field has to be filled" }).email({ message: "Invalid email address" }),
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
      const result = await signIn("credentials", { redirect: false, callbackUrl: "/", email, password });

      if (result?.ok) {
        // console.log("Login Success", result);
        toast({ variant: "success", title: "Login Success", description: "Login Success" });
      } else {
        toast({ variant: "destructive", title: "Login Failed", description: result?.error });
        // console.log("Login Failed", result?.error);
      }
      setIsLoading(false);
      router.push("/");
    } catch (error) {
      // console.log(error);
      setIsLoading(false);
      toast({ variant: "destructive", title: "Login Failed", description: error });
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
                    <Input id={"email"} type="email" placeholder={"Email"} {...field} />
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
                    <PasswordInput id={"password"} placeholder={"Password"} {...field} />
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
