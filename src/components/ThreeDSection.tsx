import { useState, useRef, MouseEvent } from "react";
import { Sparkles, Compass, ShieldCheck } from "lucide-react";

export default function ThreeDSection() {
  const [activeTab, setActiveTab] = useState<"fabric" | "geometry" | "tailoring">("fabric");
  const containerRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    // Calculate relative mouse position from center (-0.5 to 0.5)
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * -20; // 20px max translate
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
    setCoords({ x, y });
  };

  const handleMouseLeave = () => {
    setCoords({ x: 0, y: 0 });
  };

  return (
    <section id="three-d-section" className="py-20 bg-[#050505] relative overflow-hidden text-white border-t border-b border-white/10">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.05),transparent_70%)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Interactive Picture Frame */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center relative">
            <div 
              ref={containerRef} 
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="w-full h-[450px] rounded-none bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 relative overflow-hidden group cursor-pointer shadow-2xl"
              id="three-canvas-container"
            >
              {/* 3D Parallax Image */}
              <img
                src="/src/assets/images/bespoke_tailoring_business_model_1782247560545.jpg"
                alt="Executive Bespoke Tailoring Studio"
                className="absolute inset-0 w-[110%] h-[110%] -left-[5%] -top-[5%] object-cover transition-transform duration-300 ease-out opacity-80 group-hover:opacity-95"
                style={{
                  transform: `translate3d(${coords.x}px, ${coords.y}px, 0) scale(1.05)`,
                }}
                referrerPolicy="no-referrer"
                id="business-model-picture"
              />

              {/* High Contrast Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent pointer-events-none"></div>

              {/* Glassmorphism Title Tag */}
              <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md border border-[#d4af37]/30 rounded-none py-1.5 px-4 text-[10px] font-mono tracking-widest text-[#d4af37] flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#d4af37] animate-pulse"></span>
                CALIFORNIA TAILORING STUDIO
              </div>

              {/* Interaction Instructions Hint */}
              <div className="absolute bottom-4 left-4 right-4 text-center pointer-events-none text-[10px] text-slate-450 font-mono tracking-widest uppercase opacity-80 group-hover:opacity-100 transition-opacity">
                Move cursor over studio window to explore active workspace depth
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Tailoring Features */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] tracking-[0.3em] text-[#d4af37] uppercase font-mono">Bespoke Fit Matrix</span>
              <h2 className="text-3xl sm:text-4xl font-serif font-light tracking-wide text-white leading-tight">
                Our Digital Wardrobe <br />
                <span className="italic font-normal">Structured to Fit</span>
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed font-light">
                Experience DressRight4You's revolutionary mathematical sizing framework. Inspired by bespoke tailoring traditions, we apply digital precision to guarantee perfect fits.
              </p>
            </div>

            {/* Feature Tabs */}
            <div className="bg-[#0a0a0a] border border-white/10 rounded-none p-4 space-y-4 shadow-xl">
              <div className="flex border-b border-white/10">
                <button
                  onClick={() => setActiveTab("fabric")}
                  className={`flex-1 pb-2.5 text-[11px] font-mono tracking-widest uppercase text-center transition-colors border-b cursor-pointer ${
                    activeTab === "fabric" ? "text-[#d4af37] border-[#d4af37]" : "text-slate-500 border-transparent hover:text-gray-300"
                  }`}
                  id="tab-btn-fabric"
                >
                  Super-130s Wool
                </button>
                <button
                  onClick={() => setActiveTab("geometry")}
                  className={`flex-1 pb-2.5 text-[11px] font-mono tracking-widest uppercase text-center transition-colors border-b cursor-pointer ${
                    activeTab === "geometry" ? "text-[#d4af37] border-[#d4af37]" : "text-slate-500 border-transparent hover:text-gray-300"
                  }`}
                  id="tab-btn-geometry"
                >
                  3D Geometry
                </button>
                <button
                  onClick={() => setActiveTab("tailoring")}
                  className={`flex-1 pb-2.5 text-[11px] font-mono tracking-widest uppercase text-center transition-colors border-b cursor-pointer ${
                    activeTab === "tailoring" ? "text-[#d4af37] border-[#d4af37]" : "text-slate-500 border-transparent hover:text-gray-300"
                  }`}
                  id="tab-btn-tailoring"
                >
                  Lining Details
                </button>
              </div>

              {/* Tab Content */}
              {activeTab === "fabric" && (
                <div className="space-y-3 animate-fadeIn" id="tab-content-fabric">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-[#d4af37]/10 rounded-none text-[#d4af37] mt-0.5">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">Italian Merino Wool Blend</h4>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed font-light font-sans">
                        Pure Super-130s Merino fibers imported from Biella, Italy. Provides natural temperature regulation, exquisite drape, and absolute luxury feel.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "geometry" && (
                <div className="space-y-3 animate-fadeIn" id="tab-content-geometry">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-slate-800 rounded-none text-slate-300 mt-0.5">
                      <Compass className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">Drape Stability Analysis</h4>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed font-light font-sans">
                        Every jacket features half-canvas chest pieces that naturally adjust to your chest geometry with wear, creating a customized athletic posture over time.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "tailoring" && (
                <div className="space-y-3 animate-fadeIn" id="tab-content-tailoring">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-emerald-550/10 rounded-none text-emerald-400 mt-0.5">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">Silk-Satin Double Venting</h4>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed font-light font-sans">
                        Dual rear vent construction ensures optimal movement flexibility. Fully silk-lined sleeves reduce friction, allowing effortless arm glide and natural fit contours.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-4 bg-[#0d0d0d] border border-white/10 rounded-none p-4">
              <div className="text-3xl text-[#d4af37] font-serif font-bold">100%</div>
              <div className="text-xs text-slate-400 leading-relaxed font-light">
                <strong className="text-white font-medium">California Tailoring Satisfaction.</strong> If it doesn't fit perfectly, our 30-day exchange and prepaid labels ensure absolute confidence in choosing your correct fit.
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
