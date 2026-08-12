import { useParams, Link } from 'react-router-dom'
import Layout from '../components/Layout.jsx'
import NotFound from './NotFound.jsx'
import { usePaper } from '../lib/hooks.js'
import { useMeta } from '../lib/meta.js'

export default function About() {
  const { paperSlug } = useParams()
  const { loading, meta, error } = usePaper(paperSlug)
  useMeta({
    title: 'About',
    description: 'What this explainer is, how to read it, and the full citation.',
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
      <p className="kicker">About this explainer</p>
      <h1 className="h1" style={{ margin: 'var(--space-3) 0 var(--space-5)' }}>
        About
      </h1>

      <div className="prose">
        <p className="lead">
          This is a plain-language explainer of a research paper, built so anyone can understand it
          in a few minutes. It is not the paper itself.
        </p>

        <p className="sowhat">
          <span className="sowhat__k">Please read this</span>
          The figures here describe <strong>data quality</strong> — how completely and consistently
          Tanzania's routine system records newborn deaths. A low reported death rate on this site
          means the system is <em>under-counting</em>, not that few babies are dying. These are
          findings about a reporting system, not health achievements, and nothing here is medical
          advice.
        </p>

        <h2 className="h3">How to read it</h2>
        <p>
          Every number is drawn straight from the source paper and stored in open CSV files; each
          row records the page it came from. Comparison bars are proportional and also written out
          in words. Where a value could not be verified from the source, it is left blank rather
          than estimated. You can download all the data on the{' '}
          <Link to={`/${paperSlug}/data`}>data page</Link>.
        </p>

        <h2 className="h3">Full citation</h2>
        <p>
          {meta.authors} ({meta.year}). <em>{meta.title}</em>. {meta.publisher}.{' '}
          <a href={meta.source_url} target="_blank" rel="noreferrer">
            https://doi.org/{meta.doi}
          </a>
        </p>
        <p className="muted">
          The original article is open access under a Creative Commons Attribution licence. This
          explainer is an independent summary and is not endorsed by the authors or publisher.
        </p>

        <h2 className="h3">About Paper Explainers</h2>
        <p>
          <Link to="/">Paper Explainers</Link> turns research papers into readable, data-driven
          summaries. Each paper lives at its own address, with its data in its own folder, so the
          shelf can grow over time.
        </p>
      </div>
    </Layout>
  )
}
