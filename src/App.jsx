import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navigation from './components/Navigation/Navigation'
import Footer from './components/Footer/Footer'
import HomePage from './pages/HomePage'
import TopicPage from './pages/TopicPage'
import ArticlePage from './pages/ArticlePage'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="page-shell">
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/:topic" element={<TopicPage />} />
            <Route path="/:topic/:article" element={<ArticlePage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
