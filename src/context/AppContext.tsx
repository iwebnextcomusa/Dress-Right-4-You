import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, CartItem, Order, UserProfile, ShippingAddress } from "../types";
import { PRODUCTS, COUPONS } from "../data";

interface AppContextType {
  currentView: "home" | "shop" | "about" | "contact" | "account" | "checkout" | "order-success";
  setView: (view: "home" | "shop" | "about" | "contact" | "account" | "checkout" | "order-success") => void;
  products: Product[];
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  cart: CartItem[];
  addToCart: (product: Product, size: string, color: { name: string; hex: string }, qty?: number) => void;
  removeFromCart: (productId: string, size: string, colorHex: string) => void;
  updateCartQuantity: (productId: string, size: string, colorHex: string, quantity: number) => void;
  clearCart: () => void;
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  orders: Order[];
  placeOrder: (shippingAddress: ShippingAddress, paymentMethod: string) => Order;
  profile: UserProfile;
  updateProfile: (profile: UserProfile) => void;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  appliedCoupon: { code: string; discount: number; isFlat?: boolean } | null;
  applyCouponCode: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  latestOrder: Order | null;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Views
  const [currentView, setView] = useState<AppContextType["currentView"]>("home");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");

  // State with LocalStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("dr_cart");
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState<Product[]>(() => {
    const saved = localStorage.getItem("dr_wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem("dr_orders");
    return saved ? JSON.parse(saved) : [];
  });

  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem("dr_profile");
    return saved
      ? JSON.parse(saved)
      : {
          fullName: "Charles Sterling",
          email: "charles.sterling@gmail.com",
          phone: "310-555-0199",
          savedAddresses: [
            {
              fullName: "Charles Sterling",
              addressLine1: "1428 Sunset Boulevard",
              addressLine2: "Apt 4B",
              city: "Los Angeles",
              state: "California",
              zipCode: "90026",
              country: "USA",
            },
          ],
        };
  });

  const [appliedCoupon, setAppliedCoupon] = useState<AppContextType["appliedCoupon"]>(null);
  const [latestOrder, setLatestOrder] = useState<Order | null>(null);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem("dr_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("dr_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem("dr_orders", JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem("dr_profile", JSON.stringify(profile));
  }, [profile]);

  // Cart operations
  const addToCart = (product: Product, size: string, color: { name: string; hex: string }, qty = 1) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === size &&
          item.selectedColor.hex === color.hex
      );

      if (existingIdx > -1) {
        const nextCart = [...prev];
        nextCart[existingIdx].quantity += qty;
        return nextCart;
      }

      return [...prev, { product, selectedSize: size, selectedColor: color, quantity: qty }];
    });
    setCartOpen(true);
  };

  const removeFromCart = (productId: string, size: string, colorHex: string) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.selectedSize === size &&
            item.selectedColor.hex === colorHex
          )
      )
    );
  };

  const updateCartQuantity = (productId: string, size: string, colorHex: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, size, colorHex);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId &&
        item.selectedSize === size &&
        item.selectedColor.hex === colorHex
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  // Wishlist operations
  const toggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        return prev.filter((item) => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((item) => item.id === productId);
  };

  // Coupon
  const applyCouponCode = (code: string) => {
    const coupon = COUPONS.find((c) => c.code.toUpperCase() === code.trim().toUpperCase());
    if (coupon) {
      setAppliedCoupon({
        code: coupon.code,
        discount: coupon.discount,
        isFlat: "isFlat" in coupon ? (coupon as any).isFlat : false,
      });
      return { success: true, message: `Coupon applied: ${coupon.description}` };
    }
    return { success: false, message: "Invalid coupon code" };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  // Place Order
  const placeOrder = (shippingAddress: ShippingAddress, paymentMethod: string) => {
    const subtotal = cart.reduce((acc, item) => {
      const price = item.product.salePrice || item.product.price;
      return acc + price * item.quantity;
    }, 0);

    let discount = 0;
    if (appliedCoupon) {
      if (appliedCoupon.isFlat) {
        discount = appliedCoupon.discount;
      } else {
        discount = subtotal * appliedCoupon.discount;
      }
    }

    const shipping = subtotal > 150 ? 0 : 15;
    const tax = (subtotal - discount) * 0.0825; // CA Tax rate
    const total = subtotal - discount + shipping + tax;

    const newOrder: Order = {
      id: `ord-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toISOString().split("T")[0],
      items: [...cart],
      subtotal,
      shipping,
      tax,
      discount,
      total,
      status: "Processing",
      shippingAddress,
      paymentMethod,
    };

    setOrders((prev) => [newOrder, ...prev]);
    setLatestOrder(newOrder);
    clearCart();
    setView("order-success");
    return newOrder;
  };

  const updateProfile = (updatedProfile: UserProfile) => {
    setProfile(updatedProfile);
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        setView,
        products: PRODUCTS,
        selectedProduct,
        setSelectedProduct,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        wishlist,
        toggleWishlist,
        isInWishlist,
        orders,
        placeOrder,
        profile,
        updateProfile,
        cartOpen,
        setCartOpen,
        appliedCoupon,
        applyCouponCode,
        removeCoupon,
        searchQuery,
        setSearchQuery,
        activeCategory,
        setActiveCategory,
        sortBy,
        setSortBy,
        latestOrder,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
