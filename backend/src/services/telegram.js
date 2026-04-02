import fetch from 'node-fetch'

const TG_BASE = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}`

async function sendMessage(text) {
  if (!process.env.TELEGRAM_BOT_TOKEN || !process.env.TELEGRAM_CHAT_ID) {
    console.log('📵 Telegram not configured — skipping notification')
    return
  }

  await fetch(`${TG_BASE}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: process.env.TELEGRAM_CHAT_ID,
      text,
      parse_mode: 'HTML',
    }),
  })
}

// ── New order notification ────────────────────────────────────────────────────
export async function notifyOrder({ session, orderPayload, cjResult }) {
  const total = (session.amount_total / 100).toFixed(2)
  const addr = orderPayload.shippingAddress
  const cjOrderId = cjResult?.data?.orderId || 'MANUAL_REQUIRED'

  const itemList = orderPayload.items
    .map(i => `  • ${i.productName} x${i.quantity}${i.variant ? ` (${i.variant})` : ''}`)
    .join('\n')

  const text = [
    `🐕 <b>NEW PACKDOG ORDER</b>`,
    ``,
    `💰 <b>$${total}</b>`,
    `📦 ${itemList}`,
    ``,
    `📍 ${addr.name}`,
    `   ${addr.addressLine1}`,
    `   ${addr.city}, ${addr.state} ${addr.zip}`,
    ``,
    `📧 ${orderPayload.customerEmail}`,
    `🏭 CJ Order: <code>${cjOrderId}</code>`,
    `🔑 Stripe: <code>${session.id.slice(-12)}</code>`,
  ].join('\n')

  await sendMessage(text)
}

// ── Tracking update notification ──────────────────────────────────────────────
export async function notifyTracking({ orderId, trackingNumber, carrier }) {
  const text = [
    `📬 <b>ORDER SHIPPED</b>`,
    ``,
    `🔑 Order: <code>${orderId}</code>`,
    `📦 Tracking: <code>${trackingNumber}</code>`,
    `🚚 Carrier: ${carrier}`,
  ].join('\n')

  await sendMessage(text)
}

// ── Daily revenue summary (call via cron) ────────────────────────────────────
export async function notifyDailySummary({ orderCount, revenue, topProduct }) {
  const text = [
    `📊 <b>PACKDOG DAILY SUMMARY</b>`,
    ``,
    `🛒 Orders: <b>${orderCount}</b>`,
    `💰 Revenue: <b>$${revenue.toFixed(2)}</b>`,
    `🏆 Top product: ${topProduct || 'N/A'}`,
  ].join('\n')

  await sendMessage(text)
}
