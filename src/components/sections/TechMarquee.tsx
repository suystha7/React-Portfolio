import { BookOpen } from "lucide-react";
import { currentlyLearning, techStack, type TechItem } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import SectionHeading from "@/components/ui/section-heading";
import Reveal from "@/components/shared/Reveal";

function TechCard({ tech, orange }: { tech: TechItem; orange?: boolean }) {
  return (
    <div className="group flex w-[230px] shrink-0 items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10">
      <span
        className={cn(
          "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6",
          orange
            ? "bg-gradient-to-br from-secondary to-rose-500 shadow-secondary/30"
            : "bg-gradient-to-br from-primary to-violet-500 shadow-primary/30"
        )}
      >
        <tech.icon className="h-5 w-5" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-bold text-foreground">{tech.name}</p>
        <p className="text-xs text-muted-foreground">{tech.category}</p>
        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted">
          <div
            className={cn(
              "h-full rounded-full",
              orange
                ? "bg-gradient-to-r from-secondary to-rose-400"
                : "bg-gradient-to-r from-primary to-violet-400"
            )}
            style={{ width: `${tech.level}%` }}
          />
        </div>
      </div>
    </div>
  );
}

function MarqueeRow({
  items,
  reverse = false,
  orange = false,
}: {
  items: TechItem[];
  reverse?: boolean;
  orange?: boolean;
}) {
  const doubled = [...items, ...items]; // seamless loop
  return (
    <div className="marquee relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div
        className={cn(
          "marquee-inner flex w-max gap-4 py-2",
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        )}
      >
        {doubled.map((tech, i) => (
          <TechCard key={`${tech.name}-${i}`} tech={tech} orange={orange} />
        ))}
      </div>
    </div>
  );
}

export default function TechMarquee() {
  const mid = Math.ceil(techStack.length / 2);
  const rowA = techStack.slice(0, mid);
  const rowB = techStack.slice(mid);

  return (
    <section id="tech" className="scroll-mt-20 overflow-hidden py-24">
      <div className="container">
        <SectionHeading
          eyebrow="Tech Stack"
          title="Technologies I work with"
          description="My everyday toolbox — hover to pause and take a closer look."
        />
      </div>

      <Reveal variant="fade" className="flex flex-col gap-4">
        <MarqueeRow items={rowA} />
        <MarqueeRow items={rowB} reverse orange />
      </Reveal>

      <Reveal delay={0.15} variant="scale" className="container mt-10 flex justify-center">
        <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-2 font-medium text-foreground">
            <BookOpen className="h-4 w-4 text-secondary" />
            Currently exploring:
          </span>
          {currentlyLearning.map((topic) => (
            <Badge key={topic} variant="soft-orange">
              {topic}
            </Badge>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
