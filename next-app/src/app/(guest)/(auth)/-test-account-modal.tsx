"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input, PasswordInput } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

const TestAccountModal = ({ className }: Props) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"destructive"} className={cn(className)}>
          테스트 계정 확인
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogTitle>Test Account</AlertDialogTitle>

        <AlertDialogDescription className="tw-space-y-2">
          <Input value={"tester@minimum-social.com"} />
          <PasswordInput value={"TESt0123@"} />
        </AlertDialogDescription>

        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default TestAccountModal;
