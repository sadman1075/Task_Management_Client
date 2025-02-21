import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import { router } from './Routes/Routes.jsx'
import ContextProvider from './Context/ContextProvider.jsx'
import { Toaster } from 'react-hot-toast'
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ContextProvider>
        <RouterProvider router={router}>
          <App />
        </RouterProvider>
      </ContextProvider>
    </QueryClientProvider>

    <Toaster></Toaster>
  </StrictMode>,
)
