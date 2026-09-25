import Image from "next/image";
import { cn } from "@/lib/utils";

interface Accent {
  from: string;
  to: string;
}

/* ------------------------------------------------------------------ */
/*  Fake website preview (shown when no real screenshot is provided)    */
/* ------------------------------------------------------------------ */
function MockSitePreview({ accent, title }: { accent: Accent; title: string }) {
  return (
    <div className="flex h-full w-full flex-col gap-1.5 bg-white p-2 text-left dark:bg-slate-900">
      {/* nav */}
      <div className="flex items-center gap-1.5">
        <span
          className="h-2.5 w-2.5 rounded-full"
          style={{ background: `linear-gradient(135deg, ${accent.from}, ${accent.to})` }}
        />
        <span className="h-1.5 w-8 rounded-full bg-slate-200 dark:bg-slate-700" />
        <span className="h-1.5 w-8 rounded-full bg-slate-200 dark:bg-slate-700" />
        <span className="h-1.5 w-8 rounded-full bg-slate-200 dark:bg-slate-700" />
        <span
          className="ml-auto h-3 w-10 rounded-full"
          style={{ background: `linear-gradient(135deg, ${accent.from}, ${accent.to})` }}
        />
      </div>
      {/* hero */}
      <div
        className="flex flex-col items-start justify-center gap-1 rounded-md p-2"
        style={{
          background: `linear-gradient(135deg, ${accent.from}22, ${accent.to}33)`,
        }}
      >
        <span className="max-w-[80%] truncate text-[8px] font-bold leading-tight text-slate-800 dark:text-white">
          {title}
        </span>
        <span className="h-1 w-3/4 rounded-full bg-slate-300 dark:bg-slate-600" />
        <span className="h-1 w-1/2 rounded-full bg-slate-300 dark:bg-slate-600" />
        <span className="mt-0.5 flex gap-1">
          <span
            className="h-2.5 w-8 rounded-full"
            style={{ background: accent.from }}
          />
          <span className="h-2.5 w-8 rounded-full border border-slate-300 dark:border-slate-600" />
        </span>
      </div>
      {/* cards */}
      <div className="grid flex-1 grid-cols-3 gap-1.5">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="flex flex-col gap-1 rounded-md bg-slate-100 p-1.5 dark:bg-slate-800"
          >
            <span
              className="h-5 rounded-sm"
              style={{
                background: `linear-gradient(135deg, ${accent.from}${i === 1 ? "55" : "33"}, ${accent.to}44)`,
              }}
            />
            <span className="h-1 w-full rounded-full bg-slate-300 dark:bg-slate-600" />
            <span className="h-1 w-2/3 rounded-full bg-slate-300 dark:bg-slate-600" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Fake mobile-app preview                                            */
/* ------------------------------------------------------------------ */
function MockAppPreview({ accent, title }: { accent: Accent; title: string }) {
  return (
    <div className="flex h-full w-full flex-col gap-1 bg-white p-1.5 dark:bg-slate-900">
      <div className="mx-auto h-1 w-8 rounded-full bg-slate-300 dark:bg-slate-600" />
      <div
        className="rounded-md p-1.5 text-[7px] font-bold leading-tight text-white"
        style={{ background: `linear-gradient(135deg, ${accent.from}, ${accent.to})` }}
      >
        {title.split("—")[0].trim()}
      </div>
      <div className="h-3 rounded-full bg-slate-100 px-1.5 dark:bg-slate-800" />
      <div className="grid flex-1 grid-cols-2 gap-1">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-md"
            style={{
              background: `linear-gradient(135deg, ${accent.from}33, ${accent.to}44)`,
            }}
          />
        ))}
      </div>
      <div className="flex justify-around rounded-md bg-slate-100 py-1 dark:bg-slate-800">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: i === 0 ? accent.from : "#cbd5e1" }}
          />
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Laptop frame                                                       */
/* ------------------------------------------------------------------ */
export function LaptopMockup({
  title,
  url,
  accent,
  image,
  className,
}: {
  title: string;
  url: string;
  accent: Accent;
  image?: string;
  className?: string;
}) {
  return (
    <div className={cn("w-full max-w-[420px]", className)}>
      <div className="rounded-t-xl border border-white/10 bg-slate-900 p-2 pb-1 shadow-2xl">
        {/* browser bar */}
        <div className="mb-1.5 flex items-center gap-1.5 px-1">
          <span className="flex gap-1">
            <i className="h-2 w-2 rounded-full bg-rose-400" />
            <i className="h-2 w-2 rounded-full bg-amber-400" />
            <i className="h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <span className="ml-1 h-4 flex-1 truncate rounded-md bg-white/10 px-2 text-[8px] leading-4 text-slate-300">
            {url}
          </span>
        </div>
        {/* screen */}
        <div className="relative aspect-[16/10] overflow-hidden rounded-md bg-white dark:bg-slate-900">
          {image ? (
            <Image
              src={image}
              alt={`${title} — desktop view`}
              fill
              className="object-cover object-top"
            />
          ) : (
            <MockSitePreview accent={accent} title={title} />
          )}
        </div>
      </div>
      {/* base */}
      <div className="relative h-2.5 rounded-b-xl bg-gradient-to-b from-slate-600 to-slate-800">
        <div className="absolute left-1/2 top-0 h-1 w-16 -translate-x-1/2 rounded-b-lg bg-slate-900/60" />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Phone frame                                                        */
/* ------------------------------------------------------------------ */
export function PhoneMockup({
  title,
  accent,
  image,
  className,
}: {
  title: string;
  accent: Accent;
  image?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "w-[104px] shrink-0 rounded-[1.6rem] border border-white/10 bg-slate-900 p-1.5 shadow-2xl sm:w-[120px]",
        className
      )}
    >
      <div className="relative aspect-[9/18.5] overflow-hidden rounded-[1.1rem] bg-white dark:bg-slate-900">
        {image ? (
          <Image
            src={image}
            alt={`${title} — mobile view`}
            fill
            className="object-cover object-top"
          />
        ) : (
          <MockAppPreview accent={accent} title={title} />
        )}
      </div>
    </div>
  );
}
