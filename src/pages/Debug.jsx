import { useEffect, useState } from 'react'
import { loadPapers, loadPaper, PAPER_DATASETS } from '../lib/data.js'
import { Placeholder } from '../App.jsx'

// /#/debug — loads the registry + every paper's CSVs and reports row counts.
// This is the Phase 2 Definition-of-Done check.
export default function Debug() {
  const [state, setState] = useState({ status: 'loading', papers: [], counts: {}, errors: [] })

  useEffect(() => {
    let cancelled = false
    async function run() {
      const errors = []
      let papers = []
      try {
        papers = await loadPapers()
      } catch (e) {
        errors.push(`papers.csv: ${e.message}`)
      }
      const counts = {}
      for (const p of papers) {
        try {
          const ds = await loadPaper(p.slug)
          counts[p.slug] = Object.fromEntries(
            PAPER_DATASETS.map((n) => [n, (ds[n] || []).length])
          )
        } catch (e) {
          errors.push(`${p.slug}: ${e.message}`)
        }
      }
      if (!cancelled) setState({ status: 'done', papers, counts, errors })
    }
    run()
    return () => {
      cancelled = true
    }
  }, [])

  const { status, papers, counts, errors } = state

  return (
    <Placeholder title="Data debug">
      <p>Status: {status}</p>
      {errors.length > 0 && (
        <div style={{ color: '#b00' }}>
          <strong>Errors:</strong>
          <ul>
            {errors.map((e, i) => (
              <li key={i}>{e}</li>
            ))}
          </ul>
        </div>
      )}
      <p>
        Registry rows (papers.csv): <strong>{papers.length}</strong>
      </p>
      {papers.map((p) => (
        <section key={p.slug} style={{ marginTop: '1.5rem' }}>
          <h2 style={{ fontSize: 16 }}>
            {p.paper_id} · {p.slug}
          </h2>
          <table style={{ borderCollapse: 'collapse', fontSize: 13, width: '100%' }}>
            <thead>
              <tr>
                <th style={cell}>dataset</th>
                <th style={cell}>rows</th>
              </tr>
            </thead>
            <tbody>
              {PAPER_DATASETS.map((n) => (
                <tr key={n}>
                  <td style={cell}>{n}.csv</td>
                  <td style={{ ...cell, textAlign: 'right' }}>{counts[p.slug]?.[n] ?? '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ))}
    </Placeholder>
  )
}

const cell = { border: '1px solid #ccc', padding: '4px 8px', textAlign: 'left' }
