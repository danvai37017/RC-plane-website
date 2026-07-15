import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation/Navigation'
import Footer from './components/Footer/Footer'
import HomePage from './pages/HomePage'
import TopicPage from './pages/TopicPage'

export default function App() {
  return (
    <BrowserRouter>
      <div className="page-shell">
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/:topic" element={<TopicPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
