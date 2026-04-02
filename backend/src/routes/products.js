import { Router } from 'express'
import { PRODUCTS } from '../data/products.js'

const router = Router()

// GET /api/products — full catalog (strip supplier cost from response)
router.get('/', (req, res) => {
  const safe = PRODUCTS.map(({ supplierCost, cjProductId, ...rest }) => rest)
  res.json({ products: safe })
})

// GET /api/products/:slug
router.get('/:slug', (req, res) => {
  const product = PRODUCTS.find(p => p.slug === req.params.slug)
  if (!product) return res.status(404).json({ error: 'Product not found' })
  const { supplierCost, cjProductId, ...safe } = product
  res.json({ product: safe })
})

export default router
