//components/ui/Input.tsx
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import React from 'react';

export const inputVariants = cva(
  'w-full rounded-md border text-brand-blue placeholder-brand-blue/50 transition-all focus-visible:outline-none focus-visible:ring-2 disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        default: 'border-brand-blue/30 focus-visible:ring-brand-blue/40',
        outline: 'border-brand-blue focus-visible:ring-brand-blue',
      },
      size: {
        sm: 'px-3 py-1 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-5 py-3 text-lg',
      },
      state: {
        default: '',
        error: 'border-red-500 focus-visible:ring-red-300',
        success: 'border-green-500 focus-visible:ring-green-300',
      },
      withIcon: {
        true: 'pl-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      state: 'default',
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  leftIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, size, state, leftIcon, withIcon, ...props }, ref) => {
    return (
      <div className="relative w-full p-1">
        {leftIcon && (
          <span className=" absolute left-3 top-1/2 -translate-y-1/2 text-brand-blue/60">
            {leftIcon}
          </span>
        )}
        <input
          ref={ref}
          className={cn(
            inputVariants({
              variant,
              state,
              withIcon: leftIcon ? true : withIcon,
            }),
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = 'Input';
