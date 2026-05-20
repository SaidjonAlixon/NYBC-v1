import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
};

export function Logo({ className = "h-12 w-auto" }: LogoProps) {
  return (
    <>
      <img
        src="/logo.png"
        alt="NYBC Trucking"
        width={180}
        height={68}
        className={cn("mx-auto block shrink-0 object-contain dark:hidden", className)}
      />
      <svg
        viewBox="0 0 180 68"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("mx-auto hidden shrink-0 dark:block", className)}
        role="img"
        aria-label="NYBC Trucking"
      >
        <text
          x="90"
          y="50"
          textAnchor="middle"
          fontFamily="Arial Black, Impact, system-ui, sans-serif"
          fontWeight="900"
          fontStyle="italic"
          fontSize="46"
          letterSpacing="-1"
        >
          <tspan className="fill-white">NY</tspan>
          <tspan className="fill-[#ef233c]">BC</tspan>
        </text>
        <line
          x1="22"
          y1="66"
          x2="44"
          y2="66"
          className="stroke-[#ef233c]"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <text
          x="90"
          y="66"
          textAnchor="middle"
          fontFamily="system-ui, Arial, sans-serif"
          fontWeight="700"
          fontSize="11"
          letterSpacing="3.5"
          className="fill-[#e8edf5]"
        >
          TRUCKING
        </text>
        <line
          x1="136"
          y1="66"
          x2="158"
          y2="66"
          className="stroke-[#ef233c]"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </>
  );
}
