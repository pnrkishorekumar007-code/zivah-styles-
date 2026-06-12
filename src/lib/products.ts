export type Category = "men" | "women" | "kids";
export type ProductTag = "new" | "sale" | "hot";
export type Fabric =
  | "Linen"
  | "Cotton"
  | "Silk"
  | "Wool"
  | "Denim"
  | "Viscose"
  | "Velvet"
  | "Chiffon"
  | "Satin"
  | "Cashmere"
  | "Rayon";
export type Style =
  | "Casual"
  | "Formal"
  | "Ethnic"
  | "Party"
  | "Loungewear"
  | "Workwear"
  | "Streetwear"
  | "Resort"
  | "Minimalist";

export type Subcategory =
  | "dress"
  | "shirt"
  | "co-ord"
  | "top"
  | "bottom"
  | "ethnic"
  | "outerwear"
  | "knitwear";

export interface Product {
  id: number;
  brand: string;
  name: string;
  category: Category;
  subcategory: Subcategory;
  tags: ProductTag[];
  price: number;
  originalPrice?: number;
  colors: string[];
  sizes: string[];
  rating: number;
  reviews: number;
  img: string;
  img2: string;
  description: string;
  details?: string[];
  material: string;
  fabric: Fabric;
  style: Style;
  /** lower = newer */
  addedRank: number;
  /** lower = more popular */
  salesRank: number;
}

const U = (id: string) => `https://images.unsplash.com/${id}?w=900&q=85&auto=format&fit=crop`;

