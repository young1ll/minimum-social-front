"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import H2 from "@/components/ui/h2";
import { cn } from "@/lib/utils";
import {
  ChevronRightIcon,
  ExclamationTriangleIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const userSettingMenu = [
  {
    name: "Your account",
    href: `/settings/account`,
    endIcon: ChevronRightIcon,
  },
  {
    name: "Notifications",
    href: `/settings/notifications`,
    endIcon: ChevronRightIcon,
  },
  {
    name: "Privacy and safty",
    href: `/settings/privacy_and_safety`,
    endIcon: ChevronRightIcon,
  },
  {
    name: "Accessibility, display and languages",
    href: `/settings/accessibility`,
    endIcon: ChevronRightIcon,
  },
];

const SettingsMenuArea = () => {
  const pathname = usePathname();

  return (
    <>
      <H2>Settings</H2>

      <Command className="tw-w-full tw-max-w-[600px] tw-mx-auto" loop>
        <CommandInput placeholder="Search Settings" />
        <CommandList>
          <CommandEmpty>No Settings found...</CommandEmpty>
          {userSettingMenu.map((item) => (
            <CommandItem
              key={item.name}
              className={cn(
                "tw-flex tw-gap-4 tw-px-4 tw-py-3 !tw-rounded-none",
                " tw-border-r-2 tw-border-orange-500",
                pathname.includes(item.href)
                  ? "!tw-bg-accent"
                  : "tw-border-transparent",
                "aria-selected:tw-bg-inherit",
                "hover:!tw-bg-accent",
              )}
            >
              <Link href={item.href} className="tw-flex tw-flex-grow tw-shrink">
                <span className="tw-whitespace-nowrap tw-break-words tw-text-base">
                  {item.name}
                </span>
              </Link>
              <item.endIcon className="tw-h-6 tw-w-6" />
            </CommandItem>
          ))}
          <div className="tw-p-2">
            <Alert variant={"destructive"}>
              <ExclamationTriangleIcon className="tw-h-4 tw-w-4 !tw-text-destructive" />
              <AlertTitle>현재 사용할 수 없는 아이템 입니다.</AlertTitle>
              <AlertDescription>현재 개발 중인 아이템입니다.</AlertDescription>
            </Alert>
          </div>
        </CommandList>
      </Command>
    </>
  );
};

export default SettingsMenuArea;
