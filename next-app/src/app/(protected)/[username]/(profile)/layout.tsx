import MainSection from "@/components/main-section";
import UserHeader from "./user-header";
import UserCard from "./user-card";
import { cn } from "@/lib/utils";
import TagArea from "../../tag-area";
import UserLinks from "./user-links";

interface UserProfileLayoutProps {
  params: { username: string };
  children: React.ReactNode;
}

const UserProfileLayout = (props: UserProfileLayoutProps) => {
  const { params, children } = props;
  const username = decodeURIComponent(params.username);

  return (
    <div className="tw-flex tw-flex-row tw-flex-1 tw-self-stretch">
      <MainSection>
        <UserHeader username={username} />
        {/* <div><pre>{JSON.stringify(data, null, 2)}</pre></div> */}
        <UserCard username={username} />

        <div className={cn("tw-border-t", "tw-flex tw-flex-col")}>
          <UserLinks username={username} />
          {children}
        </div>
      </MainSection>
      <TagArea />
    </div>
  );
};

export default UserProfileLayout;