export const PRODUCTS: Product[] = [
  // ─────────── MEN ───────────
  { id: 1, brand: "Zivah Essentials", name: "Classic Linen Overshirt", category: "men", subcategory: "shirt", tags: ["new"],
    price: 1299, originalPrice: 1799, colors: ["#2c3e50","#7f8c8d","#d4c5a9"], sizes: ["S","M","L","XL","XXL"],
    rating: 4.5, reviews: 128, img: U("photo-1598300042247-d088f8ab3a91"), img2: U("photo-1617137984095-74e4e5e3613f"),
    description: "A timeless linen overshirt crafted for modern comfort.",
    details: ["100% European linen","Mother-of-pearl buttons","Garment-washed"], material: "Linen", fabric: "Linen", style: "Casual",
    addedRank: 3, salesRank: 8 },
  { id: 2, brand: "Studio Line", name: "Relaxed Chino Trousers", category: "men", subcategory: "bottom", tags: ["sale"],
    price: 899, originalPrice: 1399, colors: ["#c8b89a","#3d3d3d","#dde4cc"], sizes: ["28","30","32","34","36"],
    rating: 4.2, reviews: 89, img: U("photo-1473966968600-fa801b869a1a"), img2: U("photo-1624378439575-d8705ad7ae80"),
    description: "Tailored chinos in premium cotton twill.", material: "Cotton twill", fabric: "Cotton", style: "Workwear",
    addedRank: 14, salesRank: 12 },
  { id: 6, brand: "Studio Line", name: "Merino Wool Sweater", category: "men", subcategory: "knitwear", tags: [],
    price: 2199, originalPrice: 2799, colors: ["#c8a96e","#2c3e50","#8b4513","#f5f5f5"], sizes: ["S","M","L","XL"],
    rating: 4.7, reviews: 94, img: U("photo-1434389677669-e08b4cac3105"), img2: U("photo-1620799140408-edc6dcb6d633"),
    description: "Grade-A merino wool in a dropped-shoulder fit.", material: "Merino wool", fabric: "Wool", style: "Casual",
    addedRank: 20, salesRank: 6 },
  { id: 9, brand: "Zivah Tailored", name: "Italian Wool Blazer", category: "men", subcategory: "outerwear", tags: ["new","hot"],
    price: 4499, originalPrice: 5999, colors: ["#1a1a1a","#2c3e50","#5a4632"], sizes: ["S","M","L","XL"],
    rating: 4.8, reviews: 64, img: U("photo-1593030761757-71fae45fa0e7"), img2: U("photo-1507679799987-c73779587ccf"),
    description: "Single-breasted blazer in Italian Vitale Barberis wool.", material: "Wool", fabric: "Wool", style: "Formal",
    addedRank: 5, salesRank: 10 },
  { id: 10, brand: "Zivah Denim", name: "Selvedge Denim Jeans", category: "men", subcategory: "bottom", tags: ["new"],
    price: 1899, colors: ["#1c2740","#3a4a6b"], sizes: ["28","30","32","34","36"],
    rating: 4.6, reviews: 142, img: U("photo-1542272604-787c3835535d"), img2: U("photo-1582418702059-97ebafb35d09"),
    description: "Japanese 14oz selvedge denim, slim-straight fit.", material: "Denim", fabric: "Denim", style: "Streetwear",
    addedRank: 7, salesRank: 5 },
  { id: 11, brand: "Studio Line", name: "Oxford Button-Down Shirt", category: "men", subcategory: "shirt", tags: [],
    price: 1099, originalPrice: 1499, colors: ["#ffffff","#a8c8e8","#f5e6c8"], sizes: ["S","M","L","XL","XXL"],
    rating: 4.4, reviews: 210, img: U("photo-1620012253295-c15cc3e65df4"), img2: U("photo-1603252109303-2751441dd157"),
    description: "Crisp Oxford in long-staple cotton.", material: "Cotton", fabric: "Cotton", style: "Formal",
    addedRank: 18, salesRank: 3 },
  { id: 12, brand: "Zivah Resort", name: "Printed Resort Shirt", category: "men", subcategory: "shirt", tags: ["hot"],
    price: 1399, originalPrice: 1899, colors: ["#e8c07a","#3a8a9e","#c44569"], sizes: ["S","M","L","XL"],
    rating: 4.5, reviews: 87, img: U("photo-1564859228273-274232fdb516"), img2: U("photo-1603252109612-24fa03d145c8"),
    description: "Camp-collar viscose shirt for warm evenings.", material: "Viscose", fabric: "Viscose", style: "Resort",
    addedRank: 12, salesRank: 14 },
  { id: 13, brand: "Zivah Ethnic", name: "Linen Kurta Set", category: "men", subcategory: "ethnic", tags: ["new"],
    price: 2299, originalPrice: 2999, colors: ["#f5f0e8","#c8a96e","#2c3e50"], sizes: ["S","M","L","XL","XXL"],
    rating: 4.7, reviews: 156, img: U("photo-1622519407650-3df9883f76a5"), img2: U("photo-1610288311735-39b7facbd095"),
    description: "Hand-finished linen kurta with churidar.", material: "Linen", fabric: "Linen", style: "Ethnic",
    addedRank: 4, salesRank: 4 },
  { id: 14, brand: "Zivah Lounge", name: "Cashmere Hoodie", category: "men", subcategory: "knitwear", tags: ["hot"],
    price: 3499, colors: ["#5a4632","#2c3e50","#a8a8a8"], sizes: ["S","M","L","XL"],
    rating: 4.9, reviews: 73, img: U("photo-1556821840-3a63f95609a7"), img2: U("photo-1620799140408-edc6dcb6d633"),
    description: "Featherlight pure cashmere hoodie.", material: "Cashmere", fabric: "Cashmere", style: "Loungewear",
    addedRank: 22, salesRank: 16 },
  { id: 27, brand: "Studio Line", name: "Co-ord Linen Shirt & Trouser Set", category: "men", subcategory: "co-ord", tags: ["new","hot"],
    price: 2599, originalPrice: 3299, colors: ["#e8d5c4","#c8a96e","#2c3e50"], sizes: ["S","M","L","XL"],
    rating: 4.6, reviews: 58, img: U("photo-1617137968427-85924c800a22"), img2: U("photo-1593030761757-71fae45fa0e7"),
    description: "Coordinated linen shirt and trouser in matching tones.", material: "Linen", fabric: "Linen", style: "Resort",
    addedRank: 2, salesRank: 11 },
  { id: 28, brand: "Zivah Essentials", name: "Rayon Casual Shirt", category: "men", subcategory: "shirt", tags: ["sale"],
    price: 799, originalPrice: 1199, colors: ["#3a8a9e","#1a1a1a","#f5e6c8"], sizes: ["S","M","L","XL"],
    rating: 4.3, reviews: 112, img: U("photo-1602810318383-e386cc2a3ccf"), img2: U("photo-1603252109303-2751441dd157"),
    description: "Featherweight rayon shirt with a fluid drape.", material: "Rayon", fabric: "Rayon", style: "Casual",
    addedRank: 16, salesRank: 18 },

  // ─────────── WOMEN ───────────
  { id: 3, brand: "Zivah Woman", name: "Draped Midi Dress", category: "women", subcategory: "dress", tags: ["hot"],
    price: 1599, originalPrice: 2199, colors: ["#c8a96e","#2c3e50","#e8d5c4"], sizes: ["XS","S","M","L","XL"],
    rating: 4.8, reviews: 245, img: U("photo-1572804013427-4d7ca7268217"), img2: U("photo-1515372039744-b8f02a3ae446"),
    description: "Bias-cut viscose crepe with effortless drape.", material: "Viscose crepe", fabric: "Viscose", style: "Party",
    addedRank: 9, salesRank: 1 },
  { id: 4, brand: "Zivah Woman", name: "Wide-Leg Satin Trousers", category: "women", subcategory: "bottom", tags: ["new"],
    price: 1199, originalPrice: 1599, colors: ["#f5f0eb","#2d2d2d","#c8a96e"], sizes: ["XS","S","M","L","XL"],
    rating: 4.6, reviews: 167, img: U("photo-1506629082955-511b1aa562c8"), img2: U("photo-1509631179647-0177331693ae"),
    description: "High-rise wide-leg trousers in satin twill.", material: "Satin twill", fabric: "Satin", style: "Formal",
    addedRank: 6, salesRank: 9 },
  { id: 7, brand: "Zivah Woman", name: "Silk Camisole Top", category: "women", subcategory: "top", tags: ["hot"],
    price: 999, originalPrice: 1399, colors: ["#f5e6d3","#2c3e50","#c0392b"], sizes: ["XS","S","M","L"],
    rating: 4.4, reviews: 201, img: U("photo-1602810318383-e386cc2a3ccf"), img2: U("photo-1485968579580-b6d095142e6e"),
    description: "Mulberry silk camisole with French lace trim.", material: "Silk", fabric: "Silk", style: "Party",
    addedRank: 19, salesRank: 7 },
  { id: 15, brand: "Zivah Ethnic", name: "Embroidered Anarkali Suit", category: "women", subcategory: "ethnic", tags: ["new","hot"],
    price: 3999, originalPrice: 5499, colors: ["#c44569","#c8a96e","#1a4a6e"], sizes: ["XS","S","M","L","XL"],
    rating: 4.9, reviews: 312, img: U("photo-1610030469983-98e550d6193c"), img2: U("photo-1583391733956-3750e0ff4e8b"),
    description: "Hand-embroidered Anarkali in chiffon.", material: "Chiffon", fabric: "Chiffon", style: "Ethnic",
    addedRank: 1, salesRank: 2 },
  { id: 16, brand: "Zivah Woman", name: "Cashmere Blend Cardigan", category: "women", subcategory: "knitwear", tags: [],
    price: 2799, originalPrice: 3499, colors: ["#e8d5c4","#5a4632","#2c3e50"], sizes: ["XS","S","M","L"],
    rating: 4.7, reviews: 98, img: U("photo-1576566588028-4147f3842f27"), img2: U("photo-1591047139829-d91aecb6caea"),
    description: "Buttery-soft cashmere blend longline cardigan.", material: "Cashmere blend", fabric: "Cashmere", style: "Loungewear",
    addedRank: 23, salesRank: 17 },
  { id: 17, brand: "Zivah Denim", name: "High-Rise Mom Jeans", category: "women", subcategory: "bottom", tags: ["new"],
    price: 1599, colors: ["#3a4a6b","#1c2740","#a8a8a8"], sizes: ["XS","S","M","L","XL"],
    rating: 4.5, reviews: 188, img: U("photo-1541099649105-f69ad21f3246"), img2: U("photo-1551048632-24e444b48a3e"),
    description: "Vintage-inspired rigid denim, tapered leg.", material: "Denim", fabric: "Denim", style: "Streetwear",
    addedRank: 11, salesRank: 13 },
  { id: 18, brand: "Zivah Woman", name: "Velvet Wrap Blouse", category: "women", subcategory: "top", tags: ["hot"],
    price: 1899, originalPrice: 2499, colors: ["#5a1a2a","#1a3c2a","#2c3e50"], sizes: ["XS","S","M","L"],
    rating: 4.6, reviews: 76, img: U("photo-1485518882345-15568b007407"), img2: U("photo-1551803091-e20673f15770"),
    description: "Crushed velvet wrap blouse for evenings.", material: "Velvet", fabric: "Velvet", style: "Party",
    addedRank: 17, salesRank: 19 },
  { id: 19, brand: "Zivah Resort", name: "Linen Maxi Sundress", category: "women", subcategory: "dress", tags: ["new","sale"],
    price: 1799, originalPrice: 2399, colors: ["#f5f0e8","#e8a87c","#87a878"], sizes: ["XS","S","M","L","XL"],
    rating: 4.8, reviews: 224, img: U("photo-1496747611176-843222e1e57c"), img2: U("photo-1515886657613-9f3515b0c78f"),
    description: "Tiered linen maxi with adjustable straps.", material: "Linen", fabric: "Linen", style: "Resort",
    addedRank: 8, salesRank: 15 },
  { id: 20, brand: "Zivah Tailored", name: "Wool Pleated Skirt", category: "women", subcategory: "bottom", tags: [],
    price: 1499, originalPrice: 1999, colors: ["#2c3e50","#5a4632","#1a1a1a"], sizes: ["XS","S","M","L"],
    rating: 4.4, reviews: 64, img: U("photo-1583496661160-fb5886a13d44"), img2: U("photo-1591047139829-d91aecb6caea"),
    description: "Midi-length wool skirt with sharp pleats.", material: "Wool", fabric: "Wool", style: "Workwear",
    addedRank: 21, salesRank: 22 },
  { id: 21, brand: "Zivah Woman", name: "Chiffon Floral Blouse", category: "women", subcategory: "top", tags: ["sale"],
    price: 899, originalPrice: 1399, colors: ["#f8c8d8","#e8a87c","#a8c0a0"], sizes: ["XS","S","M","L","XL"],
    rating: 4.3, reviews: 142, img: U("photo-1551163943-3f6a855d1153"), img2: U("photo-1485968579580-b6d095142e6e"),
    description: "Floaty chiffon blouse with watercolour print.", material: "Chiffon", fabric: "Chiffon", style: "Casual",
    addedRank: 15, salesRank: 20 },
  { id: 22, brand: "Zivah Tailored", name: "Tailored Wool Blazer", category: "women", subcategory: "outerwear", tags: ["new"],
    price: 3299, originalPrice: 4199, colors: ["#1a1a1a","#e8d5c4","#5a4632"], sizes: ["XS","S","M","L"],
    rating: 4.8, reviews: 88, img: U("photo-1591047139829-d91aecb6caea"), img2: U("photo-1583496661160-fb5886a13d44"),
    description: "Sculpted single-breasted blazer in pure wool.", material: "Wool", fabric: "Wool", style: "Formal",
    addedRank: 10, salesRank: 21 },
  { id: 29, brand: "Zivah Woman", name: "Rayon Floral Midi Dress", category: "women", subcategory: "dress", tags: ["new"],
    price: 1399, originalPrice: 1799, colors: ["#f8c8d8","#a8c0a0","#1a4a6e"], sizes: ["XS","S","M","L","XL"],
    rating: 4.6, reviews: 134, img: U("photo-1515372039744-b8f02a3ae446"), img2: U("photo-1572804013427-4d7ca7268217"),
    description: "Easy-wear rayon midi in a hand-painted floral.", material: "Rayon", fabric: "Rayon", style: "Casual",
    addedRank: 13, salesRank: 23 },
  { id: 30, brand: "Zivah Resort", name: "Cotton Co-ord Set", category: "women", subcategory: "co-ord", tags: ["hot","new"],
    price: 2199, originalPrice: 2899, colors: ["#f5f0e8","#e8a87c","#1a3c2a"], sizes: ["XS","S","M","L","XL"],
    rating: 4.7, reviews: 198, img: U("photo-1572804013427-4d7ca7268217"), img2: U("photo-1496747611176-843222e1e57c"),
    description: "Breathable cotton shirt and shorts co-ord.", material: "Cotton", fabric: "Cotton", style: "Resort",
    addedRank: 25, salesRank: 24 },
  { id: 31, brand: "Zivah Woman", name: "Satin Slip Dress", category: "women", subcategory: "dress", tags: ["hot"],
    price: 1799, originalPrice: 2299, colors: ["#c8a96e","#2c3e50","#5a1a2a"], sizes: ["XS","S","M","L"],
    rating: 4.7, reviews: 167, img: U("photo-1485968579580-b6d095142e6e"), img2: U("photo-1572804013427-4d7ca7268217"),
    description: "Minimalist bias-cut satin slip for evenings.", material: "Satin", fabric: "Satin", style: "Minimalist",
    addedRank: 26, salesRank: 25 },

  // ─────────── KIDS ───────────
  { id: 5, brand: "Little Zivah", name: "Organic Cotton Romper", category: "kids", subcategory: "co-ord", tags: ["new","sale"],
    price: 599, originalPrice: 899, colors: ["#ffd6d6","#d6e8ff","#d6ffd9"], sizes: ["2Y","3Y","4Y","5Y","6Y"],
    rating: 4.9, reviews: 312, img: U("photo-1519457431-44ccd64a579b"), img2: U("photo-1522771930-78848d9293e8"),
    description: "GOTS-certified organic cotton romper.", material: "Organic cotton", fabric: "Cotton", style: "Casual",
    addedRank: 24, salesRank: 26 },
  { id: 8, brand: "Little Zivah", name: "Printed Shorts Set", category: "kids", subcategory: "co-ord", tags: ["sale"],
    price: 449, originalPrice: 699, colors: ["#ffd6d6","#d6e8ff"], sizes: ["2Y","3Y","4Y","5Y","6Y","7Y"],
    rating: 4.6, reviews: 178, img: U("photo-1519457431-44ccd64a579b"), img2: U("photo-1518831959646-742c3a14ebf7"),
    description: "Breathable cotton jersey top and shorts.", material: "Cotton jersey", fabric: "Cotton", style: "Casual",
    addedRank: 27, salesRank: 27 },
  { id: 23, brand: "Little Zivah", name: "Silk Party Dress", category: "kids", subcategory: "dress", tags: ["new","hot"],
    price: 1299, originalPrice: 1699, colors: ["#f8c8d8","#e8d5c4","#c44569"], sizes: ["2Y","3Y","4Y","5Y","6Y"],
    rating: 4.8, reviews: 96, img: U("photo-1518831959646-742c3a14ebf7"), img2: U("photo-1519457431-44ccd64a579b"),
    description: "Twirl-ready silk-blend party dress.", material: "Silk blend", fabric: "Silk", style: "Party",
    addedRank: 28, salesRank: 28 },
  { id: 24, brand: "Little Zivah", name: "Mini Denim Jacket", category: "kids", subcategory: "outerwear", tags: ["new"],
    price: 899, originalPrice: 1199, colors: ["#3a4a6b","#1c2740"], sizes: ["2Y","3Y","4Y","5Y","6Y","7Y"],
    rating: 4.7, reviews: 134, img: U("photo-1503944583220-79d8926ad5e2"), img2: U("photo-1519457431-44ccd64a579b"),
    description: "Soft-washed denim jacket for little explorers.", material: "Denim", fabric: "Denim", style: "Streetwear",
    addedRank: 29, salesRank: 29 },
  { id: 25, brand: "Little Zivah", name: "Embroidered Kurta Set", category: "kids", subcategory: "ethnic", tags: ["hot"],
    price: 1099, originalPrice: 1499, colors: ["#f5f0e8","#c8a96e","#1a4a6e"], sizes: ["2Y","3Y","4Y","5Y","6Y","7Y"],
    rating: 4.9, reviews: 201, img: U("photo-1622519407650-3df9883f76a5"), img2: U("photo-1610288311735-39b7facbd095"),
    description: "Festive cotton kurta with churidar.", material: "Cotton", fabric: "Cotton", style: "Ethnic",
    addedRank: 30, salesRank: 30 },
  { id: 26, brand: "Little Zivah", name: "Wool Knit Sweater", category: "kids", subcategory: "knitwear", tags: [],
    price: 799, originalPrice: 1099, colors: ["#e8d5c4","#a8c0a0","#c44569"], sizes: ["2Y","3Y","4Y","5Y","6Y"],
    rating: 4.5, reviews: 87, img: U("photo-1503944583220-79d8926ad5e2"), img2: U("photo-1522771930-78848d9293e8"),
    description: "Cozy wool-blend pullover for chilly days.", material: "Wool blend", fabric: "Wool", style: "Casual",
    addedRank: 31, salesRank: 31 },
];

