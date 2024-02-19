import { redirect } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { GearIcon } from "@radix-ui/react-icons";
import TagArea from "../tag-area";
import { Separator } from "@/components/ui/separator";
import SectionHeader from "@/components/section-header";
import MainSection from "@/components/main-section";
import FeedArea from "./feed-area";
import SortTabItem from "./sort-item";
import { Card, CardContent } from "@/components/ui/card";
import ThrowTopic from "@/components/throw-topic/throw-topic";

const sortTabs = [
  { name: "Latest", href: "/feeds?sort=latest" },
  { name: "Follwing", href: "/feeds?sort=follwing" },
];

export interface FeedPageProps {
  params: { topicId: string };
  searchParams: { sort?: string };
}

const FeedPage = (props: FeedPageProps) => {
  const { sort } = props.searchParams;
  if (!sort) redirect("/feeds?sort=latest");

  return (
    <div className="tw-flex tw-flex-row tw-flex-1 tw-self-stretch">
      {/* Add Topic: client component */}
      <MainSection>
        <SectionHeader className="backdrop:tw-blur-xl">
          <div className={cn("tw-flex tw-flex-1", "tw-w-full tw-h-full")}>
            {sortTabs.map((tab) => (
              <SortTabItem
                key={`sort-${tab.name}`}
                name={tab.name}
                href={tab.href}
              />
            ))}
          </div>

          <Separator orientation="vertical" />

          <Button
            className="tw-rounded-none tw-w-[53px] tw-h-[53px]"
            size={"icon"}
            variant={"ghost"}
            disabled
          >
            <GearIcon className="tw-h-6 tw-w-6" />
          </Button>
        </SectionHeader>

        {/* TODO: 컴포넌트 분리 */}
        <div className="tw-p-4">
          <Card
            className={cn(
              "tw-w-full tw-flex xl:tw-flex-row tw-overflow-hidden tw-bg-secondary",
              // usePostTopic.isError && "animation-wiggle",
            )}
          >
            <CardContent className="tw-w-full !tw-p-4">
              <ThrowTopic />
            </CardContent>
          </Card>
        </div>

        <FeedArea sort={sort} />
      </MainSection>

      {/* tag area */}
      <TagArea />
    </div>
  );
};

export default FeedPage;
