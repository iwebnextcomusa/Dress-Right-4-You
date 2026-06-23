import React, { useState, useMemo } from "react";
import { useApp } from "../context/AppContext";
import { Product } from "../types";
import { Search, SlidersHorizontal, Heart, ShoppingCart, Star, Sparkles, FilterX } from "lucide-react";

export default function ShopPage() {
  const {
    products,
    setSelectedProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
    searchQuery,
    setSearchQuery,
    activeCategory,
    setActiveCategory,
    sortBy,
    setSortBy
  } = useApp();

  const [priceRange, setPriceRange] = useState<number>(500);
  const [showFilters, setShowFilters] = useState(false);

  const categories = useMemo(() => {
    return ["All", "Suits", "Blazers", "Dress Shirts", "Casual Shirts", "Pants", "Accessories"];
  }, []);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesCategory = activeCategory === "All" || p.category === activeCategory;
        const matchesSearch =
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
        
        const price = p.salePrice || p.price;
        const matchesPrice = price <= priceRange;

        return matchesCategory && matchesSearch && matchesPrice;
      })
      .sort((a, b) => {
        const pA = a.salePrice || a.price;
        const pB = b.salePrice || b.price;

        if (sortBy === "price-low-high") return pA - pB;
        if (sortBy === "price-high-low") return pB - pA;
        if (sortBy === "rating") return b.rating - a.rating;
        // Default to "featured" / isBestseller first
        return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
      });
  }, [products, activeCategory, searchQuery, priceRange, sortBy]);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    // Use default first size and color
    const defaultSize = product.sizes[0];
    const defaultColor = product.colors[0];
    addToCart(product, defaultSize, defaultColor, 1);
  };

  return (
    <div className="bg-[#050505] text-white py-12 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page title section */}
        <div className="text-center space-y-3 mb-10">
          <span className="text-[10px] font-mono tracking-[0.3em] text-[#d4af37] uppercase">The Wardrobe Matrix</span>
          <h1 className="text-3xl sm:text-4xl font-serif font-light tracking-wide">
            Shop Premium Men's Collection
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed font-light">
            Discover tailored sophistication. Filter our exclusive range of Super 130s Italian Wool suits, Egyptian cotton shirts, and sleek executive accessories.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Filters Sidebar - Desktop */}
          <div className="hidden lg:block space-y-6">
            <div className="border border-white/10 bg-[#0a0a0a] rounded-none p-5 sticky top-32 space-y-6">
              
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="font-mono text-xs font-bold tracking-wider uppercase text-white flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#d4af37]" />
                  Filters
                </span>
                {(activeCategory !== "All" || searchQuery !== "" || priceRange < 500) && (
                  <button
                    onClick={() => {
                      setActiveCategory("All");
                      setSearchQuery("");
                      setPriceRange(500);
                    }}
                    className="text-[10px] font-mono text-[#d4af37] hover:underline transition-colors cursor-pointer"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Search Bar inside Sidebar */}
              <div className="space-y-2">
                <label className="text-[10px] font-mono text-slate-450 uppercase tracking-widest">Search Keyword</label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search suits, colors..."
                    className="w-full bg-[#050505] border border-white/10 rounded-none px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37] font-mono placeholder-slate-600"
                  />
                  <Search className="w-3.5 h-3.5 text-slate-500 absolute right-3 top-3" />
                </div>
              </div>

              {/* Categories */}
              <div className="space-y-2">
                <label className="text-[10px] font-mono text-slate-450 uppercase tracking-widest">Categories</label>
                <div className="flex flex-col gap-1">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`w-full text-left py-1.5 px-2.5 rounded-none text-xs font-mono tracking-wider transition-colors cursor-pointer ${
                        activeCategory === cat
                          ? "bg-[#0d0d0d] text-[#d4af37] border-l-2 border-[#d4af37] font-bold"
                          : "text-slate-450 hover:bg-[#050505] hover:text-white"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[10px] font-mono text-slate-450 uppercase tracking-widest">
                  <span>Max Budget</span>
                  <span className="text-[#d4af37] font-bold">${priceRange}</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="500"
                  step="10"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full h-1 bg-white/10 rounded-none appearance-none cursor-pointer accent-[#d4af37]"
                />
                <div className="flex justify-between text-[9px] text-slate-650 font-mono">
                  <span>$50</span>
                  <span>$500</span>
                </div>
              </div>

              {/* Sorting options */}
              <div className="space-y-2">
                <label className="text-[10px] font-mono text-slate-450 uppercase tracking-widest">Sort Matrix</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full bg-[#050505] border border-white/10 rounded-none px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37] font-mono"
                  id="desktop-sort-select"
                >
                  <option value="featured">Best Matches</option>
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-high-low">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>

              {/* Helpful Sizing Note */}
              <div className="bg-[#050505] border border-white/5 rounded-none p-3 text-[10px] text-slate-450 leading-relaxed font-mono">
                <span className="text-white font-medium block mb-1">Need styling advice?</span>
                Talk to our AI fashion specialist in the bottom right corner for immediate tailoring guides and visual pairings!
              </div>

            </div>
          </div>

          {/* Product Grid and Mobile filters bar */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Mobile filter toggler bar */}
            <div className="lg:hidden flex flex-col sm:flex-row gap-4 justify-between items-center bg-[#0a0a0a] border border-white/10 rounded-none p-4">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#d4af37]" />
                <span className="text-xs font-mono font-bold uppercase">Filter Controls</span>
              </div>
              
              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex-1 sm:flex-initial text-center bg-black border border-white/10 rounded-none px-4 py-2 text-xs font-mono hover:border-gray-600 cursor-pointer text-slate-300"
                  id="mobile-filters-toggle-btn"
                >
                  {showFilters ? "Hide Panel" : "Show Filters"}
                </button>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="flex-1 sm:flex-initial bg-black border border-white/10 rounded-none px-3 py-2 text-xs text-white focus:outline-none font-mono"
                  id="mobile-sort-select"
                >
                  <option value="featured">Best Matches</option>
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-high-low">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>
            </div>

            {/* Mobile Filters Panel */}
            {showFilters && (
              <div className="lg:hidden bg-[#0a0a0a] border border-white/10 rounded-none p-5 space-y-5 animate-slideDown" id="mobile-filters-panel">
                {/* Search */}
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Search</label>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search keywords..."
                    className="w-full bg-[#050505] border border-white/10 rounded-none px-3 py-2 text-xs text-white font-mono"
                  />
                </div>

                {/* Categories */}
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Category</label>
                  <div className="flex flex-wrap gap-1.5">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => {
                          setActiveCategory(cat);
                          setShowFilters(false);
                        }}
                        className={`py-1 px-2.5 rounded-none text-[11px] font-mono transition-colors cursor-pointer ${
                          activeCategory === cat
                            ? "bg-[#d4af37] text-black font-bold"
                            : "bg-[#050505] text-slate-400 border border-white/5"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Budget */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                    <span>Budget Limit</span>
                    <span className="text-[#d4af37] font-bold">${priceRange}</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="500"
                    step="10"
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                    className="w-full h-1 bg-white/10 rounded-none appearance-none cursor-pointer accent-[#d4af37]"
                  />
                </div>
              </div>
            )}

            {/* Product count indicator */}
            <div className="flex justify-between items-center text-xs font-mono text-gray-500">
              <div>
                Showing <strong className="text-gray-300">{filteredProducts.length}</strong> luxurious styles
              </div>
              {activeCategory !== "All" && (
                <div>
                  Category: <strong className="text-[#d4af37]">{activeCategory}</strong>
                </div>
              )}
            </div>

            {/* Products grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((p) => {
                  const onSale = p.salePrice && p.salePrice < p.price;
                  const currentPrice = p.salePrice || p.price;
                  const inWish = isInWishlist(p.id);

                  return (
                    <div
                      key={p.id}
                      onClick={() => handleProductClick(p)}
                      className="group bg-[#0a0a0a] border border-white/10 rounded-none overflow-hidden hover:border-[#d4af37]/45 transition-all duration-300 shadow-xl flex flex-col cursor-pointer"
                      id={`product-card-${p.id}`}
                    >
                      {/* Product imagery */}
                      <div className="relative overflow-hidden aspect-[4/5] bg-black">
                        <img
                          src={p.images[0]}
                          alt={p.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          referrerPolicy="no-referrer"
                        />
                        
                        {/* Hover support for second image */}
                        {p.images[1] && (
                          <img
                            src={p.images[1]}
                            alt={`${p.name} detail view`}
                            className="w-full h-full object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                            referrerPolicy="no-referrer"
                          />
                        )}

                        {/* Top corner tags */}
                        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                          {p.isBestseller && (
                            <span className="bg-black text-white border border-[#d4af37]/40 text-[9px] font-mono font-bold uppercase tracking-widest py-1 px-2">
                              Bestseller
                            </span>
                          )}
                          {p.isNewArrival && (
                            <span className="bg-[#d4af37] text-black text-[9px] font-mono font-bold uppercase tracking-widest py-1 px-2">
                              New Style
                            </span>
                          )}
                          {onSale && (
                            <span className="bg-red-950 text-red-200 border border-red-800 text-[9px] font-mono font-bold uppercase tracking-widest py-1 px-2">
                              Sale
                            </span>
                          )}
                        </div>

                        {/* Top right wishlist button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleWishlist(p);
                          }}
                          className="absolute top-3 right-3 p-2 rounded-none bg-black/80 border border-white/10 text-slate-400 hover:text-[#d4af37] z-10 transition-colors"
                          aria-label="Add to Wishlist"
                          id={`wishlist-btn-${p.id}`}
                        >
                          <Heart className={`w-4 h-4 ${inWish ? "fill-[#d4af37] text-[#d4af37]" : ""}`} />
                        </button>

                        {/* Quick View Tag on bottom overlay */}
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/40 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <span className="bg-[#d4af37] text-black text-[10px] font-mono font-bold uppercase tracking-widest px-4 py-2 rounded-none shadow-lg transition-all duration-300 hover:bg-[#b8901c]">
                            Bespoke Styling Details
                          </span>
                        </div>
                      </div>

                      {/* Product metadata description */}
                      <div className="p-4 flex-grow flex flex-col justify-between space-y-3">
                        <div className="space-y-1">
                          <span className="text-[9px] text-[#d4af37] font-mono uppercase tracking-widest block">{p.category}</span>
                          <h3 className="text-sm font-serif font-medium tracking-wide text-white group-hover:text-[#d4af37] transition-colors leading-snug">
                            {p.name}
                          </h3>
                        </div>

                        {/* Rating block */}
                        <div className="flex items-center gap-1.5">
                          <div className="flex text-[#d4af37]">
                            <Star className="w-3 h-3 fill-[#d4af37] text-[#d4af37]" />
                          </div>
                          <span className="text-[11px] text-slate-400 font-semibold">{p.rating}</span>
                          <span className="text-[10px] text-slate-600 font-mono">({p.reviewsCount})</span>
                        </div>

                        {/* Pricing and quick add */}
                        <div className="flex items-center justify-between pt-2 border-t border-white/5">
                          <div className="flex items-baseline gap-2">
                            <span className="text-sm font-semibold text-white font-mono">${currentPrice}</span>
                            {onSale && (
                              <span className="text-xs text-slate-600 line-through font-mono">${p.price}</span>
                            )}
                          </div>

                          <button
                            onClick={(e) => handleQuickAdd(e, p)}
                            className="bg-[#050505] hover:bg-[#d4af37] hover:text-black p-2.5 rounded-none border border-white/10 text-[#d4af37] transition-all flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-widest"
                            title="Quick Add First Size/Color"
                            id={`quick-add-btn-${p.id}`}
                          >
                            <ShoppingCart className="w-3.5 h-3.5" />
                            <span>Quick Add</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-20 bg-[#0a0a0a] border border-white/10 rounded-none space-y-4" id="no-products-view">
                <FilterX className="w-12 h-12 text-slate-500 mx-auto" />
                <h3 className="text-lg font-bold font-serif">No Tailored Outfits Match</h3>
                <p className="text-slate-400 text-xs max-w-sm mx-auto leading-relaxed font-light">
                  We couldn't find any premium garments matching your current search parameters. Try adjusting your price budget or changing categories.
                </p>
                <button
                  onClick={() => {
                    setActiveCategory("All");
                    setSearchQuery("");
                    setPriceRange(500);
                  }}
                  className="bg-[#d4af37] hover:bg-[#b8901c] text-black font-mono font-bold text-xs uppercase tracking-widest py-2.5 px-6 rounded-none transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}
