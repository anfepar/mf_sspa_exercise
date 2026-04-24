import { createContext, useContext, useState } from 'react'

const OrderContext = createContext(null)

export function OrderProvider({ children }) {
  const [order, setOrder] = useState({
    pizza: null,
    size: null,
    toppings: [],
    payment: null,
    orderId: null,
    status: null,
  })

  function updateOrder(fields) {
    setOrder(prev => ({ ...prev, ...fields }))
  }

  function placeOrder() {
    const orderId = `ORD-${Math.floor(Math.random() * 90000) + 10000}`
    setOrder(prev => ({ ...prev, orderId, status: 'preparing' }))
    return orderId
  }

  return (
    <OrderContext.Provider value={{ order, updateOrder, placeOrder }}>
      {children}
    </OrderContext.Provider>
  )
}

export function useOrder() {
  const ctx = useContext(OrderContext)
  if (!ctx) throw new Error('useOrder must be used inside OrderProvider')
  return ctx
}
