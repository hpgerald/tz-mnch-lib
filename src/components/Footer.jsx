import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p style={{ margin: 0 }}>
          <strong>Tanzania MNCH Evidence Library</strong> — maternal, newborn &amp; child health
          research, organised as an evidence map.
        </p>
        <p style={{ margin: '0.5rem 0 0' }}>
          Figures are drawn directly from each paper. Every number links to its source page.{' '}
          <Link to="/">Back to the library</Link>.
        </p>
      </div>
    </footer>
  )
}
