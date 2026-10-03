import Image from "next/image";
import { cn } from "@/lib/cn";

type PageBannerProps = {
  src: string;
  alt: string;
  className?: string;
};

/** Wide illustrative photo under a page heading — 16:9 on phones, cinematic strip on desktop. */
export default function PageBanner({ src, alt, className }: PageBannerProps) {
  return (
    <div
      className={cn(
        "relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-border bg-surface-2 shadow-md md:aspect-[21/8]",
        className
      )}
    >
      <Image src={src} alt={alt} fill preload className="object-cover" sizes="(min-width: 1152px) 1152px, 100vw" />
    </div>
  );
}
