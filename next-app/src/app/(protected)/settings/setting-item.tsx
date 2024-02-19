import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { IconProps } from "@radix-ui/react-icons/dist/types";
import Link from "next/link";
import {
  ForwardRefExoticComponent,
  HTMLAttributes,
  ReactNode,
  RefAttributes,
} from "react";

interface SettingsItemProp {
  href?: string;
  name: string;
  description?: string;
  startItem?: ReactNode;
  endItem?: ReactNode;
}
const SettingsItem = (
  props: SettingsItemProp & HTMLAttributes<HTMLDivElement>,
) => {
  const {
    href,
    name,
    description,
    startItem,
    endItem,
    className,
    id,
    ...rest
  } = props;

  const renderContent = () => {
    return (
      <div
        className={cn("tw-flex tw-flex-row tw-grow tw-items-center", className)}
        {...rest}
      >
        {startItem && (
          <div className="tw-flex tw-justify-center tw-items-center tw-w-12 tw-h-12 tw-mr-2">
            {startItem}
          </div>
        )}
        <Label
          htmlFor={id}
          className="tw-flex tw-flex-col tw-grow tw-shrink tw-items-stretch"
        >
          <span className="">{name}</span>
          <span className="tw-text-xs tw-text-zinc-500">{description}</span>
        </Label>
        {endItem && (
          <div className="tw-flex tw-justify-center tw-items-center tw-w-12 tw-h-12">
            {endItem}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="tw-flex tw-basis-auto tw-items-stretch hover:tw-bg-accent">
      {href ? (
        <Link
          href={href}
          className="tw-flex tw-justify-between tw-w-full tw-p-4 tw-min-h-12"
        >
          {renderContent()}
        </Link>
      ) : (
        <div className="tw-flex tw-justify-between tw-w-full tw-p-4 tw-min-h-12">
          {renderContent()}
        </div>
      )}
    </div>
  );
};

export default SettingsItem;
