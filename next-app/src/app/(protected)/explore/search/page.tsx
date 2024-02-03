import BackButton from "@/components/button-back";
import SearchInput from "@/components/input-search";
import MainSection from "@/components/main-section";
import SectionHeader from "@/components/section-header";
import SubSection from "@/components/sub-section";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import H2 from "@/components/ui/h2";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { GearIcon } from "@radix-ui/react-icons";
import FilterItem from "./filterItem";

const PeopleOptions = [
  {
    name: "All",
    id: "all",
  },
  {
    name: "Following",
    id: "following",
  },
];

const LocationOptions = [
  {
    name: "Anywhere",
    id: "anywhere",
  },
  {
    name: "Near you",
    id: "near",
  },
];

export interface SearchPageProps {
  searchParams: { q?: string };
}

const SearchPage = (props: SearchPageProps) => {
  const { q } = props.searchParams;
  return (
    <div className="tw-flex tw-flex-row tw-flex-1 tw-self-stretch">
      <MainSection>
        <SectionHeader>
          <div
            className={cn(
              "tw-flex tw-flex-1 tw-items-center tw-px-4",
              "tw-w-full tw-h-full",
            )}
          >
            <BackButton className="tw-mr-4" />
            <SearchInput defaultValue={q} />
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

        <div className={cn("tw-p-4")}>{"hello"}</div>
      </MainSection>

      <SubSection>
        <Card>
          <H2>Search Filter</H2>
        </Card>

        <Card className="tw-p-4 tw-flex tw-flex-col tw-space-y-4">
          <FilterItem options={PeopleOptions} title="People" />
          <FilterItem options={LocationOptions} title="Location" />
        </Card>
      </SubSection>
    </div>
  );
};

export default SearchPage;
