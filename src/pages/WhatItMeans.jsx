import { useParams } from 'react-router-dom'
import Layout from '../components/Layout.jsx'
import { GlossaryText } from '../components/Glossary.jsx'
import SourceRef from '../components/SourceRef.jsx'
import NotFound from './NotFound.jsx'
import { usePaper } from '../lib/hooks.js'
import { useMeta } from '../lib/meta.js'

// Fallback persona framing, used only if a paper ships no personas.csv.
const DEFAULT_PERSONAS = [
  { audience: 'general public', heading: 'If you use these services', intro: '' },
  { audience: 'hospitals', heading: 'If you work in a facility', intro: '' },
  { audience: 'policymakers', heading: 'If you shape health policy', intro: '' },
  { audience: 'students', heading: 'If you’re a student or researcher', intro: '' },
]

export default function WhatItMeans() {
  const { paperSlug } = useParams()
  const { loading, meta, data, error } = usePaper(paperSlug)
  useMeta({
    title: 'What it means for you',
    description: 'What the findings mean for parents, hospitals, policymakers and students — with a plain-language glossary.',
  })

  if (loading) {
    return (
      <Layout base={paperSlug}>
        <p className="muted">Loading…</p>
      </Layout>
    )
  }
  if (error || !meta) return <NotFound />

  const figures = data?.figures || []
  const biases = data?.biases || []
  const glossary = data?.glossary || []
  const personas = data?.personas?.length ? data.personas : DEFAULT_PERSONAS

  return (
    <Layout base={paperSlug}>
      <p className="kicker">{meta.title}</p>
      <h1 className="h1" style={{ margin: 'var(--space-3) 0 var(--space-4)' }}>
        What it means for you
      </h1>
      <p className="prose lead">
        <GlossaryText
          text="Here’s what this paper means for different people, in plain language. Hover or tap the underlined terms for definitions."
          glossary={glossary}
        />
      </p>

      {personas.map((p) => {
        const figs = figures.filter((f) => f.affected === p.audience)
        return (
          <section className="persona" key={p.audience}>
            <h2 className="persona__head">{p.heading}</h2>
            {p.intro && (
              <p className="persona__intro">
                <GlossaryText text={p.intro} glossary={glossary} />
              </p>
            )}
            {figs.length > 0 && (
              <ul className="minifigs">
                {figs.map((f) => (
                  <li className="minifig" key={f.figure_id}>
                    <span className="minifig__label">{f.label}</span>
                    <p className="minifig__plain">
                      <GlossaryText text={f.plain_language} glossary={glossary} />
                    </p>
                    <span className="minifig__src">
                      <SourceRef page={f.source_page} />
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )
      })}

      {biases.length > 0 && (
        <section style={{ marginTop: 'var(--space-8)' }}>
          <h2 className="h3" style={{ marginBottom: 'var(--space-2)' }}>
            What to keep in mind about the data
          </h2>
          <p className="prose muted" style={{ marginBottom: 'var(--space-4)' }}>
            Caveats and limitations worth holding alongside the figures above.
          </p>
          <ul className="minifigs">
            {biases.map((b, i) => (
              <li className="minifig" key={i}>
                <span className="minifig__label">
                  {b.bias} <span className="tag">{b.effect_on_nmr}</span>
                </span>
                <p className="minifig__plain">
                  <GlossaryText text={b.plain_language} glossary={glossary} />
                </p>
                <span className="minifig__src">
                  <SourceRef page={b.source_page} />
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {glossary.length > 0 && (
        <section style={{ marginTop: 'var(--space-8)' }}>
          <h2 className="h3" style={{ marginBottom: 'var(--space-2)' }}>
            Glossary
          </h2>
          <div className="gloss-list">
            {glossary.map((g, i) => (
              <div className="gloss-list__row" key={i}>
                <span className="gloss-list__term">{g.term}</span>
                <span>
                  {g.definition} <SourceRef page={g.source_page} />
                </span>
              </div>
            ))}
          </div>
        </section>
      )}
    </Layout>
  )
}
