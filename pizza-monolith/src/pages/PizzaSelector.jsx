import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useOrder } from '../context/OrderContext'
import styles from './PizzaSelector.module.css'

const PIZZAS = [
  { id: 'margherita', name: 'Margherita', emoji: '🍅', description: 'Tomato, mozzarella, fresh basil' },
  { id: 'pepperoni', name: 'Pepperoni', emoji: '🍖', description: 'Tomato sauce, mozzarella, pepperoni' },
  { id: 'bbq-chicken', name: 'BBQ Chicken', emoji: '🍗', description: 'BBQ sauce, chicken, red onion, cilantro' },
  { id: 'veggie', name: 'Veggie Supreme', emoji: '🥦', description: 'Bell peppers, mushrooms, olives, onions' },
]

const SIZES = [
  { id: 'small', label: 'Small', inches: '8"', price: 8 },
  { id: 'medium', label: 'Medium', inches: '12"', price: 12 },
  { id: 'large', label: 'Large', inches: '16"', price: 16 },
]

const TOPPINGS = ['Extra Cheese', 'Jalapeños', 'Mushrooms', 'Olives', 'Anchovies']

export default function PizzaSelector() {
  const navigate = useNavigate()
  const { updateOrder } = useOrder()

  const [selectedPizza, setSelectedPizza] = useState(null)
  const [selectedSize, setSelectedSize] = useState('medium')
  const [selectedToppings, setSelectedToppings] = useState([])

  function toggleTopping(topping) {
    setSelectedToppings(prev =>
      prev.includes(topping) ? prev.filter(t => t !== topping) : [...prev, topping]
    )
  }

  function handleContinue() {
    updateOrder({ pizza: selectedPizza, size: selectedSize, toppings: selectedToppings })
    navigate('/payment')
  }

  return (
    <div className={styles.page}>
      <h1>Build your pizza</h1>

      <section className={styles.section}>
        <h2>Step 1 — Choose a base</h2>
        <div className={styles.pizzaGrid}>
          {PIZZAS.map(pizza => (
            <button
              key={pizza.id}
              className={`${styles.pizzaCard} ${selectedPizza?.id === pizza.id ? styles.selected : ''}`}
              onClick={() => setSelectedPizza(pizza)}
            >
              <span className={styles.emoji}>{pizza.emoji}</span>
              <strong>{pizza.name}</strong>
              <span className={styles.description}>{pizza.description}</span>
            </button>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2>Step 2 — Pick a size</h2>
        <div className={styles.sizeRow}>
          {SIZES.map(size => (
            <button
              key={size.id}
              className={`${styles.sizeBtn} ${selectedSize === size.id ? styles.selected : ''}`}
              onClick={() => setSelectedSize(size.id)}
            >
              <span>{size.label}</span>
              <span className={styles.inches}>{size.inches}</span>
              <span className={styles.price}>${size.price}</span>
            </button>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2>Step 3 — Extra toppings</h2>
        <div className={styles.toppings}>
          {TOPPINGS.map(topping => (
            <label key={topping} className={styles.toppingLabel}>
              <input
                type="checkbox"
                checked={selectedToppings.includes(topping)}
                onChange={() => toggleTopping(topping)}
              />
              {topping}
            </label>
          ))}
        </div>
      </section>

      <button
        className={styles.continueBtn}
        disabled={!selectedPizza}
        onClick={handleContinue}
      >
        Continue to payment →
      </button>
    </div>
  )
}
