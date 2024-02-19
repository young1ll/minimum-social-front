import { Button, buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { GearIcon } from "@radix-ui/react-icons";
import Link from "next/link";

interface UserProfileEditButtonProps {}

const UserProfileEditButton = (
  props: UserProfileEditButtonProps & React.HTMLAttributes<HTMLButtonElement>,
) => {
  const { className } = props;
  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <Link
            className={cn(
              buttonVariants({ variant: "outline", size: "icon" }),
              "tw-absolute tw-top-2 tw-right-2",
              className,
            )}
            href={`/settings/profile`}
          >
            <GearIcon className="tw-h-6 tw-w-6" />
          </Link>
        </TooltipTrigger>
        <TooltipContent
          side="top"
          className="tw-bg-zinc-500/90 tw-border-none tw-text-xs tw-text-white"
        >
          Edit Profile
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default UserProfileEditButton;
