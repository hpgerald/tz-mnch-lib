import { useParams } from 'react-router-dom'
import Layout from '../components/Layout.jsx'
import SourceRef from '../components/SourceRef.jsx'
import NotFound from './NotFound.jsx'
import { usePaper } from '../lib/hooks.js'
import { useMeta } from '../lib/meta.js'

const THIS_YEAR = new Date().getFullYear()

export default function Timeline() {
  const { paperSlug } = useParams()
  const { loading, meta, data, error } = usePaper(paperSlug)
  useMeta({
    title: 'Timeline',
    description: 'Milestones and target dates behind the study, from national goals to the 2030 deadline.',
  })

  if (loading) {
    return (
      <Layout base={paperSlug}>
        <p className="muted">Loading…</p>
      </Layout>
    )
  }
  if (error || !meta) return <NotFound />

  const items = [...(data?.timeline || [])].sort(
    (a, b) => Number(a.year) - Number(b.year)
  )

  return (
    <Layout base={paperSlug}>
      <p className="kicker">{meta.title}</p>
      <h1 className="h1" style={{ margin: 'var(--space-3) 0 var(--space-4)' }}>
        Timeline
      </h1>
      <p className="prose lead">
        The milestones and target dates behind the story — from national goals to the study window
        and the 2030 global deadline.
      </p>

      {items.length === 0 ? (
        <p className="muted">No dated milestones.</p>
      ) : (
        <ol className="timeline">
          {items.map((it, i) => {
            const future = Number(it.year) > THIS_YEAR
            return (
              <li
                className={`tl-item${future ? ' tl-item--future' : ''}`}
                key={`${it.year}-${i}`}
              >
                <div className="tl-year">
                  {it.year}
                  {future && <span className="tl-future-tag">&nbsp;· upcoming</span>}
                </div>
                <p className="tl-event">{it.event}</p>
                {it.plain_language && <p className="tl-body">{it.plain_language}</p>}
                <p style={{ margin: 'var(--space-2) 0 0' }}>
                  <SourceRef page={it.source_page} />
                </p>
              </li>
            )
          })}
        </ol>
      )}
    </Layout>
  )
}
