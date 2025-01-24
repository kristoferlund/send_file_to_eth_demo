import { twMerge } from "tailwind-merge";

type PillProps = {
  className?: string;
  children: React.ReactNode;
};
export default function Pill({ className, children }: PillProps) {
  className = twMerge("px-3 py-1 text-sm rounded-full bg-zinc-800", className);

  return (
    <div className={className}>
      <div className="flex items-center justify-center w-full gap-2 whitespace-nowrap">
        {children}
      </div>{" "}
    </div>
  );
}
