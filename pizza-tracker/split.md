### Steps to split the payment feature as a standalone app

#### 1. Create a React app

```bash
npm create vite@latest pizza-tracker-<YOUR_NAME> -- --template react
cd pizza-tracker-<YOUR_NAME> && npm install
```

#### 2. Modify the `vite.config.js` file

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: { port: <PORT> },
})
```

#### 3. Copy code from the monolith
1. Copy `src/index.css` to `src/index.css` in the pizza-tracker app
2. Copy `src/pages/OrderTracking.jsx` to `src/App.jsx` in the pizza-tracker app
3. Copy `src/pages/OrderTracking.module.css` to `src/App.module.css` in the pizza-payment app (rename the file from `App.css` to `App.module.css`)

#### 4. Remove libs and fix references
- Replace `navigate(<PATH>)` calls with `window.location.href = <PATH>`
- Remove all code related to `react-router` and `useOrder` dependencies, and uninstall those dependencies
- Mock the order id

```js
const order = {
  orderId: "order1"
};
```

#### 5. Run the app and verify everything works correctly
```bash
npm run dev
```