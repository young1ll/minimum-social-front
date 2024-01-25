"use client";

import { CardHeader } from "../ui/card";
import { Box } from "../ui/box";
import UserAvatar from "../user-avatar";
import { Button } from "../ui/button";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { formatDateIntl } from "@/lib/utils";

type PollCardHeaderProps = {
  authorId: string;
  createdAt: string;
};

const PollCardHeader = ({ authorId, createdAt }: PollCardHeaderProps) => {
  return (
    <CardHeader className="tw-px-4 tw-py-2 tw-border-b">
      <Box direction={"row"} className="tw-justify-between tw-items-center">
        <Box direction={"row"} gap={2} className="tw-items-center">
          <UserAvatar size={"xs"} />
          <p className="tw-text-sm tw-font-medium tw-leading-none">{"username"}</p>
          <span className="tw-text-sm tw-text-muted-foreground">
            /{formatDateIntl("ko", createdAt, { year: "numeric", month: "long", day: "numeric" })}
          </span>
        </Box>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button asChild size={"icon"} variant={"ghost"} className="tw-h-6 tw-w-6 tw-p-1">
              <DotsHorizontalIcon />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" forceMount>
            <DropdownMenuGroup>
              <DropdownMenuItem>Copy link</DropdownMenuItem>
              <DropdownMenuItem>Hide</DropdownMenuItem>
              <DropdownMenuItem>Report</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </Box>
    </CardHeader>
  );
};

export default PollCardHeader;
