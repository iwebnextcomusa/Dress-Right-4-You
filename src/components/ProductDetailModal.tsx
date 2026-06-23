import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { X, Heart, ShoppingBag, Star, Sparkles, Check, ShieldCheck, Ruler, Calendar } from "lucide-react";

export default function ProductDetailModal() {
  const {
    selectedProduct,
    setSelectedProduct,
    addToCart,
    toggleWishlist,
    isInWishlist
  } = useApp();

  if (!selectedProduct) return null;

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState(selectedProduct.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(selectedProduct.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"specs" | "reviews">("specs");

  // Custom reviews addition simulation
  const [newReviewUser, setNewReviewUser] = useState("");
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewText, setNewReviewText] = useState("");
  const [customReviews, setCustomReviews] = useState<typeof selectedProduct.reviews>(selectedProduct.reviews);

  const handleClose = () => {
    setSelectedProduct(null);
  };

  const handleAddToCart = () => {
    addToCart(selectedProduct, selectedSize, selectedColor, quantity);
    setSelectedProduct(null);
  };

  const inWish = isInWishlist(selectedProduct.id);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewUser || !newReviewText) return;

    const addedReview = {
      id: `rev-${Date.now()}`,
      username: newReviewUser,
      rating: newReviewRating,
      date: new Date().toISOString().split("T")[0],
      text: newReviewText,
      verified: true
    };

    setCustomReviews((prev) => [addedReview, ...prev]);
    setNewReviewUser("");
    setNewReviewText("");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
      <div 
        className="relative bg-[#0a0a0a] border border-white/10 text-white rounded-none w-full max-w-5xl shadow-2xl overflow-hidden animate-zoomIn flex flex-col max-h-[90vh]"
        id="product-detail-dialog"
      >
        {/* Top close bar */}
        <div className="flex justify-between items-center p-6 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#d4af37]"></span>
            <span className="text-[10px] font-mono uppercase text-slate-400 tracking-widest">{selectedProduct.category} Catalog Item</span>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-none bg-[#050505] border border-white/10 text-slate-400 hover:text-white hover:border-white/30 transition-all cursor-pointer"
            id="close-detail-modal-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable contents */}
        <div className="overflow-y-auto p-6 md:p-8 flex-grow scrollbar-thin">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Left Column: Image slider */}
            <div className="md:col-span-6 space-y-4">
              
              {/* Main Image Frame */}
              <div className="relative rounded-none overflow-hidden border border-white/10 bg-black aspect-[4/5] shadow-inner">
                <img
                  src={selectedProduct.images[activeImageIdx]}
                  alt={`${selectedProduct.name} viewing frame`}
                  className="w-full h-full object-cover transition-all duration-350"
                  referrerPolicy="no-referrer"
                />
                
                {/* Floating tags */}
                {selectedProduct.salePrice && (
                  <span className="absolute top-4 left-4 bg-[#0d0d0d] text-[#d4af37] border border-[#d4af37]/40 text-[9px] font-mono font-bold uppercase tracking-widest py-1 px-3 rounded-none">
                    Special Offer
                  </span>
                )}
              </div>

              {/* Thumbnails Grid */}
              <div className="grid grid-cols-3 gap-3.5">
                {selectedProduct.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`rounded-none overflow-hidden border aspect-[4/5] bg-black transition-all cursor-pointer ${
                      activeImageIdx === idx ? "border-[#d4af37] ring-1 ring-[#d4af37]" : "border-white/10 hover:border-white/30"
                    }`}
                  >
                    <img src={img} alt={`Thumbnail view ${idx + 1}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>

            </div>

            {/* Right Column: Garment selection fields */}
            <div className="md:col-span-6 flex flex-col justify-between space-y-6">
              
              <div className="space-y-4">
                
                {/* Titles */}
                <div className="space-y-1">
                  <h2 className="text-2xl sm:text-3xl font-serif font-light tracking-wide text-white">
                    {selectedProduct.name}
                  </h2>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <div className="flex text-[#d4af37]">
                        <Star className="w-3.5 h-3.5 fill-[#d4af37] text-[#d4af37]" />
                      </div>
                      <span className="text-xs font-bold text-[#d4af37]">{selectedProduct.rating}</span>
                      <span className="text-[11px] text-slate-500 font-mono">({customReviews.length} Verified Reviews)</span>
                    </div>
                    <span className="text-[10px] text-[#d4af37] font-mono uppercase bg-black border border-white/10 py-0.5 px-2 rounded-none tracking-widest">
                      In Stock
                    </span>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-3.5 py-2 border-t border-b border-white/10">
                  {selectedProduct.salePrice ? (
                    <>
                      <span className="text-2xl font-bold text-white">${selectedProduct.salePrice}</span>
                      <span className="text-sm text-slate-550 line-through font-mono">${selectedProduct.price}</span>
                      <span className="text-[10px] text-red-400 font-mono font-bold uppercase bg-red-950/10 border border-red-950/40 py-0.5 px-2 rounded-none">
                        Save ${selectedProduct.price - selectedProduct.salePrice}
                      </span>
                    </>
                  ) : (
                    <span className="text-2xl font-bold text-white">${selectedProduct.price}</span>
                  )}
                </div>

                {/* Main brief */}
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light">
                  {selectedProduct.description}
                </p>

                {/* Color Selector */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-[10px] font-mono text-slate-550 uppercase tracking-widest">Select Shade</span>
                    <span className="text-xs font-bold text-[#d4af37]">{selectedColor.name}</span>
                  </div>
                  <div className="flex gap-2.5">
                    {selectedProduct.colors.map((color) => {
                      const isActive = selectedColor.hex === color.hex;
                      return (
                        <button
                          key={color.hex}
                          onClick={() => setSelectedColor(color)}
                          className={`w-8 h-8 rounded-none border flex items-center justify-center transition-all cursor-pointer ${
                            isActive ? "border-white ring-2 ring-[#d4af37] scale-105" : "border-white/10 hover:border-white/30 hover:scale-105"
                          }`}
                          style={{ backgroundColor: color.hex }}
                          title={color.name}
                        >
                          {isActive && (
                            <Check className={`w-3.5 h-3.5 ${color.hex === "#ffffff" ? "text-black" : "text-white"}`} />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Size Selector */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono text-slate-550 uppercase tracking-widest">Select Size</span>
                    <button className="text-[10px] text-slate-400 hover:text-[#d4af37] font-mono flex items-center gap-1 cursor-pointer">
                      <Ruler className="w-3 h-3" />
                      Size Calculator Guide
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.sizes.map((sz) => {
                      const isActive = selectedSize === sz;
                      return (
                        <button
                          key={sz}
                          onClick={() => setSelectedSize(sz)}
                          className={`px-3 py-2 rounded-none border text-xs font-mono font-bold transition-all cursor-pointer ${
                            isActive
                              ? "bg-[#d4af37] text-black border-[#d4af37] scale-105"
                              : "bg-[#050505] border-white/10 text-slate-300 hover:border-white/30"
                          }`}
                        >
                          {sz}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Quantity adjustment */}
                <div className="flex items-center gap-4 py-2">
                  <span className="text-[10px] font-mono text-slate-555 uppercase tracking-widest">Qty</span>
                  <div className="flex items-center bg-[#050505] border border-white/10 rounded-none">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-1 text-slate-400 hover:text-white transition-colors font-bold font-mono text-sm cursor-pointer"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 font-mono text-xs font-bold text-white min-w-8 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-1 text-slate-400 hover:text-white transition-colors font-bold font-mono text-sm cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

              </div>

              {/* Action triggers */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/10">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-2 bg-[#d4af37] hover:bg-[#b8901c] text-black font-mono font-bold text-xs uppercase tracking-widest py-4 rounded-none shadow-lg transition-colors cursor-pointer"
                  id="modal-add-to-cart-btn"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add To Shopping Bag</span>
                </button>

                <button
                  onClick={() => toggleWishlist(selectedProduct)}
                  className={`px-4 py-4 rounded-none border font-mono font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                    inWish
                      ? "bg-red-950/10 text-red-500 border-red-950"
                      : "bg-[#050505] border-white/10 text-slate-400 hover:bg-white/5 hover:border-white/30"
                  }`}
                  id="modal-wishlist-toggle-btn"
                >
                  <Heart className={`w-4 h-4 ${inWish ? "fill-red-500" : ""}`} />
                  <span>{inWish ? "Saved" : "Save to Wishlist"}</span>
                </button>
              </div>

            </div>

          </div>

          {/* Bottom Specifications vs Reviews Tabs */}
          <div className="mt-12 border-t border-white/10 pt-8">
            <div className="flex border-b border-white/10 mb-6 font-mono text-xs uppercase tracking-widest">
              <button
                onClick={() => setActiveTab("specs")}
                className={`pb-3 px-1 border-b-2 font-bold transition-all mr-6 cursor-pointer ${
                  activeTab === "specs" ? "text-[#d4af37] border-[#d4af37]" : "text-slate-500 border-transparent hover:text-slate-300"
                }`}
                id="tab-specs-trigger"
              >
                Specifications & Materials
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`pb-3 px-1 border-b-2 font-bold transition-all cursor-pointer ${
                  activeTab === "reviews" ? "text-[#d4af37] border-[#d4af37]" : "text-slate-500 border-transparent hover:text-slate-300"
                }`}
                id="tab-reviews-trigger"
              >
                Customer Reviews ({customReviews.length})
              </button>
            </div>

            {/* Spec details tab */}
            {activeTab === "specs" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs font-mono" id="tab-content-specs">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-slate-500 uppercase tracking-widest font-bold text-[9px]">Composition</h4>
                    <p className="text-white mt-1 text-xs font-light">{selectedProduct.material}</p>
                  </div>
                  <div>
                    <h4 className="text-slate-500 uppercase tracking-widest font-bold text-[9px]">Care Instructions</h4>
                    <p className="text-white mt-1 text-xs font-light">{selectedProduct.care}</p>
                  </div>
                  <div className="flex items-center gap-2 bg-[#050505] border border-white/10 p-3 rounded-none text-slate-400">
                    <ShieldCheck className="w-5 h-5 text-[#d4af37]" />
                    <span className="text-[10px] uppercase tracking-widest text-[#d4af37] font-bold">California Designer Studio Certified Fit</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-slate-500 uppercase tracking-widest font-bold text-[9px] mb-2">Key Highlights</h4>
                  <ul className="space-y-1.5 list-disc list-inside text-slate-300">
                    {selectedProduct.details.map((detail, index) => (
                      <li key={index} className="text-xs font-sans leading-relaxed font-light">{detail}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Reviews tab */}
            {activeTab === "reviews" && (
              <div className="space-y-8" id="tab-content-reviews">
                {/* List */}
                <div className="space-y-4">
                  {customReviews.map((rev) => (
                    <div key={rev.id} className="bg-[#050505] border border-white/10 rounded-none p-5 space-y-3">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-none bg-[#0d0d0d] border border-white/10 text-[#d4af37] font-bold flex items-center justify-center text-xs font-mono">
                            {rev.username[0].toUpperCase()}
                          </div>
                          <div>
                            <span className="text-xs font-bold text-white block">{rev.username}</span>
                            <span className="text-[10px] text-slate-550 font-mono flex items-center gap-1.5">
                              <Calendar className="w-3 h-3 text-[#d4af37]" />
                              {rev.date}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3.5 h-3.5 ${
                                i < rev.rating ? "fill-[#d4af37] text-[#d4af37]" : "text-slate-800"
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light">{rev.text}</p>
                      
                      {rev.verified && (
                        <span className="inline-flex items-center gap-1 text-[9px] text-emerald-400 font-mono uppercase font-bold bg-emerald-950/10 px-2 py-0.5 rounded-none border border-emerald-950/30">
                          Verified Sizing Purchase
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                {/* Add Review Form */}
                <form onSubmit={handleAddReview} className="bg-[#050505] border border-white/10 rounded-none p-6 space-y-4">
                  <h4 className="text-xs font-bold font-mono text-white uppercase tracking-widest flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#d4af37]" />
                    Write A Client Review
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">Your Name</label>
                      <input
                        type="text"
                        required
                        value={newReviewUser}
                        onChange={(e) => setNewReviewUser(e.target.value)}
                        placeholder="e.g. Johnathan S."
                        className="w-full bg-[#0a0a0a] border border-white/10 rounded-none px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">Sizing Star Rating</label>
                      <div className="flex gap-1.5 pt-1.5">
                        {[1, 2, 3, 4, 5].map((stars) => (
                          <button
                            key={stars}
                            type="button"
                            onClick={() => setNewReviewRating(stars)}
                            className="text-[#d4af37] hover:scale-110 transition-transform cursor-pointer"
                          >
                            <Star className={`w-5 h-5 ${stars <= newReviewRating ? "fill-[#d4af37]" : ""}`} />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">Review Feedback</label>
                    <textarea
                      required
                      value={newReviewText}
                      onChange={(e) => setNewReviewText(e.target.value)}
                      placeholder="Tell us about the sleeve length, fabric feel, over-shoulder drape, or chest alignment..."
                      className="w-full bg-[#0a0a0a] border border-white/10 rounded-none px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37] h-24"
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-[#d4af37] hover:bg-[#b8901c] text-black text-[10px] font-mono font-bold uppercase tracking-widest py-2.5 px-6 rounded-none transition-colors cursor-pointer"
                  >
                    Submit Sizing Review
                  </button>
                </form>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
