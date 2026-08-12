import { useParams } from 'react-router-dom'
import Layout from '../components/Layout.jsx'
import NotFound from './NotFound.jsx'
import { usePaper } from '../lib/hooks.js'
import { useMeta } from '../lib/meta.js'
import { dataUrl } from '../lib/csv.js'
import { PAPER_DATASETS } from '../lib/data.js'

const FILE_NOTES = {
  figures: 'Every headline figure, with comparison values, direction and audience.',
  facilities: 'All 35 hospitals: reporting completeness and year-to-year consistency.',
  timeseries: 'Table 1 — institutional live births and neonatal deaths by facility level, 2015–2024.',
  fig1_shares: 'Facility-level share of live births and deaths (from Table 1).',
  comparisons: 'Newborn death rate across sources: DHIS2, DHS, UN-IGME.',
  monthly_reporting: 'Table 3 — facilities reporting each year.',
  sections: 'Plain-language section summaries.',
  findings: 'Key findings with “why it matters”.',
  timeline: 'Dated milestones and target dates.',
  glossary: 'Term definitions used in tooltips.',
  nid_comparison: 'DHIS2 vs NEST360 NID direction for the 7 implementing hospitals.',
  biases: 'Caveats and limitations, with their direction of effect.',
  personas: 'Per-audience framing used on the “What it means” page.',
}

export default function Data() {
  const { paperSlug } = useParams()
  const { loading, meta, data, error } = usePaper(paperSlug)
  useMeta({
    title: 'Data & methodology',
    description:
      'Download every dataset behind the explainer, with methodology and the original source.',
  })

  if (loading) {
    return (
      <Layout base={paperSlug}>
        <p className="muted">Loading…</p>
      </Layout>
    )
  }
  if (error || !meta) return <NotFound />

  return (
    <Layout base={paperSlug}>
      <p className="kicker">{meta.title}</p>
      <h1 className="h1" style={{ margin: 'var(--space-3) 0 var(--space-4)' }}>
        Data &amp; methodology
      </h1>
      <p className="prose lead">
        Every number on this site comes from the CSV files below — the single source of truth. No
        figure is hard-coded, and each row records the source page it was read from.
      </p>

      <section style={{ marginTop: 'var(--space-6)' }}>
        <h2 className="h3" style={{ marginBottom: 'var(--space-2)' }}>
          How the data was made
        </h2>
        <div className="prose">
          <p>
            The tables were extracted from the source PDF, then audited three ways: recomputed
            against the paper's own printed totals (the 10-year live-birth and death sums match its
            Figure&nbsp;1 exactly), re-read at the column level to fix any misaligned cells, and
            cross-checked against two independent extractions. The consistency counts reproduce the
            paper's stated results (10 of 35 hospitals within ±33%, 14 within ±50%). Where a value
            could not be verified, it is left blank rather than guessed, and every such gap is logged
            in <code>DATA_NOTES.md</code>.
          </p>
        </div>
      </section>

      <section style={{ marginTop: 'var(--space-6)' }}>
        <h2 className="h3" style={{ marginBottom: 'var(--space-2)' }}>
          Download the datasets
        </h2>
        <div className="gloss-list">
          <div className="gloss-list__row">
            <span className="gloss-list__term">papers.csv</span>
            <span>
              Library registry.{' '}
              <a href={dataUrl('papers.csv')} download>
                Download
              </a>
            </span>
          </div>
          {PAPER_DATASETS.filter((name) => (data?.[name] || []).length > 0).map((name) => {
            const rows = data?.[name] || []
            return (
              <div className="gloss-list__row" key={name}>
                <span className="gloss-list__term">{name}.csv</span>
                <span>
                  {FILE_NOTES[name] || ''}{' '}
                  <span className="muted">({rows.length} rows)</span>{' '}
                  <a href={dataUrl(`${paperSlug}/${name}.csv`)} download>
                    Download
                  </a>
                </span>
              </div>
            )
          })}
          <div className="gloss-list__row">
            <span className="gloss-list__term">DATA_NOTES.md</span>
            <span>
              Full audit trail: confidence, gaps, and every correction.{' '}
              <a href={dataUrl(`${paperSlug}/DATA_NOTES.md`)} download>
                Download
              </a>
            </span>
          </div>
        </div>
      </section>

      <section style={{ marginTop: 'var(--space-6)' }}>
        <h2 className="h3" style={{ marginBottom: 'var(--space-2)' }}>
          Original source
        </h2>
        <p className="prose">
          {meta.authors} ({meta.year}). <em>{meta.title}</em>. {meta.publisher}.{' '}
          <a href={meta.source_url} target="_blank" rel="noreferrer">
            {meta.doi}
          </a>
        </p>
      </section>
    </Layout>
  )
}
