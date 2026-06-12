import { PRODUCTS, type Product } from "./products";

export interface CollectionDef {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  hero: string;
  match: (p: Product) => boolean;
}

const HERO = (id: string) => `https://images.unsplash.com/${id}?w=1800&q=85&auto=format&fit=crop`;

export const COLLECTIONS: CollectionDef[] = [
  {
    slug: "dresses",
    title: "Dresses",
    eyebrow: "Effortless silhouettes",
    description:
      "From bias-cut slips to tiered linen maxis, our dresses are designed to drape, move and last.",
    hero: HERO("photo-1572804013427-4d7ca7268217"),
    match: (p) => p.subcategory === "dress",
  },
  {
    slug: "shirts",
    title: "Shirts",
    eyebrow: "Considered tailoring",
    description:
      "Crisp poplins, soft linens and resort prints — shirts cut for everyday refinement.",
    hero: HERO("photo-1598300042247-d088f8ab3a91"),
    match: (p) => p.subcategory === "shirt",
  },
  {
    slug: "co-ords",
    title: "Co-ords",
    eyebrow: "Matched sets",
    description:
      "Pieces that move together. Shirt-and-trouser, top-and-short and lounge sets in matching tones.",
    hero: HERO("photo-1617137968427-85924c800a22"),
    match: (p) => p.subcategory === "co-ord",
  },
  {
    slug: "tops",
    title: "Tops",
    eyebrow: "Statement layers",
    description:
      "Silks, chiffons and velvets — tops that elevate the simplest pair of trousers.",
    hero: HERO("photo-1602810318383-e386cc2a3ccf"),
    match: (p) => p.subcategory === "top",
  },
  {
    slug: "bottomwear",
    title: "Bottomwear",
    eyebrow: "The perfect base",
    description:
      "Tailored trousers, selvedge denim and pleated skirts — the foundation of every outfit.",
    hero: HERO("photo-1506629082955-511b1aa562c8"),
    match: (p) => p.subcategory === "bottom",
  },
  {
    slug: "ethnic-wear",
    title: "Ethnic Wear",
    eyebrow: "Heritage, modernised",
    description:
      "Hand-embroidered Anarkalis, linen kurtas and festive sets crafted with traditional artistry.",
    hero: HERO("photo-1610030469983-98e550d6193c"),
    match: (p) => p.subcategory === "ethnic" || p.style === "Ethnic",
  },
  {
    slug: "new-arrivals",
    title: "New Arrivals",
    eyebrow: "Just landed",
    description:
      "The newest additions to the Zivah wardrobe. Shop the latest drop before it's gone.",
    hero: HERO("photo-1515886657613-9f3515b0c78f"),
    match: (p) => p.tags.includes("new"),
  },
  {
    slug: "best-sellers",
    title: "Best Sellers",
    eyebrow: "Most loved",
    description:
      "The pieces our community can't stop reordering. Tried, tested and adored.",
    hero: HERO("photo-1485968579580-b6d095142e6e"),
    match: (p) => p.salesRank <= 12,
  },
];

export function getCollection(slug: string) {
  return COLLECTIONS.find((c) => c.slug === slug);
}

export function collectionProducts(slug: string) {
  const def = getCollection(slug);
  if (!def) return [] as Product[];
  return PRODUCTS.filter(def.match);
}
