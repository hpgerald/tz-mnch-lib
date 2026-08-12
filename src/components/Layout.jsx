import Nav from './Nav.jsx'
import Footer from './Footer.jsx'

// Page shell: skip link + masthead + main + footer. `base` = paper slug or undefined.
export default function Layout({ base, children }) {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Nav base={base} />
      <main id="main" className="container" style={{ paddingBlock: 'var(--space-7)' }}>
        {children}
      </main>
      <Footer />
    </>
  )
}
