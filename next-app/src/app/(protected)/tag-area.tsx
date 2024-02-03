import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import React from "react";
import { repository } from "../(guest)/repositoies";
import Link from "next/link";
import SubSection from "@/components/sub-section";
import SearchInput from "@/components/input-search";
import TrendCard from "./trend-card";

export const tagList = [
  {
    id: "1",
    name: "태그1",
    group: "South Korea",
    category: "Entertainment",
    counts: 4864,
  },
  {
    id: "2",
    name: "태그2",
    group: "",
    category: "Entertainment",
    counts: 5128,
  },
  {
    id: "3",
    name: "태그3",
    group: "South Korea",
    category: "Entertainment",
    counts: 5128,
  },
  {
    id: "4",
    name: "태그4",
    group: "South Korea",
    category: "Entertainment",
    counts: 5128,
  },
  {
    id: "5",
    name: "태그5",
    group: "",
    category: "Society",
    counts: 5128,
  },
  {
    id: "6",
    name: "태그6",
    group: "",
    category: "Society",
    counts: 7601,
  },
  {
    id: "7",
    name: "태그7",
    group: "South Korea",
    category: "Entertainment",
    counts: 1135,
  },
  {
    id: "8",
    name: "태그8",
    group: "South Korea",
    category: "Entertainment",
    counts: 2094,
  },
  {
    id: "9",
    name: "태그9",
    group: "South Korea",
    category: "Entertainment",
    counts: 34960,
  },
];

const TagArea = () => {
  return (
    <SubSection>
      <div
        className={cn(
          "tw-fixed tw-top-0",
          "tw-w-[350px] tw-h-[53px]",
          "tw-bg-background tw-z-20",
          "tw-flex tw-items-center",
        )}
      >
        <SearchInput />
      </div>
      <div className="tw-h-[53px]" />

      <Card className="!tw-bg-accent">
        <CardHeader className="tw-pb-2">
          <CardTitle>Welcome!</CardTitle>
        </CardHeader>
        <CardContent className="tw-gap-2">
          <p>minimum-social에 오신 것을 환영합니다!</p>
        </CardContent>
      </Card>

      <Card className="!tw-bg-accent">
        <CardHeader className="tw-pb-4">
          <CardTitle>Trending tags</CardTitle>
        </CardHeader>

        <TrendCard />
      </Card>

      <div className="tw-flex tw-flex-row tw-flex-wrap tw-gap-x-1 tw-px-2">
        {repository.map((repo) => (
          <Link
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
  );
};

export default TagArea;
