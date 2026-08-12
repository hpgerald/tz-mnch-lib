import { loadCsv } from './csv.js'

// The CSV files that make up one paper's dataset. Adding a new paper = drop a
// folder under public/data/<slug>/ with these files + a row in papers.csv.
export const PAPER_DATASETS = [
  'sections',
  'findings',
  'figures',
  'facilities',
  'timeseries',
  'fig1_shares',
  'comparisons',
  'monthly_reporting',
  'timeline',
  'glossary',
  'nid_comparison',
  'biases',
  'personas',
]

// The library registry (the "shelf").
export async function loadPapers() {
  return loadCsv('papers.csv')
}

// Browse spine: the six collection layers + the 72-paper registry (+ explainers).
export async function loadLibraryModel() {
  const [layers, registry] = await Promise.all([loadCsv('layers.csv'), loadCsv('library.csv')])
  return { layers, registry }
}

// Analytical coding (kept for the evidence map): taxonomy + joins.
export async function loadLibrary() {
  const [papers, taxonomy, paperTopics, facets, paperFacets] = await Promise.all([
    loadCsv('papers.csv'),
    loadCsv('taxonomy.csv'),
    loadCsv('paper_topics.csv'),
    loadCsv('facets.csv').catch(() => []),
    loadCsv('paper_facets.csv').catch(() => []),
  ])
  return { papers, taxonomy, paperTopics, facets, paperFacets }
}

// Load every CSV for one paper slug, keyed by dataset name.
export async function loadPaper(slug) {
  const entries = await Promise.all(
    PAPER_DATASETS.map(async (name) => {
      try {
        return [name, await loadCsv(`${slug}/${name}.csv`)]
      } catch (err) {
        console.warn(`Missing dataset ${slug}/${name}.csv`, err)
        return [name, []]
      }
    })
  )
  return Object.fromEntries(entries)
}
