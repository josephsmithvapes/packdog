import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getProductBySlug, PRODUCTS } from '../data/products.js'
import { useCart } from '../context/CartContext.jsx'
import ProductCard from '../components/ProductCard.jsx'

export default function ProductPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { addItem, count } = useCart()

  const product = getProductBySlug(slug)
  const [selectedVariant, setSelectedVariant] = useState(null)
  const [added, setAdded] = useState(false)

  if (!product) {
    return (
      <div className="page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div className="label" style={{ marginBottom: 12 }}>// 404</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 48, color: 'var(--white)' }}>PRODUCT NOT FOUND</h1>
          <Link to="/shop" style={{ color: 'var(--cyan)', fontFamily: 'var(--font-mono)', fontSize: 12 }}>← BACK TO SHOP</Link>
        </div>
      </div>
    )
  }

  const handleAdd = () => {
    if (product.variants && !selectedVariant) {
      alert('Please select a size first.')
      return
    }
    addItem(product.id, selectedVariant)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const related = PRODUCTS.filter(p => p.id !== product.id).slice(0, 3)

  return (
    <div className="page">
      <div className="container" style={{ padding: '40px 20px' }}>

        {/* Breadcrumb */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 32, fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--dim)' }}>
          <Link to="/" style={{ color: 'var(--dim)' }} onMouseEnter={e=>e.target.style.color='var(--cyan)'} onMouseLeave={e=>e.target.style.color='var(--dim)'}>HOME</Link>
          <span>›</span>
          <Link to="/shop" style={{ color: 'var(--dim)' }} onMouseEnter={e=>e.target.style.color='var(--cyan)'} onMouseLeave={e=>e.target.style.color='var(--dim)'}>SHOP</Link>
          <span>›</span>
          <span style={{ color: 'var(--text)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{product.name}</span>
        </div>

        {/* Main layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'start' }}>

          {/* Image */}
          <div className="panel" style={{ overflow: 'hidden' }}>
            <img
              src={product.image}
              alt={product.name}
              style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', display: 'block' }}
            />
            <div style={{
              padding: '12px 16px',
              borderTop: '1px solid var(--border)',
              display: 'flex', gap: 16,
              fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--dim)',
            }}>
              <span>📦 Ships from US warehouse</span>
              <span>⚡ {product.deliveryDays} business days</span>
            </div>
          </div>

          {/* Details */}
          <div>
            <div className="label" style={{ marginBottom: 8 }}>{product.category} gear</div>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(32px, 4vw, 52px)',
              color: 'var(--white)',
              letterSpacing: '0.02em',
              lineHeight: 0.95,
              marginBottom: 12,
            }}>{product.name}</h1>

            <p style={{ color: 'var(--cyan)', fontStyle: 'italic', fontSize: 15, marginBottom: 20 }}>
              "{product.tagline}"
            </p>

            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 32,
              color: 'var(--cyan)',
              marginBottom: 8,
            }}>${product.price}</div>

            <div style={{ color: 'var(--dim)', fontSize: 12, marginBottom: 28, fontFamily: 'var(--font-mono)' }}>
              Free shipping · {product.deliveryDays} day delivery · 30-day returns
            </div>

            <p style={{ color: 'var(--text)', lineHeight: 1.8, marginBottom: 28, fontSize: 14 }}>
              {product.description}
            </p>

            {/* Variant selector */}
            {product.variants && (
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--dim)', letterSpacing: '0.15em', marginBottom: 10 }}>
                  SELECT SIZE {selectedVariant && <span style={{ color: 'var(--cyan)' }}>— {selectedVariant}</span>}
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  {product.variants.map(v => (
                    <button
                      key={v}
                      onClick={() => setSelectedVariant(v)}
                      style={{
                        width: 44, height: 44,
                        border: `1px solid ${selectedVariant === v ? 'var(--cyan)' : 'var(--border)'}`,
                        background: selectedVariant === v ? 'var(--cyan-dim)' : 'none',
                        color: selectedVariant === v ? 'var(--cyan)' : 'var(--dim)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: 12,
                        transition: 'all 0.15s',
                      }}
                    >{v}</button>
                  ))}
                </div>
              </div>
            )}

            {/* Add to cart */}
            <button
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', fontSize: 20, padding: '16px', marginBottom: 12 }}
              onClick={handleAdd}
            >
              {added ? '✓ ADDED TO CART' : 'ADD TO CART'}
            </button>

            <button
              className="btn-ghost"
              style={{ width: '100%', justifyContent: 'center' }}
              onClick={() => { handleAdd(); navigate('/cart') }}
            >
              BUY NOW
            </button>

            {/* Features */}
            <div style={{ marginTop: 32, borderTop: '1px solid var(--border)', paddingTop: 24 }}>
              <div className="label" style={{ marginBottom: 14 }}>// what's included</div>
              {product.features.map((f, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
                  <span style={{ color: 'var(--cyan)', flexShrink: 0, marginTop: 2 }}>◆</span>
                  <span style={{ color: 'var(--text)', fontSize: 14 }}>{f}</span>
                </div>
              ))}
            </div>

            {/* Trust */}
            <div className="panel" style={{ marginTop: 24, padding: '16px' }}>
              <div style={{ display: 'flex', gap: 20, justifyContent: 'space-around' }}>
                {[['🔒', 'Secure Checkout'], ['📦', 'Free Shipping'], ['↩️', '30-Day Returns']].map(([icon, label]) => (
                  <div key={label} style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 20, marginBottom: 4 }}>{icon}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--dim)', letterSpacing: '0.1em' }}>{label.toUpperCase()}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related products */}
        <div style={{ marginTop: 80 }}>
          <div className="label" style={{ marginBottom: 8 }}>// you might also need</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 32, color: 'var(--white)', marginBottom: 24 }}>MORE ADVENTURE GEAR</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
            {related.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </div>
    </div>
  )
}
