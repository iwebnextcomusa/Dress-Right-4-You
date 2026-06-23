import React, { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, Sparkles, ShieldCheck } from "lucide-react";
import { BRAND_STYLE } from "../data";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
    // Reset state after delay
    setTimeout(() => {
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    }, 2000);
  };

  return (
    <div className="bg-[#050505] text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Title */}
        <div className="text-center space-y-3">
          <span className="text-[10px] font-mono tracking-[0.3em] text-[#d4af37] uppercase">Connect With Stylists</span>
          <h1 className="text-4xl sm:text-5xl font-serif font-light tracking-wide text-white">
            Contact DressRight4You
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed font-light">
            Have a custom order sizing request or a styling question? We respond within 1-2 hours on business days.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Contact details and Interactive Custom Map */}
          <div className="lg:col-span-5 space-y-8 animate-slideRight">
            
            <div className="bg-[#0a0a0a] border border-white/10 rounded-none p-6 sm:p-8 space-y-6 shadow-xl">
              <h2 className="text-lg font-serif font-light text-white border-b border-white/10 pb-3 uppercase tracking-wider">
                California Headquarters
              </h2>

              <div className="space-y-4">
                
                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-[#d4af37]/10 rounded-none text-[#d4af37]">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-[10px] font-mono uppercase text-slate-500 tracking-widest">Call Our Tailoring Studio</h3>
                    <p className="text-sm font-semibold text-white mt-0.5">{BRAND_STYLE.contact.phone}</p>
                    <p className="text-[11px] text-slate-550 mt-0.5">Toll-free / Mon-Sat 9AM-6PM PST</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-[#d4af37]/10 rounded-none text-[#d4af37]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-[10px] font-mono uppercase text-slate-500 tracking-widest">Email A Consultant</h3>
                    <p className="text-sm font-semibold text-[#d4af37] mt-0.5 hover:underline cursor-pointer">
                      <a href={`mailto:${BRAND_STYLE.contact.email}`}>{BRAND_STYLE.contact.email}</a>
                    </p>
                    <p className="text-[11px] text-slate-550 mt-0.5">Custom fits & bulk wedding group queries</p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-[#d4af37]/10 rounded-none text-[#d4af37]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-[10px] font-mono uppercase text-slate-500 tracking-widest">Design Studio Location</h3>
                    <p className="text-sm font-semibold text-white mt-0.5">{BRAND_STYLE.contact.address}</p>
                    <p className="text-[11px] text-slate-550 mt-0.5">Los Angeles, California, USA</p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-[#d4af37]/10 rounded-none text-[#d4af37]">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-[10px] font-mono uppercase text-slate-500 tracking-widest">Business Hours</h3>
                    <p className="text-xs text-white mt-0.5 font-bold">Monday - Saturday: 9:00 AM - 6:00 PM (PST)</p>
                    <p className="text-[11px] text-slate-550 mt-0.5">Closed Sundays and Major Holidays</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Embedded Custom Map representing California HQ */}
            <div className="bg-[#0a0a0a] border border-white/10 rounded-none overflow-hidden relative shadow-xl">
              <div className="absolute top-3 left-3 bg-black/80 border border-[#d4af37]/30 px-3 py-1 rounded-none text-[9px] font-mono tracking-widest text-[#d4af37] uppercase z-10">
                Studio Beacon Map
              </div>
              
              {/* Custom Vector Art Representing California Map with Los Angeles Pinpoint */}
              <div className="w-full h-[220px] relative bg-[#050505] flex items-center justify-center border-b border-white/10">
                {/* California outline representation */}
                <svg viewBox="0 0 400 300" className="w-full h-full opacity-40">
                  {/* Styled Grid Matrix Background */}
                  <defs>
                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#ffffff" strokeWidth="0.5" opacity="0.1" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                  
                  {/* Simulated California coastline wireframe */}
                  <path
                    d="M 120 40 Q 150 70 170 110 T 220 210 T 260 260 L 300 260 L 290 280 L 150 280 Q 110 240 90 200 T 70 110 Z"
                    fill="none"
                    stroke="#d4af37"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                  />
                  
                  {/* Glowing Los Angeles Coordinate Pin */}
                  <circle cx="210" cy="190" r="25" fill="none" stroke="#d4af37" strokeWidth="1" opacity="0.3" className="animate-ping" />
                  <circle cx="210" cy="190" r="10" fill="#d4af37" opacity="0.15" />
                  <circle cx="210" cy="190" r="4" fill="#d4af37" />
                  
                  {/* Coordinates indicator label */}
                  <text x="225" y="194" fill="#ffffff" fontSize="9" fontFamily="monospace" fontWeight="bold">DressRight4You HQ (LA)</text>
                  <text x="225" y="206" fill="#888888" fontSize="8" fontFamily="monospace">34.0522° N, 118.2437° W</text>
                  
                  {/* Ocean representation text */}
                  <text x="40" y="220" fill="#334155" fontSize="10" fontFamily="serif" fontStyle="italic">Pacific Ocean</text>
                  <text x="280" y="80" fill="#334155" fontSize="10" fontFamily="serif" fontStyle="italic">California USA</text>
                </svg>
                
                {/* Floating Map Label overlay */}
                <div className="absolute bottom-3 right-3 text-[9px] font-mono text-slate-650">
                  Rendered at California Studio HQ
                </div>
              </div>

              <div className="p-4 bg-black/60 text-center text-xs text-slate-500 font-mono">
                Located near Sunset Blvd, Los Angeles, CA
              </div>
            </div>

          </div>

          {/* Right Column: Contact form submission with complete state tracking */}
          <div className="lg:col-span-7 bg-[#0a0a0a] border border-white/10 rounded-none p-6 sm:p-8 space-y-6 shadow-xl relative">
            <div className="space-y-2">
              <span className="text-[10px] font-mono tracking-widest text-[#d4af37] uppercase">Sartorial Assistance</span>
              <h2 className="text-2xl font-serif font-light text-white">Send Us A Message</h2>
              <p className="text-slate-400 text-xs sm:text-sm font-light">
                Our in-house tailors can assist with sizing modifications, material compositions, shipping upgrades, and order status tracking.
              </p>
            </div>

            {submitted ? (
              <div className="bg-[#050505] border border-white/10 rounded-none p-8 text-center space-y-4 animate-zoomIn" id="contact-success-panel">
                <div className="w-12 h-12 bg-[#d4af37]/10 text-[#d4af37] rounded-none flex items-center justify-center mx-auto">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-serif font-light text-white">Message Securely Received</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed font-light">
                  Thank you, <strong className="text-white font-medium">{name}</strong>. Your inquiry has been logged securely in our Los Angeles database. A styling consultant will reach back to <strong className="text-white font-medium">{email}</strong> within 1-2 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" id="contact-form">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Sterling Charles"
                      className="w-full bg-[#050505] border border-white/10 rounded-none px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Email Address *</label>
                    <input
                      type="type"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. sterling@gmail.com"
                      className="w-full bg-[#050505] border border-white/10 rounded-none px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Reason for Consultation</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-[#050505] border border-white/10 rounded-none px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37] font-mono"
                    id="contact-subject"
                  >
                    <option value="">Choose a reason...</option>
                    <option value="sizing">Bespoke Suit Sizing Sensation</option>
                    <option value="wedding">Bulk Wedding Group Tailoring</option>
                    <option value="status">Order Tracking Status</option>
                    <option value="return">Return/Exchange Guidelines</option>
                    <option value="other">General Inquiries</option>
                  </select>
                </div>

                {/* Message */}
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Sartorial Details *</label>
                  <textarea
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Provide your height, chest width, waist size, or details about the occasion so our master tailors can prepare custom suggestions..."
                    className="w-full bg-[#050505] border border-white/10 rounded-none px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37] h-36"
                  />
                </div>

                <div className="flex items-center gap-3 bg-black/40 border border-white/5 p-3 rounded-none text-[10px] text-slate-450 font-mono leading-normal font-light">
                  <Sparkles className="w-4 h-4 text-[#d4af37] flex-shrink-0" />
                  <span>By submitting, you agree to connect directly with the DressRight4You styling team. We will never share or sell your email.</span>
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-[#d4af37] hover:bg-[#b8901c] text-black font-mono font-bold text-xs uppercase tracking-widest py-3.5 rounded-none shadow-md transition-all cursor-pointer"
                  id="submit-contact-btn"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit Stylist Request</span>
                </button>

              </form>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}
