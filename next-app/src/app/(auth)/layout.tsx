import { Box } from "@/components/ui/box";
import { Card, CardFooter } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config";
import Link from "next/link";
import AuthWallpaper from "./wallpaper";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession();
  if (session?.user) {
    redirect("/");
  }
  return (
    <Container size={"xl"}>
      <Card className="tw-w-full tw-flex xl:tw-flex-row tw-overflow-hidden">
        <AuthWallpaper />

        <Box className="tw-w-full tw-max-w-[750px]">
          {children}
          <CardFooter className="tw-flex tw-justify-center">
            <p className="tw-text-sm tw-text-gray-500">
              © <Link href={"/"}>{siteConfig.name}</Link>
            </p>
          </CardFooter>
        </Box>
      </Card>
    </Container>
  );
};

export default AuthLayout;
