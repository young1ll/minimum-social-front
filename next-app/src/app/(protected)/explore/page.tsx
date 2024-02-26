"use client";

import { cn } from "@/lib/utils";
import { tagList } from "../tag-area";
import { Separator } from "@/components/ui/separator";
import { Button, buttonVariants } from "@/components/ui/button";
import { DotsHorizontalIcon, GearIcon } from "@radix-ui/react-icons";
import SectionHeader from "@/components/section-header";
import MainSection from "@/components/main-section";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import LoadingCircle from "@/components/loading-circle";
import SubSection from "@/components/sub-section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { repository } from "@/app/(guest)/repositoies";
import Link from "next/link";
import SearchInput from "@/components/input-search";
import TrendCard from "../trend-card";
import config from "@/config";

const ExplorePage = () => {
  const session = useSession();
  const user = session.data?.user;

  //TODO: api 작성...
  const getTopTrends = async () => {
    const url = new URL(`${config.rootUrl}/api/topic`);
    url.searchParams.append("userId", user?.id as string);

    const response = await fetch(url);
    return response.json();
  };

  const { data, isLoading } = useQuery({
    queryKey: ["explore", "trends"],
    queryFn: getTopTrends,
  });

  return (
    <div className="tw-flex tw-flex-row tw-flex-1 tw-self-stretch">
      <MainSection>
        <SectionHeader>
          <div
            className={cn(
              "tw-flex tw-flex-1 tw-items-center tw-px-4",
              "tw-w-full tw-h-full",
            )}
          >
            <SearchInput />
          </div>

          <Separator orientation="vertical" />

          <Button
            className="tw-rounded-none tw-w-[53px] tw-h-[53px]"
            size={"icon"}
            variant={"ghost"}
          >
            <GearIcon className="tw-h-6 tw-w-6" />
          </Button>
        </SectionHeader>

        <div className={cn("tw-mt-4")}>
          {isLoading ? (
            <LoadingCircle />
          ) : (
            <TrendCard className="hover:!tw-bg-accent" />
          )}
        </div>
      </MainSection>

      {/* <TagArea /> */}
      <SubSection>
        <Card className="!tw-bg-accent">
          <CardHeader className="tw-pb-2">
            <CardTitle>Welcome!</CardTitle>
          </CardHeader>
          <CardContent className="tw-gap-2">
            <p>minimum-social에 오신 것을 환영합니다!</p>
          </CardContent>
        </Card>

        <div className="tw-flex tw-flex-row tw-flex-wrap tw-gap-x-1 tw-px-2">
          {repository.map((repo) => (
            <Link
              key={repo.name}
              href={repo.url}
              className={cn(
                buttonVariants({ variant: "link" }),
                "!tw-px-0 !tw-py-3 tw-text-sm",
                "tw-h-4",
              )}
            >
              {repo.name}
            </Link>
          ))}
        </div>
      </SubSection>
    </div>
  );
};

export default ExplorePage;
