import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Shop from './pages/Shop.jsx'
import ProductPage from './pages/ProductPage.jsx'
import Cart from './pages/Cart.jsx'
import Success from './pages/Success.jsx'

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/"                   element={<Home />} />
        <Route path="/shop"               element={<Shop />} />
        <Route path="/product/:slug"      element={<ProductPage />} />
        <Route path="/cart"               element={<Cart />} />
        <Route path="/success"            element={<Success />} />
        <Route path="*" element={
          <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 64 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 80, color: 'var(--white)' }}>404</div>
              <div style={{ color: 'var(--dim)', fontFamily: 'var(--font-mono)', fontSize: 11 }}>PAGE NOT FOUND</div>
              <a href="/" style={{ display: 'block', marginTop: 24, color: 'var(--cyan)', fontFamily: 'var(--font-mono)', fontSize: 11 }}>← HOME</a>
            </div>
          </div>
        } />
      </Routes>
    </>
  )
}
