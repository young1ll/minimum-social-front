import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const containerVariants = cva("tw-mx-auto tw-px-4 tw-flex tw-flex-1 tw-items-center", {
  variants: {
    size: {
      default: "tw-max-w-screen-sm",
      md: "tw-max-w-screen-md",
      lg: "tw-max-w-screen-lg",
      xl: "tw-max-w-screen-xl",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof containerVariants> {
  innerContainerProps?: React.HTMLAttributes<HTMLDivElement>; // 오타 수정: 'innnerContainerProps' -> 'innerContainerProps'
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size, innerContainerProps, ...props }, ref) => {
    return (
      <div className={cn(containerVariants({ size }), className)} ref={ref} {...props}>
        <div
          className={cn(
            "tw-w-full tw-h-full tw-flex-1 tw-flex tw-flex-col tw-justify-center tw-items-center",
            innerContainerProps?.className,
          )}
          {...innerContainerProps}
        >
          {props.children}
        </div>
      </div>
    );
  },
);

Container.displayName = "Container";

export { Container };
