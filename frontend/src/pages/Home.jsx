import { Link } from 'react-router-dom'
import { PRODUCTS } from '../data/products.js'
import ProductCard from '../components/ProductCard.jsx'

export default function Home() {
  return (
    <div className="page">

      {/* ── HERO ────────────────────────────────────────────────────────────── */}
      <section className="grid-bg" style={{
        padding: '80px 0 100px',
        borderBottom: '1px solid var(--border)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Cyan accent line */}
        <div style={{
          position: 'absolute', left: 0, top: '40%',
          width: '2px', height: '120px',
          background: 'var(--cyan)',
        }} />

        <div className="container">
          <div style={{ maxWidth: 680 }}>
            <div className="label" style={{ marginBottom: 16 }}>// adventure dog gear — est. 2026</div>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(54px, 8vw, 96px)',
              color: 'var(--white)',
              lineHeight: 0.9,
              letterSpacing: '0.02em',
              marginBottom: 24,
            }}>
              GEAR UP.<br />
              <span style={{ color: 'var(--cyan)' }}>GO FURTHER.</span>
            </h1>
            <p style={{
              fontSize: 18,
              color: 'var(--text)',
              marginBottom: 36,
              maxWidth: 480,
              lineHeight: 1.7,
            }}>
              Car accessories and trail gear built for dogs who go everywhere.
              Free shipping. 5–8 day delivery.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link to="/shop" className="btn-primary" style={{ fontSize: 20 }}>
                Shop All Gear →
              </Link>
              <Link to="/product/dog-car-hammock" className="btn-ghost">
                Best Seller
              </Link>
            </div>

            {/* Trust badges */}
            <div style={{ display: 'flex', gap: 24, marginTop: 48, flexWrap: 'wrap' }}>
              {[
                ['📦', 'Free Shipping', 'All US orders'],
                ['⚡', '5–8 Day Delivery', 'US warehouse'],
                ['↩️', '30-Day Returns', 'No questions'],
              ].map(([icon, title, sub]) => (
                <div key={title} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 20 }}>{icon}</span>
                  <div>
                    <div style={{ fontSize: 13, color: 'var(--white)', fontWeight: 600 }}>{title}</div>
                    <div style={{ fontSize: 11, color: 'var(--dim)' }}>{sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PRODUCTS ─────────────────────────────────────────────────────────── */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 40 }}>
            <div>
              <div className="label" style={{ marginBottom: 8 }}>// the full kit</div>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 40,
                color: 'var(--white)',
                letterSpacing: '0.03em',
              }}>ADVENTURE ESSENTIALS</h2>
            </div>
            <Link to="/shop" style={{ color: 'var(--cyan)', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em' }}>
              VIEW ALL →
            </Link>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 16,
          }}>
            {PRODUCTS.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ── BRAND STORY ──────────────────────────────────────────────────────── */}
      <section style={{
        borderTop: '1px solid var(--border)',
        padding: '80px 0',
        background: 'var(--panel)',
      }}>
        <div className="container" style={{ maxWidth: 600, textAlign: 'center' }}>
          <div className="label" style={{ marginBottom: 12 }}>// why packdog</div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 36,
            color: 'var(--white)',
            marginBottom: 20,
          }}>YOUR DOG GOES EVERYWHERE.<br />THE GEAR SHOULD TOO.</h2>
          <p style={{ color: 'var(--text)', lineHeight: 1.8, marginBottom: 32 }}>
            We source the best adventure gear for dogs — car-tested, trail-tested,
            muddy-dog-tested. Every product ships from US warehouses in 5–8 days.
          </p>
          <Link to="/shop" className="btn-primary">Shop the Collection</Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid var(--border)',
        padding: '24px 0',
        textAlign: 'center',
      }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--dim)', letterSpacing: '0.15em' }}>
          PACKDOG ADVENTURE GEAR // FREE SHIPPING // US WAREHOUSE // 2026
        </div>
      </footer>
    </div>
  )
}
