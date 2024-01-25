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

import { axiosClient } from "@/lib/api";
import { Switch } from "./ui/switch";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { UserProps } from "@/types/next-auth";
import { useRouter } from "next/navigation";
import { useSelectAuth } from "@/redux/features/auth-slice";
import UserAvatar from "./user-avatar";

interface SiteUserProps {
  id: string;
  username: string;
  email: string;
  darkmode: boolean;
}

const SiteUser = () => {
  const router = useRouter();

  const auth = useSelectAuth((state) => state.authReducer.value);
  const { isAuthenticated, username, email, id, darkmode } = auth;

  const [user, setUser] = useState({} as UserProps);

  useEffect(() => {
    const getUser = async () => {
      const serverResponse = await axiosClient.get(`/user/${email}`);
      setUser(serverResponse.data.user[0]);
    };
    getUser();
  }, []);

  const toggleDarkMode = async () => {
    const serverResponse = await axiosClient.patch(`/user/${email}`, {
      darkmode: !darkmode,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button
          variant={"ghost"}
          className="tw-relative tw-h-8 tw-w-8 tw-rounded-full tw-border"
        >
          {/* TODO: replace with user avatar */}
          <UserAvatar />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="tw-w-56" align="end" forceMount>
        <DropdownMenuLabel className="tw-font-normal">
          <div className="tw-flex tw-flex-col tw-space-y-1">
            <p className="tw-text-sm tw-font-medium tw-leading-none">
              {username}
            </p>
            <p className="tw-text-xs tw-leading-none tw-text-muted-foreground">
              {email}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => router.push(`/user/${username}`)}>
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push(`/user/${username}/settings`)}
          >
            Settings
          </DropdownMenuItem>
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
