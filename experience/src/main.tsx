import { createRoot } from 'react-dom/client'
import App from './App'
import { installInquiryLinks } from '../../src/lib/inquiry'
import './styles/global.css'
import './components/Preloader.css'
import './components/BoatDrawing.css'
import './components/Nav.css'
import './components/Hero.css'
import './components/Manifesto.css'
import './components/Fleet.css'
import './components/ThreeWays.css'
import './components/Conditions.css'
import './components/FiftySeasons.css'
import './components/Notices.css'
import './components/Landmark.css'
import './components/FreeDoor.css'
import './components/Spaces.css'
import './components/Keep.css'
import './components/Footer.css'
import './components/Donate.css'
import './components/Pages.css'

installInquiryLinks()

createRoot(document.getElementById('root')!).render(
  <App />,
)
