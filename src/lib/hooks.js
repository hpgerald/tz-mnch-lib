import { useEffect, useMemo, useState } from 'react'
import { loadPapers, loadPaper, loadLibraryModel, loadLibrary } from './data.js'
import { loadCsv } from './csv.js'

// The evidence-map model: analytical layers (the problem→cost spine) with the
// topics that have coded papers, plus facets. Grows as papers are coded.
export function useEvidenceMap() {
  const [state, setState] = useState({ loading: true, model: null, error: null })
  useEffect(() => {
    let cancelled = false
    loadLibrary()
      .then(({ papers, taxonomy, paperTopics, facets, paperFacets }) => {
        if (cancelled) return
        const paperById = new Map(papers.map((p) => [p.paper_id, p]))
        const papersByTopic = new Map()
        for (const { paper_id, topic_id } of paperTopics) {
          const p = paperById.get(paper_id)
          if (!p) continue
          if (!papersByTopic.has(topic_id)) papersByTopic.set(topic_id, [])
          papersByTopic.get(topic_id).push(p)
        }
        // The complete framework: every analytical layer and every topic, in
        // order. Topics carry their coded papers (possibly none yet).
        const layerMap = new Map()
        for (const t of taxonomy) {
          if (!layerMap.has(t.layer_id))
            layerMap.set(t.layer_id, {
              layer_no: t.layer_no,
              layer_id: t.layer_id,
              layer_name: t.layer_name,
              topics: [],
            })
          layerMap.get(t.layer_id).topics.push({ ...t, papers: papersByTopic.get(t.topic_id) || [] })
        }
        const stages = [...layerMap.values()].sort(
          (a, b) => Number(a.layer_no) - Number(b.layer_no)
        )
        for (const s of stages)
          s.topics.sort((a, b) => Number(a.topic_order) - Number(b.topic_order))

        // Facet chips with counts.
        const facName = new Map(facets.map((f) => [`${f.facet}:${f.value_id}`, f.value_name]))
        const facetCounts = {}
        for (const { facet, value_id } of paperFacets) {
          const key = facName.get(`${facet}:${value_id}`)
          if (!key) continue
          facetCounts[facet] = facetCounts[facet] || {}
          facetCounts[facet][key] = (facetCounts[facet][key] || 0) + 1
        }
        const codedCount = new Set(paperTopics.map((x) => x.paper_id)).size
        setState({ loading: false, model: { stages, facetCounts, codedCount }, error: null })
      })
      .catch((e) => !cancelled && setState({ loading: false, model: null, error: e.message }))
    return () => {
      cancelled = true
    }
  }, [])
  return state
}

// Where an explainer sits in the library: its collection layer + its
// analytical evidence-map coding (topics grouped by analytical layer) + facets.
export function usePaperNesting(slug, paperId) {
  const [state, setState] = useState({ loading: true, ctx: null })
  useEffect(() => {
    if (!slug) return
    let cancelled = false
    Promise.all([
      loadCsv('library.csv'),
      loadCsv('layers.csv'),
      loadCsv('paper_topics.csv').catch(() => []),
      loadCsv('taxonomy.csv').catch(() => []),
      loadCsv('paper_facets.csv').catch(() => []),
      loadCsv('facets.csv').catch(() => []),
    ])
      .then(([lib, layers, pt, tax, pf, fac]) => {
        if (cancelled) return
        const row = lib.find((r) => r.slug === slug)
        const collectionLayer = row ? layers.find((l) => l.layer_id === row.layer) : null

        const taxById = new Map(tax.map((t) => [t.topic_id, t]))
        const byAnalytical = {}
        for (const x of pt) {
          if (x.paper_id !== paperId) continue
          const t = taxById.get(x.topic_id)
          if (!t) continue
          ;(byAnalytical[t.layer_name] = byAnalytical[t.layer_name] || []).push(t.topic_name)
        }
        const coding = Object.entries(byAnalytical).map(([layer, topics]) => ({ layer, topics }))

        const facName = new Map(fac.map((f) => [`${f.facet}:${f.value_id}`, f.value_name]))
        const facets = {}
        for (const x of pf) {
          if (x.paper_id !== paperId) continue
          const name = facName.get(`${x.facet}:${x.value_id}`)
          if (name) (facets[x.facet] = facets[x.facet] || []).push(name)
        }
        setState({ loading: false, ctx: { collectionLayer, coding, facets } })
      })
      .catch(() => !cancelled && setState({ loading: false, ctx: null }))
    return () => {
      cancelled = true
    }
  }, [slug, paperId])
  return state
}

