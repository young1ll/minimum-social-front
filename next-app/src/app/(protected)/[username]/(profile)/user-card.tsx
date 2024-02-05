"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import { CalendarIcon, GearIcon } from "@radix-ui/react-icons";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import UserAvatar from "@/components/user-avatar";
import { useUserByUsername } from "@/lib/query/use-user";
import UserProfileEditButton from "./user-edit-button";

interface UserCardProps {
  username: string;
}

const UserCard = (props: UserCardProps) => {
  const {
    username,
    // following,
    // followers,
  } = props;

  const useUserQuery = useUserByUsername({ username });
  const { data: userData, isLoading: isUserDataLoading } = useUserQuery;

  const lorem =
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ab pariatur alias quo. Fugiat, expedita. Non accusantium iste, eum adipisci incidunt modi laborum provident porro cum, ea perferendis perspiciatis voluptatibus enim!";
  return (
    <div className="tw-p-4">
      <Card className="tw-relative">
        <UserProfileEditButton />
        <div
          className={cn(
            "tw-flex tw-flex-row tw-gap-4",
            "tw-flex-1 tw-items-center",
            "tw-p-2",
          )}
        >
          <Link href={`/${username}/photo`}>
            <UserAvatar
              profileImage={userData?.profileImage}
              username={username}
              size="6xl"
              routeUserPage={false}
            />
          </Link>

          <div className="tw-flex tw-flex-col tw-gap-2 tw-flex-1">
            <div className="tw-flex tw-flex-col">
              {/* <pre>{JSON.stringify(userData, null, 2)}</pre> */}
              {isUserDataLoading ? (
                <>
                  <Skeleton className="tw-w-44 tw-h-7" />
                  <Skeleton className="tw-w-36 tw-h-6" />
                </>
              ) : (
                <>
                  <span className="tw-text-xl tw-font-bold">{username}</span>
                  <span className="tw-text-zinc-500 tw-font-medium">
                    {userData?.email}
                  </span>
                </>
              )}
            </div>
            <div className="tw-flex tw-flex-row tw-gap-2">
              <span className="tw-flex tw-items-center tw-gap-2 tw-text-zinc-500 tw-font-medium">
                <CalendarIcon />
                {new Date(userData?.createdAt).toLocaleDateString() ||
                  new Date().toLocaleDateString()}
              </span>
              <Link
                className={cn(
                  "tw-text-zinc-500 tw-font-medium",
                  "hover:tw-underline",
                )}
                href={`/${username}/following`}
              >
                <span className="tw-font-bold">
                  {/* {following?.toLocaleString()} */}
                </span>{" "}
                Following
              </Link>
              <Link
                className={cn(
                  "tw-text-zinc-500 tw-font-medium",
                  "hover:tw-underline",
                )}
                href={`/${username}/followers`}
              >
                <span className="tw-font-bold">
                  {/* {followers?.toLocaleString()} */}
                </span>{" "}
                Followers
              </Link>
            </div>
          </div>
        </div>

        <div className="tw-border-t tw-px-4 tw-py-2 tw-w-full">
          {/* TODO: height, overflow-hidden으로 바꾸고 상태 변경 */}
          {isUserDataLoading ? (
            <Skeleton className="tw-w-full tw-h-6" />
          ) : (
            <p className="tw-line-clamp-1">{userData?.bio || lorem}</p>
          )}
        </div>
      </Card>
    </div>
  );
};

export default UserCard;
