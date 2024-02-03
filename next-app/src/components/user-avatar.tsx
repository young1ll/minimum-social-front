"use client";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";

const userAvatarVariants = cva("tw-font-bold", {
  variants: {
    size: {
      default: "!tw-h-8 !tw-w-8",
      xs: "!tw-h-5 !tw-w-5",
      sm: "!tw-h-6 !tw-w-6 tw-text-xs",
      lg: "!tw-h-10 !tw-w-10",
      xl: "!tw-h-12 !tw-w-12",
      "2xl": "!tw-h-14 !tw-w-14",
      "3xl": "!tw-h-20 !tw-w-20",
      "4xl": "!tw-h-24 !tw-w-24",
      "5xl": "!tw-h-32 !tw-w-32 tw-text-5xl",
      "6xl": "!tw-h-36 !tw-w-36 tw-text-6xl",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

interface UserAvatarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof userAvatarVariants> {
  username?: string;
  profileImage?: string;
}

const UserAvatar = (props: UserAvatarProps) => {
  const { username, profileImage, size, className, ...rest } = props;

  return (
    <Link href={`/${username}`}>
      <Avatar className={cn(userAvatarVariants({ size }), className)} {...rest}>
        <AvatarImage src={profileImage} alt={username} />
        <AvatarFallback>{username?.slice(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
    </Link>
  );
};

export default UserAvatar;
