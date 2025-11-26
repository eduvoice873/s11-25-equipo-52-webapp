//components/ui/Button.tsx
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

export const buttonVariants = cva(
  ' inline-flex items-center justify-center font-nunito font-semibold transition-all',
  {
    variants: {
      variant: {
        primary: 'bg-brand-blue text-white hover:bg-blue-800',
        secondary: 'bg-brand-light text-brand-blue hover:bg-blue-300',
        outline:
          'border border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white',
        yellow:
          'bg-brand-yellow text-brand-blue hover:bg-yellow-300 border border-brand-yellow cursor-pointer',
        login:
          'bg-blue-900 hover:bg-blue-800 text-white  disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed',
        disabled:'bg-gray-300 text-gray-500 cursor-not-allowed',
      },

      size: {
        sm: 'px-3 py-1 text-sm rounded-md',
        md: 'px-4 py-2 text-base rounded-lg',
        lg: 'px-5 py-3 text-lg rounded-xl',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

//
export function Button({ className, variant, size, ...props }) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
