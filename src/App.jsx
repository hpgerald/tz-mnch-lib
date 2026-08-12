import { Routes, Route, Link } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop.jsx'
import Debug from './pages/Debug.jsx'
import Design from './pages/Design.jsx'
import Library from './pages/Library.jsx'
import Layer from './pages/Layer.jsx'
import EvidenceMap from './pages/Map.jsx'
import Home from './pages/Home.jsx'
import PaperHome from './pages/PaperHome.jsx'
import Numbers from './pages/Numbers.jsx'
import Timeline from './pages/Timeline.jsx'
import WhatItMeans from './pages/WhatItMeans.jsx'
import Data from './pages/Data.jsx'
import About from './pages/About.jsx'
import Section from './pages/Section.jsx'
import Finding from './pages/Finding.jsx'
import NotFound from './pages/NotFound.jsx'

// The library home is the six-layer evidence index. Papers are namespaced by
// slug; the taxonomy adds /layer and /topic views over them.
export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Library />} />
        <Route path="/papers" element={<Home />} />
        <Route path="/map" element={<EvidenceMap />} />
        <Route path="/layer/:layerId" element={<Layer />} />
        <Route path="/design" element={<Design />} />
        <Route path="/debug" element={<Debug />} />
        <Route path="/:paperSlug" element={<PaperHome />} />
        <Route path="/:paperSlug/numbers" element={<Numbers />} />
        <Route path="/:paperSlug/timeline" element={<Timeline />} />
        <Route path="/:paperSlug/what-it-means" element={<WhatItMeans />} />
        <Route path="/:paperSlug/data" element={<Data />} />
        <Route path="/:paperSlug/about" element={<About />} />
        <Route path="/:paperSlug/section/:sectionId" element={<Section />} />
        <Route path="/:paperSlug/finding/:findingId" element={<Finding />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

// Temporary minimal chrome used by /debug and /design.
export function Placeholder({ title, children }) {
  return (
    <main style={{ maxWidth: 720, margin: '0 auto', padding: '2rem 1rem' }}>
      <p style={{ fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
        <Link to="/">Tanzania MNCH Library</Link> &nbsp;/&nbsp; <Link to="/debug">debug</Link>
      </p>
      <h1>{title}</h1>
      {children}
    </main>
  )
}
