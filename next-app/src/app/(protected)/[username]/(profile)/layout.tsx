"use client";

import MainSection from "@/components/main-section";
import UserHeader from "./user-header";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import UserCard from "./user-card";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import TagArea from "../../tag-area";

const UserProfileLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const session = useSession();
  const user = session.data?.user; // 다른 사용자 대입

  const getUserById = async () => {
    const url = new URL(`/api/user`);
    url.searchParams.append("id", user?.id as string);

    const response = await fetch(url);
    return response.json();
  };

  const { data, isLoading } = useQuery({
    queryKey: ["user", user?.username, "profile"],
    queryFn: getUserById,
  });

  const userLinks = [
    {
      name: "Topics",
      href: `/${user?.username}`,
    },
    {
      name: "Voted",
      href: `/${user?.username}/voted`,
    },
    {
      name: "Media",
      href: `/${user?.username}/media`,
    },
    {
      name: "Likes",
      href: `/${user?.username}/likes`,
    },
  ];

  return (
    <div className="tw-flex tw-flex-row tw-flex-1 tw-self-stretch">
      <MainSection>
        <UserHeader
          username={user?.username}
          topicCounts={data?.topicCounts || 0}
        />
        <UserCard
          username={user?.username}
          email={user?.email}
          profileImage={user?.profileImage}
          bio={user?.bio}
          following={data?.following || 0}
          followers={data?.followers || 0}
        />

        <div className={cn("tw-border-t", "tw-flex tw-flex-col")}>
          <div
            className={cn(
              "tw-border-b",
              "tw-flex-1 tw-flex tw-justify-between",
            )}
          >
            {userLinks.map((link) => (
              <Link
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "tw-rounded-none",
                  "tw-w-full tw-h-14 !tw-text-base",
                  "tw-font-semibold",
                  "tw-border-b-4 tw-border-orange-500",
                  pathname !== link.href &&
                    "tw-text-zinc-500 tw-border-b-transparent",
                )}
                href={link.href}
              >
                {link.name}
              </Link>
            ))}
          </div>
          {children}
        </div>
      </MainSection>
      <TagArea />
    </div>
  );
};

export default UserProfileLayout;
