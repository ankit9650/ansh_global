import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../assets/travel.png";

/* ═══════════════════════════════════════════════════════
   PALETTE: Deep Navy #080f24, Royal Blue #1a3468,
            Sky Blue #1e4080, Gold #c9a84c, Cream #e8eeff
   Fonts: Cormorant Garamond (display) + Outfit (body)
═══════════════════════════════════════════════════════ */

const C = {
  navy: "#080f24",
  navyMid: "#0d1a3a",
  navyLight: "#152244",
  royal: "#1a3468",
  blue: "#1e4080",
  gold: "#c9a84c",
  goldLight: "#e8c96a",
  goldDark: "#a07830",
  cream: "#e8eeff",
  muted: "rgba(232,238,255,0.5)",
  subtle: "rgba(232,238,255,0.05)",
};

const DESTINATIONS = [
  { name: "Manali", sub: "Himachal Pradesh", tag: "Adventure", img: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=85" },
  { name: "Kerala", sub: "God's Own Country", tag: "Nature", img: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=85" },
  { name: "Goa", sub: "Beach Paradise", tag: "Leisure", img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=85" },
  { name: "Manali", sub: "Himachal Pradesh", tag: "Adventure", img: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=85" },
  { name: "Varanasi", sub: "Uttar Pradesh", tag: "Pilgrim", img: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800&q=85" },
  { name: "Rajasthan", sub: "India", tag: "Heritage", img: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&q=85" },
];

const SERVICES = [
  { icon: "✈", num: "01", title: "Flight Booking", desc: "Domestic flights across India at the best rates with instant confirmation." },
  { icon: "🚂", num: "02", title: "Rail Booking", desc: "Train tickets including Tatkal assistance — no queues, no stress." },
  { icon: "🏨", num: "03", title: "Hotel Reservations", desc: "Budget to luxury stays handpicked for comfort across India." },
  { icon: "🛕", num: "04", title: "Pilgrimage Tours", desc: "Char Dham, Kedarnath, Vaishno Devi, Tirupati & all sacred journeys." },
  { icon: "🏔", num: "05", title: "Hill Station Packages", desc: "Manali, Shimla, Mussoorie, Nainital — crafted mountain getaways." },
  { icon: "🌴", num: "06", title: "Beach & Leisure Tours", desc: "Goa, Kerala, Andaman — relaxing packages for every budget." },
  { icon: "👥", num: "07", title: "Group & Family Tours", desc: "Special group discounts and family-friendly itineraries across India." },
  { icon: "💼", num: "08", title: "Corporate Travel", desc: "End-to-end corporate travel with billing & MIS reporting." },
];

const STATS = [
  { val: "100+", label: "Indian Destinations" },
  { val: "50+", label: "Packages Available" },
  { val: "24/7", label: "Expert Support" },
  { val: "0", label: "Hidden Charges" },
];

const WHY = [
  { icon: "💰", title: "Best Market Pricing", desc: "Competitive rates with full transparency — no hidden costs, ever." },
  { icon: "⚡", title: "Instant Confirmation", desc: "Fast bookings with immediate confirmation on every service." },
  { icon: "📞", title: "24 × 7 Support", desc: "Our experts are always available, day or night, all year." },
  { icon: "🎯", title: "Custom Planning", desc: "Tailor-made itineraries designed around your unique dreams." },
  { icon: "🧾", title: "Transparent Billing", desc: "Clear invoicing with full MIS reporting for corporate clients." },
  { icon: "🤝", title: "Dedicated Managers", desc: "A personal account manager assigned to every journey." },
];

// ── Styles ─────────────────────────────────────────────────────────────────────
const Styles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600;1,700&family=Outfit:wght@300;400;500;600;700&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { background: #080f24; }
    ::selection { background: #c9a84c; color: #080f24; }
    .cg { font-family: 'Cormorant Garamond', Georgia, serif !important; }
    .out { font-family: 'Outfit', sans-serif !important; }
    @keyframes goldShimmer {
      0% { background-position: 0% 50% }
      100% { background-position: 200% 50% }
    }
    .gold-grad {
      background: linear-gradient(90deg, #c9a84c, #f0d070, #e8c96a, #c9a84c);
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: goldShimmer 4s linear infinite;
    }
    input::placeholder, textarea::placeholder { color: rgba(232,238,255,0.22); }
    input, textarea { font-family: 'Outfit', sans-serif; }
    @media (max-width: 900px) {
      .hide-mob { display: none !important; }
      .show-mob { display: flex !important; }
      .two-col { grid-template-columns: 1fr !important; }
      .three-col { grid-template-columns: 1fr 1fr !important; }
      .dest-grid { grid-template-columns: 1fr 1fr !important; }
      .stat-grid { grid-template-columns: 1fr 1fr !important; }
      .footer-grid { grid-template-columns: 1fr 1fr !important; }
    }
    @media (min-width: 901px) { .show-mob { display: none !important; } }
  `}</style>
);

// ── Counter ────────────────────────────────────────────────────────────────────
function Counter({ value }) {
  const [n, setN] = useState(0);
  const ref = useRef(null);
  const [go, setGo] = useState(false);
  const num = parseInt(value.replace(/\D/g, ""));
  const suffix = value.replace(/[0-9]/g, "");
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setGo(true); }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  useEffect(() => {
    if (!go) return;
    let cur = 0; const step = num / 55;
    const t = setInterval(() => { cur += step; if (cur >= num) { setN(num); clearInterval(t); } else setN(Math.floor(cur)); }, 18);
    return () => clearInterval(t);
  }, [go, num]);
  return <span ref={ref}>{n}{suffix}</span>;
}

// ── Navbar ─────────────────────────────────────────────────────────────────────
function Navbar({ active }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  const links = ["Home", "Services", "Packages", "Destinations", "About", "Contact"];
  return (
    <motion.header initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7, ease: [0.16,1,0.3,1] }}
      style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(8,15,36,0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(201,168,76,0.12)" : "none",
        transition: "all 0.4s", padding: scrolled ? "8px 0" : "18px 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <motion.a href="#home" whileHover={{ scale: 1.03 }} style={{ textDecoration: "none", display: "flex" }}
          animate={{ opacity: scrolled ? 1 : 0, pointerEvents: scrolled ? "auto" : "none" }}
          transition={{ duration: 0.35 }}>
          <img src={logo} alt="Ansh Global Travels"
            style={{ height: 50, width: "auto", filter: "drop-shadow(0 0 10px rgba(201,168,76,0.35))" }} />
        </motion.a>
        <nav className="hide-mob" style={{ display: "flex", alignItems: "center", gap: 32 }}>
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="out"
              style={{ color: active === l.toLowerCase() ? C.gold : "rgba(232,238,255,0.65)", fontSize: 12,
                letterSpacing: "1.5px", textTransform: "uppercase", fontWeight: 500, textDecoration: "none",
                transition: "color 0.3s", borderBottom: active === l.toLowerCase() ? `1px solid ${C.gold}` : "1px solid transparent", paddingBottom: 2 }}
              onMouseEnter={e => e.target.style.color = C.gold}
              onMouseLeave={e => { if (active !== l.toLowerCase()) e.target.style.color = "rgba(232,238,255,0.65)"; }}>
              {l}
            </a>
          ))}
          <motion.a href="#contact" className="out" whileHover={{ scale: 1.05, boxShadow: `0 6px 24px rgba(201,168,76,0.45)` }} whileTap={{ scale: 0.96 }}
            style={{ padding: "9px 26px", background: `linear-gradient(135deg,${C.gold},${C.goldDark})`,
              color: C.navy, fontWeight: 700, fontSize: 11, letterSpacing: "1.5px", textTransform: "uppercase",
              textDecoration: "none", borderRadius: 3 }}>
            Book Now
          </motion.a>
        </nav>
        <button className="show-mob" onClick={() => setOpen(!open)}
          style={{ background: "none", border: "none", color: C.cream, fontSize: 26, padding: 4, cursor: "pointer" }}>
          {open ? "✕" : "☰"}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            style={{ overflow: "hidden", background: C.navyMid, borderTop: "1px solid rgba(201,168,76,0.15)" }}>
            <div style={{ padding: "20px 32px 28px", display: "flex", flexDirection: "column", gap: 14 }}>
              {links.map(l => (
                <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)} className="out"
                  style={{ color: C.cream, fontSize: 15, textDecoration: "none", fontWeight: 500, padding: "6px 0",
                    borderBottom: "1px solid rgba(232,238,255,0.08)" }}>{l}</a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

// ── Hero ───────────────────────────────────────────────────────────────────────
function Hero() {
  const [bgIdx, setBgIdx] = useState(0);
  const bgs = [
    "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1800&q=90",
    "https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=1800&q=90",
    "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1800&q=90",
  ];
  useEffect(() => {
    const t = setInterval(() => setBgIdx(p => (p + 1) % bgs.length), 6000);
    return () => clearInterval(t);
  }, []);
  return (
    <section id="home" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden", background: C.navy }}>
      {bgs.map((b, i) => (
        <motion.div key={i} style={{ position: "absolute", inset: 0, backgroundImage: `url(${b})`, backgroundSize: "cover", backgroundPosition: "center" }}
          animate={{ opacity: bgIdx === i ? 1 : 0, scale: bgIdx === i ? 1.06 : 1 }} transition={{ duration: 2, ease: "easeInOut" }} />
      ))}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,rgba(8,15,36,0.90) 0%,rgba(13,26,58,0.65) 50%,rgba(8,15,36,0.82) 100%)" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 220, background: `linear-gradient(to top,${C.navy},transparent)` }} />
      <div style={{ position: "absolute", top: 0, right: 0, width: "45%", height: "100%", background: "linear-gradient(to left,rgba(30,64,128,0.1),transparent)" }} />
      {/* Orbiting rings */}
      <div style={{ position: "absolute", top: "8%", right: "4%", opacity: 0.07, pointerEvents: "none" }}>
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          style={{ width: 420, height: 420, borderRadius: "50%", border: `1px solid ${C.gold}` }} />
      </div>
      <div style={{ position: "absolute", top: "17%", right: "11%", opacity: 0.04, pointerEvents: "none" }}>
        <motion.div animate={{ rotate: -360 }} transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          style={{ width: 260, height: 260, borderRadius: "50%", border: `1px solid ${C.gold}` }} />
      </div>
      <div style={{ position: "relative", zIndex: 10, maxWidth: 1280, margin: "0 auto", padding: "130px 32px 90px", width: "100%" }}>
        {/* Logo + tagline */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.9 }}
          style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 44 }}>
          <img src={logo} alt="Ansh Global Travels"
            style={{ height: 92, width: "auto", filter: "drop-shadow(0 0 28px rgba(201,168,76,0.55)) brightness(1.05)" }} />
          <div style={{ borderLeft: "1px solid rgba(201,168,76,0.35)", paddingLeft: 20 }}>
            <p className="out" style={{ color: C.gold, fontSize: 10, letterSpacing: "3.5px", textTransform: "uppercase", marginBottom: 5 }}>Professional Travel Management</p>
            <p className="out" style={{ color: "rgba(232,238,255,0.45)", fontSize: 11, letterSpacing: "2px", textTransform: "uppercase" }}>Your Journeys, Our Passion</p>
          </div>
        </motion.div>
        <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
          className="out" style={{ color: C.gold, fontSize: 11, letterSpacing: "4px", textTransform: "uppercase", marginBottom: 18, fontWeight: 500 }}>
          ✦ Your Journey Starts Here ✦
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 1, ease: [0.16,1,0.3,1] }}
          className="cg" style={{ fontSize: "clamp(56px,8vw,112px)", fontWeight: 300, color: C.cream, lineHeight: 1.0, fontStyle: "italic", marginBottom: 6 }}>
          Your World,
        </motion.h1>
        <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65, duration: 1, ease: [0.16,1,0.3,1] }}
          className="cg gold-grad" style={{ fontSize: "clamp(56px,8vw,112px)", fontWeight: 600, lineHeight: 1.05, marginBottom: 36 }}>
          Your Journey.
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.85 }}
          className="out" style={{ color: "rgba(232,238,255,0.62)", fontSize: 17, maxWidth: 500, lineHeight: 1.85, marginBottom: 44, fontWeight: 300 }}>
          Discover the beauty of India — from the sacred peaks of the Himalayas to the serene backwaters of Kerala. We plan it all, so you just enjoy the journey.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}
          style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          <motion.a href="#destinations" className="out"
            whileHover={{ scale: 1.04, boxShadow: `0 12px 40px rgba(201,168,76,0.55)` }} whileTap={{ scale: 0.97 }}
            style={{ padding: "15px 38px", background: `linear-gradient(135deg,${C.gold},${C.goldDark})`,
              color: C.navy, fontWeight: 700, fontSize: 12, letterSpacing: "2px", textTransform: "uppercase",
              textDecoration: "none", borderRadius: 3, display: "flex", alignItems: "center", gap: 10 }}>
            Explore Destinations <span style={{ fontSize: 15 }}>→</span>
          </motion.a>
          <motion.a href="#contact" className="out"
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            style={{ padding: "15px 38px", border: "1px solid rgba(201,168,76,0.4)", color: C.cream,
              fontWeight: 500, fontSize: 12, letterSpacing: "2px", textTransform: "uppercase",
              textDecoration: "none", borderRadius: 3, background: "rgba(232,238,255,0.04)",
              backdropFilter: "blur(8px)", display: "flex", alignItems: "center", gap: 10 }}>
            📞 Talk to Expert
          </motion.a>
        </motion.div>
      </div>
      {/* Slide dots */}
      <div style={{ position: "absolute", right: 28, top: "50%", transform: "translateY(-50%)", display: "flex", flexDirection: "column", gap: 8 }}>
        {bgs.map((_, i) => (
          <button key={i} onClick={() => setBgIdx(i)}
            style={{ width: 3, borderRadius: 2, border: "none", cursor: "pointer", transition: "all 0.4s",
              height: bgIdx === i ? 32 : 10, background: bgIdx === i ? C.gold : "rgba(232,238,255,0.25)" }} />
        ))}
      </div>
      <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2.5 }}
        style={{ position: "absolute", bottom: 36, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        <span className="out" style={{ color: "rgba(201,168,76,0.55)", fontSize: 9, letterSpacing: "3.5px" }}>SCROLL</span>
        <div style={{ width: 1, height: 36, background: `linear-gradient(to bottom,${C.gold},transparent)` }} />
      </motion.div>
    </section>
  );
}

// ── Stats ──────────────────────────────────────────────────────────────────────
function Stats() {
  return (
    <section style={{ background: `linear-gradient(135deg,${C.royal},${C.blue})`, borderTop: `1px solid rgba(201,168,76,0.15)` }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
        <div className="stat-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)" }}>
          {STATS.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              style={{ padding: "44px 20px", textAlign: "center", borderRight: i < 3 ? "1px solid rgba(201,168,76,0.15)" : "none" }}>
              <div className="cg" style={{ fontSize: 50, fontWeight: 300, color: C.gold, fontStyle: "italic", lineHeight: 1 }}>
                <Counter value={s.val} />
              </div>
              <div className="out" style={{ color: "rgba(232,238,255,0.55)", fontSize: 11, letterSpacing: "2px", textTransform: "uppercase", marginTop: 8 }}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Services ───────────────────────────────────────────────────────────────────
function Services() {
  const [sel, setSel] = useState(0);
  return (
    <section id="services" style={{ background: C.navy, padding: "96px 0", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "20%", left: "5%", width: 500, height: 500,
        background: `radial-gradient(circle,rgba(30,64,128,0.2),transparent)`, borderRadius: "50%", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "10%", right: "5%", width: 350, height: 350,
        background: `radial-gradient(circle,rgba(201,168,76,0.05),transparent)`, borderRadius: "50%", pointerEvents: "none" }} />
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ marginBottom: 56, display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 20 }}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="out" style={{ color: C.gold, fontSize: 10, letterSpacing: "4px", textTransform: "uppercase", marginBottom: 14 }}>What We Offer</p>
            <h2 className="cg" style={{ fontSize: "clamp(40px,5vw,68px)", fontWeight: 300, color: C.cream, fontStyle: "italic", lineHeight: 1.1 }}>
              Our <span style={{ color: C.gold }}>Services</span>
            </h2>
          </motion.div>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="out" style={{ color: C.muted, fontSize: 14, maxWidth: 280, lineHeight: 1.7, fontWeight: 300 }}>
            Comprehensive solutions to make every journey effortless and deeply memorable.
          </motion.p>
        </div>
        <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 28, alignItems: "start" }}>
          {/* List */}
          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {SERVICES.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                onClick={() => setSel(i)}
                style={{ display: "flex", alignItems: "center", gap: 20, padding: "17px 22px", borderRadius: 4,
                  cursor: "pointer", transition: "all 0.3s",
                  background: sel === i ? `rgba(26,52,104,0.85)` : "rgba(232,238,255,0.03)",
                  border: sel === i ? `1px solid rgba(201,168,76,0.28)` : "1px solid rgba(232,238,255,0.06)" }}>
                <span className="out" style={{ color: sel === i ? C.gold : "rgba(232,238,255,0.22)", fontSize: 11, fontWeight: 600, minWidth: 24 }}>{s.num}</span>
                <span style={{ fontSize: 20 }}>{s.icon}</span>
                <p className="out" style={{ color: sel === i ? C.cream : "rgba(232,238,255,0.55)", fontSize: 14, fontWeight: sel === i ? 600 : 400, flex: 1 }}>{s.title}</p>
                <motion.span animate={{ x: sel === i ? 0 : -8, opacity: sel === i ? 1 : 0 }}
                  style={{ color: C.gold, fontSize: 16, fontWeight: 700 }}>→</motion.span>
              </motion.div>
            ))}
          </div>
          {/* Detail */}
          <div style={{ position: "sticky", top: 100 }}>
            <AnimatePresence mode="wait">
              <motion.div key={sel} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }}
                style={{ padding: "44px 40px", background: `linear-gradient(135deg,${C.navyLight},${C.royal})`,
                  border: `1px solid rgba(201,168,76,0.2)`, borderRadius: 6, boxShadow: "0 30px 80px rgba(0,0,0,0.3)" }}>
                <div style={{ fontSize: 48, marginBottom: 20 }}>{SERVICES[sel].icon}</div>
                <p className="out" style={{ color: C.gold, fontSize: 10, letterSpacing: "3px", textTransform: "uppercase", marginBottom: 10 }}>Service {SERVICES[sel].num}</p>
                <h3 className="cg" style={{ color: C.cream, fontSize: 34, fontWeight: 400, fontStyle: "italic", marginBottom: 16, lineHeight: 1.2 }}>{SERVICES[sel].title}</h3>
                <p className="out" style={{ color: C.muted, fontSize: 15, lineHeight: 1.85, fontWeight: 300 }}>{SERVICES[sel].desc}</p>
                <motion.a href="#contact" className="out" whileHover={{ scale: 1.04 }}
                  style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 28,
                    padding: "12px 28px", background: `linear-gradient(135deg,${C.gold},${C.goldDark})`,
                    color: C.navy, fontWeight: 700, fontSize: 11, letterSpacing: "2px", textTransform: "uppercase",
                    textDecoration: "none", borderRadius: 3 }}>
                  Enquire Now →
                </motion.a>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}


// ── Featured Packages ──────────────────────────────────────────────────────────
function Packages() {
  const [active, setActive] = useState(0);

  const pkgs = [
    {
      id: 0,
      badge: "🛕 Spiritual",
      name: "Char Dham Yatra 2026",
      tagline: "Divine Journey to the Sacred Himalayas",
      duration: "9 Nights / 10 Days",
      pickup: "Delhi / Haridwar / Rishikesh",
      phone: "8287563095",
      color: "#c9a84c",
      img: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=900&q=85",
      dhams: ["Yamunotri", "Gangotri", "Kedarnath", "Badrinath"],
      includes: [
        "Deluxe / Luxury Hotel Stay",
        "Pure Veg Meals — Breakfast & Dinner",
        "Comfortable Cab / Tempo Traveller",
        "VIP Darshan Assistance*",
        "Experienced Tour Manager",
        "Medical Support Guidance",
        "All Transfers & Sightseeing",
      ],
      special: [
        "🚁 Helicopter Package Available (Kedarnath)",
        "👨‍👩‍👧 Family & Senior Citizen Friendly",
        "👥 Group Yatra Special Discounts",
        "🛡️ Travel Insurance Assistance",
      ],
      note: "Duration customizable as per your convenience.",
    },
    {
      id: 1,
      badge: "🌴 Nature & Leisure",
      name: "Premium Kerala Tour",
      tagline: "God's Own Country",
      duration: "Customizable",
      pickup: "Kochi Airport / Railway Station",
      phone: "8287563095",
      color: "#2a7d4f",
      img: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=900&q=85",
      dhams: ["Munnar", "Alleppey", "Thekkady", "Kovalam"],
      includes: [
        "Budget / Deluxe / Luxury Hotel Stay",
        "Daily Breakfast & Dinner",
        "Private Houseboat Stay (1 Night)",
        "AC Car or Private Cab",
        "Pickup & Drop Facility",
        "Sightseeing by Cab",
        "Honeymoon Room Decoration",
        "24×7 Travel Support",
      ],
      special: [
        "💑 Honeymoon Special Packages",
        "👨‍👩‍👧 Family Friendly Itineraries",
        "🌿 Backwater Houseboat Experience",
        "📅 Limited Season Offer — Book Early",
      ],
      note: "Kerala ki khushboo aur sukoon ka lutf uthaiye!",
    },
  ];

  const pkg = pkgs[active];

  return (
    <section id="packages" style={{ background: C.navy, padding: "96px 0", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "10%", right: "0", width: 500, height: 500,
        background: "radial-gradient(circle,rgba(201,168,76,0.05),transparent)", borderRadius: "50%", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
        {/* Heading */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ marginBottom: 48 }}>
          <p className="out" style={{ color: C.gold, fontSize: 10, letterSpacing: "4px", textTransform: "uppercase", marginBottom: 14 }}>Current Packages</p>
          <h2 className="cg" style={{ fontSize: "clamp(40px,5vw,68px)", fontWeight: 300, color: C.cream, fontStyle: "italic", lineHeight: 1.1 }}>
            Featured <span style={{ color: C.gold }}>Tours</span>
          </h2>
        </motion.div>

        {/* Tab switcher */}
        <div style={{ display: "flex", gap: 12, marginBottom: 36, flexWrap: "wrap" }}>
          {pkgs.map((p, i) => (
            <motion.button key={i} onClick={() => setActive(i)} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              className="out"
              style={{
                padding: "10px 24px", borderRadius: 3, border: "none", cursor: "pointer",
                fontWeight: 600, fontSize: 13, letterSpacing: "0.5px", transition: "all 0.3s",
                background: active === i ? `linear-gradient(135deg,${C.gold},${C.goldDark})` : "rgba(232,238,255,0.07)",
                color: active === i ? C.navy : "rgba(232,238,255,0.6)",
                boxShadow: active === i ? "0 4px 20px rgba(201,168,76,0.35)" : "none",
              }}>
              {p.badge} {p.name}
            </motion.button>
          ))}
        </div>

        {/* Package card */}
        <AnimatePresence mode="wait">
          <motion.div key={active}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.45 }}
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, borderRadius: 8, overflow: "hidden",
              border: "1px solid rgba(201,168,76,0.2)", boxShadow: "0 40px 100px rgba(0,0,0,0.4)" }}
            className="two-col">

            {/* Left — image + header */}
            <div style={{ position: "relative", minHeight: 520 }}>
              <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${pkg.img})`,
                backgroundSize: "cover", backgroundPosition: "center" }} />
              <div style={{ position: "absolute", inset: 0,
                background: "linear-gradient(to top,rgba(8,15,36,0.97) 0%,rgba(8,15,36,0.5) 50%,rgba(8,15,36,0.15) 100%)" }} />

              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "36px 32px" }}>
                <div style={{ display: "inline-block", padding: "4px 14px", borderRadius: 2, marginBottom: 14,
                  background: `rgba(201,168,76,0.9)` }}>
                  <span className="out" style={{ color: C.navy, fontSize: 10, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase" }}>
                    {pkg.badge}
                  </span>
                </div>
                <h3 className="cg" style={{ color: C.cream, fontSize: 38, fontWeight: 400, fontStyle: "italic", lineHeight: 1.15, marginBottom: 6 }}>
                  {pkg.name}
                </h3>
                <p className="cg" style={{ color: C.gold, fontSize: 18, fontStyle: "italic", fontWeight: 300, marginBottom: 20 }}>
                  {pkg.tagline}
                </p>
                {/* Stops */}
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
                  {pkg.dhams.map((d, i) => (
                    <span key={i} className="out"
                      style={{ padding: "4px 12px", background: "rgba(232,238,255,0.1)", border: "1px solid rgba(232,238,255,0.2)",
                        borderRadius: 2, color: C.cream, fontSize: 11, letterSpacing: "0.5px" }}>
                      {d}
                    </span>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
                  <div>
                    <p className="out" style={{ color: "rgba(201,168,76,0.6)", fontSize: 9, letterSpacing: "2px", textTransform: "uppercase", marginBottom: 3 }}>Duration</p>
                    <p className="out" style={{ color: C.cream, fontSize: 13, fontWeight: 600 }}>⏱ {pkg.duration}</p>
                  </div>
                  <div>
                    <p className="out" style={{ color: "rgba(201,168,76,0.6)", fontSize: 9, letterSpacing: "2px", textTransform: "uppercase", marginBottom: 3 }}>Pickup</p>
                    <p className="out" style={{ color: C.cream, fontSize: 13, fontWeight: 600 }}>📍 {pkg.pickup}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right — details */}
            <div style={{ background: `linear-gradient(160deg,${C.navyLight},${C.royal})`, padding: "40px 36px", overflowY: "auto" }}>
              {/* Includes */}
              <p className="out" style={{ color: C.gold, fontSize: 10, letterSpacing: "3px", textTransform: "uppercase", marginBottom: 16 }}>
                ✦ Package Includes
              </p>
              <div style={{ marginBottom: 28 }}>
                {pkg.includes.map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 10 }}>
                    <span style={{ color: C.gold, fontSize: 14, marginTop: 1, flexShrink: 0 }}>✓</span>
                    <p className="out" style={{ color: "rgba(232,238,255,0.75)", fontSize: 13, lineHeight: 1.5 }}>{item}</p>
                  </motion.div>
                ))}
              </div>

              {/* Special */}
              <p className="out" style={{ color: C.gold, fontSize: 10, letterSpacing: "3px", textTransform: "uppercase", marginBottom: 14 }}>
                ✦ Special Facilities
              </p>
              <div style={{ marginBottom: 28 }}>
                {pkg.special.map((item, i) => (
                  <p key={i} className="out"
                    style={{ color: "rgba(232,238,255,0.7)", fontSize: 13, marginBottom: 8, lineHeight: 1.5 }}>{item}</p>
                ))}
              </div>

              {/* Note */}
              <div style={{ padding: "14px 18px", background: "rgba(201,168,76,0.08)",
                border: "1px solid rgba(201,168,76,0.2)", borderRadius: 4, marginBottom: 28 }}>
                <p className="cg" style={{ color: C.gold, fontSize: 15, fontStyle: "italic", fontWeight: 300 }}>"{pkg.note}"</p>
              </div>

              {/* CTA */}
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <motion.a href={`https://wa.me/91${pkg.phone}?text=Hi! I am interested in the ${pkg.name} package.`}
                  target="_blank" rel="noopener noreferrer" className="out"
                  whileHover={{ scale: 1.04, boxShadow: "0 8px 30px rgba(201,168,76,0.45)" }}
                  style={{ flex: 1, padding: "14px 20px", background: `linear-gradient(135deg,${C.gold},${C.goldDark})`,
                    color: C.navy, fontWeight: 700, fontSize: 12, letterSpacing: "1.5px", textTransform: "uppercase",
                    textDecoration: "none", borderRadius: 3, textAlign: "center" }}>
                  💬 Book on WhatsApp
                </motion.a>
                <motion.a href={`tel:+91${pkg.phone}`} className="out"
                  whileHover={{ scale: 1.04 }}
                  style={{ flex: 1, padding: "14px 20px", border: "1px solid rgba(201,168,76,0.35)",
                    color: C.cream, fontWeight: 500, fontSize: 12, letterSpacing: "1.5px", textTransform: "uppercase",
                    textDecoration: "none", borderRadius: 3, textAlign: "center", background: "rgba(232,238,255,0.04)" }}>
                  📞 {pkg.phone}
                </motion.a>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

// ── Destinations ───────────────────────────────────────────────────────────────
function Destinations() {
  const [hov, setHov] = useState(null);
  return (
    <section id="destinations" style={{ background: C.navyMid, padding: "96px 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: 52 }}>
          <p className="out" style={{ color: C.gold, fontSize: 10, letterSpacing: "4px", textTransform: "uppercase", marginBottom: 14 }}>Explore India</p>
          <h2 className="cg" style={{ fontSize: "clamp(40px,5vw,68px)", fontWeight: 300, color: C.cream, fontStyle: "italic", lineHeight: 1.1 }}>
            Popular <span style={{ color: C.gold }}>Destinations</span>
          </h2>
        </motion.div>
        <div className="dest-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
          {DESTINATIONS.map((d, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.09, duration: 0.7 }}
              onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)}
              style={{ position: "relative", overflow: "hidden", borderRadius: 4, cursor: "pointer", height: i === 0 || i === 3 ? 370 : 270 }}>
              <motion.div animate={{ scale: hov === i ? 1.1 : 1 }} transition={{ duration: 0.7 }}
                style={{ position: "absolute", inset: 0, backgroundImage: `url(${d.img})`, backgroundSize: "cover", backgroundPosition: "center" }} />
              <div style={{ position: "absolute", inset: 0, transition: "background 0.5s",
                background: hov === i
                  ? "linear-gradient(to top,rgba(8,15,36,0.96) 0%,rgba(8,15,36,0.35) 55%,rgba(13,26,58,0.1) 100%)"
                  : "linear-gradient(to top,rgba(8,15,36,0.82) 0%,rgba(8,15,36,0.08) 60%,transparent 100%)" }} />
              <div style={{ position: "absolute", top: 14, left: 14, padding: "4px 12px", background: "rgba(201,168,76,0.92)", borderRadius: 2 }}>
                <span className="out" style={{ color: C.navy, fontSize: 9, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase" }}>{d.tag}</span>
              </div>
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px 22px" }}>
                <h3 className="cg" style={{ color: C.cream, fontSize: 28, fontWeight: 400, fontStyle: "italic", marginBottom: 3 }}>{d.name}</h3>
                <p className="out" style={{ color: "rgba(232,238,255,0.5)", fontSize: 10, letterSpacing: "1.5px", textTransform: "uppercase" }}>{d.sub}</p>
                <motion.div animate={{ opacity: hov === i ? 1 : 0, y: hov === i ? 0 : 10 }} style={{ marginTop: 10 }}>
                  <span className="out" style={{ color: C.gold, fontSize: 10, letterSpacing: "2px", textTransform: "uppercase", fontWeight: 600 }}>View Package →</span>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── About ──────────────────────────────────────────────────────────────────────
function About() {
  return (
    <section id="about" style={{ background: C.navy, padding: "96px 0", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg,transparent,${C.gold}33,transparent)` }} />
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
        <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "start" }}>
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}>
            <p className="out" style={{ color: C.gold, fontSize: 10, letterSpacing: "4px", textTransform: "uppercase", marginBottom: 16 }}>About Us</p>
            <h2 className="cg" style={{ fontSize: "clamp(38px,4.5vw,62px)", fontWeight: 300, color: C.cream, fontStyle: "italic", lineHeight: 1.1, marginBottom: 22 }}>
              Why Choose <br /><span style={{ color: C.gold }}>Ansh Global?</span>
            </h2>
            <p className="out" style={{ color: C.muted, fontSize: 15, lineHeight: 1.9, fontWeight: 300, marginBottom: 32 }}>
              Ansh Global Travels is a professional travel management company providing domestic and international solutions. We are a new and passionate travel management company, committed to delivering cost-effective, reliable, and seamless experiences for individuals, families, and corporate clients across India.
            </p>
            <div style={{ padding: "28px 30px", background: `linear-gradient(135deg,${C.navyLight},${C.royal})`,
              border: `1px solid rgba(201,168,76,0.2)`, borderRadius: 6, marginBottom: 32 }}>
              <p className="out" style={{ color: C.gold, fontSize: 10, letterSpacing: "3px", textTransform: "uppercase", marginBottom: 10 }}>Our Promise</p>
              <p className="cg" style={{ color: C.cream, fontSize: 21, fontStyle: "italic", fontWeight: 300, lineHeight: 1.55 }}>
                "Starting fresh, with a promise to make every journey truly exceptional."
              </p>
              <div style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 32, height: 1, background: `linear-gradient(90deg,${C.gold},transparent)` }} />
                <span className="out" style={{ color: C.muted, fontSize: 12 }}>Ansh Global Travels</span>
              </div>
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              <motion.a href="tel:+919315163095" className="out" whileHover={{ scale: 1.04 }}
                style={{ padding: "13px 26px", background: `linear-gradient(135deg,${C.gold},${C.goldDark})`,
                  color: C.navy, fontWeight: 700, fontSize: 11, letterSpacing: "1.5px", textTransform: "uppercase",
                  textDecoration: "none", borderRadius: 3 }}>
                📞 Call Us
              </motion.a>
              <motion.a href="https://wa.me/919315163095" target="_blank" rel="noopener noreferrer" className="out" whileHover={{ scale: 1.04 }}
                style={{ padding: "13px 26px", border: `1px solid rgba(201,168,76,0.35)`, color: C.cream,
                  fontWeight: 500, fontSize: 11, letterSpacing: "1.5px", textTransform: "uppercase",
                  textDecoration: "none", borderRadius: 3, background: C.subtle }}>
                💬 WhatsApp
              </motion.a>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              {WHY.map((r, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.09 }}
                  whileHover={{ y: -5, borderColor: "rgba(201,168,76,0.4)" }}
                  style={{ padding: "22px 18px", background: C.navyLight,
                    border: "1px solid rgba(232,238,255,0.07)", borderRadius: 4, transition: "border 0.3s" }}>
                  <span style={{ fontSize: 24, display: "block", marginBottom: 12 }}>{r.icon}</span>
                  <h4 className="out" style={{ color: C.cream, fontSize: 13, fontWeight: 600, marginBottom: 7 }}>{r.title}</h4>
                  <p className="out" style={{ color: C.muted, fontSize: 12, lineHeight: 1.7, fontWeight: 300 }}>{r.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── Why Trust Us ──────────────────────────────────────────────────────────────
function Testimonials() {
  const promises = [
    {
      icon: "🧭",
      title: "Expert Travel Knowledge",
      desc: "Our team has deep expertise in domestic and international travel — from flights and hotels to visas, insurance, and religious tours. We know travel inside out.",
    },
    {
      icon: "💬",
      title: "Always Reachable",
      desc: "Got a question at midnight before your trip? We are available 24 × 7 on call and WhatsApp. You will never be left without support when you need it most.",
    },
    {
      icon: "💰",
      title: "Transparent Pricing",
      desc: "No surprise charges, no hidden fees. What we quote is what you pay. We believe trust is built through honesty — and that starts with the bill.",
    },
    {
      icon: "🎯",
      title: "Your Trip, Your Way",
      desc: "We don't believe in one-size-fits-all packages. Every itinerary is built around your preferences, budget, and schedule — nothing more, nothing less.",
    },
    {
      icon: "⚡",
      title: "Fast & Reliable Booking",
      desc: "Quick confirmations, instant updates, and zero follow-up needed. We handle all the back-and-forth so your experience is smooth from day one.",
    },
    {
      icon: "🤝",
      title: "Personal Commitment",
      desc: "You won't be passed between agents. One dedicated person handles your entire journey — so you always know who to call and nothing gets lost.",
    },
  ];

  return (
    <section style={{ background: `linear-gradient(135deg,${C.royal},${C.blue})`, padding: "96px 0", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg,transparent,${C.gold}44,transparent)` }} />
      <div style={{ position: "absolute", inset: 0, opacity: 0.025,
        backgroundImage: "radial-gradient(circle,rgba(232,238,255,1) 1px,transparent 1px)",
        backgroundSize: "40px 40px", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", position: "relative", zIndex: 2 }}>
        {/* Heading */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 20, marginBottom: 60 }}>
          <div>
            <p className="out" style={{ color: C.gold, fontSize: 10, letterSpacing: "4px", textTransform: "uppercase", marginBottom: 14 }}>
              Why Choose Us
            </p>
            <h2 className="cg" style={{ fontSize: "clamp(38px,5vw,64px)", fontWeight: 300, color: C.cream, fontStyle: "italic", lineHeight: 1.1 }}>
              Our Commitment<br /><span style={{ color: C.gold }}>To You</span>
            </h2>
          </div>
          <p className="out" style={{ color: "rgba(232,238,255,0.5)", fontSize: 15, maxWidth: 360, lineHeight: 1.8, fontWeight: 300 }}>
            We may be new, but our standards aren't. Here is exactly what you can count on every single time you travel with us.
          </p>
        </motion.div>

        {/* Promise cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 56 }}
          className="three-col">
          {promises.map((p, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              whileHover={{ y: -6, borderColor: "rgba(201,168,76,0.4)" }}
              style={{ padding: "28px 24px", background: "rgba(8,15,36,0.45)",
                border: "1px solid rgba(201,168,76,0.14)", borderRadius: 4,
                backdropFilter: "blur(12px)", transition: "border 0.3s" }}>
              <div style={{ fontSize: 30, marginBottom: 14 }}>{p.icon}</div>
              <h4 className="out" style={{ color: C.cream, fontSize: 14, fontWeight: 600, marginBottom: 10 }}>{p.title}</h4>
              <p className="out" style={{ color: "rgba(232,238,255,0.5)", fontSize: 13, lineHeight: 1.75, fontWeight: 300 }}>{p.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA strip */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 24,
            padding: "36px 44px", background: "rgba(8,15,36,0.5)",
            border: "1px solid rgba(201,168,76,0.22)", borderRadius: 6, backdropFilter: "blur(16px)" }}>
          <div>
            <p className="out" style={{ color: C.gold, fontSize: 10, letterSpacing: "3px", textTransform: "uppercase", marginBottom: 8 }}>
              Let's get started
            </p>
            <h3 className="cg" style={{ color: C.cream, fontSize: 30, fontWeight: 300, fontStyle: "italic", lineHeight: 1.3 }}>
              Tell us where you want to go —<br />we'll take care of everything else.
            </h3>
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <motion.a href="https://wa.me/919315163095" target="_blank" rel="noopener noreferrer" className="out"
              whileHover={{ scale: 1.05, boxShadow: `0 8px 30px rgba(201,168,76,0.5)` }}
              style={{ padding: "14px 30px", background: `linear-gradient(135deg,${C.gold},${C.goldDark})`,
                color: C.navy, fontWeight: 700, fontSize: 12, letterSpacing: "1.5px", textTransform: "uppercase",
                textDecoration: "none", borderRadius: 3, display: "flex", alignItems: "center", gap: 8 }}>
              💬 WhatsApp Us
            </motion.a>
            <motion.a href="tel:+919315163095" className="out"
              whileHover={{ scale: 1.05 }}
              style={{ padding: "14px 30px", border: "1px solid rgba(201,168,76,0.4)", color: C.cream,
                fontWeight: 500, fontSize: 12, letterSpacing: "1.5px", textTransform: "uppercase",
                textDecoration: "none", borderRadius: 3, background: "rgba(232,238,255,0.04)",
                display: "flex", alignItems: "center", gap: 8 }}>
              📞 Call Us
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ── Contact ────────────────────────────────────────────────────────────────────
function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", destination: "", message: "" });
  const [sent, setSent] = useState(false);
  const submit = e => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", phone: "", destination: "", message: "" });
    setTimeout(() => setSent(false), 5000);
  };
  const iStyle = { width: "100%", padding: "13px 16px", background: "rgba(232,238,255,0.05)",
    border: "1px solid rgba(201,168,76,0.18)", borderRadius: 3, color: C.cream,
    fontSize: 14, outline: "none", transition: "border-color 0.3s" };
  return (
    <section id="contact" style={{ background: C.navyMid, padding: "96px 0", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", bottom: 0, right: "10%", width: 400, height: 400,
        background: `radial-gradient(circle,rgba(26,52,104,0.25),transparent)`, borderRadius: "50%", pointerEvents: "none" }} />
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", position: "relative", zIndex: 2 }}>
        <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 72, alignItems: "start" }}>
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <p className="out" style={{ color: C.gold, fontSize: 10, letterSpacing: "4px", textTransform: "uppercase", marginBottom: 16 }}>Get In Touch</p>
            <h2 className="cg" style={{ fontSize: "clamp(38px,4.5vw,60px)", fontWeight: 300, color: C.cream, fontStyle: "italic", lineHeight: 1.1, marginBottom: 20 }}>
              Start Your<br /><span style={{ color: C.gold }}>Adventure</span>
            </h2>
            <p className="out" style={{ color: C.muted, fontSize: 15, lineHeight: 1.85, fontWeight: 300, marginBottom: 44 }}>
              Ready to explore? Let our travel experts craft your perfect journey from start to finish.
            </p>
            {[
              { icon: "📞", label: "Phone & WhatsApp", val: "+91 9315163095", href: "tel:+919315163095" },
              { icon: "💬", label: "WhatsApp", val: "Chat with us instantly", href: "https://wa.me/919315163095" },
              { icon: "🌏", label: "Location", val: "India", href: null },
              { icon: "🕐", label: "Support", val: "Available 24 × 7", href: null },
            ].map((c, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 14, padding: "14px 18px",
                  background: C.subtle, border: "1px solid rgba(201,168,76,0.1)", borderRadius: 4 }}>
                <span style={{ fontSize: 20, flexShrink: 0 }}>{c.icon}</span>
                <div>
                  <p className="out" style={{ color: "rgba(201,168,76,0.55)", fontSize: 9, letterSpacing: "2px", textTransform: "uppercase", marginBottom: 3 }}>{c.label}</p>
                  {c.href
                    ? <a href={c.href} target={c.href.startsWith("http") ? "_blank" : "_self"} rel="noopener noreferrer" className="out"
                        style={{ color: C.cream, fontSize: 14, fontWeight: 500, textDecoration: "none" }}>{c.val}</a>
                    : <p className="out" style={{ color: C.cream, fontSize: 14, fontWeight: 500 }}>{c.val}</p>}
                </div>
              </motion.div>
            ))}
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div style={{ padding: "44px 38px", background: `linear-gradient(135deg,${C.navyLight},${C.royal})`,
              border: `1px solid rgba(201,168,76,0.15)`, borderRadius: 6, boxShadow: "0 30px 80px rgba(0,0,0,0.25)" }}>
              <AnimatePresence>
                {sent && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    style={{ marginBottom: 22, padding: "14px 18px", background: "rgba(80,200,120,0.1)",
                      border: "1px solid rgba(80,200,120,0.3)", borderRadius: 3, color: "#6ee7b7",
                      fontSize: 13, fontFamily: "'Outfit',sans-serif", textAlign: "center" }}>
                    ✅ Enquiry sent! We'll reach out shortly.
                  </motion.div>
                )}
              </AnimatePresence>
              <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                {[
                  { k: "name", label: "Your Name", ph: "Full name", type: "text" },
                  { k: "phone", label: "Phone / WhatsApp", ph: "+91 XXXXX XXXXX", type: "tel" },
                  { k: "destination", label: "Dream Destination", ph: "Where do you want to go?", type: "text" },
                ].map(f => (
                  <div key={f.k}>
                    <label className="out" style={{ color: "rgba(201,168,76,0.65)", fontSize: 9, letterSpacing: "2.5px", textTransform: "uppercase", display: "block", marginBottom: 7 }}>{f.label}</label>
                    <input required type={f.type} placeholder={f.ph} value={form[f.k]}
                      onChange={e => setForm(p => ({ ...p, [f.k]: e.target.value }))}
                      style={iStyle}
                      onFocus={e => e.target.style.borderColor = C.gold}
                      onBlur={e => e.target.style.borderColor = "rgba(201,168,76,0.18)"} />
                  </div>
                ))}
                <div>
                  <label className="out" style={{ color: "rgba(201,168,76,0.65)", fontSize: 9, letterSpacing: "2.5px", textTransform: "uppercase", display: "block", marginBottom: 7 }}>Message</label>
                  <textarea rows={4} placeholder="Tell us about your travel plans..." value={form.message}
                    onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                    style={{ ...iStyle, resize: "none" }}
                    onFocus={e => e.target.style.borderColor = C.gold}
                    onBlur={e => e.target.style.borderColor = "rgba(201,168,76,0.18)"} />
                </div>
                <motion.button type="submit" className="out"
                  whileHover={{ scale: 1.03, boxShadow: `0 12px 40px rgba(201,168,76,0.45)` }} whileTap={{ scale: 0.97 }}
                  style={{ padding: "16px", background: `linear-gradient(135deg,${C.gold},${C.goldDark})`,
                    color: C.navy, fontWeight: 700, fontSize: 12, letterSpacing: "2px", textTransform: "uppercase",
                    border: "none", borderRadius: 3, cursor: "pointer" }}>
                  ✈ Send Enquiry
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── Footer ─────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: "#040a18", borderTop: "1px solid rgba(201,168,76,0.1)", padding: "56px 0 28px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
        <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 40, marginBottom: 44 }}>
          <div>
            <img src={logo} alt="Ansh Global Travels"
              style={{ height: 62, width: "auto", marginBottom: 18, filter: "drop-shadow(0 0 10px rgba(201,168,76,0.25))" }} />
            <p className="out" style={{ color: "rgba(232,238,255,0.32)", fontSize: 13, lineHeight: 1.8, fontWeight: 300, maxWidth: 300 }}>
              A new travel company with a big dream — to make every journey seamless, personal, and memorable for every client we serve.
            </p>
          </div>
          <div>
            <p className="out" style={{ color: C.gold, fontSize: 9, letterSpacing: "3px", textTransform: "uppercase", marginBottom: 18 }}>Quick Links</p>
            {["Home","Services","Destinations","About","Contact"].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} className="out"
                style={{ display: "block", color: "rgba(232,238,255,0.32)", fontSize: 13, marginBottom: 9, textDecoration: "none", transition: "color 0.3s" }}
                onMouseEnter={e => e.target.style.color = C.gold}
                onMouseLeave={e => e.target.style.color = "rgba(232,238,255,0.32)"}>{l}</a>
            ))}
          </div>
          <div>
            <p className="out" style={{ color: C.gold, fontSize: 9, letterSpacing: "3px", textTransform: "uppercase", marginBottom: 18 }}>Contact</p>
            {[
              { e: "📞", t: "+91 9315163095" },
              { e: "💬", t: "WhatsApp: 9315163095" },
              { e: "🌏", t: "India" },
              { e: "🕐", t: "24 × 7 Support" },
            ].map((c, i) => <p key={i} className="out" style={{ color: "rgba(232,238,255,0.32)", fontSize: 13, marginBottom: 9 }}>{c.e} {c.t}</p>)}
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(201,168,76,0.07)", paddingTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
          <p className="out" style={{ color: "rgba(232,238,255,0.18)", fontSize: 12 }}>© {new Date().getFullYear()} Ansh Global Travels. All rights reserved.</p>
          <p className="out" style={{ color: "rgba(201,168,76,0.3)", fontSize: 12 }}>Made with ❤️ for travellers</p>
        </div>
      </div>
    </footer>
  );
}

