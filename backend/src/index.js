import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import checkoutRouter from './routes/checkout.js'
import webhookRouter from './routes/webhook.js'
import productsRouter from './routes/products.js'

const app = express()
const PORT = process.env.PORT || 3001

// ── CORS ─────────────────────────────────────────────────────────────────────
app.use(cors({
  origin: [
    process.env.FRONTEND_URL,
    'http://localhost:5173',
    'http://localhost:4173',
  ],
  credentials: true,
}))

// ── RAW BODY for Stripe webhooks (must come before express.json) ──────────────
app.use('/api/webhook', express.raw({ type: 'application/json' }), webhookRouter)

// ── JSON body for all other routes ───────────────────────────────────────────
app.use(express.json())

// ── ROUTES ───────────────────────────────────────────────────────────────────
app.use('/api/checkout', checkoutRouter)
app.use('/api/products', productsRouter)

// ── HEALTH CHECK ─────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'online', store: 'PACKDOG', timestamp: new Date().toISOString() })
})

// ── START ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🐕 PACKDOG backend running on port ${PORT}`)
  console.log(`   Health: http://localhost:${PORT}/api/health`)
  console.log(`   Mode:   ${process.env.NODE_ENV || 'development'}\n`)
})
