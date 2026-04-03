import { Router } from 'express'
import Stripe from 'stripe'
import { getProductById } from '../data/products.js'

const router = Router()
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// POST /api/checkout/session
// Body: { items: [{ id, quantity, variant? }], customerEmail? }
router.post('/session', async (req, res) => {
  try {
    const { items, customerEmail } = req.body

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'No items provided' })
    }

    // Build Stripe line items
    const lineItems = []
    for (const item of items) {
      const product = getProductById(item.id)
      if (!product) {
        return res.status(400).json({ error: `Unknown product: ${item.id}` })
      }

      const variantLabel = item.variant ? ` (${item.variant})` : ''
      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: product.name + variantLabel,
            description: product.description,
            images: [product.image],
            metadata: {
              productId: product.id,
              variant: item.variant || '',
              cjProductId: product.cjProductId || '',
            },
          },
          unit_amount: product.price,
        },
        quantity: item.quantity || 1,
      })
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: lineItems,
      customer_email: customerEmail || undefined,
      shipping_address_collection: {
        allowed_countries: ['US', 'CA'],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: { amount: 0, currency: 'usd' },
            display_name: 'Free Shipping',
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 5 },
              maximum: { unit: 'business_day', value: 10 },
            },
          },
        },
      ],
      success_url: `${process.env.FRONTEND_URL}/packdog/success?session_id={CHECKOUT_SESSION_ID}`,
cancel_url: `${process.env.FRONTEND_URL}/packdog/cart`,
      metadata: {
        // Store full cart for webhook processing
        cartJson: JSON.stringify(items),
      },
    })

    res.json({ url: session.url, sessionId: session.id })
  } catch (err) {
    console.error('Checkout error:', err.message)
    res.status(500).json({ error: err.message })
  }
})

export default router
