import { Product } from "./types";

export const PRODUCTS: Product[] = [
  {
    id: "prod-1",
    name: "California Royal Navy Bespoke Suit",
    description: "Our signature navy suit tailored to perfection. Crafted from super-130s Italian wool, this piece offers an unmatched blend of style, comfort, and professional confidence for the modern executive.",
    category: "Suits",
    price: 499,
    salePrice: 425,
    rating: 4.9,
    reviewsCount: 124,
    colors: [
      { name: "Royal Navy", hex: "#1d2a44" },
      { name: "Charcoal Gray", hex: "#4a5568" },
      { name: "Midnight Black", hex: "#1a202c" }
    ],
    sizes: ["38R", "40R", "42R", "44R", "46R"],
    images: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?auto=format&fit=crop&q=80&w=800"
    ],
    tags: ["Bestseller", "Formal", "Premium", "Business"],
    isBestseller: true,
    isNewArrival: false,
    stock: 15,
    material: "100% Super-130s Merino Wool",
    care: "Dry Clean Only",
    details: [
      "Fully lined jacket with double back vent",
      "Half-canvas construction conforms to your build",
      "Functional buttonhole cuffs",
      "Flat-front trousers with adjustable waist tabs",
      "Made for wedding, boardroom, and upscale formal wear"
    ],
    reviews: [
      { id: "r1-1", username: "Michael K.", rating: 5, date: "2026-05-15", text: "Best suit I've ever owned. The custom feel at this price point is unbelievable. Got tons of compliments at my presentation in San Francisco.", verified: true },
      { id: "r1-2", username: "Derrick S.", rating: 4, date: "2026-06-01", text: "Excellent fit, very premium fabric. Needs a minor hem adjustment but looks incredible right out of the box.", verified: true }
    ]
  },
  {
    id: "prod-2",
    name: "Royal Oxford Premium Dress Shirt",
    description: "A timeless masterpiece designed for high-stakes business environments. Made from 100% long-staple Egyptian cotton with an easy-iron finish, ensuring you stay crisp from your first meeting to dinner.",
    category: "Dress Shirts",
    price: 89,
    rating: 4.8,
    reviewsCount: 85,
    colors: [
      { name: "Crisp White", hex: "#ffffff" },
      { name: "Ice Blue", hex: "#ebf8ff" },
      { name: "Soft Lavender", hex: "#faf5ff" }
    ],
    sizes: ["15-32", "15.5-33", "16-34", "16.5-35", "17-35"],
    images: [
      "/src/assets/images/oxford_shirt_product_1782246787377.jpg",
      "https://images.unsplash.com/photo-1620012253295-c05cb1e7420c?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&q=80&w=800"
    ],
    tags: ["New Arrival", "Corporate", "Essential"],
    isBestseller: false,
    isNewArrival: true,
    stock: 45,
    material: "100% Egyptian Giza Cotton",
    care: "Machine Wash Cold, Warm Iron",
    details: [
      "Spread collar with removable stays",
      "French placket with genuine mother-of-pearl buttons",
      "Signature mitered cuffs",
      "Wrinkle-resistant luxury Oxford weave",
      "Slim fit contouring the torso elegantly"
    ],
    reviews: [
      { id: "r2-1", username: "Robert V.", rating: 5, date: "2026-06-10", text: "The collar holds its structure beautifully with a tie or open. Feels incredibly breathable.", verified: true }
    ]
  },
  {
    id: "prod-3",
    name: "Onyx Fitted Tuxedo Dinner Blazer",
    description: "Redefine nightwear and high-society evening events. This black dinner blazer features a premium satin shawl lapel, bringing a touch of classic Hollywood charm and luxurious panache to your wardrobe.",
    category: "Blazers",
    price: 299,
    salePrice: 249,
    rating: 4.9,
    reviewsCount: 42,
    colors: [
      { name: "Onyx Black", hex: "#111111" },
      { name: "Imperial Burgundy", hex: "#581845" }
    ],
    sizes: ["38R", "40R", "42R", "44R"],
    images: [
      "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800"
    ],
    tags: ["Exclusive", "Formal", "Black Tie"],
    isBestseller: false,
    isNewArrival: true,
    stock: 8,
    material: "Premium Wool-Silk Blend",
    care: "Dry Clean Only",
    details: [
      "Satin shawl lapel and satin-wrapped buttons",
      "Single breasted with one-button closure",
      "Satin-jetted pockets",
      "Ventless back for a sleek, slim silhouette",
      "Fully lined with jacquard paisley pattern"
    ],
    reviews: [
      { id: "r3-1", username: "Adrian L.", rating: 5, date: "2026-05-20", text: "Wore this to a charity gala in Beverly Hills. Unmatched elegance.", verified: true }
    ]
  },
  {
    id: "prod-4",
    name: "Presidential Gold Dial Chronograph",
    description: "The ultimate power statement for your wrist. Features a brilliant silver steel case with luxurious 18k yellow gold-plated links and a precision-engineered golden sunburst chronograph dial.",
    category: "Accessories",
    price: 189,
    rating: 4.7,
    reviewsCount: 61,
    colors: [
      { name: "Gold & Silver", hex: "#cbd5e0" },
      { name: "Pure Gold Accent", hex: "#ecc94b" }
    ],
    sizes: ["One Size"],
    images: [
      "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&q=80&w=800"
    ],
    tags: ["Bestseller", "Luxury", "Gold Accent"],
    isBestseller: true,
    isNewArrival: false,
    stock: 12,
    material: "316L Stainless Steel & 18k Gold Plating",
    care: "Wipe Clean, Water Resistant 50m",
    details: [
      "Premium Japanese Quartz Chronograph movement",
      "Scratch-resistant sapphire crystal glass",
      "Double locking fold-over safety clasp",
      "Date window indicator and sub-dials",
      "Packaged in an elegant velvet-lined lacquered wood box"
    ],
    reviews: [
      { id: "r4-1", username: "Jonathan G.", rating: 5, date: "2026-04-30", text: "Feels nice and heavy on the wrist. Looks like a $1,000 watch.", verified: true }
    ]
  },
  {
    id: "prod-5",
    name: "West Coast Smart Casual Chinos",
    description: "Seamlessly transition from professional office environments to casual coastal weekend hangouts. Engineered with high-flex cotton-spandex sateen for premium comfort and long-term durability.",
    category: "Pants",
    price: 95,
    salePrice: 79,
    rating: 4.6,
    reviewsCount: 112,
    colors: [
      { name: "Khaki Tan", hex: "#e2e8f0" },
      { name: "Classic Navy", hex: "#1e3a8a" },
      { name: "Slate Charcoal", hex: "#334155" }
    ],
    sizes: ["30W-32L", "32W-32L", "34W-32L", "36W-34L"],
    images: [
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&q=80&w=800"
    ],
    tags: ["Versatile", "Smart Casual", "Stretch Fit"],
    isBestseller: true,
    isNewArrival: false,
    stock: 30,
    material: "97% Brushed Pima Cotton, 3% Spandex",
    care: "Machine Wash Cold, Tumble Dry Low",
    details: [
      "Slim tapered fit from knee to ankle",
      "Secure YKK zipper with dual-button tab waistband",
      "Deep double-welt rear pockets with button closures",
      "Moisture-wicking, breathable finish",
      "Reinforced seams for exceptional wear resistance"
    ],
    reviews: [
      { id: "r5-1", username: "Gary T.", rating: 4, date: "2026-06-18", text: "So comfortable. Great stretch when sitting at my desk all day.", verified: true }
    ]
  },
  {
    id: "prod-6",
    name: "Pacific Micro-Pattern Premium Shirt",
    description: "Inject some modern personality into your business-casual wardrobe. This tailored woven shirt features a subtle, high-contrast micro-geometric print, providing outstanding visual depth and structured styling.",
    category: "Casual Shirts",
    price: 79,
    rating: 4.7,
    reviewsCount: 38,
    colors: [
      { name: "Pacific Navy Pattern", hex: "#1e293b" },
      { name: "Royal Blue Dot", hex: "#2563eb" }
    ],
    sizes: ["S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1620012253295-c05cb1e7420c?auto=format&fit=crop&q=80&w=800"
    ],
    tags: ["New Arrival", "Summer", "Business Casual"],
    isBestseller: false,
    isNewArrival: true,
    stock: 22,
    material: "100% Breathable Long-Staple Cotton",
    care: "Machine Wash Cold, Hang Dry",
    details: [
      "Under-button hidden collar point tabs",
      "Adjustable barrel cuffs with mitered edge",
      "Rich colorfast yarn-dyed geometric micro-pattern",
      "Contoured athletic cut",
      "Perfect with blazer or tucked into chinos"
    ],
    reviews: [
      { id: "r6-1", username: "Lucas M.", rating: 5, date: "2026-06-14", text: "Looks smart and sharp without being overly stiff. Highly recommend.", verified: true }
    ]
  },
  {
    id: "prod-7",
    name: "Sterling Silver & Gold Cufflink Set",
    description: "The finishing touch for any executive dress code. Crafted from solid sterling silver with premium 18k gold center inlay, these cylindrical cuff links offer subtle grandeur and high-end prestige.",
    category: "Accessories",
    price: 65,
    rating: 4.9,
    reviewsCount: 29,
    colors: [
      { name: "Gold / Silver", hex: "#cbd5e0" }
    ],
    sizes: ["One Size"],
    images: [
      "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&q=80&w=800"
    ],
    tags: ["Accents", "Classic", "Executive"],
    isBestseller: false,
    isNewArrival: false,
    stock: 14,
    material: "925 Sterling Silver & 18k Yellow Gold",
    care: "Polish with microfibre jewelry cloth",
    details: [
      "Cylindrical whale-back clasp system",
      "Hand-polished mirror finish",
      "Laser-etched authenticity mark",
      "Includes structured protective leather presentation box",
      "Complements white, light blue, and lavender French cuff shirts"
    ],
    reviews: [
      { id: "r7-1", username: "Christian P.", rating: 5, date: "2026-05-11", text: "Beautiful craftmanship. Essential for my wedding suit.", verified: true }
    ]
  },
  {
    id: "prod-8",
    name: "Lafayette Textured Tweed Wool Blazer",
    description: "Unparalleled sophistication meets classic West Coast elegance. Designed with a gorgeous textured Donegal tweed-inspired wool blend, this structured blazer ensures warmth, structure, and superior aesthetic charm.",
    category: "Blazers",
    price: 249,
    rating: 4.8,
    reviewsCount: 56,
    colors: [
      { name: "Charcoal Donegal", hex: "#374151" },
      { name: "Camel Tweed", hex: "#b45309" }
    ],
    sizes: ["40R", "42R", "44R", "46R"],
    images: [
      "https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800"
    ],
    tags: ["Classic", "Tweed", "Winter Style"],
    isBestseller: false,
    isNewArrival: false,
    stock: 9,
    material: "75% Virgin Wool, 20% Silk, 5% Cashmere",
    care: "Dry Clean Only",
    details: [
      "Notched lapel with custom lapel-pin slot",
      "Contrast horn buttons",
      "Patch pockets for relaxed casual vibe",
      "Fully lined with burgundy silk-satin blend",
      "Dual interior breast pockets with glasses pen slots"
    ],
    reviews: [
      { id: "r8-1", username: "Dennis W.", rating: 5, date: "2026-04-12", text: "Premium drape and fabric texture. Fits perfectly with a turtleneck.", verified: true }
    ]
  }
];

