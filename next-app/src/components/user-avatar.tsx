"use client";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { VariantProps, cva } from "class-variance-authority";
import { useSession } from "next-auth/react";
import { useAuthStore } from "@/lib/zustand/store";

const userAvatarVariants = cva("", {
  variants: {
    size: {
      default: "!tw-h-8 !tw-w-8",
      xs: "!tw-h-5 !tw-w-5",
      sm: "!tw-h-6 !tw-w-6",
      lg: "!tw-h-10 !tw-w-10",
      xl: "!tw-h-12 !tw-w-12",
      "2xl": "!tw-h-24 !tw-w-24",
      "3xl": "!tw-h-36 !tw-w-36",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export interface UserAvatarProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof userAvatarVariants> {}

const UserAvatar = ({ className, size, ...props }: UserAvatarProps) => {
  const session = useSession();
  const sessionUser = session.data?.user;

  const { user } = useAuthStore();
  const { username, profileImage } = user || sessionUser || {};

  return (
    <Avatar className={cn(userAvatarVariants({ size }), className)} {...props}>
      <AvatarImage src={profileImage} alt={username} />
      <AvatarFallback>{username?.slice(0, 2).toUpperCase()}</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
