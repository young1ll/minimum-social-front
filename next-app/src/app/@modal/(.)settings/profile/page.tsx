"use client";

import LoadingCircle from "@/components/loading-circle";
import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import H2 from "@/components/ui/h2";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import UserAvatar from "@/components/user-avatar";
import { useUpdateUser, useUserByUserId } from "@/lib/query/use-user";
import { cn } from "@/lib/utils";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

const CDN = process.env.NEXT_PUBLIC_CLOUDFRONT_URL;

const SettingsProfileModalPage = () => {
  const router = useRouter();
  const session = useSession();

  const { data } = useUserByUserId({
    userId: session.data?.user?.id as string,
  });

  const editProfileRef = useRef<HTMLInputElement | null>(null);
  // 화면 표시를 위한 image url
  const [createObjectURL, setCreateObjectURL] = useState<string | null>(null);
  const [editedImage, setEditedImage] = useState<File | null>(null);

  const [usernameValue, setUsernameValue] = useState(data?.username);
  const [bioValue, setBioValue] = useState(data?.bio);

  const { mutate, isPending, isSuccess } = useUpdateUser({
    userId: session.data?.user?.id as string,
    username: session.data?.user?.username as string,
  });

  const uploadToClient = (e: React.ChangeEvent<HTMLInputElement>) => {
    // image url
    if (createObjectURL) {
      // createObjectURL의 기본 값 해제
      URL.revokeObjectURL(createObjectURL);
    }

    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setEditedImage(file);
      setCreateObjectURL(URL.createObjectURL(file));
    }
  };
  const handleEditAvatar = () => {
    editProfileRef.current?.click();
  };

  const updateAvatar = async () => {
    // s3 upload
    if (!editedImage) {
      return;
    }
    // body 정의
    const body = {
      name:
        "profile/" + Math.random().toString(36).substring(2) + editedImage.name,
      type: editedImage.type,
    };
    try {
      // 1: get signed url
      const urlRes = await fetch(`/api/media`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(body),
      });

      const data = await urlRes.json();
      const signedUrl = data.url;
      console.log({ signedUrl });

      // 2: upload file to s3 by signed url
      const uploadRes = await fetch(signedUrl, {
        method: "PUT",
        body: editedImage,
        headers: {
          "Content-Type": editedImage.type,
        },
      });
      console.log({ uploadRes });

      // 3: return save url: 성공 시 saveURL을 db에 저장
      const saveUrl = `${CDN}/${body.name}`;
      if (uploadRes.ok) {
        return saveUrl;
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleEditSubmit = async () => {
    const saveUrl = await updateAvatar();
    mutate({
      ...(data.username !== usernameValue && { username: usernameValue }),
      ...(data.bio !== bioValue && { bio: bioValue }),
      ...(saveUrl && { profileImage: saveUrl }),
    });
    if (isSuccess) {
      router.back();
      //TODO: session update
    }
  };

  return (
    <Dialog open onOpenChange={() => router.back()}>
      <DialogContent className="!tw-p-0">
        <ScrollArea className="tw-relative tw-h-[420px]">
          <H2>User Profile</H2>
          {isPending && (
            <Box className={cn("tw-absolute tw-z-10", "tw-w-full tw-h-full")}>
              <LoadingCircle />
            </Box>
          )}
          <Box
            direction={"row"}
            gap={"xl"}
            className="tw-justify-center tw-mx-auto tw-mt-4"
          >
            <input
              ref={editProfileRef}
              className="tw-sr-only"
              name="user-profile-input"
              type="file"
              onChange={uploadToClient}
            />
            <div className="tw-relative tw-inline-flex tw-items-center">
              <UserAvatar
                username={data?.username}
                profileImage={data?.profileImage}
                routeUserPage={false}
                className="tw-transition-all"
                size={editedImage ? "3xl" : "7xl"}
              />
              {!editedImage && (
                <div
                  className={cn(
                    "tw-h-full tw-w-full",
                    "tw-absolute",
                    "tw-flex tw-justify-center tw-items-center",
                  )}
                >
                  <Button
                    size="icon"
                    variant="default"
                    className={cn(
                      "!tw-rounded-full",
                      "!tw-bg-primary/50 hover:!tw-bg-primary/90",
                      "tw-h-12 tw-w-12",
                    )}
                    onClick={handleEditAvatar}
                  >
                    <Pencil2Icon />
                  </Button>
                </div>
              )}
            </div>

            {editedImage && (
              <div className="tw-relative tw-inline-flex tw-items-center">
                <UserAvatar
                  profileImage={createObjectURL as string}
                  size={"7xl"}
                />

                <div
                  className={cn(
                    "tw-h-full tw-w-full",
                    "tw-absolute",
                    "tw-flex tw-justify-center tw-items-center",
                  )}
                >
                  <Button
                    size="icon"
                    variant="default"
                    className={cn(
                      "!tw-rounded-full",
                      "!tw-bg-primary/50 hover:!tw-bg-primary/90",
                      "tw-h-12 tw-w-12",
                    )}
                    onClick={handleEditAvatar}
                  >
                    <Pencil2Icon />
                  </Button>
                </div>
              </div>
            )}
          </Box>

          {/* username */}
          <Box className="tw-px-4">
            <span>Username</span>
            <Input
              value={usernameValue}
              onChange={(e) => setUsernameValue(e.target.value)}
            />
          </Box>
          {/* bio */}
          <Box className="tw-px-4 tw-py-2">
            <span>Bio</span>
            <Textarea
              className="tw-resize-none"
              value={bioValue}
              onChange={(e) => setBioValue(e.target.value)}
            />
          </Box>
        </ScrollArea>
        <Box className="tw-px-4 tw-pb-4">
          <Button
            variant="default"
            className="!tw-bg-orange-300 hover:!tw-bg-orange-500"
            onClick={handleEditSubmit}
          >
            Save
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsProfileModalPage;
