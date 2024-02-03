import BackButton from "@/components/button-back";
import SectionHeader from "@/components/section-header";
import H2 from "@/components/ui/h2";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface UserHeaderProps {
  username?: string;
  topicCounts?: number;
}

const UserHeader = (props: UserHeaderProps) => {
  const { username, topicCounts } = props;

  return (
    <SectionHeader>
      <BackButton className="tw-w-[53px] tw-h-[53px] tw-rounded-none" />

      <Separator orientation="vertical" />

      <div className={cn("tw-flex tw-flex-1", "tw-w-full tw-h-full")}>
        <div className="tw-flex tw-flex-col tw-flex-1">
          <H2 className="tw-w-full">{username}</H2>
          <span className="tw-px-4 tw-text-base -tw-mt-2 tw-pb-1 tw-text-zinc-500">
            {topicCounts} posts
          </span>
        </div>
      </div>
    </SectionHeader>
  );
};

export default UserHeader;
