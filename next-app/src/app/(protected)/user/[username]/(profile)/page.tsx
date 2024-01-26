import { Box } from "@/components/ui/box";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";
import UserAvatar from "@/components/user-avatar";
import { cn } from "@/lib/utils";
import { GearIcon } from "@radix-ui/react-icons";
import Link from "next/link";

/**
 * ProfilePage #7
 * - parse username from url
 * - request user infomation by server action
 */
interface ProfilePageProps {
  params: { username: string };
}

const ProfilePage = (props: ProfilePageProps) => {
  const { username } = props.params;

  const datailLinks = [
    {
      name: "Following",
      href: `/user/${username}/following`,
      value: 214,
    },
    {
      name: "Followers",
      href: `/user/${username}/followers`,
      value: 42,
    },
    {
      name: "Topics",
      href: `/user/${username}/topics`,
      value: 5,
    },
    {
      name: "Voted",
      href: `/user/${username}/voted`,
      value: 22,
    },
    {
      name: "Comments",
      href: `/user/${username}/comments`,
      value: 42,
    },
    {
      name: "Pinned",
      href: `/user/${username}/pinned`,
      value: 1,
    },
  ];

  return (
    <Box>
      <h1 className="tw-text-xl tw-font-bold">{username}</h1>
      <Separator />

      <Card className={cn("tw-relative tw-mt-4", "tw-p-4")}>
        <Button
          variant={"ghost"}
          size={"icon"}
          className="tw-absolute tw-top-2 tw-right-2 tw-text-muted-foreground hover:tw-text-primary"
        >
          <GearIcon className="tw-w-5 tw-h-5" />
        </Button>

        <Box direction={"row"} gap={6}>
          <UserAvatar size={"3xl"} />
          <Box direction={"column"} gap={4}>
            <div>
              <div className="tw-flex tw-flex-row tw-items-center tw-gap-2">
                <h2 className="tw-text-lg tw-font-semibold">{username}</h2>
                <span className="tw-text-sm tw-text-muted-foreground">
                  {"2023-01-01"}
                </span>
              </div>
              <h3>{"userEmail"}</h3>
            </div>

            <p className="tw-text-sm tw-line-clamp-3 tw-text-justify">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Totam
              voluptatem harum corporis minima aliquam necessitatibus nostrum
              pariatur nobis autem perspiciatis minus velit, amet alias
              molestiae illum fugit officia praesentium eligendi?
            </p>
          </Box>
        </Box>

        <Separator className="tw-my-4" />

        <div className="tw-justify-between tw-grid tw-grid-cols-3 tw-gap-1">
          {datailLinks.map((link) => (
            <Link
              className={cn(
                buttonVariants({ variant: "link" }),
                "tw-h-8 !tw-p-1 hover:tw-bg-accent",
              )}
              href={link.href}
            >
              {link.value}{" "}
              <span className="tw-ml-1 tw-font-semibold">{link.name}</span>
            </Link>
          ))}
        </div>
      </Card>
    </Box>
  );
};

export default ProfilePage;
