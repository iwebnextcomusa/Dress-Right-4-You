import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { Menu, X, ShoppingBag, Heart, User, Search, MapPin } from "lucide-react";
import { BRAND_STYLE } from "../data";

export default function Navbar() {
  const {
    currentView,
    setView,
    cart,
    wishlist,
    setCartOpen,
    searchQuery,
    setSearchQuery,
    setActiveCategory
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleNavClick = (view: any) => {
    setView(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (currentView !== "shop") {
      setView("shop");
    }
  };

  const handleCategoryNav = (cat: string) => {
    setActiveCategory(cat);
    setView("shop");
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#050505]/95 backdrop-blur-md border-b border-white/10 text-white shadow-md">
      {/* Top utility bar */}
      <div className="bg-[#0d0d0d] text-[10px] sm:text-xs font-mono tracking-widest text-center py-2 px-4 flex justify-between items-center max-w-7xl mx-auto border-b border-white/5">
        <div className="flex items-center gap-1.5 text-gray-400">
          <MapPin className="w-3.5 h-3.5 text-[#d4af37]" />
          <span className="uppercase tracking-widest text-[10px]">California Tailored Quality</span>
        </div>
        <div className="font-semibold text-gray-300 uppercase tracking-wider hidden sm:block text-[10px]">
          FREE US SHIPPING OVER $150 • HASSLE-FREE 30-DAY RETURNS
        </div>
        <div className="text-[#d4af37] text-[10px] uppercase tracking-widest">
          Call: {BRAND_STYLE.contact.phone}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo / Brand Name */}
          <div className="flex-shrink-0 cursor-pointer flex items-center gap-2" onClick={() => handleNavClick("home")}>
            <div className="w-9 h-9 bg-black border border-[#d4af37]/30 flex items-center justify-center shadow-lg">
              <span className="font-serif font-bold text-lg text-[#d4af37]">DR</span>
            </div>
            <div className="flex flex-col">
              <div className="text-lg sm:text-xl font-serif tracking-widest font-bold">
                DRESS<span className="text-[#d4af37]">RIGHT</span><span className="text-slate-400 font-light">4YOU</span>
              </div>
              <span className="text-[9px] font-mono tracking-[0.2em] text-gray-500 uppercase leading-none mt-1">
                Executive & Formal Wear
              </span>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex space-x-8 font-mono text-[11px] tracking-[0.2em] uppercase font-medium">
            <button
              onClick={() => handleNavClick("home")}
              className={`hover:text-white transition-colors py-2 ${
                currentView === "home" ? "text-[#d4af37] border-b border-[#d4af37]" : "text-slate-400"
              }`}
              id="nav-link-home"
            >
              Home
            </button>
            <div className="relative group py-2">
              <button
                onClick={() => handleCategoryNav("All")}
                className={`hover:text-white transition-colors flex items-center gap-1 ${
                  currentView === "shop" ? "text-[#d4af37]" : "text-slate-400"
                }`}
                id="nav-link-shop"
              >
                Shop Collection
              </button>
              {/* Desktop Submenu */}
              <div className="absolute top-full left-0 mt-1 w-48 bg-[#0a0a0a] border border-white/10 shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {["Suits", "Blazers", "Dress Shirts", "Casual Shirts", "Pants", "Accessories"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryNav(cat)}
                    className="w-full text-left px-4 py-2 text-[10px] font-mono tracking-widest uppercase text-slate-400 hover:bg-[#0d0d0d] hover:text-[#d4af37] transition-colors"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={() => handleNavClick("about")}
              className={`hover:text-white transition-colors py-2 ${
                currentView === "about" ? "text-[#d4af37] border-b border-[#d4af37]" : "text-slate-400"
              }`}
              id="nav-link-about"
            >
              Our Story
            </button>
            <button
              onClick={() => handleNavClick("contact")}
              className={`hover:text-white transition-colors py-2 ${
                currentView === "contact" ? "text-[#d4af37] border-b border-[#d4af37]" : "text-slate-400"
              }`}
              id="nav-link-contact"
            >
              Contact Us
            </button>
          </nav>

          {/* Icons and search */}
          <div className="flex items-center space-x-3 sm:space-x-5">
            {/* Search toggler */}
            <div className="relative">
              {showSearch ? (
                <div className="flex items-center bg-[#0d0d0d] border border-white/10 rounded-none px-3 py-1.5 w-48 sm:w-64 transition-all duration-300">
                  <Search className="w-4 h-4 text-[#d4af37] mr-1.5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search..."
                    className="bg-transparent text-xs text-white focus:outline-none w-full font-mono placeholder-gray-600"
                    autoFocus
                  />
                  <button onClick={() => { setShowSearch(false); setSearchQuery(""); }} className="text-gray-500 hover:text-white">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowSearch(true)}
                  className="p-1.5 text-slate-400 hover:text-[#d4af37] transition-colors rounded-none hover:bg-[#0d0d0d]"
                  aria-label="Search items"
                  id="search-toggle-btn"
                >
                  <Search className="w-5 h-5 sm:w-[22px] sm:h-[22px]" />
                </button>
              )}
            </div>

            {/* Wishlist Icon */}
            <button
              onClick={() => handleNavClick("account")}
              className="p-1.5 text-slate-400 hover:text-[#d4af37] transition-colors relative rounded-none hover:bg-[#0d0d0d]"
              aria-label="Wishlist & Account"
              id="wishlist-nav-btn"
            >
              <Heart className="w-5 h-5 sm:w-[22px] sm:h-[22px]" />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#d4af37] text-black text-[9px] font-bold rounded-none flex items-center justify-center font-mono">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Bag Icon */}
            <button
              onClick={() => setCartOpen(true)}
              className="p-1.5 text-slate-400 hover:text-[#d4af37] transition-colors relative rounded-none hover:bg-[#0d0d0d]"
              aria-label="Open Shopping Bag"
              id="shopping-bag-nav-btn"
            >
              <ShoppingBag className="w-5 h-5 sm:w-[22px] sm:h-[22px]" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#d4af37] text-black text-[9px] font-bold rounded-none flex items-center justify-center font-mono animate-pulse">
                  {cartItemsCount}
                </span>
              )}
            </button>

            {/* Account Icon */}
            <button
              onClick={() => handleNavClick("account")}
              className={`p-1.5 text-slate-400 hover:text-[#d4af37] transition-colors rounded-none hover:bg-[#0d0d0d] ${
                currentView === "account" ? "text-[#d4af37]" : ""
              }`}
              aria-label="Customer Account Area"
              id="account-nav-btn"
            >
              <User className="w-5 h-5 sm:w-[22px] sm:h-[22px]" />
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 text-slate-400 hover:text-white transition-colors"
              aria-label="Toggle Mobile Menu"
              id="mobile-menu-toggle-btn"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/10 bg-[#0a0a0a] animate-slideDown" id="mobile-nav-panel">
          <div className="px-4 pt-4 pb-6 space-y-3 font-mono text-xs tracking-[0.2em] uppercase">
            <button
              onClick={() => handleNavClick("home")}
              className={`block w-full text-left py-2.5 px-3 rounded-none ${
                currentView === "home" ? "bg-[#0d0d0d] text-[#d4af37] font-bold" : "text-slate-400 hover:bg-[#0d0d0d]"
              }`}
            >
              Home
            </button>
            <div className="space-y-1">
              <button
                onClick={() => handleCategoryNav("All")}
                className={`block w-full text-left py-2.5 px-3 rounded-none font-bold ${
                  currentView === "shop" ? "bg-[#0d0d0d] text-[#d4af37]" : "text-slate-400 hover:bg-[#0d0d0d]"
                }`}
              >
                Shop Collections
              </button>
              <div className="pl-6 grid grid-cols-2 gap-1.5 py-1">
                {["Suits", "Blazers", "Dress Shirts", "Casual Shirts", "Pants", "Accessories"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryNav(cat)}
                    className="text-left py-1.5 text-[10px] text-slate-500 hover:text-white"
                  >
                    • {cat}
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={() => handleNavClick("about")}
              className={`block w-full text-left py-2.5 px-3 rounded-none ${
                currentView === "about" ? "bg-[#0d0d0d] text-[#d4af37] font-bold" : "text-slate-400 hover:bg-[#0d0d0d]"
              }`}
            >
              Our Story
            </button>
            <button
              onClick={() => handleNavClick("contact")}
              className={`block w-full text-left py-2.5 px-3 rounded-none ${
                currentView === "contact" ? "bg-[#0d0d0d] text-[#d4af37] font-bold" : "text-slate-400 hover:bg-[#0d0d0d]"
              }`}
            >
              Contact Us
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
