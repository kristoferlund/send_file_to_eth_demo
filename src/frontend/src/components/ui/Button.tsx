import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { twMerge } from "tailwind-merge";

type Variant = "primary" | "secondary" | "outline" | "dark";

type ButtonProps = {
  variant?: Variant;
  onClick?: () => void;
  className?: string;
  icon?: IconDefinition;
  iconClassName?: string;
  children?: React.ReactNode;
  spin?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
};

export default function Button({
  variant,
  onClick,
  className,
  icon,
  iconClassName,
  children,
  spin,
  disabled,
  type,
}: ButtonProps) {
  className = twMerge(
    `flex rounded-xl px-4 py-2 items-center gap-2 drop-shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 justify-center`,
    className
  );
  iconClassName = twMerge("w-4 h-4", iconClassName);

  className = {
    primary: twMerge(
      "bg-emerald-800 hover:bg-emerald-700 disabled:bg-emerald-800",
      className
    ),
    secondary: twMerge(
      "bg-amber-800 hover:bg-amber-700 disabled:bg-amber-800",
      className
    ),
    outline: twMerge(
      "bg-transparent border border-zinc-500 hover:bg-emerald-500/10 disabled:bg-transparent disabled:border-zinc-500",
      className
    ),
    dark: twMerge(
      "bg-zinc-900 hover:bg-zinc-950 disabled:bg-zinc-900",
      className
    ),
  }[variant || "primary"];

  return (
    <button
      className={className}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {icon && (
        <FontAwesomeIcon className={iconClassName} icon={icon} spin={spin} />
      )}
      {children}
    </button>
  );
}
