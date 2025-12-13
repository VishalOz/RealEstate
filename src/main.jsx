import { createRoot } from 'react-dom/client'

import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './index.css'

import App from './components/App.jsx'
import Search from './components/Search.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/search" element={<Search />} />
    </Routes>
  </BrowserRouter>
)
