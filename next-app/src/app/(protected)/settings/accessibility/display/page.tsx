"use client";

import { Button } from "@/components/ui/button";
import H2 from "@/components/ui/h2";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";

const colorList = [
  {
    name: "orange",
  },
  {
    name: "yellow",
  },
  {
    name: "red",
  },
  {
    name: "blue",
  },
  {
    name: "green",
  },
];

const themeList = [
  {
    name: "Light",
  },
  {
    name: "Dark",
  },
];

const DisplaySettingsPage = () => {
  const router = useRouter();
  const user = useSession().data?.user;

  const handleThemeToggle = () => {};
  return (
    <>
      <H2 backButton>Display</H2>

      <div className="tw-px-4 tw-py-3">
        <p className="tw-text-sm tw-text-zinc-400">
          Manage your font size, color, and background. These settings affect
          all the X accounts on this browser.
        </p>
      </div>

      <H2>Font size</H2>
      <div className="tw-flex tw-flex-row tw-gap-6 tw-justify-center tw-p-4">
        <Slider defaultValue={[3]} min={1} max={5} step={1} />
      </div>

      <Separator />
      <H2>Color</H2>
      <div className="tw-flex tw-flex-row tw-gap-6 tw-justify-center tw-p-4">
        {colorList.map((item, index) => (
          <Button
            className={cn("!tw-w-10 !tw-h-10")}
            size={"icon"}
            key={`${item.name.toLowerCase()}-${index}`}
          />
        ))}
      </div>

      <Separator />
      <H2>Theme</H2>
      <div className="tw-flex tw-flex-row tw-gap-2 tw-p-4">
        {themeList.map((item, index) => (
          <Button
            variant={"outline"}
            key={`${item.name.toLowerCase()}-${index}`}
            className={cn(
              "!tw-text-lg tw-px-6 tw-w-full tw-h-full",
              user?.darkmode && item.name === "Dark"
                ? "tw-border-orange-500"
                : item.name === "Light" && "tw-border-orange-500",
            )}
            onClick={handleThemeToggle}
          >
            {item.name}
          </Button>
        ))}
      </div>
    </>
  );
};

export default DisplaySettingsPage;
