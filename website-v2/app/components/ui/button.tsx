import * as React from "react";
import { cn } from "@/app/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline";
  size?: "default" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-full font-medium transition-all",
        variant === "default" && "bg-[#7B2FBE] text-white hover:bg-[#9B4FDE]",
        variant === "outline" &&
          "border border-white/20 text-white hover:border-white/40 hover:bg-white/5",
        size === "default" && "px-6 py-2.5 text-sm",
        size === "lg" && "px-8 py-3.5 text-base",
        className,
      )}
      {...props}
    />
  ),
);
Button.displayName = "Button";

export { Button };
