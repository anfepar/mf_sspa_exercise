### Steps to return the lifecycle to single-spa

1. Install the `single-spa-react` dependency

```bash
npm install single-spa-react
```

2. Create a file in the `src` folder called `lifecycle.jsx` with the following content:

```javascript
import React from 'react'
import ReactDOM from 'react-dom/client'
import singleSpaReact from 'single-spa-react'
import App from './App.jsx'

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  renderType: 'createRoot',
  rootComponent: App,
  errorBoundary: (err) => (
    <div style={{ color:'#c0392b', padding:'2rem' }}>
      <strong>pizza-select crashed:</strong> {err.message}
    </div>
  ),
})

export const { bootstrap, mount, unmount } = lifecycles
```