import Reveal from "@/components/shared/Reveal";
import SplitText from "@/components/shared/SplitText";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "center" | "left";
}

/** Consistent eyebrow + animated split-text title + subtitle block for every section. */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-12 flex flex-col gap-4 md:mb-16",
        align === "center" ? "items-center text-center" : "items-start text-left"
      )}
    >
      <Reveal variant="scale">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-foreground shadow-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-primary to-secondary" />
          {eyebrow}
        </span>
      </Reveal>
      <h2 className="max-w-2xl font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
        <SplitText text={title} stagger={0.022} />
      </h2>
      {description && (
        <Reveal delay={0.25} variant="fade">
          <p className="max-w-2xl text-muted-foreground">{description}</p>
        </Reveal>
      )}
    </div>
  );
}
