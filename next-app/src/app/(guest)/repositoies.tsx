import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import React from "react";

export const repository = [
  {
    name: "@minimum-social-front",
    url: "https://github.com/young1ll/minimum-social-front",
    description: "프론트엔드 레포지토리",
  },
  {
    name: "@minimum-social-user",
    url: "https://github.com/young1ll/minimum-social-user",
    description: "유저 서버 레포지토리",
  },
  {
    name: "@minimum-social-topic",
    url: "https://github.com/young1ll/minimum-social-topic",
    description: "주제 서버 레포지토리",
  },
  {
    name: "@minimum-social-activity",
    url: "https://github.com/young1ll/minimum-social-activity",
    description: "활동 서버 레포지토리",
  },
];

const Repositories = () => {
  return (
    <TooltipProvider>
      <div
        className="tw-absolute tw-bottom-0 tw-left-0
      tw-text-center tw-w-full tw-p-1
      tw-bg-white
      tw-flex tw-justify-center tw-gap-4
      "
      >
        {repository.map((repo) => (
          <Tooltip>
            <TooltipTrigger>
              <Link
                key={repo.name}
                href={repo.url}
                className="tw-text-sm hover:tw-underline"
                target="_blank"
              >
                {repo.name}
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>{repo.description}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
};

export default Repositories;
