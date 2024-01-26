"use client";

import { Separator } from "../ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { TriangleDownIcon } from "@radix-ui/react-icons";
import { useState } from "react";

/**
 * FeedsPage Separator
 */

type SortByProps = "최신순" | "추천순";

const FeedSeparator = () => {
  const [sortBy, setSortBy] = useState<SortByProps>("최신순");
  return (
    <div className="tw-flex tw-items-center tw-my-2 tw-px-1">
      <Separator className="tw-flex-1" />
      <DropdownMenu>
        <DropdownMenuTrigger className="tw-ml-2">
          <Button asChild variant={"ghost"} className="tw-h-8">
            <span className="tw-flex tw-gap-2">
              정렬: {sortBy}
              <TriangleDownIcon />
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" forceMount>
          <DropdownMenuGroup>
            <DropdownMenuItem id="latest" onClick={() => setSortBy("최신순")}>
              최신순
            </DropdownMenuItem>
            <DropdownMenuItem id="recommend" onClick={() => setSortBy("추천순")}>
              추천순
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default FeedSeparator;
