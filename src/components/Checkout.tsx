import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { ShippingAddress } from "../types";
import { ShieldCheck, Truck, CreditCard, ShoppingBag, ArrowLeft, Tag, Calendar, CheckCircle2 } from "lucide-react";

export default function Checkout() {
  const {
    cart,
    setView,
    placeOrder,
    profile,
    appliedCoupon,
    latestOrder
  } = useApp();

  const [fullName, setFullName] = useState(profile.fullName || "");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("Los Angeles");
  const [state, setState] = useState("California");
  const [zipCode, setZipCode] = useState("90026");
  const [country, setCountry] = useState("USA");
  
  const [email, setEmail] = useState(profile.email || "");
  const [phone, setPhone] = useState(profile.phone || "");

  // Payment states
  const [paymentMethod, setPaymentMethod] = useState("stripe");
  const [cardNumber, setCardNumber] = useState("4111 2222 3333 4444");
  const [cardExpiry, setCardExpiry] = useState("12/28");
  const [cardCvv, setCardCvv] = useState("321");

  // Checkout progression
  const [checkoutStep, setCheckoutStep] = useState<"details" | "payment">("details");

  const subtotal = cart.reduce((total, item) => {
    const price = item.product.salePrice || item.product.price;
    return total + price * item.quantity;
  }, 0);

  if (cart.length === 0 && checkoutStep !== "payment") {
    // If no items in cart, and not success yet, render empty state or go to shop
    return (
      <div className="bg-[#050505] text-white py-20 text-center min-h-screen flex items-center justify-center">
        <div className="max-w-md space-y-4 px-4">
          <ShoppingBag className="w-12 h-12 text-slate-700 mx-auto" />
          <h2 className="text-xl font-serif font-light text-white tracking-wide">Checkout is Empty</h2>
          <p className="text-xs text-slate-400 font-light">You do not have any items in your shopping bag to check out. Select some premium attire first!</p>
          <button
            onClick={() => setView("shop")}
            className="bg-[#d4af37] hover:bg-[#b8901c] text-black font-mono font-bold text-xs uppercase tracking-widest py-3 px-6 rounded-none cursor-pointer transition-colors"
          >
            Go To Shop Catalog
          </button>
        </div>
      </div>
    );
  }

  // Discount calculation
  let discountValue = 0;
  if (appliedCoupon) {
    if (appliedCoupon.isFlat) {
      discountValue = appliedCoupon.discount;
    } else {
      discountValue = subtotal * appliedCoupon.discount;
    }
  }

  const shippingCost = subtotal > 150 ? 0 : 15;
  const estimatedTax = (subtotal - discountValue) * 0.0825; // 8.25% California Tax
  const grandTotal = subtotal - discountValue + shippingCost + estimatedTax;

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !addressLine1 || !city || !zipCode || !email) return;
    setCheckoutStep("payment");
  };

  const handlePlaceOrder = () => {
    const shippingAddress: ShippingAddress = {
      fullName,
      addressLine1,
      addressLine2,
      city,
      state,
      zipCode,
      country
    };

    placeOrder(shippingAddress, paymentMethod.toUpperCase());
  };

  return (
    <div className="bg-[#050505] text-white py-12 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title progress tracker */}
        <div className="flex flex-col md:flex-row justify-between items-center border-b border-white/10 pb-6 mb-10 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-serif font-light text-white tracking-wide flex items-center gap-2">
              <span>Secure Executive Checkout</span>
            </h1>
            <p className="text-slate-500 text-[10px] font-mono uppercase tracking-widest mt-1">DressRight4You Security Vault</p>
          </div>

          {/* Sizing timeline */}
          <div className="flex items-center gap-3 text-xs font-mono">
            <span className={`px-3 py-1 rounded-none border ${checkoutStep === "details" ? "bg-[#d4af37] text-black border-[#d4af37] font-bold" : "bg-[#0d0d0d] text-slate-500 border-white/5"}`}>
              1. Delivery Details
            </span>
            <span className="text-slate-700">➔</span>
            <span className={`px-3 py-1 rounded-none border ${checkoutStep === "payment" ? "bg-[#d4af37] text-black border-[#d4af37] font-bold" : "bg-[#0d0d0d] text-slate-500 border-white/5"}`}>
              2. Secure Payment
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Checkout forms column */}
          <div className="lg:col-span-7 bg-[#0a0a0a] border border-white/10 rounded-none p-6 sm:p-8 space-y-6 shadow-xl">
            
            {checkoutStep === "details" && (
              <form onSubmit={handleNextStep} className="space-y-5" id="checkout-details-form">
                <div className="space-y-1">
                  <h2 className="text-lg font-serif font-light text-white tracking-wide">1. Shipping & Courier Destination</h2>
                  <p className="text-slate-500 text-xs font-light">Orders ship via express California courier. Pre-paid tracking is included.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Recipient Name *</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Charles Sterling"
                      className="w-full bg-[#050505] border border-white/10 rounded-none px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Contact Number *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 310-555-0199"
                      className="w-full bg-[#050505] border border-white/10 rounded-none px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Billing Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. charles@gmail.com"
                    className="w-full bg-[#050505] border border-white/10 rounded-none px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                  <span className="text-[9px] text-slate-500 font-mono block">Invoice copy & shipping tracker will be emailed here.</span>
                </div>

                {/* Address Line 1 */}
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Address Line 1 *</label>
                  <input
                    type="text"
                    required
                    value={addressLine1}
                    onChange={(e) => setAddressLine1(e.target.value)}
                    placeholder="e.g. 1428 Sunset Boulevard"
                    className="w-full bg-[#050505] border border-white/10 rounded-none px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                {/* Address Line 2 */}
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Apartment, Suite, Unit</label>
                  <input
                    type="text"
                    value={addressLine2}
                    onChange={(e) => setAddressLine2(e.target.value)}
                    placeholder="e.g. Apt 4B (Optional)"
                    className="w-full bg-[#050505] border border-white/10 rounded-none px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {/* City */}
                  <div className="col-span-2 sm:col-span-2 space-y-1">
                    <label className="text-[10px] font-mono text-slate-400 uppercase">City *</label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-[#050505] border border-white/10 rounded-none px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>

                  {/* State */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-slate-400 uppercase">State *</label>
                    <input
                      type="text"
                      required
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full bg-[#050505] border border-white/10 rounded-none px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>

                  {/* Zip */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-slate-400 uppercase">Zip Code *</label>
                    <input
                      type="text"
                      required
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                      className="w-full bg-[#050505] border border-white/10 rounded-none px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => setView("shop")}
                    className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Return to Shop</span>
                  </button>

                  <button
                    type="submit"
                    className="bg-[#d4af37] hover:bg-[#b8901c] text-black font-mono font-bold text-xs uppercase tracking-widest py-3 px-8 rounded-none shadow-md transition-all cursor-pointer"
                    id="submit-shipping-details-btn"
                  >
                    Continue to Payment
                  </button>
                </div>
              </form>
            )}

            {checkoutStep === "payment" && (
              <div className="space-y-6 animate-fadeIn" id="checkout-payment-form">
                <div className="space-y-1">
                  <h2 className="text-lg font-serif font-light text-white tracking-wide">2. Secure Card Payment</h2>
                  <p className="text-slate-500 text-xs font-light">SSL Encryption Gateway. Funds are captured securely on placing order.</p>
                </div>

                {/* Payment selectors */}
                <div className="grid grid-cols-3 gap-3">
                  {["stripe", "paypal", "applepay"].map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setPaymentMethod(method)}
                      className={`py-3 px-4 rounded-none border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        paymentMethod === method
                          ? "bg-[#0d0d0d] border-[#d4af37] text-white"
                          : "bg-[#050505] border-white/10 text-slate-450 hover:border-white/20"
                      }`}
                    >
                      <CreditCard className="w-5 h-5 text-[#d4af37]" />
                      <span className="text-[10px] font-mono uppercase tracking-widest font-bold">
                        {method === "stripe" ? "Card Pay" : method === "paypal" ? "PayPal" : "Apple Pay"}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Card input forms */}
                {paymentMethod === "stripe" && (
                  <div className="space-y-4 bg-black/40 border border-white/10 rounded-none p-5 font-mono text-xs text-left">
                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-450 uppercase tracking-widest">Cardholder Name</label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full bg-[#050505] border border-white/10 rounded-none px-3 py-2 text-xs text-white focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-450 uppercase tracking-widest">Card Number</label>
                      <div className="relative">
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full bg-[#050505] border border-white/10 rounded-none px-3 py-2 text-xs text-white focus:outline-none tracking-widest font-bold"
                        />
                        <ShieldCheck className="w-4 h-4 text-emerald-400 absolute right-3 top-2.5" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-450 uppercase tracking-widest">Expiry Date</label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          placeholder="MM/YY"
                          className="w-full bg-[#050505] border border-white/10 rounded-none px-3 py-2 text-xs text-white focus:outline-none text-center"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-450 uppercase tracking-widest">Security CVV</label>
                        <input
                          type="password"
                          maxLength={4}
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          placeholder="123"
                          className="w-full bg-[#050505] border border-white/10 rounded-none px-3 py-2 text-xs text-white focus:outline-none text-center"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod !== "stripe" && (
                  <div className="p-6 bg-black/40 border border-white/10 rounded-none text-center text-xs text-slate-400 font-mono">
                    <CheckCircle2 className="w-8 h-8 text-[#d4af37] mx-auto mb-2 animate-bounce" />
                    <span>Proceeding will launch the secure {paymentMethod.toUpperCase()} portal popup upon placing your order.</span>
                  </div>
                )}

                {/* Secure trust indicators */}
                <div className="flex items-center gap-3 bg-black/40 border border-white/5 p-4.5 rounded-none text-xs text-slate-400 leading-relaxed font-sans font-light">
                  <ShieldCheck className="w-6 h-6 text-[#d4af37] flex-shrink-0" />
                  <div>
                    <strong className="text-white font-medium">California Consumer Vault Protection.</strong> Your credit card values are processed using standard off-site tokens. We never store raw CVV values on our servers.
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => setCheckoutStep("details")}
                    className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Change Delivery Address</span>
                  </button>

                  <button
                    onClick={handlePlaceOrder}
                    className="bg-emerald-500 hover:bg-emerald-650 text-black font-mono font-bold text-xs uppercase tracking-widest py-3.5 px-8 rounded-none shadow-md transition-all cursor-pointer"
                    id="place-order-final-btn"
                  >
                    Place Secure Order (${grandTotal.toFixed(2)})
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Right Column: Order summary breakdown */}
          <div className="lg:col-span-5 border border-white/10 bg-[#0a0a0a] rounded-none p-6 sticky top-32 space-y-5 shadow-xl">
            <h3 className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#d4af37] border-b border-white/10 pb-3 flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-[#d4af37]" />
              Order Summary Review
            </h3>

            {/* List of items */}
            <div className="space-y-3.5 max-h-[180px] overflow-y-auto pr-2 scrollbar-thin">
              {cart.map((item, idx) => {
                const itemPrice = item.product.salePrice || item.product.price;
                return (
                  <div key={idx} className="flex gap-3 justify-between items-center text-xs">
                    <div className="flex gap-3 items-center min-w-0">
                      <div className="w-10 h-12 rounded-none border border-white/10 bg-[#050505] flex-shrink-0">
                        <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div className="truncate text-left">
                        <strong className="text-white truncate block font-medium">{item.product.name}</strong>
                        <span className="text-[10px] text-slate-500 font-mono">
                          Size {item.selectedSize} | {item.selectedColor.name} | Qty {item.quantity}
                        </span>
                      </div>
                    </div>
                    <span className="font-mono text-slate-300 font-bold">${itemPrice * item.quantity}</span>
                  </div>
                );
              })}
            </div>

            {/* Price Calculations */}
            <div className="border-t border-white/10 pt-4 space-y-2.5 font-mono text-xs">
              <div className="flex justify-between text-slate-450">
                <span>Items Subtotal</span>
                <span className="text-white">${subtotal}</span>
              </div>

              {appliedCoupon && (
                <div className="flex justify-between text-emerald-400 font-bold">
                  <span className="flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5" />
                    Coupon Savings ({appliedCoupon.code})
                  </span>
                  <span>-${discountValue.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between text-slate-450">
                <span>Est. California Tax (8.25%)</span>
                <span className="text-white">${estimatedTax.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-slate-450">
                <span>Courier Delivery</span>
                <span className="text-white">{shippingCost === 0 ? "FREE" : `$${shippingCost}`}</span>
              </div>

              <div className="flex justify-between items-center text-sm font-bold border-t border-white/10 pt-3 text-white">
                <span className="text-[#d4af37] uppercase tracking-widest font-mono">Total Charge</span>
                <span>${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Sizing trust indicators */}
            <div className="bg-[#050505] border border-white/5 rounded-none p-3.5 text-[10px] text-slate-450 font-mono space-y-1.5 font-light">
              <div className="text-white font-bold flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Express Packing Guaranteed</span>
              </div>
              <p className="leading-normal text-slate-500 text-left">
                Orders ship from our California design center within 24 hours. Delivered directly to your door in luxurious protective clothing boxes with hanger guards.
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
