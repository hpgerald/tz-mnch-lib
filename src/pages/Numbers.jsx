import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../components/Layout.jsx'
import FigureList from '../components/FigureList.jsx'
import NotFound from './NotFound.jsx'
import { usePaper } from '../lib/hooks.js'
import { useMeta } from '../lib/meta.js'

// Unique, order-preserving values of a field.
function uniq(rows, key) {
  const seen = []
  for (const r of rows) {
    const v = (r[key] || '').trim()
    if (v && !seen.includes(v)) seen.push(v)
  }
  return seen
}

// Toggle a value in a Set (immutably).
function toggle(set, value) {
  const next = new Set(set)
  next.has(value) ? next.delete(value) : next.add(value)
  return next
}

export default function Numbers() {
  const { paperSlug } = useParams()
  const { loading, meta, data, error } = usePaper(paperSlug)
  const [cats, setCats] = useState(new Set())
  const [aff, setAff] = useState(new Set())
  useMeta({
    title: 'The numbers',
    description: 'Every figure from the paper as a proportional comparison, filterable by topic and audience.',
  })

  const figures = data?.figures || []
  const categories = useMemo(() => uniq(figures, 'category'), [figures])
  const audiences = useMemo(() => uniq(figures, 'affected'), [figures])

  const visible = useMemo(
    () =>
      figures.filter(
        (f) =>
          (cats.size === 0 || cats.has(f.category)) &&
          (aff.size === 0 || aff.has(f.affected))
      ),
    [figures, cats, aff]
  )

  if (loading) {
    return (
      <Layout base={paperSlug}>
        <p className="muted">Loading…</p>
      </Layout>
    )
  }
  if (error || !meta) return <NotFound />

  // Count helper: how many figures match a candidate filter value, given the
  // *other* active filter — so counts reflect what a click would reveal.
  const countCat = (c) => figures.filter((f) => f.category === c && (aff.size === 0 || aff.has(f.affected))).length
  const countAff = (a) => figures.filter((f) => f.affected === a && (cats.size === 0 || cats.has(f.category))).length

  const hasFilters = cats.size > 0 || aff.size > 0

  return (
    <Layout base={paperSlug}>
      <p className="kicker">{meta.title}</p>
      <h1 className="h1" style={{ margin: 'var(--space-3) 0 var(--space-4)' }}>
        The numbers
      </h1>
      <p className="prose lead">
        Every figure from the paper, each shown as a proportional comparison and written out in
        plain language. Filter by topic or by who it affects.
      </p>

      <div className="filters">
        <div className="filterset" role="group" aria-label="Filter by category">
          <p className="filterset__legend">Category</p>
          <div className="chips">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                className="chip"
                aria-pressed={cats.has(c)}
                onClick={() => setCats((s) => toggle(s, c))}
              >
                {c} <span className="chip__count">{countCat(c)}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="filterset" role="group" aria-label="Filter by who is affected">
          <p className="filterset__legend">Who it affects</p>
          <div className="chips">
            {audiences.map((a) => (
              <button
                key={a}
                type="button"
                className="chip"
                aria-pressed={aff.has(a)}
                onClick={() => setAff((s) => toggle(s, a))}
              >
                {a} <span className="chip__count">{countAff(a)}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className="dash__count" aria-live="polite">
        Showing <strong>{visible.length}</strong> of <strong>{figures.length}</strong> figures
        {hasFilters && (
          <button
            type="button"
            className="dash__reset"
            onClick={() => {
              setCats(new Set())
              setAff(new Set())
            }}
          >
            Clear filters
          </button>
        )}
      </p>

      {visible.length > 0 ? (
        <FigureList figures={visible} />
      ) : (
        <p className="muted" style={{ marginTop: 'var(--space-5)' }}>
          No figures match those filters. <button className="dash__reset" type="button" onClick={() => { setCats(new Set()); setAff(new Set()) }}>Clear filters</button>
        </p>
      )}
    </Layout>
  )
}
