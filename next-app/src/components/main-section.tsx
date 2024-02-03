import { cn } from "@/lib/utils";

interface MainSectionProps {
  children: React.ReactNode;
}
const MainSection = (
  props: MainSectionProps & React.HTMLAttributes<HTMLDivElement>,
) => {
  const { children, className, ...rest } = props;
  return (
    <section
      className={cn(
        "tw-w-full tw-max-w-[600px] tw-border-r tw-mx-auto tw-ml-0",
        "tw-flex tw-flex-col tw-flex-1 tw-w-full",
        className,
      )}
      {...rest}
    >
      {children}
    </section>
  );
};

export default MainSection;
