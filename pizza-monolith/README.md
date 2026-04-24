# PizzaFront — Monolith (Step 1 of the exercise)

This is the **starting point** of the microfrontends exercise.

It is a standard React + Vite single-page application that handles the full
pizza ordering flow in one codebase.

## Running it

```bash
npm install
npm run dev   # http://localhost:5173
```

## The three "domains" living together

| Route | Component | Responsibility |
|-------|-----------|----------------|
| `/select` | `PizzaSelector` | Browse pizzas, choose size & toppings |
| `/payment` | `Payment` | Card form, order summary, price calculation |
| `/tracking` | `OrderTracking` | Real-time status updates with animated timeline |

## Shared state

`OrderContext` (in `src/context/`) is the glue between pages.  
It holds the selected pizza, size, toppings, payment info, and live order status.

---