export const COUPONS = [
  { code: "WELCOME10", discount: 0.10, description: "Save 10% on your first order" },
  { code: "DRESSRIGHT20", discount: 0.20, description: "Exclusive 20% discount on professional wear" },
  { code: "GOLDVIP", discount: 50, isFlat: true, description: "$50 off premium suits" }
];

export const FAQS = [
  {
    question: "How do I know my correct suit and shirt size?",
    answer: "We recommend reviewing our comprehensive Fit Guide or talking with our Live AI Stylist in the bottom right! You can measure your chest, over-arm, and neck to match our sizing chart. If you are in California, our styling specialists can also assist over the phone."
  },
  {
    question: "What is your shipping and delivery timeline?",
    answer: "We provide Free Standard Shipping on all US orders over $150. Orders ship from our California warehouse within 1-2 business days. Standard shipping takes 3-5 business days. Express next-day shipping is also available."
  },
  {
    question: "Can I return or exchange my items?",
    answer: "Yes! We want you to 'Dress Right.' We offer a hassle-free 30-day return or exchange policy on all unworn, unaltered apparel with original tags still attached. Return shipping labels are pre-paid."
  },
  {
    question: "Do you offer custom tailoring?",
    answer: "All our suits, blazers, and pants are crafted with standard tail-end allowances, making it simple for any local California tailor to easily perform minor sleeve or trouser hem adjustments for your perfect bespoke look."
  }
];

export const BRAND_STYLE = {
  colors: {
    primary: "navy",
    navy: "#1d2a44",
    black: "#111111",
    white: "#ffffff",
    silver: "#e2e8f0",
    gold: "#d4af37",
    goldHover: "#b8901c"
  },
  contact: {
    phone: "818-913-8520",
    email: "roy460@hotmail.com",
    address: "DressRight4You HQ, Los Angeles, California, USA",
    domain: "dressright4you.com"
  }
};
