"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

import { axios_user } from "@/lib/api";
import { Switch } from "./ui/switch";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { UserProps } from "@/types/next-auth";
import { useRouter } from "next/navigation";

interface SiteUserProps {
  id: string;
  username: string;
  email: string;
  darkmode: boolean;
}

const SiteUser = ({ id, username, email, darkmode }: SiteUserProps) => {
  const router = useRouter();
  const [user, setUser] = useState({} as UserProps);
  useEffect(() => {
    const getUser = async () => {
      const serverResponse = await axios_user.get(`/user/${email}`);
      setUser(serverResponse.data.user[0]);
    };
    getUser();
  }, []);

  const toggleDarkMode = async () => {
    const serverResponse = await axios_user.patch(`/user/${email}`, {
      darkmode: !darkmode,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button asChild variant={"ghost"} className="tw-relative tw-h-8 tw-w-8 tw-rounded-full tw-border">
          {/* TODO: replace with user avatar */}
          <Avatar className="tw-h-8 tw-w-8">
            <AvatarImage src={user.profileImage} alt={username} />
            <AvatarFallback>{username.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="tw-w-56" align="end" forceMount>
        <DropdownMenuLabel className="tw-font-normal">
          <div className="tw-flex tw-flex-col tw-space-y-1">
            <p className="tw-text-sm tw-font-medium tw-leading-none">{username}</p>
            <p className="tw-text-xs tw-leading-none tw-text-muted-foreground">{email}</p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => router.push(`/user/${username}`)}>Profile</DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push(`/user/${username}/settings`)}>Settings</DropdownMenuItem>
          <DropdownMenuItem className="tw-flex tw-justify-between tw-items-center">
            Dark mode
            <Switch checked={darkmode} onCheckedChange={toggleDarkMode} />
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SiteUser;
