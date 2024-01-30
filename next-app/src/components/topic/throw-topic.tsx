"use client";

import { Card, CardContent } from "../ui/card";
import { Button, buttonVariants } from "../ui/button";
import { Input } from "../ui/input";
import { Box } from "../ui/box";
import {
  CalendarIcon,
  CheckCircledIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  CircleIcon,
  Cross2Icon,
  CubeIcon,
  ImageIcon,
  PersonIcon,
  SpaceBetweenHorizontallyIcon,
} from "@radix-ui/react-icons";
import UserAvatar from "../user-avatar";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { CandidateItem, Topic } from "./types";
import { axiosClient } from "@/lib/axios";
import {
  Dispatch,
  HTMLAttributes,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import ThrowDateRangePicker from "./throw-topic-date";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";
import { useAuthStore } from "@/lib/zustand/store";
import { Separator } from "../ui/separator";
import Divider from "../ui/divider";
import { Checkbox } from "../ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Textarea } from "../ui/textarea";
import { toast } from "../ui/use-toast";
import { Loader2 } from "lucide-react";

type PostTopicProps = Omit<
  Topic,
  "id" | "view" | "candidateItemCount" | "createdAt" | "updatedAt" | "deletedAt"
> & {
  userId: string;
};

type StatusType = "pending" | "open" | "close";
type TypeType = "poll" | "event";

const statusMap = [
  {
    name: "pending",
    color: "orange",
  },
  {
    name: "open",
    color: "green",
  },
  {
    name: "close",
    color: "red",
  },
];

const typeMap = [
  {
    name: "poll",
    icon: <CheckCircledIcon />,
  },
  {
    name: "event",
    icon: <CalendarIcon />,
  },
];

const ThrowTopicCard = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  const userId = user?.id || "";

  const [optionOepn, setOptionOpen] = useState(false); // 옵션을 독립적으로 여닫기
  const [title, setTitle] = useState("");
  const [startTopic, setStartTopic] = useState(false);
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<StatusType | string>("pending");
  const [type, setType] = useState<TypeType | string>("poll");
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  });

  const [isSecretVote, setIsSecretVote] = useState(true);
  const [isResultOpen, setIsResultOpen] = useState(true);
  const [castingVote, setCastingVote] = useState<string>(userId);
  const [isMultiChoice, setIsMultiChoice] = useState<boolean>(false);

  // Event Type // TODO: 아래 옵션에 설정 추가
  const [eventDate, setEventDate] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [candidateItems, setCandidateItems] = useState<
    Omit<CandidateItem, "id" | "elected">[]
  >([
    {
      order: 1 as number,
      details: "Approve",
    },
    {
      order: 2 as number,
      details: "Disapprove",
    },
  ]);

  const handleStateInitialize = () => {
    setStartTopic(false);
    setTitle("");
    setContent("");
    setStatus("pending");
    setType("poll");
    setDate(undefined);
    setIsSecretVote(true);
    setIsResultOpen(true);
    setCastingVote(userId);
    setIsMultiChoice(false);
    setEventDate("");
    setEventLocation("");
  };
  // Topic 진행 상태를 감지해서 ui를 변경
  // title이 입력되었는지 확인
  useEffect(() => {
    if (title.length > 0) setStartTopic(true);
    else setStartTopic(false);
  }, [title]);

  useEffect(() => {
    if (!startTopic) setContent("");
  });

  const requestBody = {
    userId,
    title,
    type: type as TypeType,
    status: status as StatusType,
    description: content,
    resultOpen: isResultOpen,
    isSecretVote,
    castingVote,
    isMultiChoice,
    startDate: date?.from?.toISOString() as string,
    endDate: date?.to?.toISOString() as string,
    ...(type === "event" && {
      eventDate,
      eventLocation,
    }),
  };

  const postTopic = useMutation({
    mutationFn: (requestBody: PostTopicProps) => {
      return axiosClient.post("/topic", requestBody);
    },
    onSuccess: () => {
      postCandidates.mutate(candidateItems); // postTopic 성공 시 선택지 등록

      toast({
        title: "Throw Topic Success",
        description: "토픽이 생성되었습니다.",
      });
      handleStateInitialize();
      queryClient.invalidateQueries({ queryKey: ["topics"] });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Throw Topic Failed",
        description: "토픽 생성 중 에러 발생! 다시 시도해주세요!",
      });
    },
  });

  const postCandidates = useMutation({
    mutationFn: (requestBody: Omit<CandidateItem, "id" | "elected">[]) => {
      return axiosClient.post("/candidate", requestBody);
    },
    onError: () => {
      toast({
        title: "Throw Candidate Failed",
        description: "선택지 생성 중 에러 발생! 다시 시도해주세요!",
      });
    },
  });

  const handleThrow = () => {
    postTopic.mutate(requestBody);
  };

  return (
    <Card
      className={cn(
        "tw-w-full tw-flex xl:tw-flex-row tw-overflow-hidden tw-bg-secondary",
        postTopic.isError && "animation-wiggle",
      )}
    >
      <CardContent className="tw-w-full !tw-p-4">
        <Box className="tw-items-center tw-w-full" direction={"row"} gap={4}>
          <UserAvatar className="!tw-border-primary tw-border" />
          {/* TODO: 포커스 시, 제한 글자 수 표시 */}

          <div className="tw-relative tw-w-full">
            <Input
              placeholder="Throw new topic!"
              value={title}
              maxLength={50}
              onChange={(e) => setTitle(e.target.value)}
            />
            <span
              className="tw-absolute tw-top-0 tw-right-5 tw-translate-y-1/2
                        tw-text-sm tw-text-secondary-foreground"
            >
              {title.length}/{50}
            </span>
          </div>
        </Box>

        <div className="tw-relative tw-w-full">
          <Textarea
            className={cn(
              startTopic
                ? "tw-h-[100px] tw-opacity-100 tw-mt-2"
                : "!tw-h-0 !tw-min-h-0 tw-py-0 tw-opacity-0",
              "tw-transition-all tw-duration-300",
              "tw-resize-none",
            )}
            maxLength={200}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind?"
          />
          <span
            className={cn(
              "tw-absolute tw-top-0 tw-right-5 tw-translate-y-1/2",
              "tw-text-sm tw-text-secondary-foreground",
              "tw-transition-opacity",
              startTopic ? "tw-opacity-100" : "tw-opacity-0",
            )}
          >
            {content.length}/{200}
          </span>
        </div>

        {/* Options Area */}
        <ThrowTopicOptionsArea
          key={"topic-options"}
          className={cn(
            startTopic
              ? "tw-h-auto tw-opacity-100 tw-mt-2"
              : "tw-h-0 tw-opacity-0 tw-mt-0",
            "tw-transition-all tw-duration-300",
          )}
          userId={userId}
          type={type}
          isSecretVote={isSecretVote}
          setIsSecretVote={setIsSecretVote}
          isResultOpen={isResultOpen}
          setIsResultOpen={setIsResultOpen}
          castingVote={castingVote}
          setCastingVote={setCastingVote}
          isMultiChoice={isMultiChoice}
          setIsMultiChoice={setIsMultiChoice}
        />

        <Box
          className="tw-items-start tw-w-full tw-mt-2"
          direction={"column"}
          gap={4}
        >
          <div className="tw-w-full tw-flex tw-justify-between">
            <div className="tw-flex tw-gap-2">
              <Select defaultValue={status} onValueChange={setStatus}>
                <SelectTrigger className="tw-w-[125px] tw-h-8">
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  {statusMap.map((status) => (
                    <SelectItem key={status.name} value={status.name}>
                      <div className="tw-flex tw-gap-2 tw-items-center">
                        <CircleIcon color={status.color} />
                        <span
                          className={cn(
                            status.color === "green"
                              ? "tw-text-green-500"
                              : status.color === "orange"
                                ? "tw-text-orange-500"
                                : "tw-text-red-500",
                          )}
                        >
                          {status.name.toLocaleUpperCase()}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select defaultValue={type} onValueChange={setType}>
                <SelectTrigger className="tw-w-[105px] tw-h-8">
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  {typeMap.map((type) => (
                    <SelectItem key={type.name} value={type.name}>
                      <div className="tw-flex tw-gap-2 tw-items-center">
                        {type.icon}
                        <span>{type.name.toLocaleUpperCase()}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <ThrowDateRangePicker date={date} setDate={setDate} />
          </div>

          <div className="tw-w-full tw-flex tw-justify-end">
            <CandidateArea
              startTopic={startTopic}
              isPending={postTopic.isPending}
              candidateItems={candidateItems}
              setCandidateItems={setCandidateItems}
            />
          </div>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ThrowTopicCard;

interface ThrowTopicOptionsAreaProps {
  userId: string;
  isSecretVote: boolean;
  setIsSecretVote: Dispatch<SetStateAction<boolean>>;

  isResultOpen: boolean;
  setIsResultOpen: Dispatch<SetStateAction<boolean>>;

  castingVote: string;
  setCastingVote: Dispatch<SetStateAction<string>>;

  isMultiChoice: boolean;
  setIsMultiChoice: Dispatch<SetStateAction<boolean>>;

  type: "poll" | "event" | string;
}
const ThrowTopicOptionsArea = ({
  className,
  userId,
  isSecretVote,
  setIsSecretVote,
  isResultOpen,
  setIsResultOpen,
  castingVote,
  setCastingVote,
  isMultiChoice,
  setIsMultiChoice,
  type,
}: ThrowTopicOptionsAreaProps & HTMLAttributes<HTMLDivElement>) => {
  const [candidateId, setCandidateId] = useState<string>(userId);

  const { data: idUser } = useQuery({
    queryKey: ["castingVoteUser"],
    queryFn: () =>
      axiosClient.get("/user", {
        params: {
          id: candidateId,
        },
      }),
    enabled: false,
  });

  const [castingVoteInputValue, setCastingVoteInputValue] = useState<string>(
    idUser?.data.username,
  );
  const { data: usernameUser } = useQuery({
    queryKey: ["castingVoteUser"],
    queryFn: () =>
      axiosClient.get("/user", {
        params: {
          username: castingVoteInputValue,
        },
      }),
  });

  return (
    <div className={cn("tw-w-full tw-flex tw-justify-between", className)}>
      <div className="tw-flex tw-gap-4">
        <div className="tw-flex tw-items-center tw-space-x-2">
          <Checkbox
            id={"secret-vote"}
            checked={isSecretVote}
            onCheckedChange={() => setIsSecretVote(!isSecretVote)}
          />
          <label
            htmlFor="secret-vote"
            className="tw-text-sm tw-font-medium tw-leading-none"
          >
            Secret Vote
          </label>
        </div>

        <div className="tw-flex tw-items-center tw-space-x-2">
          <Checkbox
            id={"result-open"}
            checked={isResultOpen}
            onCheckedChange={() => setIsResultOpen(!isResultOpen)}
          />
          <label
            htmlFor="result-open"
            className="tw-text-sm tw-font-medium tw-leading-none"
          >
            Result Open
          </label>
        </div>

        <div className="tw-flex tw-items-center tw-space-x-2">
          <Checkbox
            id={"multi-choice"}
            checked={isMultiChoice}
            onCheckedChange={() => setIsMultiChoice(!isMultiChoice)}
          />
          <label
            htmlFor="multi-choice"
            className="tw-text-sm tw-font-medium tw-leading-none"
          >
            Multiple Selection
          </label>
        </div>

        {type === "event" && (
          <>
            {/* TODO: Event Date, Event Location */}
            <div className="tw-flex tw-items-center tw-space-x-2">
              <label
                htmlFor="event-date"
                className="tw-text-sm tw-font-medium tw-leading-none"
              >
                Event Date
              </label>
            </div>

            <div className="tw-flex tw-items-center tw-space-x-2">
              <label
                htmlFor="event-location"
                className="tw-text-sm tw-font-medium tw-leading-none"
              >
                Event Location
              </label>
            </div>
          </>
        )}
      </div>

      <div className="tw-flex tw-items-center tw-space-x-2">
        <Dialog>
          <TooltipProvider>
            <Tooltip>
              <DialogTrigger>
                <TooltipTrigger
                  asChild
                  className={cn(
                    buttonVariants({ variant: "outline", size: "icon" }),
                    "tw-h-8 tw-w-8 tw-p-1",
                  )}
                >
                  <PersonIcon />
                </TooltipTrigger>
              </DialogTrigger>
              <TooltipContent>Final Decision Maker</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Final Decision Maker</DialogTitle>
            </DialogHeader>
            <div>
              <Input
                value={castingVoteInputValue}
                onChange={(e) => setCastingVoteInputValue(e.target.value)}
              />
            </div>
            <DialogFooter>
              <Button
                variant={"default"}
                className="!tw-bg-orange-300 hover:!tw-bg-orange-500 "
                onClick={() => setCastingVote(usernameUser?.data.id)}
                disabled={!usernameUser}
              >
                Confirm
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

const CandidateArea = ({
  startTopic,
  isPending,
  candidateItems,
  setCandidateItems,
}: {
  startTopic: boolean;
  isPending: boolean;
  candidateItems: Partial<CandidateItem>[];
  setCandidateItems: Dispatch<
    SetStateAction<Omit<CandidateItem, "id" | "elected">[]>
  >;
}) => {
  const sortedCandidates = candidateItems.sort(
    (a: Partial<CandidateItem>, b: Partial<CandidateItem>) =>
      (a?.order ?? 0) - (b?.order ?? 0),
  );

  const handleInputChange = (index: number, value: string) => {
    setCandidateItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[index] = { ...updatedItems[index], details: value };
      return updatedItems;
    });
  };

  const handleAddCandidate = () => {
    if (candidateItems.length >= 5) {
      toast({
        title: "Max 5 Options",
        variant: "destructive",
        description: "선택지는 최대 5개만 추가할 수 있습니다!",
      });
      return false;
    }
    setCandidateItems((prevItems) => [
      ...prevItems,
      { details: "", elected: false, order: prevItems.length + 1 },
    ]);
  };

  const handleRemoveCandidate = (index: number) => {
    if (candidateItems.length <= 2) {
      toast({
        title: "Min 2 Options",
        variant: "destructive",
        description: "선택지는 최소한 2개이상 존재해야만 합니다!",
      });
      return false;
    }
    setCandidateItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems.splice(index, 1);
      return updatedItems;
    });
  };

  const handleSubmitCandidates = () => {
    const nullItems = candidateItems.filter(
      (item: Partial<CandidateItem>) => item.details == "",
    );

    if (nullItems.length > 0) {
      toast({
        title: "Empty Option",
        variant: "destructive",
        description: "빈 선택지는 추가할 수 없습니다.",
      });
    } else {
      candidateItems.forEach(
        async (item: Partial<CandidateItem>, index: number) => {
          try {
            const result = await axiosClient.post("/candidate", { ...item });
          } catch (error) {
            console.log("error", error);

            toast({
              title: "Error",
              variant: "destructive",
              description: `선택지 ${index + 1}번 생성 중 에러 발생: ${error}`,
            });
          }
        },
      );
    }

    console.log(candidateItems);
  };

  return (
    <Dialog>
      <DialogTrigger
        disabled={!startTopic}
        // onClick={handleThrow}
        className={cn(
          buttonVariants({ variant: "default" }),
          "!tw-bg-orange-300 hover:!tw-bg-orange-500 tw-gap-2 tw-h-8 tw-w-[100px]",
        )}
      >
        {isPending ? <Loader2 className="tw-animate-spin" /> : "Throw"}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>Topic Options</DialogHeader>
        <Box>
          {sortedCandidates.map(
            (candidate: Partial<CandidateItem>, index: number) => (
              <div
                key={index}
                className="tw-relative tw-flex tw-gap-2 tw-items-center"
              >
                <span className="tw-text-sm">{candidate.order}</span>
                <Input
                  key={index}
                  value={candidate.details}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                />
                <Button
                  variant="destructive"
                  size={"icon"}
                  className={cn(
                    "tw-absolute tw-right-2 tw-top-1/2",
                    "-tw-translate-y-1/2",
                    "tw-h-6 tw-w-6 tw-p-1",
                  )}
                  onClick={() => handleRemoveCandidate(index)}
                >
                  <Cross2Icon />
                </Button>
              </div>
            ),
          )}

          <Separator className="tw-my-4" />
          <Button variant={"outline"} onClick={handleAddCandidate}>
            Add Options
          </Button>
        </Box>
        <DialogFooter>
          <Button variant={"default"} onClick={handleSubmitCandidates}>
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
