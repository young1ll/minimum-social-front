import H2 from "@/components/ui/h2";
import {
  ChevronRightIcon,
  DesktopIcon,
  GlobeIcon,
  HandIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";

type MenuItem = {
  name: string;
  description: string;
  href: string;
  startIcon: JSX.Element; // 변경된 부분
  endIcon: JSX.Element; // 변경된 부분
};

export const accessibilityMenu: MenuItem[] = [
  {
    name: "Accessibility",
    description: "minimum-social 사용자 경험 및 접근성 관리",
    href: `/settings/accessibility/experiment`,
    startIcon: <HandIcon className="tw-h-4 tw-w-4" />,
    endIcon: <ChevronRightIcon className="tw-h-4 tw-w-4" />,
  },
  {
    name: "Display",
    description: "글꼴 크기, 색상, 배경 등 화면 설정",
    href: `/settings/accessibility/display`,
    startIcon: <DesktopIcon className="tw-h-4 tw-w-4" />,
    endIcon: <ChevronRightIcon className="tw-h-4 tw-w-4" />,
  },
  {
    name: "Languages",
    description: "사용 언어 설정",
    href: `/settings/accessibility/languages`,
    startIcon: <GlobeIcon className="tw-h-4 tw-w-4" />,
    endIcon: <ChevronRightIcon className="tw-h-4 tw-w-4" />,
  },
];

const AccessibilityPage = () => {
  return (
    <>
      <H2 backButton>Accessibility, display and languages</H2>

      <div className="tw-px-4 tw-py-3">
        <p className="tw-text-sm tw-text-zinc-400">
          회원 계정에 대해 minimum-social의 접근성을 관리합니다.
        </p>
      </div>
      {accessibilityMenu.map((item, index) => (
        <div
          key={`${index}-${item.name}`}
          className="tw-flex tw-basis-auto tw-items-stretch hover:tw-bg-accent"
        >
          <Link
            href={item.href}
            className="tw-flex tw-justify-between tw-w-full tw-p-4 tw-min-h-12"
          >
            <div className="tw-flex tw-flex-row tw-grow tw-items-center">
              <div className="tw-flex tw-justify-center tw-items-center tw-w-12 tw-h-12 tw-mr-2">
                {item.startIcon}
              </div>
              <div className="tw-flex tw-flex-col tw-grow tw-shrink tw-items-stretch">
                <span className="">{item.name}</span>
                <span className="tw-text-xs tw-text-zinc-500">
                  {item.description}
                </span>
              </div>
              <div className="tw-flex tw-justify-center tw-items-center tw-w-12 tw-h-12">
                {item.endIcon}
              </div>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
};

export default AccessibilityPage;
