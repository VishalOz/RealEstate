import { createRoot } from 'react-dom/client'

import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './index.css'

import NavigationBar from './components/NavigationBar.jsx'
import Footer from './components/Footer.jsx'
import App from './components/App.jsx'
import Search from './components/Search.jsx'
import PropertyPage from './components/PropertyPage.jsx'
import About from './components/About.jsx'
import Contact from './components/Contact.jsx'
import Favorites from './components/Favorites.jsx'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <NavigationBar />
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/search" element={<Search />} />
      <Route path="/property/:id" element={<PropertyPage />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/favorites" element={<Favorites />} />
     </Routes>
    <Footer />
  </BrowserRouter>
)
