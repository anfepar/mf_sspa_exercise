import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import PizzaSelector from './pages/PizzaSelector'
import Payment from './pages/Payment'
import OrderTracking from './pages/OrderTracking'
import { OrderProvider } from './context/OrderContext'

export default function App() {
  return (
    <OrderProvider>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/select" replace />} />
          <Route path="/select" element={<PizzaSelector />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/tracking" element={<OrderTracking />} />
        </Routes>
      </main>
    </OrderProvider>
  )
}
