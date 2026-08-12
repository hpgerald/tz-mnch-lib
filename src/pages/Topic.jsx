import { useParams, Link } from 'react-router-dom'
import Layout from '../components/Layout.jsx'
import NotFound from './NotFound.jsx'
import { useLibrary } from '../lib/hooks.js'
import { useMeta } from '../lib/meta.js'

export default function Topic() {
  const { topicId } = useParams()
  const { loading, index, error } = useLibrary()
  const topic = index?.topicById.get(topicId)
  useMeta({ title: topic ? topic.topic_name : 'Topic' })

  if (loading) {
    return (
      <Layout>
        <p className="muted">Loading…</p>
      </Layout>
    )
  }
  if (error) return <p role="alert">Error: {error}</p>
  if (!topic) return <NotFound />

  const papers = index.papersByTopic.get(topicId) || []
  const layer = index.layers.find((L) => L.layer_id === topic.layer_id)

  return (
    <Layout>
      <p className="crumb">
        <Link to="/">Library</Link>
        <span className="crumb__sep">/</span>
        <Link to={`/layer/${topic.layer_id}`}>
          {topic.layer_no} · {topic.layer_name}
        </Link>
      </p>
      <p className="kicker">Topic</p>
      <h1 className="h1" style={{ margin: 'var(--space-3) 0 var(--space-4)' }}>
        {topic.topic_name}
      </h1>
      <p className="prose lead">
        {papers.length} paper{papers.length === 1 ? '' : 's'} in the library address this topic
        {layer ? ` under ${layer.layer_name.toLowerCase()}` : ''}.
      </p>

      {papers.length > 0 ? (
        <ul className="paper-links" style={{ marginTop: 'var(--space-5)' }}>
          {papers.map((p) => (
            <li key={p.paper_id}>
              <Link className="paper-link" to={`/${p.slug}`}>
                <span className="paper-link__id">{p.paper_id}</span>
                <span className="paper-link__title">{p.title}</span>
                <span className="paper-link__arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="topic-empty" style={{ marginTop: 'var(--space-5)' }}>
          No papers tagged to this topic yet.
        </p>
      )}

      <p style={{ marginTop: 'var(--space-7)' }}>
        <Link to={`/layer/${topic.layer_id}`}>← Back to {topic.layer_name}</Link>
      </p>
    </Layout>
  )
}
