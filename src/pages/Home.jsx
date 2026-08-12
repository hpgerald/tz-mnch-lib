import { useState } from 'react'
import Layout from '../components/Layout.jsx'
import { PaperList } from '../components/PaperCard.jsx'
import { useLibrary } from '../lib/hooks.js'
import { useMeta } from '../lib/meta.js'

// /papers — every paper in the registry, most relevant first, filterable by layer.
export default function Home() {
  const { loading, index, error } = useLibrary()
  const [layer, setLayer] = useState('')
  const [query, setQuery] = useState('')
  const [prioritiesOnly, setPrioritiesOnly] = useState(false)
  useMeta({
    title: 'All papers',
    description: 'The full Tanzania MNCH research library — 71 papers plus two full explainers.',
  })

  const layers = index?.layers || []
  const all = index?.registry || []
  const q = query.trim().toLowerCase()
  const shown = all.filter(
    (p) =>
      (!layer || p.layer === layer) &&
      (!prioritiesOnly || p.tier) &&
      (!q ||
        `${p.title} ${p.journal} ${p.setting} ${p.theme} ${p.year}`.toLowerCase().includes(q))
  )

  return (
    <Layout>
      <p className="kicker">Tanzania MNCH Library</p>
      <h1 className="h1" style={{ margin: 'var(--space-3) 0 var(--space-4)' }}>
        All papers
      </h1>
      <p className="prose lead">
        The full collection, most relevant first. Cards marked “Explainer” open a full walkthrough;
        the rest link to their source record.
      </p>

      {error && <p role="alert">Couldn’t load: {error}</p>}
      {loading && <p className="muted">Loading…</p>}

      <div style={{ marginTop: 'var(--space-5)', display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap', alignItems: 'center' }}>
        <input
          type="search"
          className="search-input"
          placeholder="Search title, journal, setting…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search papers"
        />
        <button
          type="button"
          className="chip"
          aria-pressed={prioritiesOnly}
          onClick={() => setPrioritiesOnly((v) => !v)}
        >
          Priorities only <span className="chip__count">{all.filter((p) => p.tier).length}</span>
        </button>
      </div>

      {layers.length > 0 && (
        <div className="filterset" role="group" aria-label="Filter by layer" style={{ marginTop: 'var(--space-5)' }}>
          <p className="filterset__legend">Layer</p>
          <div className="chips">
            <button
              type="button"
              className="chip"
              aria-pressed={layer === ''}
              onClick={() => setLayer('')}
            >
              All <span className="chip__count">{all.length}</span>
            </button>
            {layers.map((L) => (
              <button
                key={L.layer_id}
                type="button"
                className="chip"
                aria-pressed={layer === L.layer_id}
                onClick={() => setLayer(L.layer_id)}
              >
                {L.layer_name} <span className="chip__count">{L.papers.length}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <p className="dash__count" aria-live="polite">
        Showing <strong>{shown.length}</strong> of <strong>{all.length}</strong> papers
      </p>
      <PaperList papers={shown} />
    </Layout>
  )
}
