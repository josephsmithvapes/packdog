import { useState, useEffect } from "react";

const PRODUCTS = [
  {
    id: 1,
    name: "Rechargeable LED Safety Collar",
    tagline: "Seen from 500m. Every night.",
    desc: "Keep your dog visible on every walk. USB-C rechargeable LED collar glows up to 500m — waterproof, lightweight, and built for night adventures.",
    price: 24.99,
    cost: 9.02,
    badge: "BEST SELLER",
    badgeColor: "#c8721a",
    tag: "SAFETY",
    img: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=80",
    features: ["USB-C fast charge", "Visible up to 500m", "IPX6 waterproof"],
    deliveryDays: "5-8",
  },
  {
    id: 2,
    name: "No-Pull Tactical Dog Harness",
    tagline: "Control on the trail. Comfort off it.",
    desc: "Finally — a harness your dog can't pull out of. Dual attachment points give you full control on trails, streets, and everywhere in between.",
    price: 38.99,
    cost: 6.14,
    badge: "TOP RATED",
    badgeColor: "#2a7a3a",
    tag: "TRAIL GEAR",
    img: "https://images.unsplash.com/photo-1601758174114-e711c0cbaa69?w=600&q=80",
    features: ["Dual attachment points", "No-pull front clip", "Sizes S–XL"],
    deliveryDays: "5-8",
  },
  {
    id: 3,
    name: "Portable Weatherproof Dog Shelter",
    tagline: "Their home. Anywhere.",
    desc: "Sets up in seconds and protects your dog from rain, wind, and sun — built for camping, road trips, and backyard use.",
    price: 54.99,
    cost: 14.88,
    badge: "STAFF PICK",
    badgeColor: "#1a5a7a",
    tag: "OUTDOOR GEAR",
    img: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&q=80",
    features: ["100% waterproof", "Quick setup", "Portable & packable"],
    deliveryDays: "5-8",
  },
  {
    id: 4,
    name: "Waterproof Dog Blanket",
    tagline: "One blanket. Zero mess.",
    desc: "Waterproof and urine-proof backing keeps fur, mud, and moisture off your car seats and furniture. Machine washable, anti-slip, fits any size.",
    price: 34.99,
    cost: 12.36,
    badge: "CAR ESSENTIAL",
    badgeColor: "#7a4a1a",
    tag: "CAR GEAR",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    features: ["Waterproof & urine-proof", "Machine washable", "Anti-slip backing"],
    deliveryDays: "5-8",
  },
  {
    id: 5,
    name: "Collapsible Travel Dog Bowl",
    tagline: "Hydration on every adventure.",
    desc: "Folds flat, clips to any bag, and holds food and water in separate compartments. The easiest way to keep your dog fed and hydrated on the go.",
    price: 19.99,
    cost: 4.53,
    badge: "GREAT VALUE",
    badgeColor: "#2a5a7a",
    tag: "OUTDOOR GEAR",
    img: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=80",
    features: ["Foldable silicone", "Dual compartments", "Clips to any bag"],
    deliveryDays: "5-8",
  },
];

const REVIEWS = [
  { name: "Megan R.", dog: "Bruno, 3yr Malinois", stars: 5, text: "The hammock saved my leather seats on a 6-hour drive to Bend. Bruno destroyed everything before this. Absolute must-buy for road trip dogs.", product: "Car Hammock" },
  { name: "Tyler K.", dog: "Odin, 2yr Husky", stars: 5, text: "Trail harness is incredible. Odin used to drag me down every hill. First walk with this thing he was right at my side. Shocked.", product: "Trail Harness" },
  { name: "Jess M.", dog: "Peanut, 5yr Corgi", stars: 5, text: "That LED collar TikTok made me buy this instantly. My neighborhood has zero streetlights. Now I can see Peanut from inside the house.", product: "LED Collar" },
  { name: "Carlos D.", dog: "Koda, 4yr Lab Mix", stars: 5, text: "We hike every weekend. This water bottle is compact, tough, and Koda figured it out immediately. Whole family uses PackDog gear now.", product: "Trail Water Bottle" },
];

