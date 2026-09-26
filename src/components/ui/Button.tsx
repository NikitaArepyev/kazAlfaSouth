import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";

type CommonProps = {
  variant?: Variant;
  icon?: ReactNode;
  fullWidth?: boolean;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = CommonProps & {
  href?: undefined;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
};

type ButtonAsLink = CommonProps & {
  href: string;
  type?: never;
  disabled?: never;
  onClick?: never;
};

type ButtonProps = ButtonAsButton | ButtonAsLink;

const base =
  "group inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold " +
  "transition-[translate,scale,background-color,color,border-color,box-shadow] duration-160 ease-out " +
  "hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] focus-visible:outline-none disabled:opacity-60 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-600 text-brand-contrast shadow-sm hover:bg-brand-700 hover:shadow-md",
  secondary:
    "border border-border-strong bg-surface text-foreground hover:border-brand-600 hover:text-accent-ink",
  ghost: "text-muted hover:bg-surface-2 hover:text-foreground",
};

function Chip({ icon, variant }: { icon: ReactNode; variant: Variant }) {
  const chip =
    variant === "primary"
      ? "bg-white/15 text-brand-contrast"
      : "bg-accent-soft text-accent-ink";
  return (
    <span
      className={cn(
        "ml-1 inline-flex h-7 w-7 items-center justify-center rounded-md transition-transform duration-200 ease-out group-hover:translate-x-0.5",
        chip
      )}
    >
      {icon}
    </span>
  );
}

export default function Button(props: ButtonProps) {
  const {
    variant = "primary",
    icon,
    fullWidth,
    className,
    children,
  } = props;

  const classes = cn(base, variants[variant], fullWidth && "w-full", className);

  const inner = (
    <>
      <span>{children}</span>
      {icon ? <Chip icon={icon} variant={variant} /> : null}
    </>
  );

  if (props.href !== undefined) {
    const external = /^(https?:|tel:|mailto:|wa:)/.test(props.href);
    if (external) {
      return (
        <a href={props.href} className={classes}>
          {inner}
        </a>
      );
    }
    return (
      <Link href={props.href} className={classes}>
        {inner}
      </Link>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      disabled={props.disabled}
      onClick={props.onClick}
      className={classes}
    >
      {inner}
    </button>
  );
}
