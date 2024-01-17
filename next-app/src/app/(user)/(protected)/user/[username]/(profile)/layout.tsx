import Divider from "@/components/ui/divider";
import ProfileNav from "./profile-nav";

interface ProfileLayoutProps {
  children: React.ReactNode;
  params: { username: string };
}
const ProfileLayout = ({ children, params }: ProfileLayoutProps) => {
  const navitems = [
    {
      name: "Overview",
      href: `/user/${params.username}`,
    },
    {
      name: "Topics",
      href: `/user/${params.username}/topics`,
    },
    {
      name: "Pinned",
      href: `/user/${params.username}/pinned`,
    },
    {
      name: "Comments",
      href: `/user/${params.username}/comments`,
    },
  ];

  return (
    <div className="tw-relative tw-w-full tw-space-y-6 tw-flex tw-flex-col tw-pt-8 tw-px-6">
      <div className="tw-space-y-0.5">
        <h2 className="tw-text-2xl tw-font-bold tw-tracking-tight">Profile</h2>
        <p className="tw-text-muted-foreground">description...</p>
      </div>

      <Divider lineProps={{ color: "neutral" }} />

      <div className="tw-w-full tw-flex tw-gap-2 tw-space-y-8 md:tw-space-y-0 tw-flex-col md:tw-flex-row">
        <aside className=" md:tw-w-1/4">
          <ProfileNav items={navitems} />
        </aside>
        <div className=" tw-flex-1">{children}</div>
      </div>
    </div>
  );
};

export default ProfileLayout;
