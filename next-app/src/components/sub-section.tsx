import { cn } from "@/lib/utils";

const SubSection = ({ children }: { children: React.ReactNode }) => {
  return (
    <section
      className={cn(
        "tw-w-[350px] tw-box-border",
        // "tw-border-r",
        "tw-mx-4",
        "tw-hidden lg:tw-flex tw-flex-col tw-basis-auto tw-shrink-0",
      )}
    >
      <div className="tw-min-h-[1500px] tw-h-full">
        <div className="tw-sticky -tw-bottom-[600px] tw-w-full">
          <div className="tw-block">
            <div className="tw-flex tw-flex-col tw-gap-2 tw-pb-16 tw-pt-3">
              {children}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubSection;
