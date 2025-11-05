import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router/dom";
import { router } from './router/router.jsx';

import 'aos/dist/aos.css';
import Aos from 'aos';
import AuthProvider from './Contexts/AuthContext/AuthProvider.jsx';

Aos.init()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='font-urbanist bg-gray-200 min-h-screen py-5'>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </div>
  </StrictMode>,
)
