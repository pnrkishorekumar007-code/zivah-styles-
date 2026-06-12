import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { ShopProvider } from "@/lib/shop-store";
import { CompareProvider } from "@/lib/compare-store";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { CartDrawer } from "@/components/site/cart-drawer";
import { CompareDrawer } from "@/components/site/compare-drawer";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="eyebrow">404</p>
        <h1 className="mt-3 font-display text-5xl text-ink">Lost the trail.</h1>
        <p className="mt-3 text-sm text-ink-soft">
          The page you're looking for doesn't exist or has moved.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center justify-center bg-ink px-6 py-3 text-xs uppercase tracking-[0.2em] text-canvas transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-3xl text-ink">Something didn't load</h1>
        <p className="mt-2 text-sm text-ink-soft">Please try again, or head back home.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="bg-ink px-5 py-2.5 text-xs uppercase tracking-[0.2em] text-canvas hover:bg-accent hover:text-accent-foreground"
          >
            Try again
          </button>
          <a href="/" className="border border-border bg-surface px-5 py-2.5 text-xs uppercase tracking-[0.2em] text-ink hover:bg-surface-warm">
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Zivah Styles — Premium Fashion for Women, Men & Kids" },
      { name: "description", content: "Discover Zivah Styles: considered design, conscious materials, premium fashion for women, men and kids. Free shipping over ₹1,499." },
      { name: "author", content: "Zivah Styles" },
      { property: "og:title", content: "Zivah Styles — Premium Fashion" },
      { property: "og:description", content: "Considered design, conscious materials. Premium fashion crafted to last." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap" },
      { rel: "icon", href: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='.9em' font-size='90'%3E%F0%9F%91%97%3C/text%3E%3C/svg%3E" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <ShopProvider>
        <CompareProvider>
          <div className="flex min-h-dvh flex-col bg-background">
            <SiteHeader />
            <main className="flex-1">
              <Outlet />
            </main>
            <SiteFooter />
            <CartDrawer />
            <CompareDrawer />
            <Toaster position="top-center" />
          </div>
        </CompareProvider>
      </ShopProvider>
    </QueryClientProvider>
  );
}
