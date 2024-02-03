import H2 from "@/components/ui/h2";
import {
  BellIcon,
  ChevronRightIcon,
  MixerHorizontalIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import SettingsItem from "../setting-item";

export const notificationsMenu = [
  {
    name: "Filters",
    description: "알림 필터 편집",
    href: `/settings/notifications`,
    startIcon: MixerHorizontalIcon,
    endIcon: ChevronRightIcon,
  },
  {
    name: "Preferences",
    description: "알림 타입 선호도 편집",
    href: `/settings/notifications`,
    startIcon: BellIcon,
    endIcon: ChevronRightIcon,
  },
];

const NotificationPage = () => {
  return (
    <>
      <H2 backButton>Notifications</H2>

      <div className="tw-px-4 tw-py-3">
        <p className="tw-text-sm tw-text-zinc-400">
          계정 활동 또는 추천 내용에 대한 알림을 확인하고 편집할 수 있습니다.
        </p>
      </div>
      {notificationsMenu.map((item) => (
        <SettingsItem
          name={item.name}
          description={item.description}
          href={item.href}
          startItem={<item.startIcon className="tw-h-6 tw-w-6" />}
          endItem={<item.endIcon className="tw-h-6 tw-w-6" />}
        />
      ))}
    </>
  );
};

export default NotificationPage;
