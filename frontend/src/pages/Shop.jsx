import { useState } from 'react'
import { PRODUCTS } from '../data/products.js'
import ProductCard from '../components/ProductCard.jsx'

const CATEGORIES = ['all', 'car', 'outdoor', 'safety']

export default function Shop() {
  const [filter, setFilter] = useState('all')

  const visible = filter === 'all'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === filter)

  return (
    <div className="page">
      <div className="container" style={{ padding: '40px 20px' }}>

        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <div className="label" style={{ marginBottom: 8 }}>// {visible.length} products</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 48, color: 'var(--white)' }}>
            ALL GEAR
          </h1>
        </div>

        {/* Category filters */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 32, flexWrap: 'wrap' }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              style={{
                border: `1px solid ${filter === cat ? 'var(--cyan)' : 'var(--border)'}`,
                background: filter === cat ? 'var(--cyan-dim)' : 'none',
                color: filter === cat ? 'var(--cyan)' : 'var(--dim)',
                padding: '8px 20px',
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                transition: 'all 0.15s',
              }}
            >
              {cat === 'all' ? 'All' : cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 16,
        }}>
          {visible.map(p => <ProductCard key={p.id} product={p} />)}
        </div>

        {/* Empty */}
        {visible.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--dim)' }}>
            <div style={{ fontSize: 48 }}>🔍</div>
            <div style={{ fontFamily: 'var(--font-mono)', marginTop: 16 }}>No products in this category yet.</div>
          </div>
        )}
      </div>
    </div>
  )
}
