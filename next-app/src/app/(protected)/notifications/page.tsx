import SectionHeader from "@/components/section-header";
import { Button } from "@/components/ui/button";
import H2 from "@/components/ui/h2";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { GearIcon } from "@radix-ui/react-icons";
import TagArea from "../tag-area";
import MainSection from "@/components/main-section";

const NotificationsPage = () => {
  return (
    <div className="tw-flex tw-flex-row tw-flex-1 tw-self-stretch">
      <MainSection>
        <SectionHeader>
          <div className={cn("tw-flex tw-flex-1", "tw-w-full tw-h-full")}>
            <H2 className="tw-w-full">Notification</H2>
          </div>

          <Separator orientation="vertical" />

          <Button
            className="tw-rounded-none tw-w-[53px] tw-h-[53px]"
            size={"icon"}
            variant={"ghost"}
          >
            <GearIcon className="tw-h-6 tw-w-6" />
          </Button>
        </SectionHeader>

        {/* TODO: notification list  */}
      </MainSection>

      <TagArea />
    </div>
  );
};

export default NotificationsPage;
