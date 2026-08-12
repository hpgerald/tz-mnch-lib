import { Link } from 'react-router-dom'
import Layout from '../components/Layout.jsx'
import { useEvidenceMap } from '../lib/hooks.js'
import { useMeta } from '../lib/meta.js'

// The evidence-map scaffold: analytical layers as the problem→cost spine,
// showing the topics that have coded papers. Fills in as papers are coded.
export default function Map() {
  const { loading, model, error } = useEvidenceMap()
  useMeta({
    title: 'Evidence map',
    description:
      'The problem-to-cost evidence map across the Tanzania MNCH library: mortality, causes, determinants, health-system failures, interventions and cost.',
  })

  return (
    <Layout>
      <p className="kicker">Tanzania MNCH Evidence Library</p>
      <h1 className="display" style={{ marginBottom: 'var(--space-5)' }}>
        The evidence map
      </h1>
      <p className="prose lead" style={{ marginBottom: 'var(--space-5)' }}>
        The full framework behind the library — six layers from who dies and why, to the system
        failures behind it, to what works and what it costs. Every topic is listed; the paper counts
        fill in as papers are coded onto the chain.
      </p>

      {loading && <p className="muted">Loading…</p>}
      {error && <p role="alert">Couldn’t load the map: {error}</p>}

      {model && (
        <>
          <p className="muted" style={{ fontSize: 'var(--step--1)', marginBottom: 'var(--space-6)' }}>
            {model.codedCount} paper{model.codedCount === 1 ? '' : 's'} coded so far.
            {model.facetCounts.location && (
              <> Locations: {Object.keys(model.facetCounts.location).join(', ')}.</>
            )}
            {model.facetCounts.population && (
              <> Populations: {Object.keys(model.facetCounts.population).join(', ')}.</>
            )}
          </p>

          {model.stages.map((stage) => {
            const coded = stage.topics.reduce((n, t) => n + (t.papers.length ? 1 : 0), 0)
            return (
              <section key={stage.layer_id} style={{ marginBottom: 'var(--space-7)' }}>
                <p className="kicker">
                  {stage.layer_no} · {stage.layer_name}
                </p>
                <hr className="rule rule--strong" style={{ marginTop: 'var(--space-3)' }} />
                <p className="muted" style={{ fontSize: 'var(--step--1)', margin: 0 }}>
                  {stage.topics.length} topics · {coded} with papers
                </p>
                <ul className="frame-topics">
                  {stage.topics.map((t) => (
                    <li
                      className={`frame-topic${t.papers.length ? '' : ' frame-topic--empty'}`}
                      key={t.topic_id}
                    >
                      <span className="frame-topic__name">{t.topic_name}</span>
                      <span className="frame-topic__count">
                        {t.papers.length ? `${t.papers.length}` : '—'}
                      </span>
                      {t.papers.length > 0 && (
                        <ul className="chipset frame-topic__papers">
                          {t.papers.map((p) => (
                            <li key={p.paper_id}>
                              <Link className="chip-link" to={`/${p.slug}`}>
                                {p.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            )
          })}

          <p className="prose muted" style={{ marginTop: 'var(--space-7)' }}>
            Topics showing “—” have no coded paper yet. As papers are coded, those counts fill in —
            turning this framework into a live problem→cost map. <Link to="/papers">Browse all papers →</Link>
          </p>
        </>
      )}
    </Layout>
  )
}
