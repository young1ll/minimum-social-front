"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";

import { Switch } from "./ui/switch";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import { useQuery } from "@tanstack/react-query";
import { axiosClient } from "@/lib/axios";

import UserAvatar from "./user-avatar";
import { useAuthStore } from "@/lib/zustand/store";

const SiteUser = () => {
  const router = useRouter();
  const store = useAuthStore();

  const { user } = store;
  // TODO: user 가 없는 경우 SiteUser는 표시되지 않음

  const { data: userData } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const serverResponse = await axiosClient.get(
        `/user?email=${user?.email}`,
      );
    },
  });

  //TODO: endpoint 수정
  const toggleDarkMode = async () => {
    const serverResponse = await axiosClient.patch(
      `/user?email=${user?.email}`,
      {
        darkmode: !user?.darkmode,
      },
    );
  };

  const handleLogout = async () => {
    store.setUser(null);
    await signOut({ callbackUrl: "/signin" });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button
          variant={"ghost"}
          className="tw-relative tw-h-10 tw-w-10 tw-rounded-full tw-border"
        >
          {/* TODO: replace with user avatar */}
          <UserAvatar />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="tw-w-56" align="end" forceMount>
        <DropdownMenuLabel className="tw-font-normal">
          <div className="tw-flex tw-flex-col tw-space-y-1">
            <p className="tw-text-sm tw-font-medium tw-leading-none">
              {user?.username}
            </p>
            <p className="tw-text-xs tw-leading-none tw-text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => router.push(`/user/${user?.username}`)}
          >
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push(`/user/${user?.username}/settings`)}
          >
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem className="tw-flex tw-justify-between tw-items-center">
            Dark mode
            <Switch checked={user?.darkmode} onCheckedChange={toggleDarkMode} />
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SiteUser;
