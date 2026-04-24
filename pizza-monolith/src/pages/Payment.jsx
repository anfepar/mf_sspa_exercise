import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useOrder } from '../context/OrderContext'
import styles from './Payment.module.css'

const SIZE_PRICES = { small: 8, medium: 12, large: 16 }
const TOPPING_PRICE = 1.5

export default function Payment() {
  const navigate = useNavigate()
  const { order, updateOrder, placeOrder } = useOrder()

  const [form, setForm] = useState({ name: '', cardNumber: '', expiry: '', cvv: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  if (!order.pizza) {
    navigate('/select')
    return null
  }

  const basePrice = SIZE_PRICES[order.size] ?? 12
  const toppingsCost = order.toppings.length * TOPPING_PRICE
  const total = basePrice + toppingsCost

  function validate() {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!/^\d{16}$/.test(form.cardNumber.replace(/\s/g, ''))) e.cardNumber = 'Enter a valid 16-digit card number'
    if (!/^\d{2}\/\d{2}$/.test(form.expiry)) e.expiry = 'Use MM/YY format'
    if (!/^\d{3,4}$/.test(form.cvv)) e.cvv = 'CVV must be 3 or 4 digits'
    return e
  }

  function handleChange(e) {
    const { name, value } = e.target
    let formatted = value
    if (name === 'cardNumber') {
      formatted = value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
    }
    if (name === 'expiry') {
      formatted = value.replace(/\D/g, '').slice(0, 4).replace(/^(\d{2})(\d)/, '$1/$2')
    }
    if (name === 'cvv') {
      formatted = value.replace(/\D/g, '').slice(0, 4)
    }
    setForm(prev => ({ ...prev, [name]: formatted }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    updateOrder({ payment: form.name })
    placeOrder()
    navigate('/tracking')
  }

  return (
    <div className={styles.page}>
      <h1>Payment</h1>

      <div className={styles.layout}>
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <h2>Card details</h2>

          <label className={styles.field}>
            <span>Cardholder name</span>
            <input
              type="text"
              name="name"
              placeholder="Jane Doe"
              value={form.name}
              onChange={handleChange}
              className={errors.name ? styles.invalid : ''}
            />
            {errors.name && <span className={styles.error}>{errors.name}</span>}
          </label>

          <label className={styles.field}>
            <span>Card number</span>
            <input
              type="text"
              name="cardNumber"
              placeholder="1234 5678 9012 3456"
              value={form.cardNumber}
              onChange={handleChange}
              className={errors.cardNumber ? styles.invalid : ''}
            />
            {errors.cardNumber && <span className={styles.error}>{errors.cardNumber}</span>}
          </label>

          <div className={styles.row}>
            <label className={styles.field}>
              <span>Expiry</span>
              <input
                type="text"
                name="expiry"
                placeholder="MM/YY"
                value={form.expiry}
                onChange={handleChange}
                className={errors.expiry ? styles.invalid : ''}
              />
              {errors.expiry && <span className={styles.error}>{errors.expiry}</span>}
            </label>
            <label className={styles.field}>
              <span>CVV</span>
              <input
                type="text"
                name="cvv"
                placeholder="123"
                value={form.cvv}
                onChange={handleChange}
                className={errors.cvv ? styles.invalid : ''}
              />
              {errors.cvv && <span className={styles.error}>{errors.cvv}</span>}
            </label>
          </div>

          <button type="submit" className={styles.payBtn} disabled={loading}>
            {loading ? 'Processing…' : `Pay $${total.toFixed(2)}`}
          </button>
        </form>

        <aside className={styles.summary}>
          <h2>Order summary</h2>
          <div className={styles.summaryItem}>
            <span>{order.pizza.emoji} {order.pizza.name} ({order.size})</span>
            <span>${basePrice.toFixed(2)}</span>
          </div>
          {order.toppings.map(t => (
            <div key={t} className={styles.summaryItem}>
              <span>+ {t}</span>
              <span>${TOPPING_PRICE.toFixed(2)}</span>
            </div>
          ))}
          <hr className={styles.divider} />
          <div className={`${styles.summaryItem} ${styles.total}`}>
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </aside>
      </div>
    </div>
  )
}
