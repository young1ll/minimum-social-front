"use client";

import { cn } from "@/lib/utils";
import { Button } from "./button";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

interface H2ComponentProps {
  children: React.ReactNode;
  className?: string;
  backButton?: boolean;
}

const H2 = (props: H2ComponentProps & React.HTMLAttributes<HTMLDivElement>) => {
  const { children, className, backButton, ...rest } = props;
  const router = useRouter();

  return (
    <div
      className={cn(
        "tw-sticky tw-top-0 tw-z-10",
        "tw-h-[53px] tw-px-4 tw-flex tw-flex-col tw-justify-center",
        className,
      )}
      {...rest}
    >
      <div className="tw-flex tw-flex-col tw-justify-start">
        <div className="tw-flex tw-items-center tw-gap-4 tw-justify-stretch tw-h-full tw-w-full tw-grow tw-shrink">
          {backButton && (
            <Button
              onClick={() => router.back()}
              size={"icon"}
              variant={"ghost"}
            >
              <ArrowLeftIcon className="tw-h-6 tw-w-6" />
            </Button>
          )}
          <h2 className="tw-font-bold tw-text-[20px] tw-leading-[24px]">
            {children}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default H2;
