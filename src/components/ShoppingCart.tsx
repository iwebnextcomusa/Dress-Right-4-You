import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { X, Trash2, ShoppingBag, ArrowRight, Tag, Percent, Truck } from "lucide-react";

export default function ShoppingCart() {
  const {
    cart,
    cartOpen,
    setCartOpen,
    updateCartQuantity,
    removeFromCart,
    setView,
    appliedCoupon,
    applyCouponCode,
    removeCoupon
  } = useApp();

  const [couponCode, setCouponCode] = useState("");
  const [couponMsg, setCouponMsg] = useState({ text: "", success: false });

  if (!cartOpen) return null;

  const subtotal = cart.reduce((total, item) => {
    const price = item.product.salePrice || item.product.price;
    return total + price * item.quantity;
  }, 0);

  // Discount calculation
  let discountValue = 0;
  if (appliedCoupon) {
    if (appliedCoupon.isFlat) {
      discountValue = appliedCoupon.discount;
    } else {
      discountValue = subtotal * appliedCoupon.discount;
    }
  }

  const shippingCost = subtotal > 150 || subtotal === 0 ? 0 : 15;
  const estimatedTax = (subtotal - discountValue) * 0.0825; // 8.25% California Tax
  const grandTotal = subtotal - discountValue + shippingCost + estimatedTax;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode) return;
    const res = applyCouponCode(couponCode);
    setCouponMsg({ text: res.message, success: res.success });
    if (res.success) {
      setCouponCode("");
    }
  };

  const handleProceedCheckout = () => {
    setCartOpen(false);
    setView("checkout");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" id="shopping-bag-drawer">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setCartOpen(false)}></div>

      {/* Slide-over panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0a0a0a] border-l border-white/10 text-white flex flex-col justify-between shadow-2xl animate-slideLeft">
          
          {/* Header */}
          <div className="p-5 border-b border-white/10 flex justify-between items-center bg-[#0d0d0d]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#d4af37]" />
              <h2 className="text-xs font-mono font-bold uppercase tracking-widest">Your Shopping Bag</h2>
              <span className="text-[10px] bg-[#050505] border border-white/10 text-white py-0.5 px-2 rounded-none font-mono">
                {cart.reduce((t, i) => t + i.quantity, 0)}
              </span>
            </div>
            <button
              onClick={() => setCartOpen(false)}
              className="p-1.5 rounded-none hover:bg-black/60 text-slate-400 hover:text-white transition-colors cursor-pointer"
              id="close-cart-btn"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Contents */}
          <div className="flex-grow overflow-y-auto p-5 space-y-4 scrollbar-thin">
            {cart.length > 0 ? (
              cart.map((item, idx) => {
                const productPrice = item.product.salePrice || item.product.price;
                const totalItemPrice = productPrice * item.quantity;

                return (
                  <div
                    key={`${item.product.id}-${item.selectedSize}-${item.selectedColor.hex}`}
                    className="flex gap-4 p-3 bg-[#050505] border border-white/10 rounded-none items-center relative group"
                    id={`cart-item-row-${idx}`}
                  >
                    {/* Image */}
                    <div className="w-16 h-20 rounded-none overflow-hidden border border-white/10 flex-shrink-0 bg-black">
                      <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>

                    {/* Meta */}
                    <div className="flex-grow space-y-1 text-left">
                      <h3 className="text-xs font-medium truncate pr-6 text-white">{item.product.name}</h3>
                      <div className="flex gap-2 text-[10px] text-slate-500 font-mono">
                        <span>Size: <strong className="text-slate-350">{item.selectedSize}</strong></span>
                        <span className="flex items-center gap-1">
                          Color:
                          <span className="w-2 h-2 rounded-none inline-block border border-white/20" style={{ backgroundColor: item.selectedColor.hex }}></span>
                          <strong className="text-slate-350">{item.selectedColor.name}</strong>
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between pt-1">
                        {/* Qty controller */}
                        <div className="flex items-center bg-black border border-white/10 rounded-none">
                          <button
                            onClick={() => updateCartQuantity(item.product.id, item.selectedSize, item.selectedColor.hex, item.quantity - 1)}
                            className="px-2 py-0.5 text-xs text-slate-400 hover:text-white font-bold cursor-pointer"
                          >
                            -
                          </button>
                          <span className="px-2 text-[10px] font-mono font-bold text-white min-w-6 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateCartQuantity(item.product.id, item.selectedSize, item.selectedColor.hex, item.quantity + 1)}
                            className="px-2 py-0.5 text-xs text-slate-400 hover:text-white font-bold cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                        
                        {/* Price */}
                        <span className="text-xs font-bold text-[#d4af37] font-mono">${totalItemPrice}</span>
                      </div>
                    </div>

                    {/* Delete button */}
                    <button
                      onClick={() => removeFromCart(item.product.id, item.selectedSize, item.selectedColor.hex)}
                      className="absolute top-2 right-2 text-slate-600 hover:text-red-500 transition-colors opacity-85 group-hover:opacity-100 cursor-pointer"
                      aria-label="Remove item"
                      id={`remove-cart-item-btn-${idx}`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-16 space-y-4 animate-fadeIn" id="empty-cart-message">
                <ShoppingBag className="w-12 h-12 text-slate-700 mx-auto" />
                <h3 className="text-xs font-bold font-mono uppercase tracking-widest text-slate-500">Bag is Empty</h3>
                <p className="text-xs text-slate-400 font-light max-w-xs mx-auto leading-relaxed">
                  You haven't selected any executive apparel yet. Explore our shop collection to construct your sharpest outfit!
                </p>
                <button
                  onClick={() => {
                    setView("shop");
                    setCartOpen(false);
                  }}
                  className="bg-[#0d0d0d] border border-white/10 hover:bg-[#d4af37] hover:text-black hover:border-[#d4af37] text-white text-[10px] font-mono font-bold uppercase tracking-widest px-6 py-2.5 rounded-none transition-colors cursor-pointer"
                >
                  Go To Wardrobe Shop
                </button>
              </div>
            )}
          </div>

          {/* Pricing calculations section */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-white/10 bg-[#0d0d0d] space-y-4 font-mono text-xs">
              
              {/* Shipping indicator meter */}
              <div className="space-y-1.5 pb-2 border-b border-white/10">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-slate-450 uppercase tracking-widest flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-[#d4af37]" />
                    Shipping Goal
                  </span>
                  {subtotal >= 150 ? (
                    <span className="text-emerald-400 font-bold uppercase">Free Shipping Unlocked!</span>
                  ) : (
                    <span className="text-[#d4af37] font-bold">Add ${150 - subtotal} more for free shipping</span>
                  )}
                </div>
                <div className="w-full bg-black h-1.5 rounded-none overflow-hidden">
                  <div
                    className="bg-[#d4af37] h-full transition-all duration-300"
                    style={{ width: `${Math.min((subtotal / 150) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>

              {/* Coupon inputs form */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2 pb-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter Coupon (e.g. WELCOME10)"
                  className="flex-grow bg-[#050505] border border-white/10 rounded-none px-3 py-1.5 text-[10px] focus:outline-none focus:border-[#d4af37] placeholder-slate-600 text-white"
                />
                <button
                  type="submit"
                  className="bg-[#050505] border border-white/10 hover:bg-[#d4af37] hover:border-[#d4af37] hover:text-black px-4 rounded-none font-bold text-[10px] uppercase tracking-widest transition-colors cursor-pointer"
                  id="apply-coupon-btn"
                >
                  Apply
                </button>
              </form>

              {couponMsg.text && (
                <p className={`text-[10px] font-bold ${couponMsg.success ? "text-emerald-400" : "text-red-400"}`}>
                  {couponMsg.text}
                </p>
              )}

              {/* Calculations rows */}
              <div className="space-y-2 text-[11px] border-b border-white/10 pb-3">
                <div className="flex justify-between text-slate-450">
                  <span>Bag Subtotal</span>
                  <span className="text-white">${subtotal}</span>
                </div>

                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-400 font-bold">
                    <span className="flex items-center gap-1">
                      <Tag className="w-3.5 h-3.5" />
                      Coupon {appliedCoupon.code}
                    </span>
                    <span>-${discountValue.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-slate-450">
                  <span>California Tax (8.25%)</span>
                  <span className="text-white">${estimatedTax.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-slate-450">
                  <span>Executive Courier Shipping</span>
                  <span className="text-white">{shippingCost === 0 ? "FREE" : `$${shippingCost}`}</span>
                </div>
              </div>

              {/* Grand total */}
              <div className="flex justify-between items-center text-sm font-bold pt-1">
                <span className="uppercase tracking-widest text-[#d4af37]">Grand Total</span>
                <span className="text-white text-base">${grandTotal.toFixed(2)}</span>
              </div>

              {/* Proceed to checkout trigger button */}
              <button
                onClick={handleProceedCheckout}
                className="w-full flex items-center justify-center gap-2 bg-[#d4af37] hover:bg-[#b8901c] text-black font-bold uppercase tracking-widest py-3.5 rounded-none shadow-md transition-colors cursor-pointer"
                id="checkout-proceed-btn"
              >
                <span>Proceed To Executive Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {appliedCoupon && (
                <button
                  onClick={removeCoupon}
                  className="w-full text-center text-[10px] text-slate-500 hover:text-red-400 transition-colors cursor-pointer"
                >
                  Remove Applied Coupon
                </button>
              )}

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
