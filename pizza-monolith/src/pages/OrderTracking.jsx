import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useOrder } from '../context/OrderContext'
import styles from './OrderTracking.module.css'

const STAGES = [
  { id: 'preparing', label: 'Preparing', emoji: '👨‍🍳', description: "The chef is crafting your pizza with love." },
  { id: 'baking', label: 'In the oven', emoji: '🔥', description: "Your pizza is baking at 450°F." },
  { id: 'quality', label: 'Quality check', emoji: '✅', description: "Making sure everything is perfect." },
  { id: 'out', label: 'Out for delivery', emoji: '🛵', description: "Your driver is on the way!" },
  { id: 'delivered', label: 'Delivered', emoji: '🎉', description: "Enjoy your pizza!" },
]

export default function OrderTracking() {
  const navigate = useNavigate()
  const { order, updateOrder } = useOrder()

  const [currentStageIdx, setCurrentStageIdx] = useState(0)

  useEffect(() => {
    if (!order.orderId) { navigate('/select'); return }

    const interval = setInterval(() => {
      setCurrentStageIdx(prev => {
        const next = prev + 1
        if (next >= STAGES.length) {
          clearInterval(interval)
          updateOrder({ status: 'delivered' })
          return prev
        }
        updateOrder({ status: STAGES[next].id })
        return next
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [order.orderId])

  if (!order.orderId) return null

  const current = STAGES[currentStageIdx]

  return (
    <div className={styles.page}>
      <h1>Order tracking</h1>
      <p className={styles.orderId}>Order <strong>{order.orderId}</strong></p>

      <div className={styles.stageDisplay}>
        <span className={styles.stageEmoji}>{current.emoji}</span>
        <h2>{current.label}</h2>
        <p>{current.description}</p>
      </div>

      <ol className={styles.timeline}>
        {STAGES.map((stage, idx) => (
          <li
            key={stage.id}
            className={`${styles.timelineItem} ${idx < currentStageIdx ? styles.done : ''} ${idx === currentStageIdx ? styles.active : ''}`}
          >
            <span className={styles.dot}>{idx < currentStageIdx ? '✓' : stage.emoji}</span>
            <span>{stage.label}</span>
          </li>
        ))}
      </ol>

      {currentStageIdx === STAGES.length - 1 && (
        <button className={styles.newOrderBtn} onClick={() => navigate('/select')}>
          Order again 🍕
        </button>
      )}
    </div>
  )
}
