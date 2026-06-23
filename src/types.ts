export interface Review {
  id: string;
  username: string;
  rating: number;
  date: string;
  text: string;
  verified: boolean;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: "Dress Shirts" | "Suits" | "Blazers" | "Casual Shirts" | "Pants" | "Accessories";
  price: number;
  salePrice?: number;
  rating: number;
  reviewsCount: number;
  colors: { name: string; hex: string }[];
  sizes: string[];
  images: string[];
  tags: string[];
  isBestseller: boolean;
  isNewArrival: boolean;
  stock: number;
  details: string[];
  material: string;
  care: string;
  reviews: Review[];
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  selectedColor: { name: string; hex: string };
  quantity: number;
}

export interface ShippingAddress {
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  status: "Processing" | "Shipped" | "Delivered" | "Pending";
  shippingAddress: ShippingAddress;
  paymentMethod: string;
}

export interface UserProfile {
  fullName: string;
  email: string;
  phone: string;
  savedAddresses: ShippingAddress[];
}
