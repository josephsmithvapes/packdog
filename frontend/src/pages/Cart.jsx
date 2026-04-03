import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

const API_URL = import.meta.env.VITE_API_URL || 'https://packdog-production.up.railway.app'

export default function Cart() {
  const { items, subtotal, updateQty, removeItem, clearCart } = useCart()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleCheckout = async () => {
    if (items.length === 0) return
    setLoading(true)
    setError(null)

    try {
      const payload = {
        items: items.map(i => ({
          id: i.id,
          quantity: i.quantity,
          variant: i.variant,
        })),
      }

      const res = await fetch(`${API_URL}/api/checkout/session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.error || 'Checkout failed')

      // Redirect to Stripe Checkout
      window.location.href = data.url
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>🐕</div>
          <div className="label" style={{ marginBottom: 12 }}>// your cart</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 40, color: 'var(--white)', marginBottom: 20 }}>
            NOTHING HERE YET
          </h2>
          <p style={{ color: 'var(--dim)', marginBottom: 32 }}>Time to gear up your dog.</p>
          <Link to="/shop" className="btn-primary" style={{ fontSize: 18 }}>Shop All Gear →</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <div className="container" style={{ padding: '40px 20px' }}>
        <div className="label" style={{ marginBottom: 8 }}>// your cart</div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 44, color: 'var(--white)', marginBottom: 40 }}>
          READY TO ROLL — {items.reduce((s, i) => s + i.quantity, 0)} ITEM{items.reduce((s, i) => s + i.quantity, 0) !== 1 ? 'S' : ''}
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 32, alignItems: 'start' }}>

          {/* Items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {items.map(item => (
              <div key={item.key} className="panel" style={{ padding: '16px', display: 'flex', gap: 16, alignItems: 'center' }}>
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  style={{ width: 80, height: 80, objectFit: 'cover', flexShrink: 0 }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ color: 'var(--white)', fontSize: 15, fontWeight: 600, marginBottom: 2 }}>
                    {item.product.name}
                  </div>
                  {item.variant && (
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--cyan)', marginBottom: 6 }}>
                      SIZE: {item.variant}
                    </div>
                  )}
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--cyan)' }}>
                    ${item.product.price} each
                  </div>
                </div>

                {/* Qty control */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <button
                    onClick={() => updateQty(item.key, item.quantity - 1)}
                    style={{
                      width: 28, height: 28, border: '1px solid var(--border)',
                      background: 'none', color: 'var(--text)', fontSize: 16,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'border-color 0.15s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--cyan)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
                  >−</button>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, width: 20, textAlign: 'center' }}>
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQty(item.key, item.quantity + 1)}
                    style={{
                      width: 28, height: 28, border: '1px solid var(--border)',
                      background: 'none', color: 'var(--text)', fontSize: 16,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'border-color 0.15s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--cyan)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
                  >+</button>
                </div>

                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 16, color: 'var(--white)', width: 60, textAlign: 'right' }}>
                  ${(item.product.price * item.quantity).toFixed(0)}
                </div>

                <button
                  onClick={() => removeItem(item.key)}
                  style={{
                    background: 'none', border: 'none',
                    color: 'var(--dim)', fontSize: 18, padding: '4px 8px',
                    transition: 'color 0.15s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--red)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--dim)'}
                  title="Remove item"
                >×</button>
              </div>
            ))}

            <button
              onClick={clearCart}
              style={{
                background: 'none', border: 'none',
                color: 'var(--dim)', fontFamily: 'var(--font-mono)',
                fontSize: 10, letterSpacing: '0.1em', textDecoration: 'underline',
                alignSelf: 'flex-start', marginTop: 4,
              }}
            >CLEAR CART</button>
          </div>

          {/* Order summary */}
          <div>
            <div className="panel" style={{ padding: '24px' }}>
              <div className="label" style={{ marginBottom: 16 }}>// order summary</div>

              {items.map(item => (
                <div key={item.key} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 13 }}>
                  <span style={{ color: 'var(--text)' }}>{item.product.name} × {item.quantity}</span>
                  <span style={{ color: 'var(--white)' }}>${(item.product.price * item.quantity).toFixed(0)}</span>
                </div>
              ))}

              <div style={{ borderTop: '1px solid var(--border)', margin: '16px 0', paddingTop: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 13 }}>
                  <span style={{ color: 'var(--dim)' }}>Shipping</span>
                  <span style={{ color: 'var(--cyan)' }}>FREE</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 16 }}>
                  <span style={{ color: 'var(--dim)' }}>Estimated delivery</span>
                  <span style={{ color: 'var(--text)' }}>5–8 business days</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--white)' }}>TOTAL</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 24, color: 'var(--cyan)' }}>
                    ${subtotal.toFixed(0)}
                  </span>
                </div>
              </div>

              {error && (
                <div style={{
                  background: '#ff406011', border: '1px solid var(--red)',
                  color: 'var(--red)', padding: '10px 14px', fontSize: 12,
                  fontFamily: 'var(--font-mono)', marginBottom: 16,
                }}>
                  ERROR: {error}
                </div>
              )}

              <button
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center', fontSize: 20, padding: '16px', opacity: loading ? 0.6 : 1 }}
                onClick={handleCheckout}
                disabled={loading}
              >
                {loading ? 'REDIRECTING...' : 'CHECKOUT SECURELY →'}
              </button>

              <div style={{ textAlign: 'center', marginTop: 12, fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--dim)', letterSpacing: '0.1em' }}>
                🔒 POWERED BY STRIPE — ENCRYPTED & SECURE
              </div>
            </div>

            {/* Continue shopping */}
            <Link to="/shop" style={{
              display: 'block', textAlign: 'center', marginTop: 16,
              color: 'var(--dim)', fontFamily: 'var(--font-mono)',
              fontSize: 10, letterSpacing: '0.1em',
            }}>← CONTINUE SHOPPING</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
