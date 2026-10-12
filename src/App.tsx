import { HashRouter, Route, Routes, Navigate } from 'react-router-dom'
import Chooser from './Chooser'
import Home from './reimagined/pages/Home'
import Visit from './reimagined/pages/Visit'
import OnTheWater from './reimagined/pages/OnTheWater'
import Learn from './reimagined/pages/Learn'
import Museum from './reimagined/pages/Museum'
import Spaces from './reimagined/pages/Spaces'
import Story from './reimagined/pages/Story'
import Join from './reimagined/pages/Join'
import OriginalHome from './original/OriginalHome'
import OriginalPage from './original/OriginalPage'

// Hash routing keeps deep links working on any static host (Vercel, Lovable, GitHub Pages, artifacts).
export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Chooser />} />
        <Route path="/reimagined" element={<Home />} />
        <Route path="/reimagined/visit" element={<Visit />} />
        <Route path="/reimagined/on-the-water" element={<OnTheWater />} />
        <Route path="/reimagined/learn" element={<Learn />} />
        <Route path="/reimagined/museum" element={<Museum />} />
        <Route path="/reimagined/spaces" element={<Spaces />} />
        <Route path="/reimagined/story" element={<Story />} />
        <Route path="/reimagined/join" element={<Join />} />
        <Route path="/original" element={<OriginalHome />} />
        <Route path="/original/:slug" element={<OriginalPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  )
}
