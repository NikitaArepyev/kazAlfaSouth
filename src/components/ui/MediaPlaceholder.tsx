import type { ReactNode } from "react";
import { ImageIcon } from "./icons";
import { cn } from "@/lib/cn";

type MediaPlaceholderProps = {
  /** Short description of the intended image (no "photo pending" wording). */
  label: string;
  /** Optional caption under the slot — e.g. product / plant context. */
  caption?: string;
  icon?: ReactNode;
  /** CSS aspect-ratio, e.g. "4 / 3", "16 / 9". */
  ratio?: string;
  className?: string;
};

/**
 * A tidy, labeled slot for a real product / plant photo.
 * Renders a calm textured panel with an icon and a TODO marker — never
 * the words "Фото ожидается".
 */
export default function MediaPlaceholder({
  label,
  caption,
  icon,
  ratio = "4 / 3",
  className,
}: MediaPlaceholderProps) {
  return (
    <figure className={cn("w-full", className)}>
      <div
        className="relative overflow-hidden rounded-xl border border-border bg-surface-2"
        style={{ aspectRatio: ratio }}
      >
        <div
          className="absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage:
              "radial-gradient(var(--border-strong) 1px, transparent 1px)",
            backgroundSize: "18px 18px",
          }}
          aria-hidden
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-6 text-center">
          <span className="text-subtle">
            {icon ?? <ImageIcon className="h-7 w-7" weight="regular" />}
          </span>
          <span className="text-xs font-medium text-subtle">{label}</span>
        </div>
        <span className="absolute right-2 top-2 rounded-full border border-border bg-surface/80 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-subtle">
          TODO
        </span>
      </div>
      {caption && (
        <figcaption className="mt-2 text-xs text-subtle">{caption}</figcaption>
      )}
    </figure>
  );
}