// ── Floaters ───────────────────────────────────────────────────────────────────
function FloatingButtons() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const h = () => setShow(window.scrollY > 500);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <>
      <motion.a href="https://wa.me/919315163095" target="_blank" rel="noopener noreferrer"
        animate={{ y: [0, -5, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.12 }}
        style={{ position: "fixed", bottom: 30, left: 30, width: 54, height: 54, borderRadius: "50%",
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, zIndex: 90,
          background: "linear-gradient(135deg,#25D366,#128C7E)", boxShadow: "0 6px 24px rgba(37,211,102,0.4)",
          textDecoration: "none" }}>
        💬
      </motion.a>
      <AnimatePresence>
        {show && (
          <motion.button initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            whileHover={{ scale: 1.1 }}
            style={{ position: "fixed", bottom: 30, right: 30, width: 46, height: 46, borderRadius: 3,
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, zIndex: 90,
              background: `linear-gradient(135deg,${C.gold},${C.goldDark})`, color: C.navy,
              border: "none", fontWeight: 700, boxShadow: `0 6px 20px rgba(201,168,76,0.4)`, cursor: "pointer" }}>
            ↑
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}

// ── App ────────────────────────────────────────────────────────────────────────
export default function Home() {
  const [active, setActive] = useState("home");
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
    }, { threshold: 0.35 });
    document.querySelectorAll("section[id]").forEach(s => obs.observe(s));
    return () => obs.disconnect();
  }, []);
  return (
    <>
      <Styles />
      <Navbar active={active} />
      <Hero />
      <Stats />
      <Services />
      <Packages />
      <Destinations />
      <About />
      <Testimonials />
      <Contact />
      <Footer />
      <FloatingButtons />
    </>
  );
}