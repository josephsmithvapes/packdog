import { Router } from 'express'
import Stripe from 'stripe'
import { submitOrder } from '../services/cjdropship.js'
import { notifyOrder } from '../services/telegram.js'
import { getProductById } from '../data/products.js'

const router = Router()
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// POST /api/webhook  (raw body — configured in index.js)
router.post('/', async (req, res) => {
  const sig = req.headers['stripe-signature']

  let event
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message)
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }

  // ── Only handle successful payments ────────────────────────────────────────
  if (event.type !== 'checkout.session.completed') {
    return res.json({ received: true })
  }

  const session = event.data.object

  // Only process paid sessions
  if (session.payment_status !== 'paid') {
    return res.json({ received: true })
  }

  try {
    const shipping = session.shipping_details
    const cartItems = JSON.parse(session.metadata.cartJson || '[]')

    // Build order payload
    const orderPayload = {
      orderId: session.id,
      customerEmail: session.customer_details?.email || '',
      shippingAddress: {
        name: shipping?.name || '',
        phone: session.customer_details?.phone || '',
        addressLine1: shipping?.address?.line1 || '',
        addressLine2: shipping?.address?.line2 || '',
        city: shipping?.address?.city || '',
        state: shipping?.address?.state || '',
        zip: shipping?.address?.postal_code || '',
        country: shipping?.address?.country || 'US',
      },
      items: cartItems.map(item => {
        const product = getProductById(item.id)
        return {
          cjProductId: product?.cjProductId || '',
          productName: product?.name || item.id,
          quantity: item.quantity || 1,
          variant: item.variant || '',
        }
      }),
      totalAmount: session.amount_total / 100,
    }

    // Submit to CJDropshipping
    const cjResult = await submitOrder(orderPayload)
    console.log('✅ CJ order submitted:', cjResult?.data?.orderId || 'see logs')

    // Notify via Telegram
    await notifyOrder({ session, orderPayload, cjResult })

    res.json({ received: true, status: 'order_submitted' })
  } catch (err) {
    console.error('Order processing error:', err.message)
    // Still return 200 so Stripe doesn't retry — log and handle manually
    res.json({ received: true, status: 'error', error: err.message })
  }
})

export default router
