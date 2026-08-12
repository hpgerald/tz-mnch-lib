import { Link } from 'react-router-dom'
import Layout from '../components/Layout.jsx'
import { useMeta } from '../lib/meta.js'

export default function NotFound() {
  useMeta({ title: 'Not found', description: 'That page could not be found.' })
  return (
    <Layout>
      <p className="kicker">Error 404</p>
      <h1 className="display" style={{ margin: 'var(--space-3) 0 var(--space-5)' }}>
        Not found.
      </h1>
      <p className="prose lead">
        That page doesn’t exist — the link may be mistyped or the item may have moved.
      </p>
      <p style={{ marginTop: 'var(--space-5)' }}>
        <Link to="/">← Back to the shelf</Link>
      </p>
    </Layout>
  )
}
