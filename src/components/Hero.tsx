import { useApp } from "../context/AppContext";
import { Sparkles } from "lucide-react";
import { BRAND_STYLE } from "../data";

export default function Hero() {
  const { setView, setActiveCategory } = useApp();

  const handleShopNow = (cat = "All") => {
    setActiveCategory(cat);
    setView("shop");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative bg-[#050505] text-white overflow-hidden min-h-[calc(100vh-80px)] flex flex-col justify-between">
      {/* Decorative vertical/horizontal grids of the theme */}
      <div className="absolute bottom-40 left-12 h-px w-24 bg-white/10 hidden lg:block"></div>
      <div className="absolute top-1/4 left-1/2 h-48 w-px bg-white/10 hidden lg:block"></div>

      {/* Main hero segment */}
      <div className="flex-1 flex flex-col lg:flex-row items-stretch">
        
        {/* Left: Content Pane */}
        <div className="w-full lg:w-1/2 px-6 py-12 sm:p-16 lg:p-24 flex flex-col justify-center relative">
          <div className="text-[10px] uppercase tracking-[0.4em] text-[#d4af37] font-semibold mb-6">
            Spring / Summer 2026
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif leading-[1.05] mb-8 font-light text-left">
            Precision <br/>
            <span className="italic font-normal">in every</span> <br/>
            Stitch.
          </h1>
          
          <p className="text-slate-400 text-sm sm:text-base lg:text-lg max-w-md mb-10 leading-relaxed font-light text-left">
            Premium California-designed menswear for the professional who values confidence, modern sophistication, and master-tailored comfort.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-start">
            <button
              onClick={() => handleShopNow("Suits")}
              className="px-10 py-4 bg-[#d4af37] text-black uppercase tracking-widest text-xs font-bold hover:bg-[#c5a029] transition-all duration-300 cursor-pointer shadow-lg hover:shadow-[#d4af37]/10"
              id="hero-shop-suits-btn"
            >
              Shop Suits
            </button>
            <button
              onClick={() => handleShopNow("All")}
              className="px-10 py-4 border border-white/20 uppercase tracking-widest text-xs font-bold hover:bg-white hover:text-black transition-all duration-300 cursor-pointer"
              id="hero-shop-casual-btn"
            >
              The Lookbook
            </button>
          </div>
        </div>

        {/* Right: Visual Pane with Simulated High-End Image Container */}
        <div className="w-full lg:w-1/2 bg-[#0a0a0a] relative overflow-hidden flex items-center justify-center min-h-[350px] lg:min-h-0 border-t lg:border-t-0 lg:border-l border-white/10">
          <div className="absolute inset-0 bg-gradient-to-l from-black/20 via-transparent to-transparent z-10"></div>
          
          {/* Simulated High-End Image Placeholder containing actual product spotlight */}
          <div className="w-11/12 lg:w-4/5 h-[320px] lg:h-4/5 border border-white/5 flex flex-col items-center justify-center p-4 lg:p-10 relative z-20">
            <div className="w-full h-full bg-[#1a2a44] rounded-sm relative shadow-2xl overflow-hidden group">
              <img
                src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=800"
                alt="Midnight Navy Bespoke Blazer"
                className="absolute inset-0 w-full h-full object-cover opacity-55 group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent"></div>
              
              <div className="absolute bottom-8 left-8 text-left z-10">
                <div className="text-[10px] tracking-widest uppercase opacity-60 mb-1 text-slate-300 font-mono">Featured Spotlight</div>
                <div className="text-xl sm:text-2xl font-serif text-white">Midnight Navy Bespoke Blazer</div>
                <div className="text-[#d4af37] font-mono mt-2 font-semibold">$249.00</div>
              </div>
            </div>
          </div>

          {/* Vertical Accent Text */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2 [writing-mode:vertical-rl] rotate-180 text-[10px] tracking-[0.5em] text-white/20 uppercase font-mono select-none hidden lg:block">
            Exclusively Crafted In Los Angeles, CA
          </div>
        </div>
      </div>

      {/* Bottom Feature Bar */}
      <div className="bg-[#0d0d0d] border-t border-white/5 grid grid-cols-2 md:grid-cols-4 items-center px-6 lg:px-12 py-8 gap-y-6 md:gap-y-0 relative z-20">
        <div className="flex flex-col gap-1 text-left md:border-r border-white/5 md:pr-4">
          <span className="text-[#d4af37] text-xs font-bold uppercase tracking-widest font-mono">01 // SUITS</span>
          <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">Super 130s Merino</span>
        </div>
        <div className="flex flex-col gap-1 text-left md:border-r border-white/5 md:px-4">
          <span className="text-white text-xs font-bold uppercase tracking-widest font-mono">02 // SHIRTS</span>
          <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">Egyptian Giza Cotton</span>
        </div>
        <div className="flex flex-col gap-1 text-left md:border-r border-white/5 md:px-4">
          <span className="text-white text-xs font-bold uppercase tracking-widest font-mono">03 // CHINOS</span>
          <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">Sateen Stretch Fit</span>
        </div>
        <div className="flex items-center justify-start md:justify-end md:pl-4">
          <div className="text-right mr-4 font-mono">
            <div className="text-[10px] text-slate-400 uppercase tracking-widest">Trustpilot</div>
            <div className="text-[#d4af37] text-sm tracking-widest">★★★★★</div>
          </div>
          <div className="h-10 w-[1px] bg-white/10"></div>
          <div className="ml-4 text-[9px] tracking-tight leading-tight text-slate-500 text-left font-mono">
            SECURE PAYMENTS BY<br/>
            <span className="text-white font-bold uppercase">Stripe &amp; Apple Pay</span>
          </div>
        </div>
      </div>
    </div>
  );
}
