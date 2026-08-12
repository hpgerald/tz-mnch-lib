import { useParams, Link } from 'react-router-dom'
import Layout from '../components/Layout.jsx'
import FigureList from '../components/FigureList.jsx'
import PrevNext from '../components/PrevNext.jsx'
import NotFound from './NotFound.jsx'
import { usePaper } from '../lib/hooks.js'
import { useMeta } from '../lib/meta.js'

export default function Section() {
  const { paperSlug, sectionId } = useParams()
  const { loading, meta, data, error } = usePaper(paperSlug)
  const secMeta = (data?.sections || []).find((s) => s.section_id === sectionId)
  useMeta({ title: secMeta?.title || 'Section', description: secMeta?.plain_summary })

  if (loading) {
    return (
      <Layout base={paperSlug}>
        <p className="muted">Loading…</p>
      </Layout>
    )
  }
  if (error || !meta) return <NotFound />

  const sections = [...(data?.sections || [])].sort(
    (a, b) => Number(a.number) - Number(b.number)
  )
  const idx = sections.findIndex((s) => s.section_id === sectionId)
  if (idx === -1) return <NotFound />
  const section = sections[idx]

  // Findings belonging to this section.
  const findings = (data?.findings || []).filter((f) => f.section_id === sectionId)

  // Figures assigned to this section — via an explicit `section` column when
  // present, else the legacy convention (category lower-cased == section id).
  const figures = (data?.figures || []).filter(
    (f) => (f.section ? f.section : String(f.category || '').toLowerCase()) === sectionId
  )

  const prev = idx > 0 ? mkLink(paperSlug, sections[idx - 1]) : null
  const next = idx < sections.length - 1 ? mkLink(paperSlug, sections[idx + 1]) : null

  return (
    <Layout base={paperSlug}>
      <p className="crumb">
        <Link to="/">Shelf</Link>
        <span className="crumb__sep">/</span>
        <Link to={`/${paperSlug}`}>{meta.title}</Link>
        <span className="crumb__sep">/</span>
        Section {section.number}
      </p>

      <p className="kicker">Section {section.number}</p>
      <h1 className="h1" style={{ margin: 'var(--space-3) 0 var(--space-5)' }}>
        {section.title}
      </h1>
      <p className="prose lead">{section.plain_summary}</p>

      {findings.length > 0 && (
        <section style={{ marginTop: 'var(--space-7)' }}>
          <p className="kicker">Key findings</p>
          <ol className="findings">
            {findings.map((f) => (
              <li className="finding-row" key={f.finding_id}>
                <Link className="finding-row__link" to={`/${paperSlug}/finding/${f.finding_id}`}>
                  <span>
                    <span className="finding-row__title">{f.title}</span>
                    <span className="finding-row__sub">{f.plain_language}</span>
                  </span>
                  <span className="finding-row__arrow" aria-hidden="true">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </section>
      )}

      {figures.length > 0 && (
        <section style={{ marginTop: 'var(--space-7)' }}>
          <p className="kicker">The numbers behind this</p>
          <FigureList figures={figures} />
        </section>
      )}

      <PrevNext prev={prev} next={next} label="Section" />
    </Layout>
  )
}

function mkLink(slug, s) {
  return { to: `/${slug}/section/${s.section_id}`, title: `${s.number} · ${s.title}` }
}
