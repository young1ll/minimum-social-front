import { cn } from "@/lib/utils";
import { Box } from "../ui/box";
import { Topic } from "@/types/topic";
import UserAvatar from "../user-avatar";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "../ui/skeleton";
import { CalendarIcon, EyeOpenIcon, HeartIcon } from "@radix-ui/react-icons";
import { renderDate } from "@/app/(protected)/[username]/[topicId]/page";
import { Badge } from "../ui/badge";
import Link from "next/link";

interface TopicItemProps extends Topic {
  description: string;
}

const TopicItem = (
  props: TopicItemProps & React.HTMLAttributes<HTMLDivElement>,
) => {
  const {
    id,
    userId,
    title,
    description,
    type,
    // tags, //TODO: 지원 예정
    // media, //TODO: 지원 예정
    status,
    isSecretVote,
    resultOpen,
    isMultiChoice,
    castingVote,
    view,
    // like, //TODO: 지원 예정
    candidateItemCount,
    startDate,
    endDate,
    createdAt,
    updatedAt,
    className,
    ...rest
  } = props;

  const getUserByUserId = async () => {
    const response = await fetch(`/user?id=${userId}`);
    const result = await response.json();

    return result.data;
  };
  const { data: userData } = useQuery({
    queryKey: ["users", userId],
    queryFn: getUserByUserId,
  });

  return (
    <Box
      direction={"row"}
      className={cn(
        "tw-min-h-[120px] tw-border-b",
        "tw-relative",
        "hover:tw-bg-accent tw-cursor-pointer",
        (status === "close" || status === "pending") &&
          "tw-cursor-default tw-pointer-events-none tw-select-none",
        className,
      )}
      {...rest}
    >
      {status !== "open" && (
        <div
          className={cn(
            "tw-pointer-events-none",
            "tw-absolute tw-z-20",
            "tw-w-full tw-h-full",
            "tw-bg-zinc-500/20",
          )}
        />
      )}
      <Link
        className="tw-flex tw-w-full tw-h-full"
        href={`/${userData?.username}/${id}`}
      >
        <div className="tw-w-40 tw-p-4 tw-flex tw-flex-col tw-gap-1 tw-justify-center tw-items-end">
          <Badge className="tw-w-full tw-justify-center" variant={"outline"}>
            {isSecretVote ? "비밀 투표" : "공개 투표"}
          </Badge>
          <Badge className="tw-w-full tw-justify-center" variant={"outline"}>
            {isMultiChoice ? "다중 선택" : "단일 선택"}
          </Badge>
          <Badge className="tw-w-full tw-justify-center" variant={"outline"}>
            {isMultiChoice ? "결과 공개" : "결과 비공개"}
          </Badge>
        </div>

        {/* <Separator orientation="vertical" /> */}

        <div className="tw-w-full tw-p-4 tw-flex tw-flex-col tw-justify-between">
          <div className="tw-flex tw-flex-col">
            <div className="tw-flex tw-gap-1 tw-items-center tw-font-semibold tw-text-xl">
              <div className="tw-flex-1 tw-flex tw-gap-1 tw-items-center">
                {type === "event" && <CalendarIcon className="tw-w-6 tw-h-6" />}
                <span className="tw-line-clamp-1">{title}</span>
              </div>
              <Badge
                className={cn(
                  "tw-font-normal tw-text-sm",
                  status === "pending" &&
                    "tw-text-orange-500 tw-border-orange-500",
                  status === "open" && "tw-text-green-500 tw-border-green-500",
                )}
                variant={"outline"}
              >
                {status}
              </Badge>
            </div>
            <span className="tw-text-base">{description}</span>
          </div>

          <div className="tw-flex tw-justify-between tw-items-center">
            <div className="tw-flex tw-gap-4 tw-text-zinc-500">
              <span className="tw-flex tw-items-center tw-gap-2">
                <CalendarIcon />
                {createdAt === updatedAt
                  ? renderDate({ date: createdAt as string, isUpdated: false })
                  : renderDate({
                      date: updatedAt as string,
                      isUpdated: true,
                    })}
              </span>

              <span className="tw-text-sm tw-flex tw-items-center tw-gap-2">
                <EyeOpenIcon />
                {view}
              </span>

              <span className="tw-text-sm tw-flex tw-items-center tw-gap-2">
                <HeartIcon />
                {/* {like} */}
                {0}
              </span>
            </div>

            <div className="tw-flex tw-gap-2 tw-items-center">
              <UserAvatar
                size={"sm"}
                profileImage={userData?.profileImage}
                username={userData?.username || "Mock"}
              />

              {userData?.username ? (
                <span className="tw-text-sm tw-font-semibold">
                  {userData?.username}
                </span>
              ) : (
                <Skeleton className="tw-h-4 tw-w-16" />
              )}
            </div>
          </div>
        </div>
      </Link>
    </Box>
  );
};

export default TopicItem;
