import { AnimatePresence, motion as Motion } from 'framer-motion'
import { BrowserRouter, Link, Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import { servicesData } from './data/siteData'
import { HomePage } from './pages/HomePage'
import { ServicePage } from './pages/ServicePage'
import {
  AboutPage,
  ContactPage,
  GalleryPage,
  PricesPage,
  TestimonialsPage,
  WhatHeDoesPage,
} from './pages/SitePages'

function SiteChrome({ children }) {
  return (
    <div className="site-shell">
      <Motion.header
        className="topbar"
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <Link className="brand" to="/" aria-label="AMP Detailing home">
          <span className="brand-mark">AMP</span>
          <span className="brand-copy">
            <strong>Ajit&apos;s Car Detailing</strong>
            <small>Pride, patience, and proper care</small>
          </span>
        </Link>

        <nav className="nav">
          <Link to="/about">About</Link>
          <Link to="/gallery">Gallery</Link>
          <Link to="/what-he-does">What He Does</Link>
          <Link to="/prices">Prices</Link>
          <Link to="/testimonials">Testimonials</Link>
          <Link to="/contact" className="nav-cta">
            Get in Touch
          </Link>
        </nav>
      </Motion.header>

      {children}

      <footer className="footer">
        <p>AMP Detailing</p>
        <p>A warm, personal showcase for Ajit&apos;s craft.</p>
      </footer>
    </div>
  )
}

function AppRoutes() {
  const location = useLocation()

  return (
    <SiteChrome>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/what-he-does" element={<WhatHeDoesPage />} />
          <Route path="/prices" element={<PricesPage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route
            path="/services/:serviceSlug"
            element={<ServicePage services={servicesData} />}
          />
        </Routes>
      </AnimatePresence>
    </SiteChrome>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
