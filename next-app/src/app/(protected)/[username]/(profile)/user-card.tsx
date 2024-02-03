import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import UserAvatar from "@/components/user-avatar";
import { cn } from "@/lib/utils";
import { CalendarIcon, GearIcon } from "@radix-ui/react-icons";
import Link from "next/link";

interface UserCardProps {
  username?: string;
  email?: string;
  profileImage?: string;
  bio?: string;
  createdAt?: string;
  following?: number;
  followers?: number;
}

const UserCard = (props: UserCardProps) => {
  const {
    username,
    email,
    bio,
    profileImage,
    createdAt,
    following,
    followers,
  } = props;

  const lorem =
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ab pariatur alias quo. Fugiat, expedita. Non accusantium iste, eum adipisci incidunt modi laborum provident porro cum, ea perferendis perspiciatis voluptatibus enim!";
  return (
    <div className="tw-p-4">
      <Card className="tw-relative">
        <Button
          className="tw-absolute tw-top-2 tw-right-2"
          variant={"outline"}
          size={"icon"}
        >
          <GearIcon className="tw-h-6 tw-w-6" />
        </Button>
        <div
          className={cn(
            "tw-flex tw-flex-row tw-gap-4",
            "tw-flex-1 tw-items-center",
            "tw-p-2",
          )}
        >
          <UserAvatar
            profileImage={profileImage}
            username={username}
            size="6xl"
          />

          <div className="tw-flex tw-flex-col tw-gap-2 tw-flex-1">
            <div className="tw-flex tw-flex-col">
              {username ? (
                <span className="tw-text-xl tw-font-bold">{username}</span>
              ) : (
                <Skeleton className="tw-w-44 tw-h-7" />
              )}
              {email ? (
                <span className="tw-text-zinc-500 tw-font-medium">{email}</span>
              ) : (
                <Skeleton className="tw-w-36 tw-h-6" />
              )}
            </div>

            <div className="tw-flex tw-flex-row tw-gap-2">
              <span className="tw-flex tw-items-center tw-gap-2 tw-text-zinc-500 tw-font-medium">
                <CalendarIcon />
                {createdAt || new Date().toLocaleDateString()}
              </span>
              <Link
                className={cn(
                  "tw-text-zinc-500 tw-font-medium",
                  "hover:tw-underline",
                )}
                href={`/${username}/following`}
              >
                <span className="tw-font-bold">
                  {following?.toLocaleString()}
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
                  {followers?.toLocaleString()}
                </span>{" "}
                Followers
              </Link>
            </div>
          </div>
        </div>

        <div className="tw-border-t tw-px-4 tw-py-2 tw-w-full">
          {/* TODO: height, overflow-hidden으로 바꾸고 상태 변경 */}
          {bio ? (
            <p className="tw-line-clamp-1">{bio || lorem}</p>
          ) : (
            <Skeleton className="tw-w-full tw-h-6" />
          )}
        </div>
      </Card>
    </div>
  );
};

export default UserCard;
