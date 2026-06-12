import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface Slide {
  img: string;
  label: string;
  titleA: string;
  titleEm: string;
  titleB?: string;
  sub: string;
  cta: string;
  to: "/shop";
  search: { category?: "men" | "women" | "kids"; tag?: "sale" };
}

const SLIDES: Slide[] = [
  {
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1800&q=85",
    label: "New Collection",
    titleA: "Dressed in ",
    titleEm: "Ease",
    sub: "Where refined simplicity meets everyday comfort. Discover Spring/Summer 2025.",
    cta: "Explore Women",
    to: "/shop",
    search: { category: "women" },
  },
  {
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1800&q=85",
    label: "Men's Edit",
    titleA: "The ",
    titleEm: "Modern",
    titleB: " Wardrobe",
    sub: "Effortless style for the discerning gentleman. Premium fabrics, tailored to move.",
    cta: "Shop Men",
    to: "/shop",
    search: { category: "men" },
  },
  {
    img: "https://images.unsplash.com/photo-1470309864661-68328b2cd0a5?w=1800&q=85",
    label: "Sale On Now",
    titleA: "Up to ",
    titleEm: "40% Off",
    sub: "Uncompromising quality at unmissable prices. Limited time, limited stock.",
    cta: "Shop Sale",
    to: "/shop",
    search: { tag: "sale" },
  },
];

export function HeroSlider() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % SLIDES.length), 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative h-[78vh] min-h-[520px] w-full overflow-hidden bg-ink">
      {SLIDES.map((s, idx) => (
        <div
          key={idx}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000",
            i === idx ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
          aria-hidden={i !== idx}
        >
          <img
            src={s.img}
            alt=""
            className={cn("absolute inset-0 h-full w-full object-cover", i === idx && "ken-burns")}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/30 to-transparent" />
        </div>
      ))}

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-20 sm:px-6 lg:pb-28">
        <div className="max-w-xl text-canvas">
          <p
            key={`label-${i}`}
            className="eyebrow !text-canvas/80 animate-in fade-in slide-in-from-bottom-2 duration-700"
          >
            {SLIDES[i].label}
          </p>
          <h1
            key={`title-${i}`}
            className="mt-3 font-display text-5xl leading-[1.05] text-canvas animate-in fade-in slide-in-from-bottom-4 duration-700 md:text-7xl"
          >
            {SLIDES[i].titleA}
            <em className="not-italic text-accent">{SLIDES[i].titleEm}</em>
            {SLIDES[i].titleB}
          </h1>
          <p
            key={`sub-${i}`}
            className="mt-5 max-w-md text-sm leading-relaxed text-canvas/85 animate-in fade-in slide-in-from-bottom-4 delay-100 duration-700 md:text-base"
          >
            {SLIDES[i].sub}
          </p>
          <Link
            to={SLIDES[i].to}
            search={SLIDES[i].search}
            className="mt-7 inline-flex items-center gap-2 bg-canvas px-7 py-3.5 text-xs font-medium uppercase tracking-[0.2em] text-ink transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            {SLIDES[i].cta}
            <ArrowRight className="h-4 w-4" strokeWidth={1.6} />
          </Link>
        </div>

        <div className="mt-10 flex items-center gap-2">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              aria-label={`Slide ${idx + 1}`}
              className={cn(
                "h-0.5 rounded-full transition-all",
                i === idx ? "w-10 bg-canvas" : "w-5 bg-canvas/40"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
