import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
};

/** Same original brand file in light and dark mode */
export function Logo({ className = "h-12 w-auto" }: LogoProps) {
  return (
    <img
      src="/logo.png"
      alt="NYBC Trucking"
      width={180}
      height={68}
      className={cn("block shrink-0 object-contain object-left", className)}
    />
  );
}
