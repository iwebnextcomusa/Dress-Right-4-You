import { useApp } from "../context/AppContext";
import { CheckCircle2, ShieldCheck, Printer, Calendar, ShoppingBag, ArrowRight } from "lucide-react";

export default function OrderSuccess() {
  const { latestOrder, setView } = useApp();

  if (!latestOrder) {
    return (
      <div className="bg-[#050505] text-white py-20 text-center min-h-screen flex items-center justify-center">
        <div className="max-w-md space-y-4 px-4">
          <ShoppingBag className="w-12 h-12 text-slate-700 mx-auto animate-pulse" />
          <h2 className="text-xl font-serif font-light text-white tracking-wide">No Order Logged</h2>
          <button onClick={() => setView("shop")} className="bg-[#d4af37] hover:bg-[#b8901c] text-black font-mono font-bold text-xs uppercase tracking-widest py-3 px-6 rounded-none cursor-pointer transition-colors">
            Return to Wardrobe Shop
          </button>
        </div>
      </div>
    );
  }

  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 3); // Est 3 days

  return (
    <div className="bg-[#050505] text-white py-16 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-zoomIn">
        
        {/* Success Header */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-none flex items-center justify-center mx-auto shadow-xl">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold">Payment Authorized Secured</span>
          <h1 className="text-3xl sm:text-4xl font-serif font-light text-white tracking-wide">
            Thank You For Your Purchase
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm max-w-md mx-auto leading-relaxed font-light">
            Your tailored outfit order is being dispatched to our master packers in Los Angeles, California. Let's make sure you Dress Right!
          </p>
        </div>

        {/* Invoice breakdown card */}
        <div className="bg-[#0a0a0a] border border-white/10 rounded-none p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/10 pb-4 gap-2">
            <div>
              <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block">Bespoke Order ID</span>
              <strong className="text-sm font-mono text-[#d4af37]">{latestOrder.id}</strong>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400 bg-black border border-white/5 px-3 py-1 rounded-none">
              <Calendar className="w-3.5 h-3.5" />
              <span>Purchase Date: {latestOrder.date}</span>
            </div>
          </div>

          {/* Sizing packing tracker progress */}
          <div className="space-y-3 font-mono text-xs text-left">
            <span className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">Delivery Progression Tracker</span>
            <div className="grid grid-cols-4 gap-2 text-center text-[10px]">
              <div className="bg-[#050505] text-emerald-400 py-2 border border-white/10 rounded-none font-bold">
                ✔ Authorized
              </div>
              <div className="bg-[#050505] text-[#d4af37] py-2 border border-[#d4af37]/30 rounded-none font-bold animate-pulse">
                ✏ Fitting Check
              </div>
              <div className="bg-[#050505] text-slate-500 py-2 rounded-none border border-white/10">
                ✈ Courier Pickup
              </div>
              <div className="bg-[#050505] text-slate-500 py-2 rounded-none border border-white/10">
                ❖ Final Handover
              </div>
            </div>
          </div>

          {/* Delivery Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 border-t border-white/10 text-left text-xs font-mono">
            <div className="space-y-1.5">
              <span className="text-[9px] text-slate-500 uppercase tracking-widest block font-bold">Courier Destination</span>
              <p className="text-white font-bold">{latestOrder.shippingAddress.fullName}</p>
              <p className="text-slate-300">{latestOrder.shippingAddress.addressLine1}</p>
              {latestOrder.shippingAddress.addressLine2 && <p className="text-slate-300">{latestOrder.shippingAddress.addressLine2}</p>}
              <p className="text-slate-300">
                {latestOrder.shippingAddress.city}, {latestOrder.shippingAddress.state} {latestOrder.shippingAddress.zipCode}
              </p>
              <p className="text-slate-400">{latestOrder.shippingAddress.country}</p>
            </div>

            <div className="space-y-2">
              <div>
                <span className="text-[9px] text-slate-500 uppercase tracking-widest block font-bold">Payment Instrument</span>
                <span className="text-[#d4af37] uppercase font-bold tracking-widest">{latestOrder.paymentMethod} ENCRYPTED</span>
              </div>
              <div>
                <span className="text-[9px] text-slate-500 uppercase tracking-widest block font-bold">Est. Southern California Arrival</span>
                <span className="text-emerald-400 font-bold">{deliveryDate.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</span>
              </div>
            </div>
          </div>

          {/* Items checklist block */}
          <div className="border-t border-white/10 pt-6 space-y-3">
            <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest font-bold block text-left">Purchased Garments Details</span>
            <div className="space-y-2.5">
              {latestOrder.items.map((item, idx) => {
                const price = item.product.salePrice || item.product.price;
                return (
                  <div key={idx} className="flex justify-between items-center text-xs">
                    <div className="flex gap-2.5 items-center">
                      <span className="w-1.5 h-1.5 rounded-none bg-[#d4af37]"></span>
                      <span className="text-slate-200 font-medium">{item.product.name}</span>
                      <span className="text-[10px] text-slate-500 font-mono">
                        (Size {item.selectedSize} / {item.selectedColor.name} x {item.quantity})
                      </span>
                    </div>
                    <span className="font-mono text-slate-300 font-bold">${price * item.quantity}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Total invoice cost list */}
          <div className="border-t border-white/10 pt-6 space-y-2 font-mono text-xs text-left">
            <div className="flex justify-between text-slate-500">
              <span>Bespoke Subtotal</span>
              <span className="text-white">${latestOrder.subtotal.toFixed(2)}</span>
            </div>
            {latestOrder.discount > 0 && (
              <div className="flex justify-between text-emerald-400 font-bold">
                <span>Coupon Deductions</span>
                <span>-${latestOrder.discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-slate-500">
              <span>California State Tax (8.25%)</span>
              <span className="text-white">${latestOrder.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Courier Freight Courier Fee</span>
              <span className="text-white">{latestOrder.shipping === 0 ? "FREE" : `$${latestOrder.shipping.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between items-center text-sm font-bold border-t border-white/10 pt-3 text-white">
              <span className="text-[#d4af37] uppercase tracking-widest">Total Captured</span>
              <span className="text-[#d4af37] font-bold">${latestOrder.total.toFixed(2)}</span>
            </div>
          </div>

        </div>

        {/* Footer actions buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <button
            onClick={() => {
              window.print();
            }}
            className="flex items-center justify-center gap-1.5 bg-transparent border border-white/10 hover:border-white/30 text-slate-300 hover:text-white font-mono font-bold text-xs uppercase tracking-widest px-8 py-3.5 rounded-none transition-all cursor-pointer"
            id="print-invoice-btn"
          >
            <Printer className="w-4 h-4" />
            <span>Print Invoice Receipt</span>
          </button>

          <button
            onClick={() => {
              setView("shop");
            }}
            className="flex items-center justify-center gap-1.5 bg-[#d4af37] hover:bg-[#b8901c] text-black font-mono font-bold text-xs uppercase tracking-widest px-8 py-3.5 rounded-none shadow-lg transition-colors cursor-pointer"
            id="continue-success-shop-btn"
          >
            <span>Browse More Tailoring</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* SSL indicator footer */}
        <div className="flex items-center justify-center gap-2 text-[10px] text-slate-500 font-mono">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>DressRight4You California Security Standard. SSL-SECURE-256-BIT-ENCRYPTION</span>
        </div>

      </div>
    </div>
  );
}
