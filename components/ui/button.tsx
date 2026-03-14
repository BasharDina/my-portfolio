import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap font-semibold outline-none transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-[#40FF00]/30 focus-visible:ring-offset-0 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "rounded-full border border-[#9cff80]/40 bg-[linear-gradient(180deg,rgba(127,255,92,0.98)_0%,rgba(64,255,0,0.96)_100%)] text-black shadow-[0_18px_40px_rgba(64,255,0,0.16),0_8px_16px_rgba(0,0,0,0.24),inset_0_1px_0_rgba(255,255,255,0.24),inset_0_-10px_20px_rgba(0,0,0,0.10)] hover:brightness-105 hover:shadow-[0_24px_50px_rgba(64,255,0,0.22),0_10px_20px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.26),inset_0_-10px_20px_rgba(0,0,0,0.10)] active:translate-y-[1px]",
        secondary:
          "rounded-full border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.075)_0%,rgba(255,255,255,0.035)_100%)] text-white backdrop-blur-xl shadow-[0_16px_32px_rgba(0,0,0,0.26),0_6px_14px_rgba(0,0,0,0.20),inset_0_1px_0_rgba(255,255,255,0.08),inset_0_-10px_18px_rgba(0,0,0,0.18)] hover:border-[#40FF00]/25 hover:text-white hover:shadow-[0_18px_40px_rgba(0,0,0,0.30),0_0_0_1px_rgba(64,255,0,0.05)_inset,0_0_24px_rgba(64,255,0,0.08),inset_0_1px_0_rgba(255,255,255,0.10),inset_0_-10px_18px_rgba(0,0,0,0.18)] active:translate-y-[1px]",
        outline:
          "rounded-full border border-white/12 bg-transparent text-white hover:border-[#40FF00]/30 hover:bg-white/[0.03]",
        ghost:
          "rounded-full text-white hover:bg-white/5 hover:text-white",
        link: "text-[#40FF00] underline-offset-4 hover:underline",
        destructive:
          "rounded-full bg-destructive text-white hover:bg-destructive/90",
      },
      size: {
        default: "h-11 px-5 text-sm",
        xs: "h-7 px-2.5 text-xs",
        sm: "h-9 px-4 text-sm",
        lg: "h-12 px-6 text-base",
        xl: "h-14 px-7 text-base",
        icon: "size-10 rounded-full",
        "icon-xs": "size-7 rounded-full [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-9 rounded-full",
        "icon-lg": "size-12 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
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

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };