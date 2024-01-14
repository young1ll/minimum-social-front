'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export type SubmitSigninSchema = z.infer<
  typeof signinSchema | typeof signinSchema
>;

const signinSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'This field has to be filled' })
    .email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s])/, {
      message:
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    }),
});

export const SignInForm = () => {
  const form = useForm<z.infer<typeof signinSchema>>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const signinProceeding = async (values: z.infer<typeof signinSchema>) => {
    console.log({ messages: 'entered values', values });
    try {
      const response = await signIn('credentials', {
        redirect: false,
        ...values,
        callbackUrl: '/',
      });

      if (!response?.error) {
        console.log({
          response: { message: 'Sign in successful', callback: '/' },
        });
      } else {
        console.log({ response: { message: 'Sign in failed', callback: '/' } });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(signinProceeding)}>
          {Object.entries(signinSchema.shape).map(([key, value]) => (
            <FormField
              key={key}
              control={form.control}
              name={key as keyof z.infer<typeof signinSchema>}
              render={({ field }) => {
                let { value, ...rest } = field;
                return (
                  <FormItem>
                    <FormLabel htmlFor={key}>{key.toUpperCase()}</FormLabel>
                    <FormControl>
                      <Input
                        id={key}
                        type="text"
                        placeholder={key}
                        value={value}
                        {...rest}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          ))}
          <Button className="tw-mt-4 tw-w-full tw-flex tw-gap-4" type="submit">
            Sign In
          </Button>
        </form>
      </Form>
    </>
  );
};
