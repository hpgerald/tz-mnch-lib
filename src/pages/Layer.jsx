import { useParams, Link } from 'react-router-dom'
import Layout from '../components/Layout.jsx'
import PrevNext from '../components/PrevNext.jsx'
import { PaperList } from '../components/PaperCard.jsx'
import NotFound from './NotFound.jsx'
import { useLibrary } from '../lib/hooks.js'
import { useMeta } from '../lib/meta.js'

export default function Layer() {
  const { layerId } = useParams()
  const { loading, index, error } = useLibrary()
  const layer = index?.layerById.get(layerId)
  useMeta({ title: layer ? `${layer.layer_no} · ${layer.layer_name}` : 'Layer' })

  if (loading) {
    return (
      <Layout>
        <p className="muted">Loading…</p>
      </Layout>
    )
  }
  if (error) return <p role="alert">Error: {error}</p>
  if (!layer) return <NotFound />

  const layers = index.layers
  const i = layers.findIndex((L) => L.layer_id === layerId)
  const prev = i > 0 ? mk(layers[i - 1]) : null
  const next = i < layers.length - 1 ? mk(layers[i + 1]) : null

  return (
    <Layout>
      <p className="crumb">
        <Link to="/">Library</Link>
        <span className="crumb__sep">/</span>
        Layer {layer.layer_no}
      </p>
      <p className="kicker">Evidence layer {layer.layer_no}</p>
      <h1 className="h1" style={{ margin: 'var(--space-3) 0 var(--space-4)' }}>
        {layer.layer_name}
      </h1>
      <p className="prose lead">
        {layer.blurb} {layer.papers.length} paper{layer.papers.length === 1 ? '' : 's'}, most
        relevant first.
      </p>

      <PaperList papers={layer.papers} />

      <PrevNext prev={prev} next={next} label="Layer" />
    </Layout>
  )
}

function mk(L) {
  return { to: `/layer/${L.layer_id}`, title: `${L.layer_no} · ${L.layer_name}` }
}
