import { ShieldCheck, Sparkles, TrendingUp, Users, HeartHandshake } from "lucide-react";
import { BRAND_STYLE } from "../data";

export default function AboutPage() {
  return (
    <div className="bg-[#050505] text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Title */}
        <div className="text-center space-y-3">
          <span className="text-[10px] font-mono tracking-[0.3em] text-[#d4af37] uppercase">The Sartorial Heritage</span>
          <h1 className="text-4xl sm:text-5xl font-serif font-light tracking-wide text-white">
            About DressRight4You
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed font-light">
            We believe dressing well is a form of self-respect. Handcrafted fabrics met with digital precision.
          </p>
        </div>

        {/* Story Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-5 animate-slideRight">
            <span className="text-[10px] font-mono tracking-widest text-[#d4af37] uppercase font-bold">Est. 2018 in Los Angeles</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-light text-white tracking-wide leading-tight">
              Crafting Confidence for the Modern Gentleman
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed font-light">
              Founded in the heart of California, DressRight4You emerged from a simple observation: men are often forced to choose between overpriced designer labels or low-quality, ill-fitting off-the-rack garments.
            </p>
            <p className="text-slate-300 text-sm leading-relaxed font-light">
              We partnered directly with world-renowned Italian weaving mills in Biella and premium master tailors to bypass luxury markups. By applying digital drape geometry and standardizing fit tolerances, we recreate the bespoke tailoring experience at a fraction of the cost.
            </p>
            <p className="text-slate-400 text-xs italic font-serif border-l-2 border-[#d4af37] pl-4">
              "A sharp suit is a shield. It gives a man confidence to lead a boardroom, excel in his career, and walk into any room with self-assurance."
            </p>
          </div>

          {/* About Images side */}
          <div className="lg:col-span-6 grid grid-cols-12 gap-4">
            <div className="col-span-7 rounded-none overflow-hidden border border-white/10 aspect-square">
              <img
                src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=600"
                alt="Master tailoring"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="col-span-5 flex flex-col gap-4">
              <div className="rounded-none overflow-hidden border border-white/10 flex-grow">
                <img
                  src="https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&q=80&w=400"
                  alt="Premium shirt fabrics"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="rounded-none overflow-hidden border border-white/10 flex-grow">
                <img
                  src="https://images.unsplash.com/photo-1593032465175-481ac7f401a0?auto=format&fit=crop&q=80&w=400"
                  alt="Bespoke luxury blazers"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Key Values bento grid */}
        <div className="space-y-6">
          <div className="text-center">
            <span className="text-[10px] font-mono tracking-[0.2em] text-[#d4af37] uppercase">The Pillars of DressRight</span>
            <h3 className="text-xl sm:text-2xl font-serif font-light text-white mt-2">What Sets Us Apart</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-[#0a0a0a] border border-white/10 p-6 rounded-none space-y-3">
              <div className="w-10 h-10 bg-[#d4af37]/10 rounded-none text-[#d4af37] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold font-mono text-white uppercase tracking-wider">Uncompromising Fabrics</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-sans font-light">
                We utilize only 100% Super-130s Merino Wool, luxury Mulberry silks, and Giza Egyptian long-staple cottons. No cheap synthetic polyesters.
              </p>
            </div>

            <div className="bg-[#0a0a0a] border border-white/10 p-6 rounded-none space-y-3">
              <div className="w-10 h-10 bg-[#d4af37]/10 rounded-none text-[#d4af37] flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold font-mono text-white uppercase tracking-wider">Tailored Drape Sizing</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-sans font-light">
                Our athletic standard slim-fit geometries follow human chest contours, maintaining sharp waist lines while ensuring exceptional shoulder range of motion.
              </p>
            </div>

            <div className="bg-[#0a0a0a] border border-white/10 p-6 rounded-none space-y-3">
              <div className="w-10 h-10 bg-[#d4af37]/10 rounded-none text-[#d4af37] flex items-center justify-center">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold font-mono text-white uppercase tracking-wider">True Affordability</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-sans font-light">
                By maintaining a pure online model, direct shipping, and direct sourcing, we bypass boutique retail rents and markups to offer executive-grade quality directly to you.
              </p>
            </div>

            <div className="bg-[#0a0a0a] border border-white/10 p-6 rounded-none space-y-3">
              <div className="w-10 h-10 bg-[#d4af37]/10 rounded-none text-[#d4af37] flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold font-mono text-white uppercase tracking-wider">California Tailor Support</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-sans font-light">
                Every dress piece leaves generous tail-allowances, making it simple for any local tailor to perform final sleeve or hem adjustments. We also offer 30 days fit backing.
              </p>
            </div>

          </div>
        </div>

        {/* California roots visual section */}
        <div className="bg-[#0d0d0d] border border-white/10 rounded-none p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 text-left">
          <div className="space-y-4 max-w-xl">
            <span className="text-[10px] font-mono tracking-[0.2em] text-[#d4af37] uppercase font-bold">In-Person & Virtual Sizing</span>
            <h3 className="text-2xl sm:text-3xl font-serif font-light text-white tracking-wide leading-snug">
              Based Proudly in Sunny Southern California
            </h3>
            <p className="text-xs sm:text-sm text-slate-350 leading-relaxed font-light">
              While our garments ship worldwide, our design studio is based right here in California. Reach our team directly for sizing queries, dress-code consults, or tailored suggestions for weddings, galas, and corporate events.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 font-mono text-xs text-slate-450">
              <div>
                <strong>Customer Helpline:</strong> <span className="text-white">{BRAND_STYLE.contact.phone}</span>
              </div>
              <div>
                <strong>Direct Stylist:</strong> <span className="text-white">{BRAND_STYLE.contact.email}</span>
              </div>
            </div>
          </div>

          <div className="w-full md:w-auto flex-shrink-0 flex justify-center bg-black/80 border border-white/10 p-6 rounded-none relative">
            <div className="text-center font-mono">
              <TrendingUp className="w-10 h-10 text-[#d4af37] mx-auto mb-2" />
              <div className="text-2xl font-bold text-[#d4af37]">15,000+</div>
              <div className="text-[10px] text-slate-450 uppercase tracking-widest mt-1">Sharp Gentlemen Dressed</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
