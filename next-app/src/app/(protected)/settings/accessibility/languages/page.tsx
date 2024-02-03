"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import H2 from "@/components/ui/h2";
import { Separator } from "@/components/ui/separator";
import { ArrowLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import SettingsItem from "../../setting-item";

const LanguagesSettingsPage = () => {
  const router = useRouter();

  return (
    <>
      <div className="tw-flex tw-flex-row tw-items-center tw-px-2">
        <Button variant="ghost" size={"icon"} onClick={() => router.back()}>
          <ArrowLeftIcon className="tw-h-6 tw-w-6" />
        </Button>
        <H2>Display</H2>
      </div>

      <div className="tw-px-4 tw-py-3">
        <p className="tw-text-sm tw-text-zinc-400">
          Manage your font size, color, and background. These settings affect
          all the X accounts on this browser.
        </p>
      </div>

      <H2>Display languages</H2>
      <SettingsItem
        name="Display language"
        description="English" // TODO: 지원 언어 사전 만들고, session의 locale로 찾기
        endItem={<ChevronRightIcon className="tw-h-6 tw-w-6" />}
      />

      <Separator />
      <H2>Additional Languages</H2>
      <SettingsItem
        name="Additional language"
        endItem={<ChevronRightIcon className="tw-h-6 tw-w-6" />}
      />
    </>
  );
};

export default LanguagesSettingsPage;
