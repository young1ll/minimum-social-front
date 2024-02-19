"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";

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

interface TrendCardProps {}

const TrendCard = (
  props: TrendCardProps & React.HTMLAttributes<HTMLDivElement>,
) => {
  const { className, ...rest } = props;
  return tagList.map((tag) => (
    <div key={tag.id} className="tw-w-full">
      <div
        id={tag.id}
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "tw-relative tw-justify-between tw-cursor-pointer",
          "tw-w-full tw-h-full tw-px-6 tw-py-2 tw-rounded-none",
          "hover:tw-bg-white/60",
          className,
        )}
        {...rest}
      >
        <div className="tw-flex tw-flex-col">
          <span className="tw-text-zinc-500">
            {tag.group ? `Trending in ${tag.group}` : tag.category}
          </span>
          <span className="tw-font-bold tw-text-base">{tag.name}</span>
          <span className="tw-text-zinc-500">
            {tag.counts.toLocaleString()} posts
          </span>
        </div>

        <Button
          className="tw-absolute tw-top-2 tw-right-2 tw-text-zinc-500 hover:tw-text-primary"
          variant={"ghost"}
          size={"icon"}
        >
          <DotsHorizontalIcon className="tw-h-6 tw-w-6" />
        </Button>
      </div>
    </div>
  ));
};

export default TrendCard;
