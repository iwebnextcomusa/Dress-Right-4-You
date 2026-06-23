import { useState, useEffect } from "react";
import { AppProvider, useApp } from "./context/AppContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ShopPage from "./components/ShopPage";
import ProductDetailModal from "./components/ProductDetailModal";
import AboutPage from "./components/AboutPage";
import ContactPage from "./components/ContactPage";
import ShoppingCart from "./components/ShoppingCart";
import Checkout from "./components/Checkout";
import OrderSuccess from "./components/OrderSuccess";
import AccountArea from "./components/AccountArea";
import ChatbotWidget from "./components/ChatbotWidget";
import ThreeDSection from "./components/ThreeDSection";
import { ChevronUp, Facebook, Instagram, Twitter, Compass, Sparkles } from "lucide-react";
import { BRAND_STYLE } from "./data";

function MainLayout() {
  const { currentView, setView, setActiveCategory } = useApp();
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Monitor scroll height to show Scroll-to-Top Button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFooterCategory = (cat: string) => {
    setActiveCategory(cat);
    setView("shop");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col justify-between selection:bg-[#d4af37] selection:text-black font-sans antialiased">
      
      {/* Navigation Bar */}
      <Navbar />

      {/* Main Content Router */}
      <main className="flex-grow">
        {currentView === "home" && (
          <div className="animate-fadeIn">
            {/* Main immersive hero banner */}
            <Hero />

            {/* Interactive Three.js 3D Section */}
            <ThreeDSection />

            {/* Curated collections list bento segment */}
            <section className="py-20 bg-[#050505] border-t border-white/5">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                <div className="text-center space-y-3">
                  <span className="text-[10px] font-mono tracking-[0.3em] text-[#d4af37] uppercase">Sizing Mastery</span>
                  <h2 className="text-3xl sm:text-4xl font-serif font-light text-white tracking-wide">
                    Explore Our Sartorial Frameworks
                  </h2>
                  <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed font-light">
                    Choose from our executive fits tailored with premium wools and breathable cotton weaves for maximum confidence.
                  </p>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  {/* Card 1: Executive suits */}
                  <div 
                    onClick={() => handleFooterCategory("Suits")}
                    className="group bg-[#0a0a0a] border border-white/10 rounded-none overflow-hidden hover:border-[#d4af37]/40 transition-all duration-300 relative aspect-[4/3] flex flex-col justify-end p-6 cursor-pointer shadow-xl"
                  >
                    <div className="absolute inset-0 bg-cover bg-center transition-transform group-hover:scale-105 duration-500 opacity-45" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=600')" }}></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                    
                    <div className="relative z-10 space-y-2 text-left">
                      <span className="text-[10px] font-mono text-[#d4af37] uppercase tracking-wider">Super 130s Merino</span>
                      <h3 className="text-lg font-serif font-bold text-white group-hover:text-[#d4af37] transition-colors uppercase">Bespoke Suits</h3>
                      <p className="text-[11px] text-gray-400 font-sans leading-relaxed">Executive dinner blazers and corporate suits designed for boardroom dominance.</p>
                    </div>
                  </div>

                  {/* Card 2: Crisp Dress shirts */}
                  <div 
                    onClick={() => handleFooterCategory("Dress Shirts")}
                    className="group bg-[#0a0a0a] border border-white/10 rounded-none overflow-hidden hover:border-[#d4af37]/40 transition-all duration-300 relative aspect-[4/3] flex flex-col justify-end p-6 cursor-pointer shadow-xl"
                  >
                    <div className="absolute inset-0 bg-cover bg-center transition-transform group-hover:scale-105 duration-500 opacity-45" style={{ backgroundImage: "url('/src/assets/images/oxford_shirt_product_1782246787377.jpg')" }}></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                    
                    <div className="relative z-10 space-y-2 text-left">
                      <span className="text-[10px] font-mono text-[#d4af37] uppercase tracking-wider">Egyptian Cotton Giza</span>
                      <h3 className="text-lg font-serif font-bold text-white group-hover:text-[#d4af37] transition-colors uppercase">Oxford Shirts</h3>
                      <p className="text-[11px] text-gray-400 font-sans leading-relaxed">Crisp spread collars with French cuffs, engineered for easy-iron comfort.</p>
                    </div>
                  </div>

                  {/* Card 3: Casual Chinos */}
                  <div 
                    onClick={() => handleFooterCategory("Pants")}
                    className="group bg-[#0a0a0a] border border-white/10 rounded-none overflow-hidden hover:border-[#d4af37]/40 transition-all duration-300 relative aspect-[4/3] flex flex-col justify-end p-6 cursor-pointer shadow-xl"
                  >
                    <div className="absolute inset-0 bg-cover bg-center transition-transform group-hover:scale-105 duration-500 opacity-45" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=600')" }}></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                    
                    <div className="relative z-10 space-y-2 text-left">
                      <span className="text-[10px] font-mono text-[#d4af37] uppercase tracking-wider">West Coast Comfort</span>
                      <h3 className="text-lg font-serif font-bold text-white group-hover:text-[#d4af37] transition-colors uppercase">Stretch Chinos</h3>
                      <p className="text-[11px] text-gray-400 font-sans leading-relaxed">Flexible spandex sateen chinos tailored for seamless work-to-weekend transition.</p>
                    </div>
                  </div>

                </div>
              </div>
            </section>
          </div>
        )}

        {currentView === "shop" && <ShopPage />}
        {currentView === "about" && <AboutPage />}
        {currentView === "contact" && <ContactPage />}
        {currentView === "account" && <AccountArea />}
        {currentView === "checkout" && <Checkout />}
        {currentView === "order-success" && <OrderSuccess />}
      </main>

      {/* Slide-over shopping bag drawer overlay */}
      <ShoppingCart />

      {/* Interactive product details modal overlay */}
      <ProductDetailModal />

      {/* Floating Stylist chatbot widget */}
      <ChatbotWidget />

      {/* Scroll to Top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 z-40 bg-[#0d0d0d] border border-white/20 text-[#d4af37] hover:bg-[#d4af37] hover:text-black hover:border-[#d4af37] p-3.5 rounded-none shadow-2xl transition-all duration-300 animate-fadeIn cursor-pointer"
          aria-label="Scroll back to top of page"
          id="scroll-to-top-btn"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}

      {/* Footer */}
      <footer className="bg-[#0d0d0d] border-t border-white/10 text-slate-400 pt-16 pb-8" id="website-footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 text-left mb-12">
            
            {/* Grid 1: Brand details */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 cursor-pointer" onClick={() => { setView("home"); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
                <div className="w-8 h-8 bg-black border border-[#d4af37]/30 flex items-center justify-center">
                  <span className="font-serif font-bold text-sm text-[#d4af37]">DR</span>
                </div>
                <div className="text-base font-serif tracking-widest font-bold text-white">
                  DRESS<span className="text-[#d4af37]">RIGHT</span><span className="text-slate-400 font-light">4YOU</span>
                </div>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed font-sans font-light">
                DressRight4You specializes in premium, master-tailored men's executive clothing, dress shirts, and accessories tailored proudly in Southern California.
              </p>
              <div className="flex space-x-3 text-slate-600">
                <a href="#" className="hover:text-[#d4af37] transition-colors"><Facebook className="w-4 h-4" /></a>
                <a href="#" className="hover:text-[#d4af37] transition-colors"><Instagram className="w-4 h-4" /></a>
                <a href="#" className="hover:text-[#d4af37] transition-colors"><Twitter className="w-4 h-4" /></a>
              </div>
            </div>

            {/* Grid 2: Shop Category Quick Links */}
            <div className="space-y-3 font-mono text-xs">
              <h4 className="text-white font-bold uppercase tracking-[0.2em] text-[10px]">Shop Departments</h4>
              <ul className="space-y-2 text-slate-400">
                <li><button onClick={() => handleFooterCategory("Suits")} className="hover:text-white transition-colors">Bespoke Suits</button></li>
                <li><button onClick={() => handleFooterCategory("Dress Shirts")} className="hover:text-white transition-colors">Premium Dress Shirts</button></li>
                <li><button onClick={() => handleFooterCategory("Blazers")} className="hover:text-white transition-colors">Dinner Blazers</button></li>
                <li><button onClick={() => handleFooterCategory("Pants")} className="hover:text-white transition-colors">Stretch Chino Pants</button></li>
                <li><button onClick={() => handleFooterCategory("Accessories")} className="hover:text-white transition-colors">Executive Accessories</button></li>
              </ul>
            </div>

            {/* Grid 3: Customer Sizing Resources */}
            <div className="space-y-3 font-mono text-xs">
              <h4 className="text-white font-bold uppercase tracking-[0.2em] text-[10px]">Client Services</h4>
              <ul className="space-y-2 text-slate-400">
                <li><button onClick={() => { setView("contact"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="hover:text-white transition-colors">Fit Guide & Helpline</button></li>
                <li><button onClick={() => { setView("about"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="hover:text-white transition-colors">Heritage Story</button></li>
                <li><button onClick={() => { setView("contact"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="hover:text-white transition-colors">Sartorial Inquiries</button></li>
                <li><span className="text-slate-600 block">Sizing Policy backings</span></li>
              </ul>
            </div>

            {/* Grid 4: Sizing newsletter subscription */}
            <div className="space-y-4">
              <h4 className="text-white font-mono font-bold uppercase tracking-[0.2em] text-[10px]">Sartorial Bulletin</h4>
              <p className="text-xs text-slate-500 font-sans leading-normal font-light">
                Join our private gentlemen's newsletter lists for advanced sizing guides, fabric releases, and early seasonal sale access.
              </p>
              <form onSubmit={(e) => { e.preventDefault(); alert("Welcome to DressRight Gentlemen list!"); }} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter email..."
                  className="bg-[#050505] border border-white/10 rounded-none px-3 py-1.5 text-xs text-white focus:outline-none w-full font-mono placeholder-slate-600 focus:border-[#d4af37]"
                />
                <button
                  type="submit"
                  className="bg-[#d4af37] hover:bg-[#b8901c] text-black font-mono font-bold text-[10px] uppercase tracking-wider px-3.5 rounded-none transition-colors cursor-pointer"
                >
                  Join
                </button>
              </form>
            </div>

          </div>

          {/* Bottom centered copyrights and Developed by iWebNext */}
          <div className="border-t border-white/10 pt-8 flex flex-col items-center justify-center text-center text-xs space-y-4 font-mono">
            <div className="flex flex-wrap items-center justify-center gap-4 text-slate-500">
              <span>© {new Date().getFullYear()} DressRight4You, Inc. California, USA.</span>
              <span className="hidden sm:inline">•</span>
              <span>All rights reserved.</span>
              <span className="hidden sm:inline">•</span>
              <span>Phone: {BRAND_STYLE.contact.phone}</span>
              <span className="hidden sm:inline">•</span>
              <span>Email: {BRAND_STYLE.contact.email}</span>
            </div>

            <div className="text-gray-500 text-xs">
              Developed by <a href="https://iwebnext.com" target="_blank" rel="noopener noreferrer" className="text-[#d4af37] hover:underline font-bold transition-all">iWebNext</a>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
