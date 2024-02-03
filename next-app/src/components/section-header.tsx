import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  children: React.ReactNode;
  className?: string;
}

const SectionHeader = (
  props: SectionHeaderProps & React.HTMLAttributes<HTMLDivElement>,
) => {
  const { children, className, ...rest } = props;
  return (
    <div
      className={cn(
        "tw-sticky tw-top-0",
        "tw-h-[53px] tw-border-b",
        "tw-backdrop-blur-3xl",
        "tw-z-30",
        "tw-flex tw-items-center",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
};

export default SectionHeader;
