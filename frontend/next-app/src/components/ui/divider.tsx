import * as React from 'react';

import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const lineVariants = cva('tw-h-px tw-w-full', {
  variants: {
    color: {
      primary: 'tw-bg-primary-foreground',
      secondary: 'tw-bg-secondary-foreground',
      accent: 'tw-bg-accent-foreground',
      neutral: 'tw-bg-neutral-400',
      slate: 'tw-bg-slate-400',
      zinc: 'tw-bg-zinc-400',
      info: 'tw-bg-sky-400',
      success: 'tw-bg-emerald-400',
      warning: 'tw-bg-orange-300',
      error: 'tw-bg-red-300',
      default: 'tw-bg-current',
      white: 'tw-bg-white',
      black: 'tw-bg-black',
      transparent: 'tw-bg-transparent',
      inherit: 'tw-bg-inherit',
    },
  },
  defaultVariants: {
    color: 'default',
  },
});

export interface LineProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof lineVariants> {
  color?:
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'neutral'
    | 'slate'
    | 'zinc'
    | 'info'
    | 'success'
    | 'warning'
    | 'error'
    | 'default'
    | 'white'
    | 'black'
    | 'transparent'
    | 'inherit';
}

const Line = React.forwardRef<HTMLDivElement, LineProps>(
  ({ className, color, ...props }, ref) => {
    return (
      <div
        className={cn(lineVariants({ color }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);

Line.displayName = 'Line';

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  lineProps?: LineProps;
}
const Divider: React.FC<DividerProps> = ({
  children,
  className,
  lineProps,
  ...props
}) => {
  return (
    <div
      className={cn(
        'tw-flex tw-flex-row tw-justify-between tw-items-center tw-my-4',
        className
      )}
      {...props}>
      {children ? (
        <>
          <Line {...lineProps} />
          <div className={'tw-mx-4'}>{children}</div>
          <Line {...lineProps} />
        </>
      ) : (
        <Line {...lineProps} />
      )}
    </div>
  );
};

export default Divider;
