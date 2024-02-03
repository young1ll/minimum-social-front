import H2 from "@/components/ui/h2";
import { Separator } from "@/components/ui/separator";
import {
  ChatBubbleIcon,
  ChevronRightIcon,
  FileTextIcon,
  SpeakerOffIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import SettingsItem from "../setting-item";

export const privacyMenu = [
  {
    name: "Topics",
    description: "토픽 작성 내역 확인 및 관리",
    href: `/settings/notifications`,
    startIcon: FileTextIcon,
    endIcon: ChevronRightIcon,
  },
  {
    name: "Mute and block",
    description: "회원, 토픽, 알림 등 차단 내역 확인 및 관리",
    href: `/settings/notifications`,
    startIcon: SpeakerOffIcon,
    endIcon: ChevronRightIcon,
  },
  {
    name: "Preferences",
    description: "댓글 내역 확인 및 관리",
    href: `/settings/notifications`,
    startIcon: ChatBubbleIcon,
    endIcon: ChevronRightIcon,
  },
];

const PrivacyAndSafetyPage = () => {
  return (
    <>
      <H2 backButton>Privacy and safety</H2>

      <div className="tw-px-4 tw-py-3">
        <p className="tw-text-sm tw-text-zinc-400">
          Manage what information you see and share on minimum-social.
        </p>
      </div>

      <H2>User Activity</H2>
      {privacyMenu.map((item) => (
        <SettingsItem
          name={item.name}
          description={item.description}
          href={item.href}
          startItem={<item.startIcon className="tw-h-6 tw-w-6" />}
          endItem={<item.endIcon className="tw-h-6 tw-w-6" />}
        />
      ))}

      <Separator className="tw-my-4" />
      <H2>Learn more about privacy on minimum-social</H2>
      <SettingsItem
        name="Contact us"
        endItem={<ChevronRightIcon className="tw-h-6 tw-w-6" />}
      />
    </>
  );
};

export default PrivacyAndSafetyPage;
