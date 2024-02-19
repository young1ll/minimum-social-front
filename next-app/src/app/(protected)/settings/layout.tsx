import SettingsMenuArea from "./settings-menu";
import MainSection from "@/components/main-section";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="tw-flex tw-flex-row tw-flex-1 tw-self-stretch">
      <MainSection className="tw-basis-0 tw-grow tw-shrink tw-hidden lg:tw-flex">
        <SettingsMenuArea />
      </MainSection>
      <MainSection className="tw-basis-auto tw-shrink-0 tw-flex-none">
        {children}
      </MainSection>
    </div>
  );
};

export default UserLayout;
