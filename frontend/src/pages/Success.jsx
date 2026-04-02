import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

export default function Success() {
  const [searchParams] = useSearchParams()
  const { clearCart } = useCart()
  const [cleared, setCleared] = useState(false)
  const sessionId = searchParams.get('session_id')

  useEffect(() => {
    if (!cleared) {
      clearCart()
      setCleared(true)
    }
  }, [])

  return (
    <div className="page grid-bg" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '90vh' }}>
      <div style={{ textAlign: 'center', maxWidth: 520, padding: '0 20px' }}>

        {/* Animated paw */}
        <div style={{
          fontSize: 72, marginBottom: 24,
          animation: 'bounce 1s ease-in-out',
        }}>🐾</div>

        <style>{`
          @keyframes bounce {
            0%  { transform: scale(0.5); opacity: 0; }
            70% { transform: scale(1.1); opacity: 1; }
            100% { transform: scale(1); }
          }
        `}</style>

        <div className="label" style={{ marginBottom: 12 }}>// order confirmed</div>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(42px, 7vw, 72px)',
          color: 'var(--white)',
          lineHeight: 0.95,
          marginBottom: 16,
        }}>
          YOU'RE READY<br />
          <span style={{ color: 'var(--cyan)' }}>TO ROLL.</span>
        </h1>

        <p style={{ color: 'var(--text)', fontSize: 15, lineHeight: 1.8, marginBottom: 8 }}>
          Your order is confirmed and on its way to your dog. We'll email you tracking details when it ships from our US warehouse — typically within 1 business day.
        </p>

        <p style={{ color: 'var(--dim)', fontSize: 13, marginBottom: 40 }}>
          Estimated delivery: <span style={{ color: 'var(--cyan)' }}>5–8 business days</span>
        </p>

        {/* Details box */}
        <div className="panel" style={{ padding: '20px', marginBottom: 32, textAlign: 'left' }}>
          <div className="label" style={{ marginBottom: 12 }}>// what happens next</div>
          {[
            ['Today', 'Order confirmed — check your email for receipt'],
            ['Day 1', 'Your order is submitted to our warehouse'],
            ['Day 1–2', 'Packed and handed to carrier'],
            ['Day 5–8', 'Delivered to your door — let the adventures begin'],
          ].map(([time, desc]) => (
            <div key={time} style={{ display: 'flex', gap: 16, marginBottom: 12 }}>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                color: 'var(--cyan)',
                width: 48,
                flexShrink: 0,
                paddingTop: 2,
              }}>{time}</div>
              <div style={{ color: 'var(--text)', fontSize: 13 }}>{desc}</div>
            </div>
          ))}

          {sessionId && (
            <div style={{
              marginTop: 16, paddingTop: 16,
              borderTop: '1px solid var(--border)',
              fontFamily: 'var(--font-mono)',
              fontSize: 9,
              color: 'var(--dim)',
              letterSpacing: '0.1em',
            }}>
              ORDER REF: {sessionId.slice(-12).toUpperCase()}
            </div>
          )}
        </div>

        <Link to="/shop" className="btn-primary" style={{ fontSize: 18 }}>
          Shop More Gear →
        </Link>

        <div style={{ marginTop: 20 }}>
          <Link to="/" style={{
            color: 'var(--dim)',
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            letterSpacing: '0.1em',
          }}>← BACK TO HOME</Link>
        </div>
      </div>
    </div>
  )
}
