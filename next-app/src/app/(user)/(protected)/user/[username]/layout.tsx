import { Box } from "@/components/ui/box";
import { Container } from "@/components/ui/container";
import ProfileSidebar from "./profile-sidebar";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container
      size={"xl"}
      className="tw-flex-col tw-mt-4"
      innerContainerProps={{
        className: "tw-flex tw-justify-start tw-w-full tw-gap-4",
      }}
    >
      <Box className="md:!tw-flex-row tw-gap-4">
        {/* sidebar */}
        <ProfileSidebar />

        <Box className="tw-flex-1">{children}</Box>
      </Box>
    </Container>
  );
};

export default UserLayout;
