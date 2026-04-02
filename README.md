# 🐕 PACKDOG — Adventure Dog Gear

Dropship store for adventure dog accessories. Built on Node.js + React.
Runs entirely from Termux on Android. CI/CD via GitHub Actions.

```
Frontend  →  React + Vite  →  GitHub Pages (free)
Backend   →  Node.js + Express  →  Railway free tier
Payments  →  Stripe Checkout  →  Webhooks auto-submit CJDropshipping orders
Notify    →  Telegram Bot  →  instant DM on every order
```

---

## 🚀 LAUNCH SEQUENCE (Termux)

### Step 1 — Clone & setup

```bash
# In Termux
cd /data/data/com.termux/files/home

git clone https://github.com/YOURUSERNAME/packdog.git
cd packdog

# Configure git (do once)
git config pull.rebase false
git config user.email "you@email.com"
git config user.name "Your Name"
```

### Step 2 — Backend setup

```bash
cd backend
npm install
cp .env.example .env
nano .env   # Fill in all keys (see Accounts section below)
```

#### Test backend locally

```bash
npm run dev
# Should print: 🐕 PACKDOG backend running on port 3001
# Test: curl http://localhost:3001/api/health
```

### Step 3 — Frontend setup

```bash
cd ../frontend
npm install
cp .env.example .env
# Edit .env and set VITE_API_URL to your Railway URL (after deploying backend)
```

#### Test frontend locally

```bash
npm run dev
# Open browser to http://localhost:5173
# API calls proxy to localhost:3001 automatically
```

---

## ☁️ DEPLOYMENT

### Backend → Railway

1. Go to https://railway.app → New Project → Deploy from GitHub
2. Select your repo → set **root directory** to `backend`
3. Railway auto-detects Node.js and runs `npm start`
4. Add all `.env` variables in Railway → Settings → Variables
5. Copy your Railway URL (e.g. `https://packdog-backend.railway.app`)
6. Set it as `VITE_API_URL` in GitHub repo secrets

### Frontend → GitHub Pages

1. In your GitHub repo → Settings → Pages
2. Set source to **GitHub Actions**
3. Add secret: `VITE_API_URL` = your Railway backend URL
4. Push to `main` → GitHub Actions auto-builds and deploys
5. Live at: `https://YOURUSERNAME.github.io/packdog/`

**Important:** Update `vite.config.js` line 4 — change `'packdog'` to match your GitHub repo name.

---

## 🔑 ACCOUNTS TO CREATE (all free)

| Service | URL | What you need |
|---------|-----|---------------|
| **Stripe** | stripe.com | Secret key + webhook secret |
| **CJDropshipping** | cjdropshipping.com | Email + API key |
| **Railway** | railway.app | Deploy backend (free tier) |
| **Telegram** | @BotFather | Bot token + your chat ID |
| **Namecheap** | namecheap.com | Domain ~$10/yr (optional) |

### Stripe setup

1. Create account at stripe.com
2. Dashboard → Developers → API Keys → copy `sk_live_...`
3. Dashboard → Developers → Webhooks → Add endpoint:
   - URL: `https://your-railway-url.railway.app/api/webhook`
   - Events: `checkout.session.completed`
4. Copy the webhook signing secret `whsec_...`

### CJDropshipping product IDs

After creating your CJ account:
1. Search for each product in CJ dashboard
2. Import it to your store
3. Click the product → copy the **CJdropshipping Product ID**
4. Paste into `backend/src/data/products.js` → `cjProductId` field

Until CJ IDs are filled in, orders are logged but not auto-submitted.
You'll see a warning in Railway logs: `⚠️ No CJ product IDs configured`.

### Telegram bot setup

```
1. Message @BotFather on Telegram
2. Send: /newbot
3. Follow prompts → copy the token
4. Message @userinfobot → copy your chat ID
5. Paste both into .env
```

---

## 📁 REPO STRUCTURE

```
packdog/
├── backend/                  Node.js + Express API
│   ├── src/
│   │   ├── index.js          Main server
│   │   ├── routes/
│   │   │   ├── checkout.js   POST /api/checkout/session
│   │   │   ├── webhook.js    POST /api/webhook (Stripe → CJ)
│   │   │   └── products.js   GET  /api/products
│   │   ├── services/
│   │   │   ├── cjdropship.js CJDropshipping API wrapper
│   │   │   └── telegram.js   Order notifications
│   │   └── data/products.js  Product catalog + CJ IDs ← edit this
│   └── .env.example
├── frontend/                 React + Vite store
│   ├── src/
│   │   ├── App.jsx           Routes
│   │   ├── context/CartContext.jsx  Cart state
│   │   ├── data/products.js  Frontend product data
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Shop.jsx
│   │   │   ├── ProductPage.jsx
│   │   │   ├── Cart.jsx
│   │   │   └── Success.jsx
│   │   └── components/
│   │       ├── Navbar.jsx
│   │       └── ProductCard.jsx
│   └── vite.config.js
└── .github/workflows/
    └── deploy-frontend.yml   Auto-deploy to GitHub Pages
```

---

## 🔄 DAILY DEV WORKFLOW (Termux)

```bash
cd /data/data/com.termux/files/home/packdog

# Always pull first
git pull origin main

# Make changes in Acode or nano
# Then push
git add .
git commit -m "feat: your change"
git push origin main
# → GitHub Actions fires → frontend live in ~2 min
# → Railway auto-deploys backend on push
```

---

## 💰 UNIT ECONOMICS

| Product | Cost | Retail | Gross Profit | Margin |
|---------|------|--------|-------------|--------|
| Dog Car Hammock | $12 | $58 | $46 | 79% |
| No-Pull Harness | $8 | $42 | $34 | 81% |
| Magnetic Shade | $5 | $38 | $33 | 87% |
| Water Bottle | $6 | $32 | $26 | 81% |
| LED Collar | $7 | $34 | $27 | 79% |

**Target:** 7 orders/mo at $55 AOV = **~$200 net** after Stripe fees + $20 ads + $1 domain.

---

## 📅 90-DAY ROADMAP

| Phase | Days | Focus |
|-------|------|-------|
| Infrastructure | 1–7 | Ship this repo, configure accounts, test checkout |
| Organic Launch | 8–30 | TikTok + Reddit content, first 2–3 orders |
| Conversion Tuning | 31–60 | A/B test pages, upsells, email capture |
| Scale to $200 | 61–90 | Double down on winners, first paid ads |

---

## 🐛 TROUBLESHOOTING

**Stripe webhook not firing locally:**
```bash
# Install Stripe CLI in Termux
# pkg install stripe-cli  ← may not be available
# Alternative: use ngrok to expose localhost:3001
# Then set webhook URL to: https://your-ngrok-url/api/webhook
```

**CJDropshipping auth error:**
- Double-check `CJ_EMAIL` and `CJ_API_KEY` in `.env`
- Note: CJ uses "password" field, not API token, for initial auth
- Token auto-refreshes every 23h

**CORS error in browser:**
- Verify `FRONTEND_URL` in Railway matches your GitHub Pages URL exactly
- Include the full path: `https://username.github.io/packdog`

**404 on GitHub Pages refresh:**
- Add a `404.html` that redirects to index.html for client-side routing
- Or use hash-based routing (change to `createHashRouter` in main.jsx)

---

PACKDOG // Sky Madsen // 2026
