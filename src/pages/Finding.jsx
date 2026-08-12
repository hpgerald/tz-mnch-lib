import { useParams, Link } from 'react-router-dom'
import Layout from '../components/Layout.jsx'
import PrevNext from '../components/PrevNext.jsx'
import SourceRef from '../components/SourceRef.jsx'
import NotFound from './NotFound.jsx'
import { usePaper } from '../lib/hooks.js'
import { useMeta } from '../lib/meta.js'

export default function Finding() {
  const { paperSlug, findingId } = useParams()
  const { loading, meta, data, error } = usePaper(paperSlug)
  const findMeta = (data?.findings || []).find((f) => f.finding_id === findingId)
  useMeta({ title: findMeta?.title || 'Finding', description: findMeta?.plain_language })

  if (loading) {
    return (
      <Layout base={paperSlug}>
        <p className="muted">Loading…</p>
      </Layout>
    )
  }
  if (error || !meta) return <NotFound />

  const findings = data?.findings || []
  const idx = findings.findIndex((f) => f.finding_id === findingId)
  if (idx === -1) return <NotFound />
  const finding = findings[idx]

  const section = (data?.sections || []).find((s) => s.section_id === finding.section_id)

  const prev = idx > 0 ? mkLink(paperSlug, findings[idx - 1]) : null
  const next = idx < findings.length - 1 ? mkLink(paperSlug, findings[idx + 1]) : null

  return (
    <Layout base={paperSlug}>
      <p className="crumb">
        <Link to="/">Shelf</Link>
        <span className="crumb__sep">/</span>
        <Link to={`/${paperSlug}`}>{meta.title}</Link>
        {section && (
          <>
            <span className="crumb__sep">/</span>
            <Link to={`/${paperSlug}/section/${section.section_id}`}>
              {section.title}
            </Link>
          </>
        )}
      </p>

      <p className="kicker">Finding</p>
      <h1 className="h2" style={{ margin: 'var(--space-3) 0 var(--space-5)' }}>
        {finding.title}
      </h1>

      <div className="prose">
        {finding.plain_language && <p className="lead">{finding.plain_language}</p>}
        {finding.so_what && (
          <p className="sowhat">
            <span className="sowhat__k">Why it matters</span>
            {finding.so_what}
          </p>
        )}
        <p>
          <SourceRef page={finding.source_page} />
        </p>
      </div>

      <PrevNext prev={prev} next={next} label="Finding" />
    </Layout>
  )
}

function mkLink(slug, f) {
  return { to: `/${slug}/finding/${f.finding_id}`, title: f.title }
}
