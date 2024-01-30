import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const boxVariants = cva("tw-flex", {
  variants: {
    direction: {
      row: "tw-flex-row",
      column: "tw-flex-col",
    },
    size: {
      default: "tw-p-0",
      sm: "tw-p-2",
      lg: "tw-p-6",
    },
    gap: {
      xs: "!tw-gap-1",
      sm: "!tw-gap-2",
      md: "!tw-gap-4",
      lg: "!tw-gap-6",
      xl: "!tw-gap-8",

      0: "!tw-gap-0",
      1: "!tw-gap-1",
      2: "!tw-gap-2",
      4: "!tw-gap-4",
      6: "!tw-gap-6",
      8: "!tw-gap-8",
      10: "!tw-gap-10",
    },
  },
  defaultVariants: {
    direction: "column",
    size: "default",
    gap: "xs",
  },
});

export interface BoxProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof boxVariants> {}

const Box = React.forwardRef<HTMLDivElement, BoxProps>(
  ({ className, direction, size, gap, ...props }, ref) => {
    return (
      <div
        className={cn(boxVariants({ direction, size, gap }), className)}
        ref={ref}
        {...props}
      />
    );
  },
);

Box.displayName = "Box";

export { Box };
