import { Link } from 'react-router-dom'
import Layout from '../components/Layout.jsx'
import IndexHub from '../components/IndexHub.jsx'
import { PaperList } from '../components/PaperCard.jsx'
import { useLibrary } from '../lib/hooks.js'
import { useMeta } from '../lib/meta.js'

// Home = the six collection layers over the 72-paper registry.
export default function Library() {
  const { loading, index, error } = useLibrary()
  useMeta({
    description:
      'A 72-paper Tanzania maternal, newborn & child health research library, organised into six evidence layers.',
  })

  const total = index?.registry.length || 0
  const startHere = (index?.registry || []).filter((p) => p.tier === '1')
  const items = (index?.layers || []).map((L) => ({
    num: L.layer_no,
    title: L.layer_name,
    desc: `${L.papers.length} paper${L.papers.length === 1 ? '' : 's'} · ${L.blurb}`,
    to: `/layer/${L.layer_id}`,
  }))

  return (
    <Layout>
      <p className="kicker">Tanzania MNCH Evidence Library</p>
      <h1 className="display" style={{ marginBottom: 'var(--space-5)' }}>
        Maternal, newborn &amp; child health research in Tanzania
      </h1>
      <p className="prose lead" style={{ marginBottom: 'var(--space-6)' }}>
        {total} studies, grouped into six layers so you can move from who dies and why to whether
        the system is ready and what's been tried. A few are written up as full explainers; the
        rest carry their record and a link to the source.
      </p>
      <p style={{ marginBottom: 'var(--space-7)' }}>
        <Link to="/map">See the evidence map →</Link>
        <span className="muted" style={{ margin: '0 var(--space-3)' }}>·</span>
        <Link to="/papers">Browse all {total} papers →</Link>
      </p>

      <p className="kicker">The six layers</p>
      <hr className="rule" style={{ marginTop: 'var(--space-3)' }} />
      {loading && <p className="muted">Loading the library…</p>}
      {error && <p role="alert">Couldn’t load the library: {error}</p>}
      {items.length > 0 && <IndexHub items={items} ariaLabel="Evidence layers" />}

      {startHere.length > 0 && (
        <div style={{ marginTop: 'var(--space-8)' }}>
          <p className="kicker">Start here — the national picture</p>
          <PaperList papers={startHere} />
        </div>
      )}
    </Layout>
  )
}
