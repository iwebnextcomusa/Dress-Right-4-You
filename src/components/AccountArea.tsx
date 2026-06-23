import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { User, ShoppingBag, Heart, ShieldCheck, Mail, Phone, MapPin, Trash2, ArrowRight } from "lucide-react";

export default function AccountArea() {
  const {
    profile,
    updateProfile,
    orders,
    wishlist,
    toggleWishlist,
    addToCart,
    setView
  } = useApp();

  const [activeTab, setActiveTab] = useState<"profile" | "orders" | "wishlist">("profile");

  // Profile Form States
  const [fullName, setFullName] = useState(profile.fullName);
  const [email, setEmail] = useState(profile.email);
  const [phone, setPhone] = useState(profile.phone);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      ...profile,
      fullName,
      email,
      phone
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleWishlistToCart = (p: any) => {
    addToCart(p, p.sizes[0], p.colors[0], 1);
  };

  return (
    <div className="bg-[#050505] text-white py-12 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title and general header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/10 pb-6 mb-10 gap-4 text-left">
          <div className="space-y-1">
            <span className="text-[10px] font-mono tracking-widest text-[#d4af37] uppercase">Customer Portal</span>
            <h1 className="text-2xl sm:text-3xl font-serif font-light text-white tracking-wide flex items-center gap-2">
              Welcome, {profile.fullName || "Charles"}
            </h1>
            <p className="text-slate-500 text-xs font-mono">California Executive Studio Account</p>
          </div>

          <div className="flex gap-2.5 font-mono text-xs flex-wrap">
            <button
              onClick={() => setActiveTab("profile")}
              className={`px-4 py-2 rounded-none border transition-all cursor-pointer ${
                activeTab === "profile"
                  ? "bg-[#d4af37] text-black border-[#d4af37] font-bold"
                  : "bg-[#0d0d0d] border-white/10 text-slate-400 hover:border-white/30"
              }`}
              id="account-tab-profile-btn"
            >
              Profile Settings
            </button>
            <button
              onClick={() => setActiveTab("orders")}
              className={`px-4 py-2 rounded-none border transition-all relative cursor-pointer ${
                activeTab === "orders"
                  ? "bg-[#d4af37] text-black border-[#d4af37] font-bold"
                  : "bg-[#0d0d0d] border-white/10 text-slate-400 hover:border-white/30"
              }`}
              id="account-tab-orders-btn"
            >
              Order Logs ({orders.length})
            </button>
            <button
              onClick={() => setActiveTab("wishlist")}
              className={`px-4 py-2 rounded-none border transition-all cursor-pointer ${
                activeTab === "wishlist"
                  ? "bg-[#d4af37] text-black border-[#d4af37] font-bold"
                  : "bg-[#0d0d0d] border-white/10 text-slate-400 hover:border-white/30"
              }`}
              id="account-tab-wishlist-btn"
            >
              My Wishlist ({wishlist.length})
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left panel: quick credentials */}
          <div className="lg:col-span-4 bg-[#0a0a0a] border border-white/10 rounded-none p-6 text-left space-y-6">
            <div className="space-y-3 text-center">
              <div className="w-16 h-16 bg-[#050505] border border-white/10 rounded-none text-[#d4af37] flex items-center justify-center font-serif text-xl font-medium mx-auto shadow-xl">
                {fullName ? fullName[0].toUpperCase() : "C"}
              </div>
              <div>
                <strong className="text-sm text-white block font-medium">{profile.fullName}</strong>
                <span className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">{profile.email}</span>
              </div>
            </div>

            <div className="border-t border-white/10 pt-5 space-y-4 font-mono text-xs text-slate-400">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#d4af37] flex-shrink-0" />
                <span className="truncate">{profile.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#d4af37] flex-shrink-0" />
                <span>{profile.phone}</span>
              </div>
              {profile.savedAddresses && profile.savedAddresses[0] && (
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#d4af37] mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-white font-bold block mb-0.5">Primary Shipping Address</span>
                    <p className="font-light">{profile.savedAddresses[0].addressLine1}</p>
                    <p className="font-light">{profile.savedAddresses[0].city}, {profile.savedAddresses[0].state} {profile.savedAddresses[0].zipCode}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-black/40 border border-white/10 p-4 rounded-none text-[10px] text-slate-450 leading-normal font-mono flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#d4af37] flex-shrink-0" />
              <span>SSL Vault Protected Account. Access tokens are encrypted.</span>
            </div>
          </div>

          {/* Right panel: dynamic tab contents */}
          <div className="lg:col-span-8 bg-[#0a0a0a] border border-white/10 rounded-none p-6 sm:p-8 space-y-6 shadow-xl">
            
            {/* 1. Profile Editing */}
            {activeTab === "profile" && (
              <form onSubmit={handleSaveProfile} className="space-y-4 text-left" id="account-profile-form">
                <div className="space-y-1">
                  <h2 className="text-lg font-serif font-light text-white tracking-wide">Client Profile Credentials</h2>
                  <p className="text-slate-500 text-xs font-light">Update your primary coordinates for secure checkout forms autofill.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">First & Last Name</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-[#050505] border border-white/10 rounded-none px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Contact Phone</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#050505] border border-white/10 rounded-none px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#050505] border border-white/10 rounded-none px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                {saveSuccess && (
                  <p className="text-xs text-emerald-400 font-bold font-mono animate-fadeIn">✔ Profile saved successfully!</p>
                )}

                <button
                  type="submit"
                  className="bg-[#d4af37] hover:bg-[#b8901c] text-black font-mono font-bold text-xs uppercase tracking-widest py-3 px-8 rounded-none shadow-md transition-colors cursor-pointer"
                  id="save-account-profile-btn"
                >
                  Save Profile Settings
                </button>
              </form>
            )}

            {/* 2. Order History Logs */}
            {activeTab === "orders" && (
              <div className="space-y-5 text-left" id="account-orders-panel">
                <div className="space-y-1">
                  <h2 className="text-lg font-serif font-light text-white tracking-wide">Your Orders History</h2>
                  <p className="text-slate-500 text-xs font-light">Verify tracking, download invoices, and review order logs.</p>
                </div>

                {orders.length > 0 ? (
                  <div className="space-y-4">
                    {orders.map((ord) => (
                      <div key={ord.id} className="bg-[#050505] border border-white/10 rounded-none p-5 space-y-4">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/10 pb-3 gap-2 text-xs font-mono">
                          <div>
                            <span className="text-slate-500 uppercase tracking-widest block text-[9px]">Order ID</span>
                            <strong className="text-[#d4af37] font-bold">{ord.id}</strong>
                          </div>
                          <div>
                            <span className="text-slate-500 uppercase tracking-widest block text-[9px]">Purchased Date</span>
                            <span className="text-white font-bold">{ord.date}</span>
                          </div>
                          <div>
                            <span className="text-slate-500 uppercase tracking-widest block text-[9px]">Status</span>
                            <span className="text-emerald-400 font-bold uppercase">{ord.status}</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          {ord.items.map((item, i) => (
                            <div key={i} className="flex justify-between items-center text-xs font-light">
                              <span className="text-slate-300">{item.product.name} ({item.selectedSize} / {item.selectedColor.name} x {item.quantity})</span>
                              <span className="font-mono text-slate-400">${(item.product.salePrice || item.product.price) * item.quantity}</span>
                            </div>
                          ))}
                        </div>

                        <div className="flex justify-between items-center border-t border-white/10 pt-3 text-xs">
                          <span className="text-slate-500 font-mono uppercase tracking-wider">Charge Total</span>
                          <span className="font-mono font-bold text-[#d4af37] text-sm">${ord.total.toFixed(2)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-black/10 border border-white/10 rounded-none space-y-3">
                    <ShoppingBag className="w-10 h-10 text-slate-700 mx-auto" />
                    <h3 className="text-xs font-bold font-mono text-[#d4af37] uppercase tracking-widest">No Orders logged</h3>
                    <p className="text-xs text-slate-550 font-light">You have not completed any purchases under this California account.</p>
                    <button
                      onClick={() => setView("shop")}
                      className="bg-[#0d0d0d] text-white border border-white/10 text-[10px] font-mono font-bold uppercase tracking-widest py-2 px-5 rounded-none hover:bg-[#d4af37] hover:text-black hover:border-[#d4af37] transition-colors cursor-pointer"
                    >
                      Shop Executive Apparel
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* 3. Wishlist Management */}
            {activeTab === "wishlist" && (
              <div className="space-y-5 text-left" id="account-wishlist-panel">
                <div className="space-y-1">
                  <h2 className="text-lg font-serif font-light text-white tracking-wide">Your Saved Favorites</h2>
                  <p className="text-slate-500 text-xs font-light">Quickly check sizes, view colors, or add straight to shopping bag.</p>
                </div>

                {wishlist.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {wishlist.map((p) => (
                      <div key={p.id} className="flex gap-4 p-4 bg-[#050505] border border-white/10 rounded-none items-center relative group">
                        
                        {/* Image */}
                        <div className="w-16 h-20 rounded-none overflow-hidden border border-white/10 bg-black flex-shrink-0">
                          <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>

                        {/* Metadata */}
                        <div className="flex-grow space-y-1.5 min-w-0 text-left">
                          <h3 className="text-xs font-medium text-white truncate pr-6">{p.name}</h3>
                          <span className="text-[10px] text-[#d4af37] font-mono font-bold block">${p.salePrice || p.price}</span>
                          
                          <button
                            onClick={() => handleWishlistToCart(p)}
                            className="bg-[#0d0d0d] hover:bg-[#d4af37] hover:text-black text-[10px] font-mono font-bold uppercase tracking-widest py-1.5 px-3 border border-white/10 hover:border-[#d4af37] rounded-none text-white flex items-center gap-1 transition-colors cursor-pointer"
                            id={`wishlist-to-cart-btn-${p.id}`}
                          >
                            <span>Add To Bag</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Remove button */}
                        <button
                          onClick={() => toggleWishlist(p)}
                          className="absolute top-3 right-3 text-slate-500 hover:text-red-500 transition-colors cursor-pointer"
                          aria-label="Remove item"
                          id={`wishlist-remove-btn-${p.id}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-black/10 border border-white/10 rounded-none space-y-3">
                    <Heart className="w-10 h-10 text-slate-700 mx-auto animate-pulse" />
                    <h3 className="text-xs font-bold font-mono text-[#d4af37] uppercase tracking-widest">Wishlist is Empty</h3>
                    <p className="text-xs text-slate-500 font-light">Save outfits or accessories to review later during checkout.</p>
                  </div>
                )}
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
