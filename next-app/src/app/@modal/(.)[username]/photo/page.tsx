"use client";

import { Dialog, DialogClose, DialogContent } from "@/components/ui/dialog";
import UserAvatar from "@/components/user-avatar";
import { useUserByUsername } from "@/lib/query/use-user";
import { cn } from "@/lib/utils";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

interface ProfilePhotoModalPageProps {
  params: {
    username: string;
  };
}

const ProfilePhotoModalPage = (props: ProfilePhotoModalPageProps) => {
  const { params } = props;
  const { username } = params;

  const router = useRouter();

  const { data } = useUserByUsername({ username });

  return (
    <Dialog open onOpenChange={() => router.back()}>
      <DialogContent
        className={cn(
          "tw-border-none tw-bg-transparent",
          "tw-justify-center",
          "tw-shadow-none",
        )}
        hasAutoClose={false}
      >
        <div className="tw-relative tw-w-full tw-h-full tw-aspect-square">
          <UserAvatar
            username={decodeURIComponent(username)}
            profileImage={data?.profileImage}
            routeUserPage={false}
            size={"9xl"}
          />

          <DialogClose
            className={cn(
              "tw-absolute tw-right-2 tw-top-2",
              "tw-rounded-sm tw-opacity-70 tw-ring-offset-background",
              "tw-transition-opacity hover:tw-opacity-100",
              "focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2",
              "disabled:tw-pointer-events-none",
            )}
          >
            <Cross2Icon className="tw-h-6 tw-w-6 tw-text-accent" />
            <span className="tw-sr-only">Close</span>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfilePhotoModalPage;
