import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Newsletter() {
  const [email, setEmail] = useState("");

  return (
    <section className="bg-ink text-canvas">
      <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 md:py-24">
        <p className="eyebrow text-canvas/60">The Zivah Letter</p>
        <h2 className="mt-3 font-display text-3xl leading-tight md:text-5xl">
          First to know.<br />First to wear.
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm text-canvas/70 md:text-base">
          Sign up for early access to collections, members-only offers, and styling inspiration.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!email.includes("@")) {
              toast.error("Please enter a valid email");
              return;
            }
            toast.success("Welcome to the list");
            setEmail("");
          }}
          className="mx-auto mt-8 flex w-full max-w-md flex-col gap-2 sm:flex-row"
        >
          <Input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 border-canvas/20 bg-canvas/5 text-canvas placeholder:text-canvas/40 focus-visible:border-accent"
            required
          />
          <Button type="submit" size="lg" variant="secondary" className="h-12 bg-accent text-accent-foreground hover:bg-accent/90">
            Subscribe
          </Button>
        </form>
        <p className="mt-4 text-xs text-canvas/50">By subscribing you agree to our privacy policy. Unsubscribe anytime.</p>
      </div>
    </section>
  );
}
