import H2 from "@/components/ui/h2";
import {
  ChevronRightIcon,
  LockClosedIcon,
  PersonIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import SettingsItem from "../setting-item";

export const userAccountMenu = [
  {
    name: "Account Information",
    description: "회원 계정 상세 정보 확인",
    href: `/settings/account`,
    startIcon: PersonIcon,
    endIcon: ChevronRightIcon,
  },
  {
    name: "Change Password",
    description: "회원 계정 비밀번호 변경",
    href: `/settings/account`,
    startIcon: LockClosedIcon,
    endIcon: ChevronRightIcon,
  },
  {
    name: "Deactivate Account",
    description: "회원 계정 비활성화",
    href: `/settings/account`,
    startIcon: TrashIcon,
    endIcon: ChevronRightIcon,
  },
];

const AccountSettingsPage = () => {
  return (
    <>
      <H2 backButton>Your Account</H2>

      <div className="tw-px-4 tw-py-3">
        <p className="tw-text-sm tw-text-zinc-400">
          회원 계정의 상세 정보를 확인하고 수정할 수 있습니다.
        </p>
      </div>
      {userAccountMenu.map((item) => (
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

export default AccountSettingsPage;
