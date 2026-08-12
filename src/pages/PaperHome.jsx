import { useParams, Link } from 'react-router-dom'
import Layout from '../components/Layout.jsx'
import IndexHub from '../components/IndexHub.jsx'
import StatCard, { StatGrid } from '../components/StatCard.jsx'
import NotFound from './NotFound.jsx'
import { usePaper, usePaperNesting } from '../lib/hooks.js'
import { useMeta } from '../lib/meta.js'
import { fmtNum, shortUnit } from '../lib/format.js'

export default function PaperHome() {
  const { paperSlug } = useParams()
  const { loading, meta, data, error, hasExplainer } = usePaper(paperSlug)
  const { ctx } = usePaperNesting(paperSlug, meta?.paper_id)

  useMeta({
    title: meta?.title,
    description: meta?.one_line_summary,
    jsonLd: meta
      ? {
          '@context': 'https://schema.org',
          '@type': 'ScholarlyArticle',
          headline: meta.title,
          description: meta.one_line_summary,
          datePublished: meta.year,
          publisher: { '@type': 'Organization', name: meta.publisher },
          sameAs: meta.source_url,
          identifier: meta.doi,
        }
      : null,
  })

  if (loading) {
    return (
      <Layout base={paperSlug}>
        <p className="muted">Loading…</p>
      </Layout>
    )
  }
  if (error || !meta) return <NotFound />

  const layer = ctx?.collectionLayer

  // Registry paper without a built explainer yet — show its record page.
  if (!hasExplainer) return <PaperRecord meta={meta} layer={layer} />

  const figures = data?.figures || []
  const sections = data?.sections || []
  // Headline figures are marked in figures.csv (headline=yes); fall back to the first three.
  const flagged = figures.filter((f) => f.headline === 'yes')
  const headline = (flagged.length ? flagged : figures).slice(0, 3)

  const items = sections.map((s) => ({
    num: s.number,
    title: s.title,
    desc: s.plain_summary,
    to: `/${paperSlug}/section/${s.section_id}`,
  }))

  return (
    <Layout base={paperSlug}>
      <p className="crumb">
        <Link to="/">Library</Link>
        <span className="crumb__sep">/</span>
        {layer ? (
          <Link to={`/layer/${layer.layer_id}`}>
            {layer.layer_no} · {layer.layer_name}
          </Link>
        ) : (
          <Link to="/papers">Papers</Link>
        )}
      </p>
      <p className="kicker">
        {meta.publisher} · {meta.year}
      </p>
      <h1 className="display" style={{ margin: 'var(--space-3) 0 var(--space-5)' }}>
        {meta.title}
      </h1>
      {meta.subtitle && (
        <p className="prose lead" style={{ marginBottom: 'var(--space-4)' }}>
          {meta.subtitle}
        </p>
      )}
      <p className="prose" style={{ marginBottom: 'var(--space-7)', maxWidth: 'var(--measure)' }}>
        {meta.one_line_summary}
      </p>

      {/* Headline figures, pulled from the data */}
      {headline.length > 0 && (
        <>
          <p className="kicker">The picture in three numbers</p>
          <hr className="rule" style={{ marginTop: 'var(--space-3)' }} />
          <StatGrid>
            {headline.map((f) => (
              <StatCard
                key={f.figure_id}
                value={fmtNum(f.value)}
                unit={shortUnit(f.unit)}
                label={f.label}
                note={
                  f.comparator_value
                    ? `${f.value_label} vs ${fmtNum(f.comparator_value)}${
                        shortUnit(f.unit) === '%' ? '%' : ''
                      } ${f.comparator_label}`
                    : f.value_label
                }
              />
            ))}
          </StatGrid>
          <p className="muted" style={{ marginTop: 'var(--space-3)', fontSize: 'var(--step--1)' }}>
            See all figures on the{' '}
            <Link to={`/${paperSlug}/numbers`}>numbers dashboard</Link>.
          </p>
        </>
      )}

      {/* Numbered index of sections */}
      <div style={{ marginTop: 'var(--space-8)' }}>
        <p className="kicker">Read it in {items.length} steps</p>
        <hr className="rule" style={{ marginTop: 'var(--space-3)' }} />
        {items.length > 0 ? (
          <IndexHub items={items} ariaLabel="Sections" />
        ) : (
          <p className="muted">No sections found.</p>
        )}
      </div>

      {/* Where this paper sits in the library */}
      {ctx && (layer || ctx.coding.length > 0) && (
        <div style={{ marginTop: 'var(--space-8)' }}>
          <p className="kicker">Where this sits in the library</p>
          <hr className="rule" style={{ marginTop: 'var(--space-3)' }} />
          {layer && (
            <p style={{ marginBottom: 'var(--space-4)' }}>
              Filed under{' '}
              <Link to={`/layer/${layer.layer_id}`}>
                <strong>
                  {layer.layer_no} · {layer.layer_name}
                </strong>
              </Link>
              .
            </p>
          )}
          {ctx.coding.map((c) => (
            <div key={c.layer} style={{ marginBottom: 'var(--space-3)' }}>
              <span className="muted" style={{ fontSize: 'var(--step--1)' }}>
                {c.layer}:{' '}
              </span>
              <ul className="chipset" style={{ display: 'inline-flex' }}>
                {c.topics.map((t) => (
                  <li key={t}>
                    <span className="chip-link" style={{ cursor: 'default' }}>
                      {t}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {(ctx.facets.location || ctx.facets.population) && (
            <p className="muted" style={{ fontSize: 'var(--step--1)', marginTop: 'var(--space-3)' }}>
              {ctx.facets.location && <>Location: {ctx.facets.location.join(', ')}. </>}
              {ctx.facets.population && <>Population: {ctx.facets.population.join(', ')}.</>}
            </p>
          )}
        </div>
      )}
    </Layout>
  )
}

// Record page for a paper that isn't written up as a full explainer yet.
// Nested under its layer, with metadata and a link to the source. This is the
// slot a deep dive drops into later — no structural work needed.
function PaperRecord({ meta, layer }) {
  return (
    <Layout>
      <p className="crumb">
        <Link to="/">Library</Link>
        <span className="crumb__sep">/</span>
        {layer ? (
          <Link to={`/layer/${layer.layer_id}`}>
            {layer.layer_no} · {layer.layer_name}
          </Link>
        ) : (
          <Link to="/papers">Papers</Link>
        )}
      </p>
      <p className="kicker">
        {meta.journal}
        {meta.journal && meta.year ? ' · ' : ''}
        {meta.year}
        {meta.tier ? ` · Tier ${meta.tier}` : ''}
      </p>
      <h1 className="h1" style={{ margin: 'var(--space-3) 0 var(--space-4)' }}>
        {meta.title}
      </h1>
      {meta.setting && (
        <p className="prose lead">
          {meta.theme ? `${meta.theme}. ` : ''}
          Setting: {meta.setting}.
        </p>
      )}

      <div className="sowhat" style={{ marginTop: 'var(--space-6)' }}>
        <span className="sowhat__k">Deep-dive explainer</span>
        A full plain-language walkthrough of this paper is planned. For now, read it at the source.
      </div>

      {meta.url && (
        <p style={{ marginTop: 'var(--space-4)' }}>
          <a className="chip-link" href={meta.url} target="_blank" rel="noreferrer">
            Read the source ↗
          </a>
        </p>
      )}

      {layer && (
        <p className="muted" style={{ marginTop: 'var(--space-7)', fontSize: 'var(--step--1)' }}>
          Filed under{' '}
          <Link to={`/layer/${layer.layer_id}`}>
            {layer.layer_no} · {layer.layer_name}
          </Link>
          . <Link to="/papers">← All papers</Link>
        </p>
      )}
    </Layout>
  )
}
