import SearchInput from "@/components/input-search";
import MainSection from "@/components/main-section";
import SectionHeader from "@/components/section-header";
import SubSection from "@/components/sub-section";
import H2 from "@/components/ui/h2";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";

const SingleTopicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="tw-flex tw-flex-row tw-flex-1 tw-self-stretch">
        <MainSection>
          <SectionHeader>
            <H2 backButton>Topic</H2>
          </SectionHeader>

          {children}
        </MainSection>

        <SubSection>
          <div
            className={cn(
              "tw-fixed tw-top-0",
              "tw-w-[350px] tw-h-[53px]",
              "tw-bg-background tw-z-20",
              "tw-flex tw-items-center",
            )}
          >
            <SearchInput />
          </div>
          <div className="tw-h-[53px]" />
        </SubSection>
      </div>
      <Toaster />
    </>
  );
};

export default SingleTopicLayout;
