import H2 from "@/components/ui/h2";
import {
  ChevronRightIcon,
  DesktopIcon,
  GlobeIcon,
  HandIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";

export const accessibilityMenu = [
  {
    name: "Accessibility",
    description: "minimum-social 사용자 경험 및 접근성 관리",
    href: `/settings/accessibility/experiment`,
    startIcon: HandIcon,
    endIcon: ChevronRightIcon,
  },
  {
    name: "Display",
    description: "글꼴 크기, 색상, 배경 등 화면 설정",
    href: `/settings/accessibility/display`,
    startIcon: DesktopIcon,
    endIcon: ChevronRightIcon,
  },
  {
    name: "Languages",
    description: "사용 언어 설정",
    href: `/settings/accessibility/languages`,
    startIcon: GlobeIcon,
    endIcon: ChevronRightIcon,
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
      {accessibilityMenu.map((item) => (
        <div
          key={item.name}
          className="tw-flex tw-basis-auto tw-items-stretch hover:tw-bg-accent"
        >
          <Link
            href={item.href}
            className="tw-flex tw-justify-between tw-w-full tw-p-4 tw-min-h-12"
          >
            <div className="tw-flex tw-flex-row tw-grow tw-items-center">
              <div className="tw-flex tw-justify-center tw-items-center tw-w-12 tw-h-12 tw-mr-2">
                <item.startIcon className="tw-h-4 tw-w-4" />
              </div>
              <div className="tw-flex tw-flex-col tw-grow tw-shrink tw-items-stretch">
                <span className="">{item.name}</span>
                <span className="tw-text-xs tw-text-zinc-500">
                  {item.description}
                </span>
              </div>
              <div className="tw-flex tw-justify-center tw-items-center tw-w-12 tw-h-12">
                <item.endIcon className="tw-h-4 tw-w-4" />
              </div>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
};

export default AccessibilityPage;