export const ALL_FABRICS: Fabric[] = ["Linen","Cotton","Silk","Wool","Denim","Viscose","Velvet","Chiffon","Satin","Cashmere","Rayon"];
export const ALL_STYLES: Style[] = ["Casual","Formal","Ethnic","Party","Loungewear","Workwear","Streetwear","Resort","Minimalist"];

export const PRICE_TIERS = [
  { id: "under1k", label: "Under ₹1,000", min: 0, max: 999 },
  { id: "1k-2k", label: "₹1,000 – ₹2,000", min: 1000, max: 2000 },
  { id: "2k-3500", label: "₹2,000 – ₹3,500", min: 2000, max: 3500 },
  { id: "premium", label: "₹3,500 & above", min: 3500, max: Infinity },
] as const;
export type PriceTierId = typeof PRICE_TIERS[number]["id"];

export const fmt = (n: number) => "₹" + n.toLocaleString("en-IN");
export const discount = (original: number, current: number) =>
  Math.round((1 - current / original) * 100);

export function getProduct(id: number | string) {
  const n = typeof id === "string" ? parseInt(id, 10) : id;
  return PRODUCTS.find((p) => p.id === n);
}

export function relatedProducts(p: Product, n = 4) {
  return PRODUCTS.filter((x) => x.id !== p.id && p.category === x.category).slice(0, n);
}

export function searchProducts(q: string) {
  const s = q.toLowerCase().trim();
  if (!s) return [];
  return PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(s) ||
      p.brand.toLowerCase().includes(s) ||
      p.category.includes(s) ||
      p.subcategory.toLowerCase().includes(s) ||
      p.fabric.toLowerCase().includes(s) ||
      p.style.toLowerCase().includes(s) ||
      p.material.toLowerCase().includes(s)
  );
}

/** Aggregate all unique color swatches present in the catalog. */
export const ALL_COLORS: { hex: string; name: string }[] = Array.from(
  new Set(PRODUCTS.flatMap((p) => p.colors))
).map((hex) => ({ hex, name: hex }));
