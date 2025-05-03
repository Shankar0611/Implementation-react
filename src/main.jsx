import { lazy, StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
const Virtualization = lazy(() => import('./Implementations/Virtualization.jsx'));
const DataFetchingUsingCustomHook = lazy(() => import('./Implementations/DataFetchingUsingCustomHook.jsx'));


const router = createBrowserRouter([
  {
    path:"/",
    element: <App />
  },
  {
    path: "virtual",
    element: (
      <Suspense fallback={<div>Loading Virtualization...</div>}>
        <Virtualization />
      </Suspense>
    )
  },
  {
    path: "fetch",
    element: (
      <Suspense fallback={<div>Loading Fetch Page...</div>}>
        <DataFetchingUsingCustomHook />
      </Suspense>
    )
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </StrictMode>,
)
