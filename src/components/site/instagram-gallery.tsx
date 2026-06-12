import { Instagram } from "lucide-react";

const IMAGES = [
  "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80",
  "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=600&q=80",
  "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80",
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80",
  "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=80",
  "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=600&q=80",
];

export function InstagramGallery() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
      <div className="mb-8 text-center">
        <p className="eyebrow">Follow us</p>
        <h2 className="mt-2 font-display text-3xl md:text-4xl">@zivahstyles</h2>
        <p className="mt-3 text-sm text-ink-soft">Tag your looks for a chance to be featured.</p>
      </div>
      <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3 md:grid-cols-6 md:gap-2">
        {IMAGES.map((src, i) => (
          <a
            key={i}
            href="#"
            className="group relative aspect-square overflow-hidden bg-surface-warm"
            aria-label="Instagram post"
          >
            <img
              src={src}
              alt=""
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 grid place-items-center bg-ink/40 opacity-0 transition-opacity group-hover:opacity-100">
              <Instagram className="h-6 w-6 text-canvas" strokeWidth={1.4} />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
