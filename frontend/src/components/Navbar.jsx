import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

export default function Navbar() {
  const { count } = useCart()
  const navigate = useNavigate()

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: 'rgba(7,13,26,0.95)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border)',
      height: 64,
      display: 'flex', alignItems: 'center',
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 24 }}>🐕</span>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: 26,
            color: 'var(--white)',
            letterSpacing: '0.05em',
          }}>PACKDOG</span>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 8,
            color: 'var(--cyan)',
            letterSpacing: '0.2em',
            marginTop: 4,
          }}>ADVENTURE GEAR</span>
        </Link>

        {/* Nav links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <Link to="/shop" style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--dim)',
            transition: 'color 0.15s',
          }}
            onMouseEnter={e => e.target.style.color = 'var(--text)'}
            onMouseLeave={e => e.target.style.color = 'var(--dim)'}
          >Shop</Link>

          {/* Cart */}
          <button
            onClick={() => navigate('/cart')}
            style={{
              background: count > 0 ? 'var(--cyan-dim)' : 'none',
              border: `1px solid ${count > 0 ? 'var(--cyan)' : 'var(--border)'}`,
              color: count > 0 ? 'var(--cyan)' : 'var(--dim)',
              padding: '8px 16px',
              display: 'flex', alignItems: 'center', gap: 8,
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              letterSpacing: '0.1em',
              transition: 'all 0.15s',
            }}
          >
            <span>CART</span>
            {count > 0 && (
              <span style={{
                background: 'var(--cyan)',
                color: 'var(--navy)',
                borderRadius: '50%',
                width: 18, height: 18,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 10,
                fontWeight: 700,
              }}>{count}</span>
            )}
          </button>
        </div>
      </div>
    </nav>
  )
}
