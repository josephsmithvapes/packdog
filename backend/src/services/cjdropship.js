import fetch from 'node-fetch'

const CJ_BASE = 'https://developers.cjdropshipping.com/api2.0/v1'

let _accessToken = null
let _tokenExpiry = 0

// ── Auth: get or refresh access token ────────────────────────────────────────
async function getAccessToken() {
  if (_accessToken && Date.now() < _tokenExpiry) return _accessToken

  const res = await fetch(`${CJ_BASE}/authentication/getAccessToken`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: process.env.CJ_EMAIL,
      password: process.env.CJ_API_KEY,
    }),
  })

  const data = await res.json()

  if (!data.result) {
    throw new Error(`CJ auth failed: ${data.message || JSON.stringify(data)}`)
  }

  _accessToken = data.data.accessToken
  // Token valid for 24h — refresh 1h early
  _tokenExpiry = Date.now() + (23 * 60 * 60 * 1000)

  return _accessToken
}

// ── Generic authenticated CJ request ─────────────────────────────────────────
async function cjRequest(endpoint, method = 'GET', body = null) {
  const token = await getAccessToken()

  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'CJ-Access-Token': token,
    },
  }

  if (body) options.body = JSON.stringify(body)

  const res = await fetch(`${CJ_BASE}${endpoint}`, options)
  const data = await res.json()

  if (!data.result) {
    throw new Error(`CJ API error [${endpoint}]: ${data.message || JSON.stringify(data)}`)
  }

  return data
}

// ── Submit a dropship order ───────────────────────────────────────────────────
// Docs: POST /shopping/order/createOrderV2
export async function submitOrder(orderPayload) {
  const { orderId, shippingAddress, items } = orderPayload

  const payload = {
    orderNumber: `PKD-${orderId.slice(-8).toUpperCase()}`,
    shippingZip: shippingAddress.zip,
    shippingCountry: shippingAddress.country,
    shippingCountryCode: shippingAddress.country,
    shippingProvince: shippingAddress.state,
    shippingCity: shippingAddress.city,
    shippingAddress: shippingAddress.addressLine1,
    shippingAddress2: shippingAddress.addressLine2 || '',
    shippingCustomerName: shippingAddress.name,
    shippingPhone: shippingAddress.phone || '0000000000',
    remark: `PACKDOG order — email: ${orderPayload.customerEmail}`,
    logisticName: 'CJPacket Ordinary',  // Adjust based on CJ account options
    products: items
      .filter(item => item.cjProductId)  // Only submit items with CJ IDs
      .map(item => ({
        vid: item.cjProductId,
        quantity: item.quantity,
      })),
  }

  // Guard: if no CJ product IDs filled in yet, log and skip
  if (payload.products.length === 0) {
    console.warn('⚠️  No CJ product IDs configured — skipping CJ order submission')
    console.warn('   → Fill in cjProductId in backend/src/data/products.js')
    return { data: { orderId: 'MANUAL_REQUIRED' }, message: 'No CJ IDs set' }
  }

  return await cjRequest('/shopping/order/createOrderV2', 'POST', payload)
}

// ── Get order status / tracking ───────────────────────────────────────────────
export async function getOrderStatus(cjOrderId) {
  return await cjRequest(`/shopping/order/getOrderDetail?orderId=${cjOrderId}`)
}

// ── Search products in CJ catalog ─────────────────────────────────────────────
export async function searchProducts(keyword, page = 1, pageSize = 20) {
  return await cjRequest(
    `/product/list?productNameEn=${encodeURIComponent(keyword)}&pageNum=${page}&pageSize=${pageSize}`
  )
}
