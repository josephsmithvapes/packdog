import { createContext, useContext, useReducer } from 'react'
import { getProductById } from '../data/products.js'

const CartContext = createContext(null)

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const key = action.id + (action.variant || '')
      const existing = state.find(i => i.key === key)
      if (existing) {
        return state.map(i => i.key === key ? { ...i, quantity: i.quantity + 1 } : i)
      }
      const product = getProductById(action.id)
      if (!product) return state
      return [...state, { key, id: action.id, variant: action.variant || null, quantity: 1, product }]
    }
    case 'REMOVE_ITEM':
      return state.filter(i => i.key !== action.key)
    case 'UPDATE_QTY':
      if (action.quantity <= 0) return state.filter(i => i.key !== action.key)
      return state.map(i => i.key === action.key ? { ...i, quantity: action.quantity } : i)
    case 'CLEAR':
      return []
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, [])

  const addItem = (id, variant = null) => dispatch({ type: 'ADD_ITEM', id, variant })
  const removeItem = (key) => dispatch({ type: 'REMOVE_ITEM', key })
  const updateQty = (key, quantity) => dispatch({ type: 'UPDATE_QTY', key, quantity })
  const clearCart = () => dispatch({ type: 'CLEAR' })

  const count = items.reduce((sum, i) => sum + i.quantity, 0)
  const subtotal = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0)

  return (
    <CartContext.Provider value={{ items, count, subtotal, addItem, removeItem, updateQty, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