// The evidence library: six collection layers over the 72-paper registry
// (plus the two explainers). Sort within a layer by relevance, then year.
export function useLibrary() {
  const [state, setState] = useState({ loading: true, data: null, error: null })
  useEffect(() => {
    let cancelled = false
    loadLibraryModel()
      .then((data) => !cancelled && setState({ loading: false, data, error: null }))
      .catch((e) => !cancelled && setState({ loading: false, data: null, error: e.message }))
    return () => {
      cancelled = true
    }
  }, [])

  const index = useMemo(() => (state.data ? buildIndex(state.data) : null), [state.data])
  return { ...state, index }
}

const byRelevanceThenYear = (a, b) =>
  Number(b.relevance || 0) - Number(a.relevance || 0) || Number(b.year || 0) - Number(a.year || 0)

function buildIndex({ layers, registry }) {
  const papersByLayer = new Map()
  for (const p of registry) {
    if (!papersByLayer.has(p.layer)) papersByLayer.set(p.layer, [])
    papersByLayer.get(p.layer).push(p)
  }
  for (const list of papersByLayer.values()) list.sort(byRelevanceThenYear)

  const orderedLayers = [...layers]
    .sort((a, b) => Number(a.layer_no) - Number(b.layer_no))
    .map((L) => ({ ...L, papers: papersByLayer.get(L.layer_id) || [] }))

  const layerById = new Map(orderedLayers.map((L) => [L.layer_id, L]))
  const registrySorted = [...registry].sort(byRelevanceThenYear)
  return { layers: orderedLayers, layerById, papersByLayer, registry: registrySorted }
}

// The library registry ("the shelf").
export function usePapers() {
  const [state, setState] = useState({ loading: true, papers: [], error: null })
  useEffect(() => {
    let cancelled = false
    loadPapers()
      .then((papers) => !cancelled && setState({ loading: false, papers, error: null }))
      .catch((e) => !cancelled && setState({ loading: false, papers: [], error: e.message }))
    return () => {
      cancelled = true
    }
  }, [])
  return state
}

// One paper by slug. Meta merges the library registry (all papers) with the
// richer explainer metadata (papers.csv, only for built-out papers). Datasets
// are loaded only when the paper actually has an explainer.
export function usePaper(slug) {
  const [state, setState] = useState({
    loading: true,
    meta: null,
    data: {},
    hasExplainer: false,
    error: null,
  })
  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const [{ registry }, papers] = await Promise.all([loadLibraryModel(), loadPapers()])
        const lib = registry.find((p) => p.slug === slug) || null
        const rich = papers.find((p) => p.slug === slug) || null
        const meta = lib || rich ? { ...(lib || {}), ...(rich || {}) } : null
        const hasExplainer = lib?.has_explainer === 'yes' || !!rich
        const data = hasExplainer ? await loadPaper(slug) : {}
        if (cancelled) return
        setState({
          loading: false,
          meta,
          data,
          hasExplainer: hasExplainer && (data.sections || []).length > 0,
          error: meta ? null : `Unknown paper: ${slug}`,
        })
      } catch (e) {
        if (!cancelled)
          setState({ loading: false, meta: null, data: {}, hasExplainer: false, error: e.message })
      }
    })()
    return () => {
      cancelled = true
    }
  }, [slug])
  return state
}
