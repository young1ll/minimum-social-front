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
import { ArrowRight } from 'lucide-react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { SignUpFormProps, handleSubmitFinallyType } from '../-form-types';

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
export type SubmitSignupSchema = z.infer<
  typeof firstFormSchema | typeof secondFormSchema
>;

const firstFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: 'Username must be at least 2 characters.',
    })
    .max(32, {
      message: 'Username must be less than 32 characters.',
    }),
  email: z
    .string()
    .min(1, { message: 'This field has to be filled' })
    .email({ message: 'Invalid email address' }),
});

/**
 * ===============================================================
 * = First Form: password, check password
 * ===============================================================
 */
export const FirstForm = ({
  handleSubmitProceed,
  onSubmitData,
  submitData,
}: SignUpFormProps) => {
  const form = useForm<z.infer<typeof firstFormSchema>>({
    resolver: zodResolver(firstFormSchema),
    defaultValues: {
      username: submitData['username' as keyof SubmitSignupSchema],
      email: submitData['email' as keyof SubmitSignupSchema],
    },
  });

  const signupProceeding = (values: z.infer<typeof firstFormSchema>) => {
    console.log(values);
    onSubmitData(values);
    handleSubmitProceed(true);
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
            {'Sign Up'}
            <ArrowRight
              size={'16'}
              // hover 시 표시
            />
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
        message: 'Password must be at least 8 characters.',
      })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s])/, {
        message:
          'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.',
      }),
    'check password': z.string(),
  })
  .superRefine(({ password, 'check password': checkPassword }, ctx) => {
    if (password !== checkPassword) {
      ctx.addIssue({
        code: 'custom',
        message: 'Passwords do not match.',
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
}: Omit<SignUpFormProps, 'handleSubmitProceed'> & {
  submitFinally: handleSubmitFinallyType;
}) => {
  const form = useForm<z.infer<typeof secondFormSchema>>({
    resolver: zodResolver(secondFormSchema),
    defaultValues: {
      password: '',
      'check password': '',
    },
  });

  const signupProceed = (values: z.infer<typeof secondFormSchema>) => {
    try {
      onSubmitData(values);

      if (
        submitData['username' as keyof SubmitSignupSchema] &&
        submitData['email' as keyof SubmitSignupSchema] &&
        submitData['password' as keyof SubmitSignupSchema]
      ) {
        submitFinally();
      }
    } catch (error) {
      // Handle error if onSubmitData fails
      console.error('Error during signupProceed:', error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(signupProceed)}>
        <FormField
          key={'password'}
          control={form.control}
          name={'password'}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={'password'}>{'PASSWORD'}</FormLabel>
              <FormControl>
                <Input
                  id={'password'}
                  type="password"
                  placeholder={'Password'}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          key={'check_password'}
          control={form.control}
          name={'check password'}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={'check_password'}>
                {'CONFIRM PASSWORD'}
              </FormLabel>
              <FormControl>
                <Input
                  id={'check_password'}
                  type="password"
                  placeholder={'Confirm Password'}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="tw-mt-4 tw-w-full">
          {'Submit'}
        </Button>
      </form>
    </Form>
  );
};
