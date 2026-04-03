import { useState, useEffect } from "react";

const REVIEWS = [
  { name: "Megan R.", dog: "Bruno, 3yr Malinois", stars: 5, text: "The hammock saved my leather seats on a 6-hour drive to Bend. Bruno destroyed everything before this. Absolute must-buy for road trip dogs." },
  { name: "Tyler K.", dog: "Odin, 2yr Husky", stars: 5, text: "Trail harness is incredible. Odin used to drag me down every hill. First walk with this thing he was right at my side. Shocked." },
  { name: "Jess M.", dog: "Peanut, 5yr Corgi", stars: 5, text: "That LED collar TikTok made me buy this instantly. My neighborhood has zero streetlights. Now I can see Peanut from inside the house."},
  { name: "Carlos D.", dog: "Koda, 4yr Lab Mix", stars: 5, text: "We hike every weekend. This water bottle is compact, tough, and Koda figured it out immediately. Whole family uses PackDog gear now."}
];

export default function PackDogStore() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [added, setAdded] = useState(null);
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    fetch("packdog-production.up.railway.app")
      .then(r => r.json())
      .then(data => { setProducts(data.products || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

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

      .-card {
        background: #fff;
        cursor: pointer;
        overflow: hidden;
        transition: transform 0.2s, box-shadow 0.2s;
      }
      .-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.15); }

      .-card img {
        width: 100%;
        height: 240px;
        object-fit: cover;
        display: block;
        transition: transform 0.4s;
      }
      .-card:hover img { transform: scale(1.04); }

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
        .-grid { grid-template-columns: 1fr 1fr !important; }
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

  const addToCart = () => {
    setCart(prev => {
      const existing = prev.find(i => i.id === .id);
      if (existing) return prev.map(i => i.id === .id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ..., qty: 1 }];
    });
    setAdded(.id);
    setTimeout(() => setAdded(null), 1200);
  };

  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const categories = ["ALL", "SAFETY", "TRAIL GEAR", "OUTDOOR GEAR", "CAR GEAR"];
  const filtered = filter === "ALL" ? s : s.filter(p => p.category === filter.toLowerCase().replace(" ", "-"));

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

      {/* ── CHARITY STRIP ── */}
      <div style={{ background: "#f0e8d4", borderTop: "1px solid #e0d0b8", borderBottom: "1px solid #e0d0b8", padding: "18px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
          <span style={{ fontSize: 22 }}>🐾</span>
          <span style={{ fontFamily: "'Lora'", fontSize: 14, color: "#4a3a2a", fontStyle: "italic" }}>
            10% of every order goes to <strong style={{ fontStyle: "normal", color: "#122112" }}>Best Friends Animal Society</strong> — helping end the killing of dogs and cats in America's shelters.
          </span>
          <a href="https://bestfriends.org" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'DM Sans'", fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: "#c8721a", textTransform: "uppercase", textDecoration: "none", whiteSpace: "nowrap" }}>Learn More ↗</a>
        </div>
      </div>

      {/* ── S ── */}
      <div id="shop" style={{ maxWidth: 1200, margin: "0 auto", padding: "72px 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40, flexWrap: "wrap", gap: 20 }}>
          <div>
            <div style={{ fontFamily: "'DM Sans'", fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "#c8721a", marginBottom: 8 }}>The Collection</div>
            <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: 48, color: "#122112", letterSpacing: 2, lineHeight: 1 }}>EVERYTHING YOUR DOG NEEDS</h2>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {categories.map(c => (
              <button key={c} className={`filter-btn ${filter === c ? "active" : ""}`} onClick={() => setFilter(c)}>{c}</button>
            ))}
          </div>
        </div>

        <div className="-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {loading ? (
            <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "60px 0", fontFamily: "'Lora'", color: "#8b6a4a", fontSize: 15, fontStyle: "italic" }}>
              Loading gear...
            </div>
          ) : filtered.map(() => (
            <div key={.id} className="-card">
              <div style={{ position: "relative", overflow: "hidden" }}>
                <img src={.image} alt={.name} />
                <div style={{ position: "absolute", top: 12, left: 12 }}>
                  <span style={{ background: "#c8721a", color: "#fff", fontFamily: "'DM Sans'", fontSize: 9, fontWeight: 700, letterSpacing: 2, padding: "4px 8px", textTransform: "uppercase" }}>
                    {.category}
                  </span>
                </div>
                {added === .id && (
                  <div style={{ position: "absolute", inset: 0, background: "#122112dd", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontFamily: "'Bebas Neue'", fontSize: 24, color: "#f5ede0", letterSpacing: 3 }}>ADDED ✓</span>
                  </div>
                )}
              </div>
              <div style={{ padding: "18px 20px 0" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <h3 style={{ fontFamily: "'Bebas Neue'", fontSize: 20, color: "#122112", letterSpacing: 1, lineHeight: 1.2, flex: 1 }}>{.name}</h3>
                  <span style={{ fontFamily: "'Bebas Neue'", fontSize: 22, color: "#c8721a", letterSpacing: 1, marginLeft: 12 }}>${.price}</span>
                </div>
                <p style={{ fontFamily: "'Lora'", fontSize: 12, color: "#6b6b6b", marginTop: 6, lineHeight: 1.65, fontStyle: "italic" }}>{.description}</p>
                <div style={{ display: "flex", gap: 6, marginTop: 12, flexWrap: "wrap" }}>
                  {(.features || []).map(f => (
                    <span key={f} style={{ fontFamily: "'DM Sans'", fontSize: 9, fontWeight: 600, letterSpacing: 1, color: "#2a7a3a", background: "#e8f4e8", padding: "3px 7px", textTransform: "uppercase" }}>✓ {f}</span>
                  ))}
                </div>
                <div style={{ marginTop: 10, marginBottom: 12, fontSize: 11, color: "#999", fontFamily: "'DM Sans'" }}>
                  Ships in {.deliveryDays} days from US
                </div>
              </div>
              <button className="add-btn" onClick={() => addToCart()}>
                ADD TO CART — ${.price}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ── BUNDLE DEAL ── */}
      <div style={{ background: "#122112", padding: "60px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
          <div>
            <div style={{ fontFamily: "'DM Sans'", fontSize: 10, fontWeight: 700, letterSpacing: 3, color: "#c8721a", textTransform: "uppercase", marginBottom: 12 }}>Best Value</div>
            <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: 52, color: "#f5ede0", letterSpacing: 2, lineHeight: 1, marginBottom: 20 }}>THE ROAD TRIP BUNDLE</h2>
            <p style={{ fontFamily: "'Lora'", fontSize: 15, color: "#c8d4b0", lineHeight: 1.8, marginBottom: 28 }}>
              Hammock + Water Bottle + LED Collar. Everything you need for every adventure. Bundled together at a price that makes sense.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
              <span style={{ fontFamily: "'Bebas Neue'", fontSize: 48, color: "#c8721a", letterSpacing: 2 }}>$108</span>
              <div>
                <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: "#c8d4b070", textDecoration: "line-through" }}>$124 separate</div>
                <div style={{ fontFamily: "'DM Sans'", fontSize: 12, fontWeight: 700, color: "#6abf6a", letterSpacing: 1 }}>SAVE $16</div>
              </div>
            </div>
            <button className="btn-primary" style={{ fontSize: 14, padding: "16px 40px" }}>GET THE BUNDLE</button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {s.slice(0, 4).map(p => (
              <div key={p.id} style={{ background: "#1a3a1c", overflow: "hidden" }}>
                <img src={p.image} alt={p.name} style={{ width: "100%", height: 100, objectFit: "cover" }} />
                <div style={{ padding: "10px 12px" }}>
                  <div style={{ fontFamily: "'DM Sans'", fontSize: 10, fontWeight: 700, color: "#c8d4b0", letterSpacing: 1, textTransform: "uppercase" }}>{p.name}</div>
                  <div style={{ fontFamily: "'Bebas Neue'", fontSize: 16, color: "#c8721a", marginTop: 2 }}>${p.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── BRAND STORY ── */}
      <div style={{ background: "#f5ede0", padding: "80px 24px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontFamily: "'DM Sans'", fontSize: 11, fontWeight: 700, letterSpacing: 3, color: "#c8721a", textTransform: "uppercase", marginBottom: 16 }}>Our Story</div>
          <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: 56, color: "#122112", letterSpacing: 2, lineHeight: 1, marginBottom: 28 }}>BUILT FOR THE DOG THAT NEVER SITS STILL</h2>
          <p style={{ fontFamily: "'Lora'", fontSize: 16, color: "#4a4a4a", lineHeight: 1.9, marginBottom: 20 }}>
            PackDog started because adventure dogs deserve gear that keeps up with them. Not generic pet store stuff — real, tested, trail-ready gear for dogs that ride shotgun on road trips, leap into rivers, and somehow always find the muddiest path.</p>
          <p style={{ fontFamily: "'Lora'", fontSize: 15, color: "#6b6b6b", lineHeight: 1.9 }}>
            Whether you're driving cross-country, hitting a weekend trail, or just living life with a dog who never sits still — we've got the gear.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 48, marginTop: 48 }}>
            {[["🏔", "Adventure Ready"], ["🐕", "Dog Tested"], ["🚗", "Road Approved"]].map(([icon, text]) => (
              <div key={text} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{icon}</div>
                <div style={{ fontFamily: "'DM Sans'", fontSize: 11, fontWeight: 700, letterSpacing: 2, color: "#122112", textTransform: "uppercase" }}>{text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── REVIEWS ── */}
      <div style={{ background: "#e6d4ba", padding: "72px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ fontFamily: "'DM Sans'", fontSize: 11, fontWeight: 700, letterSpacing: 3, color: "#c8721a", textTransform: "uppercase", marginBottom: 12 }}>What Dog Owners Say</div>
            <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: 48, color: "#122112", letterSpacing: 2 }}>REAL DOGS. REAL RESULTS.</h2>
          </div>
          <div className="review-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            {REVIEWS.map((r, i) => (
              <div key={i} className="review-card">
                <div style={{ display: "flex", gap: 2, marginBottom: 12 }}>
                  {[...Array(r.stars)].map((_, s) => <span key={s} style={{ color: "#c8721a", fontSize: 14 }}>★</span>)}
                </div>
                <p style={{ fontFamily: "'Lora'", fontSize: 14, color: "#2a2a2a", lineHeight: 1.8, marginBottom: 16, fontStyle: "italic" }}>"{r.text}"</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                  <div>
                    <div style={{ fontFamily: "'DM Sans'", fontSize: 12, fontWeight: 700, color: "#122112" }}>{r.name}</div>
                    <div style={{ fontFamily: "'DM Sans'", fontSize: 11, color: "#8b6a4a", marginTop: 2 }}>🐾 {r.dog}</div>
                  </div>
                  <span style={{ fontFamily: "'DM Sans'", fontSize: 9, fontWeight: 700, letterSpacing: 1.5, color: "#c8721a", background: "#f5ede0", padding: "4px 8px", textTransform: "uppercase" }}>
                    {r.}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── TIKTOK CTA ── */}
      <div style={{ background: "#091509", padding: "60px 24px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div className="grain" />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontFamily: "'Bebas Neue'", fontSize: 13, letterSpacing: 4, color: "#c8721a", marginBottom: 12 }}>FOLLOW THE PACK</div>
          <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: 52, color: "#f5ede0", letterSpacing: 2, marginBottom: 16 }}>@PACKDOG ON TIKTOK</h2>
          <p style={{ fontFamily: "'Lora'", fontSize: 15, color: "#c8d4b080", marginBottom: 32 }}>
            Dogs in cars. Trail content. Zero fluff.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
            {["Dog riding in clean car vs destroyed interior 🚗", "Glowing dog at night — instantly shareable 🔦", "10-second window shade install ⚡"].map(t => (
              <div key={t} style={{ background: "#1a3a1c", border: "1px solid #2a4a2a", padding: "12px 20px", maxWidth: 220 }}>
                <div style={{ fontFamily: "'DM Sans'", fontSize: 11, color: "#c8d4b0", lineHeight: 1.6 }}>{t}</div>
              </div>
            ))}
          </div>
          <button className="btn-primary" style={{ marginTop: 36 }}>FOLLOW FOR DOG CONTENT</button>
        </div>
      </div>
{/* DOG VIDEOS */}
      <div style={{ background: "#091509", padding: "60px 24px", position: "relative", overflow: "hidden" }}>
        <div className="grain" />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div style={{ fontFamily: "'DM Sans'", fontSize: 11, fontWeight: 700, letterSpacing: 3, color: "#c8721a", textTransform: "uppercase", marginBottom: 12 }}>THE PACK IN ACTION</div>
            <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: 48, color: "#f5ede0", letterSpacing: 2 }}>DOGS BEING DOGS</h2>
          </div>

          {/* Mosaic: 1 tall left + 2 stacked right */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "auto", gap: 8 }}>

            {/* Left — tall featured video */}
            <div style={{ gridRow: "1 / 3", position: "relative", overflow: "hidden", border: "1px solid #2a4a2a", background: "#0a1a0a" }}>
              <video
                src="https://res.cloudinary.com/drlfyu2ee/video/upload/v1775232106/vecteezy_pit-bull-and-mongrel-dig-holes-in-the-ground-in-nature_35786033_wsxaym.mp4"
                autoPlay
                muted
                loop
                playsInline
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", minHeight: 320 }}
              />
              <div style={{ position: "absolute", bottom: 12, left: 12, fontFamily: "'DM Sans'", fontSize: 9, fontWeight: 700, letterSpacing: 2, color: "#fff", textTransform: "uppercase", background: "#c8721a", padding: "3px 8px" }}>FEATURED</div>
            </div>

            {/* Top right */}
            <div style={{ position: "relative", overflow: "hidden", border: "1px solid #2a4a2a", background: "#0a1a0a" }}>
              <video
                src="https://res.cloudinary.com/YOUR_CLOUD_NAME/video/upload/YOUR_VIDEO_2.mp4"
                autoPlay
                muted
                loop
                playsInline
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", minHeight: 156 }}
              />
            </div>

            {/* Bottom right */}
            <div style={{ position: "relative", overflow: "hidden", border: "1px solid #2a4a2a", background: "#0a1a0a" }}>
              <video
                src="https://res.cloudinary.com/YOUR_CLOUD_NAME/video/upload/YOUR_VIDEO_3.mp4"
                autoPlay
                muted
                loop
                playsInline
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", minHeight: 156 }}
              />
            </div>

          </div>
        </div>
      </div>
      {/* ── FOOTER ── */}
      <footer style={{ background: "#060c06", padding: "40px 24px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32, flexWrap: "wrap", gap: 24 }}>
            <div>
              <div style={{ fontFamily: "'Bebas Neue'", fontSize: 28, color: "#f5ede0", letterSpacing: 3, marginBottom: 8 }}>
                PACK<span style={{ color: "#c8721a" }}>DOG</span>
              </div>
              <div style={{ fontFamily: "'Lora'", fontSize: 12, color: "#4a6a4a", fontStyle: "italic" }}>Gear for dogs that go places.</div>
              <div style={{ marginTop: 12, fontFamily: "'DM Sans'", fontSize: 10, color: "#c8721a", letterSpacing: 1 }}>🐾 10% TO BEST FRIENDS ANIMAL SOCIETY</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
              {[["Shop", ["All s", "Car Gear", "Trail Gear", "Bundles"]], ["Company", ["About", "TikTok", "Contact", "Returns"]]].map(([title, links]) => (
                <div key={title}>
                  <div style={{ fontFamily: "'DM Sans'", fontSize: 10, fontWeight: 700, letterSpacing: 3, color: "#c8721a", textTransform: "uppercase", marginBottom: 12 }}>{title}</div>
                  {links.map(l => (
                    <div key={l} style={{ fontFamily: "'DM Sans'", fontSize: 12, color: "#4a6a4a", marginBottom: 8, cursor: "pointer" }}>{l}</div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div style={{ borderTop: "1px solid #1a2a1a", paddingTop: 20, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
            <div style={{ fontFamily: "'DM Sans'", fontSize: 10, color: "#2a4a2a", letterSpacing: 1 }}>© 2026 PACKDOG — ADVENTURE DOG GEAR</div>
            <div style={{ fontFamily: "'DM Sans'", fontSize: 10, color: "#2a4a2a", letterSpacing: 1 }}>GEAR FOR DOGS THAT GO PLACES.</div>
          </div>
        </div>
      </footer>

    </div>
  );
}