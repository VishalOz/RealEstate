import { createRoot } from 'react-dom/client'

import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './index.css'

import NavigationBar from './components/NavigationBar.jsx'
import Footer from './components/Footer.jsx'
import App from './components/App.jsx'
import Search from './components/Search.jsx'
import PropertyPage from './components/PropertyPage.jsx'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <NavigationBar />
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/search" element={<Search />} />
      <Route path="/property/:id" element={<PropertyPage />} />
    </Routes>
    <Footer />
  </BrowserRouter>
)
