//components/ui/Button.tsx
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-nunito font-semibold transition-all cursor-pointer disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary: "bg-brand-blue hover:bg-blue-800 text-white disabled:bg-gray-300 disabled:text-gray-500",
        secondary: "bg-brand-light text-brand-blue hover:bg-blue-300",
        outline:
          "border border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white disabled:border-gray-300 disabled:text-gray-500 disabled:bg-transparent",
        yellow: "bg-brand-yellow text-brand-blue hover:bg-yellow-300 border border-brand-yellow cursor-pointer",
        login: "bg-brand-blue hover:bg-blue-800 text-white disabled:bg-gray-300 disabled:text-gray-500",
        disabled: "bg-gray-300 text-gray-500 cursor-not-allowed cursor-default",
        ghost: "hover:bg-popover hover:text-accent-foreground dark:hover:bg-accent/50",
      },

      size: {
        sm: "px-3 py-1 text-sm rounded-md",
        md: "px-4 py-2 text-base rounded-lg",
        lg: "px-5 py-3 text-lg rounded-xl",
        icon: "rounded-full p-2",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

//
export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";
  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}
