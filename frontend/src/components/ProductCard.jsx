import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

export default function ProductCard({ product }) {
  const { addItem } = useCart()

  return (
    <div className="panel" style={{ overflow: 'hidden', transition: 'border-color 0.2s' }}
      onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--cyan)44'}
      onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
    >
      {/* Image */}
      <Link to={`/product/${product.slug}`}>
        <div style={{ position: 'relative', paddingTop: '75%', overflow: 'hidden', background: '#0a1020' }}>
          <img
            src={product.image}
            alt={product.name}
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.4s',
            }}
            onMouseEnter={e => e.target.style.transform = 'scale(1.04)'}
            onMouseLeave={e => e.target.style.transform = 'scale(1)'}
          />
          {product.badge && (
            <div style={{
              position: 'absolute', top: 12, left: 12,
              background: 'var(--navy)',
              border: '1px solid var(--cyan)',
              color: 'var(--cyan)',
              fontFamily: 'var(--font-mono)',
              fontSize: 9,
              letterSpacing: '0.15em',
              padding: '4px 10px',
            }}>{product.badge.toUpperCase()}</div>
          )}
        </div>
      </Link>

      {/* Info */}
      <div style={{ padding: '16px 18px 18px' }}>
        <div className="label" style={{ marginBottom: 6 }}>{product.category}</div>
        <Link to={`/product/${product.slug}`}>
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 20,
            color: 'var(--white)',
            letterSpacing: '0.03em',
            marginBottom: 6,
            lineHeight: 1.1,
          }}>{product.name}</h3>
        </Link>
        <p style={{ color: 'var(--dim)', fontSize: 13, marginBottom: 16, lineHeight: 1.5 }}>
          {product.tagline}
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 20,
              color: 'var(--cyan)',
            }}>${product.price}</span>
            <span style={{ color: 'var(--dim)', fontSize: 11, marginLeft: 8 }}>
              Free shipping · {product.deliveryDays} days
            </span>
          </div>

          <button
            className="btn-primary"
            style={{ padding: '10px 18px', fontSize: 14 }}
            onClick={() => addItem(product.id)}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  )
}