export default function PackDogStore() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [added, setAdded] = useState(null);
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Lora:wght@400;600&family=DM+Sans:wght@400;500;600&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    const style = document.createElement("style");
    style.textContent = `
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body { background: #f5ede0; }
      html { scroll-behavior: smooth; }

      @keyframes fadeUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes slideIn {
        from { transform: translateX(100%); }
        to { transform: translateX(0); }
      }
      @keyframes ticker {
        from { transform: translateX(0); }
        to { transform: translateX(-50%); }
      }
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.6; }
      }

      .nav-link {
        font-family: 'DM Sans', sans-serif;
        font-size: 13px;
        font-weight: 500;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: #f5ede0;
        text-decoration: none;
        cursor: pointer;
        transition: color 0.2s;
      }
      .nav-link:hover { color: #e8962a; }

      .btn-primary {
        background: #c8721a;
        color: #fff;
        border: none;
        padding: 14px 32px;
        font-family: 'DM Sans', sans-serif;
        font-size: 13px;
        font-weight: 600;
        letter-spacing: 0.15em;
        text-transform: uppercase;
        cursor: pointer;
        transition: background 0.2s, transform 0.1s;
      }
      .btn-primary:hover { background: #e8862a; transform: translateY(-1px); }
      .btn-primary:active { transform: translateY(0); }

      .btn-outline {
        background: transparent;
        color: #f5ede0;
        border: 1px solid #f5ede080;
        padding: 13px 28px;
        font-family: 'DM Sans', sans-serif;
        font-size: 13px;
        font-weight: 500;
        letter-spacing: 0.15em;
        text-transform: uppercase;
        cursor: pointer;
        transition: all 0.2s;
      }
      .btn-outline:hover { border-color: #f5ede0; background: #f5ede015; }

      .product-card {
        background: #fff;
        cursor: pointer;
        overflow: hidden;
        transition: transform 0.2s, box-shadow 0.2s;
      }
      .product-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.15); }

      .product-card img {
        width: 100%;
        height: 240px;
        object-fit: cover;
        display: block;
        transition: transform 0.4s;
      }
      .product-card:hover img { transform: scale(1.04); }

      .add-btn {
        width: 100%;
        padding: 12px;
        background: #122112;
        color: #f5ede0;
        border: none;
        font-family: 'DM Sans', sans-serif;
        font-size: 12px;
        font-weight: 600;
        letter-spacing: 0.15em;
        text-transform: uppercase;
        cursor: pointer;
        transition: background 0.2s;
      }
      .add-btn:hover { background: #c8721a; }

      .filter-btn {
        background: transparent;
        border: 1px solid #2a2a2a40;
        padding: 8px 18px;
        font-family: 'DM Sans', sans-serif;
        font-size: 11px;
        font-weight: 600;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: #4a4a4a;
        cursor: pointer;
        transition: all 0.15s;
      }
      .filter-btn.active {
        background: #122112;
        color: #f5ede0;
        border-color: #122112;
      }
      .filter-btn:hover:not(.active) { border-color: #2a2a2a; color: #2a2a2a; }

      .review-card {
        background: #fff;
        padding: 24px;
        border-left: 3px solid #c8721a;
      }

      .cart-drawer {
        position: fixed;
        top: 0; right: 0;
        width: 380px;
        height: 100vh;
        background: #fff;
        z-index: 1000;
        display: flex;
        flex-direction: column;
        box-shadow: -8px 0 40px rgba(0,0,0,0.2);
        animation: slideIn 0.3s ease;
      }

      .overlay {
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,0.5);
        z-index: 999;
      }

      .grain {
        position: absolute;
        inset: 0;
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
        pointer-events: none;
      }

      @media (max-width: 700px) {
        .cart-drawer { width: 100vw; }
        .product-grid { grid-template-columns: 1fr 1fr !important; }
        .hero-headline { font-size: 52px !important; line-height: 1 !important; }
        .trust-grid { grid-template-columns: 1fr 1fr !important; }
        .review-grid { grid-template-columns: 1fr !important; }
        .nav-shipping { display: none !important; }
        .nav-links { display: none !important; }
        .hero-inner { padding: 0 20px !important; }
        .hero-stats { gap: 20px !important; margin-top: 28px !important; }
        .bundle-grid { grid-template-columns: 1fr !important; }
        .story-icons { gap: 24px !important; }
      }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(link); document.head.removeChild(style); };
  }, []);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
    setAdded(product.id);
    setTimeout(() => setAdded(null), 1200);
  };

  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const categories = ["ALL", "SAFETY", "TRAIL GEAR", "OUTDOOR GEAR", "CAR GEAR"];
  const filtered = filter === "ALL" ? PRODUCTS : PRODUCTS.filter(p => p.tag === filter);

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#f5ede0", minHeight: "100vh" }}>

      {/* ── CART DRAWER ── */}
      {cartOpen && (
        <>
          <div className="overlay" onClick={() => setCartOpen(false)} />
          <div className="cart-drawer">
            <div style={{ padding: "20px 24px", borderBottom: "1px solid #eee", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontFamily: "'Bebas Neue'", fontSize: 22, letterSpacing: 2, color: "#122112" }}>YOUR PACK ({cartCount})</span>
              <button onClick={() => setCartOpen(false)} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "#666" }}>×</button>
            </div>
            <div style={{ flex: 1, overflowY: "auto", padding: "16px 24px" }}>
              {cart.length === 0 ? (
                <div style={{ textAlign: "center", padding: "60px 0", color: "#aaa" }}>
                  <div style={{ fontSize: 48, marginBottom: 12 }}>🐕</div>
                  <div style={{ fontFamily: "'Lora'", fontSize: 15 }}>Your cart is empty</div>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} style={{ display: "flex", gap: 12, marginBottom: 16, paddingBottom: 16, borderBottom: "1px solid #f0f0f0" }}>
                    <img src={item.img} alt={item.name} style={{ width: 70, height: 70, objectFit: "cover" }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: 13, color: "#1a1a1a" }}>{item.name}</div>
                      <div style={{ color: "#c8721a", fontWeight: 600, marginTop: 4 }}>${item.price}</div>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 8 }}>
                        <button onClick={() => setCart(c => c.map(i => i.id === item.id ? { ...i, qty: Math.max(0, i.qty - 1) } : i).filter(i => i.qty > 0))} style={{ width: 24, height: 24, border: "1px solid #ddd", background: "#f5f5f5", cursor: "pointer", fontSize: 14 }}>−</button>
                        <span style={{ fontSize: 13, fontWeight: 600 }}>{item.qty}</span>
                        <button onClick={() => addToCart(item)} style={{ width: 24, height: 24, border: "1px solid #ddd", background: "#f5f5f5", cursor: "pointer", fontSize: 14 }}>+</button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            {cart.length > 0 && (
              <div style={{ padding: "20px 24px", borderTop: "1px solid #eee" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                  <span style={{ fontFamily: "'Lora'", fontSize: 14 }}>Subtotal</span>
                  <span style={{ fontFamily: "'Bebas Neue'", fontSize: 20, color: "#c8721a" }}>${cartTotal.toFixed(2)}</span>
                </div>
                {cartTotal >= 50 && <div style={{ background: "#e8f4e8", color: "#2a7a3a", fontSize: 11, padding: "8px 12px", marginBottom: 12, fontWeight: 600, letterSpacing: 1 }}>✓ FREE SHIPPING UNLOCKED</div>}
                <button className="btn-primary" style={{ width: "100%", padding: "16px" }}>CHECKOUT →</button>
                <div style={{ textAlign: "center", marginTop: 10, fontSize: 11, color: "#aaa" }}>Secure checkout via Stripe</div>
              </div>
            )}
          </div>
        </>
      )}

      {/* ── NAV ── */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "#091509", borderBottom: "1px solid #1a3a1c" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 60 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
            <div style={{ fontFamily: "'Bebas Neue'", fontSize: 26, color: "#f5ede0", letterSpacing: 3, cursor: "pointer" }}>
              PACK<span style={{ color: "#c8721a" }}>DOG</span>
            </div>
            <div className="nav-links" style={{ display: "flex", gap: 24, alignItems: "center" }}>
              {["Shop", "About", "Reviews"].map(l => (
                <span key={l} className="nav-link">{l}</span>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <span className="nav-shipping" style={{ fontFamily: "'DM Sans'", fontSize: 11, color: "#f5ede088", letterSpacing: 2, textTransform: "uppercase" }}>Free shipping over $50</span>
            <button onClick={() => setCartOpen(true)} style={{ background: "none", border: "1px solid #2a4a2a", color: "#f5ede0", padding: "8px 16px", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, fontFamily: "'DM Sans'", fontSize: 12, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", transition: "border-color 0.2s" }}>
              🛒 {cartCount > 0 ? <span style={{ background: "#c8721a", color: "#fff", borderRadius: "50%", width: 18, height: 18, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700 }}>{cartCount}</span> : "Cart"}
            </button>
          </div>
        </div>
      </nav>

      {/* ── TICKER ── */}
      <div style={{ background: "#c8721a", overflow: "hidden", height: 36, display: "flex", alignItems: "center" }}>
        <div style={{ display: "flex", animation: "ticker 20s linear infinite", whiteSpace: "nowrap" }}>
          {[...Array(4)].map((_, ri) => (
            <span key={ri} style={{ display: "flex", gap: 40, paddingRight: 40 }}>
              {["🐕 Adventure dog gear", "🚗 Free shipping over $50", "⚡ Ships in 5–8 days", "🏔 Trail & road tested", "✓ 30-day guarantee", "🎒 Gear for dogs that go places"].map((t, i) => (
                <span key={i} style={{ fontFamily: "'DM Sans'", fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "#fff" }}>{t}</span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ── HERO ── */}
      <div style={{ position: "relative", height: "92vh", minHeight: 560, overflow: "hidden", display: "flex", alignItems: "center" }}>
        <img
          src="https://images.unsplash.com/photo-1601758174114-e711c0cbaa69?w=1400&q=80"
          alt="Adventure dog"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(105deg, #091509f0 0%, #091509b0 50%, #091509 70%)" }} />
        <div className="grain" />

        <div className="hero-inner" style={{ position: "relative", zIndex: 2, maxWidth: 1200, margin: "0 auto", padding: "0 24px", animation: "fadeUp 0.8s ease both" }}>
          <div style={{ display: "inline-block", background: "#c8721a", padding: "4px 12px", marginBottom: 20 }}>
            <span style={{ fontFamily: "'DM Sans'", fontSize: 10, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "#fff" }}>Adventure Dog Gear</span>
          </div>
          <h1 className="hero-headline" style={{ fontFamily: "'Bebas Neue'", fontSize: 96, color: "#f5ede0", lineHeight: 0.95, letterSpacing: 3, maxWidth: 700, marginBottom: 24 }}>
            GEAR FOR DOGS THAT<br />
            <span style={{ color: "#c8721a", WebkitTextStroke: "0px", textShadow: "none" }}>GO PLACES</span>
          </h1>
          <p style={{ fontFamily: "'Lora'", fontSize: 17, color: "#c8d4b0", maxWidth: 480, lineHeight: 1.7, marginBottom: 36 }}>
            Car accessories and outdoor gear built for every dog that rides, roams, and refuses to stay home.
          </p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <button className="btn-primary" style={{ fontSize: 14, padding: "16px 40px" }}>SHOP THE COLLECTION</button>
            <button className="btn-outline" style={{ fontSize: 13, padding: "15px 28px" }}>WATCH ON TIKTOK ↗</button>
          </div>
          <div className="hero-stats" style={{ display: "flex", gap: 32, marginTop: 48 }}>
            {[["1,200+", "Happy Dogs"], ["4.9★", "Avg Rating"], ["$50+", "Free Shipping"]].map(([v, l]) => (
              <div key={l}>
                <div style={{ fontFamily: "'Bebas Neue'", fontSize: 28, color: "#f5ede0", letterSpacing: 2 }}>{v}</div>
                <div style={{ fontFamily: "'DM Sans'", fontSize: 11, color: "#c8d4b080", letterSpacing: 2, textTransform: "uppercase" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ── TRUST BAR ── */}
      <div style={{ background: "#1a3a1c", padding: "20px 40px" }}>
        <div className="trust-grid" style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12 }}>
          {[
            ["🐾", "10% Donated", "Best Friends Animal Society"],
            ["🛡", "30-Day Guarantee", "No questions asked"],
            ["📦", "Free Shipping", "On orders over $50"],
            ["🐾", "Adventure Ready", "Tested on real trails"],
          ].map(([icon, title, sub]) => (
            <div key={title} style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 22 }}>{icon}</span>
              <div>
                <div style={{ fontFamily: "'DM Sans'", fontSize: 12, fontWeight: 700, color: "#f5ede0", letterSpacing: 0.5 }}>{title}</div>
                <div style={{ fontFamily: "'DM Sans'", fontSize: 10, color: "#c8d4b070", marginTop: 1 }}>{sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

