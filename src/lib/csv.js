import Papa from 'papaparse'

// import.meta.env.BASE_URL respects vite `base:'./'`, so data URLs resolve
// correctly both in dev and on GitHub Pages under /paper-explainers/.
const BASE = import.meta.env.BASE_URL

export function dataUrl(relPath) {
  return `${BASE}data/${relPath}`
}

// Load and parse a CSV into an array of row objects (all values are strings;
// callers convert numbers explicitly so blanks stay blank, never 0).
export async function loadCsv(relPath) {
  const res = await fetch(dataUrl(relPath))
  if (!res.ok) throw new Error(`Failed to load ${relPath} (${res.status})`)
  const text = await res.text()
  const { data, errors } = Papa.parse(text.trim(), {
    header: true,
    skipEmptyLines: true,
    dynamicTyping: false,
  })
  if (errors && errors.length) {
    // Non-fatal: log so /#/debug can surface parse issues.
    console.warn(`CSV parse warnings in ${relPath}:`, errors)
  }
  return data
}

// Parse a possibly-blank cell to a number, or return null (never 0 for blanks).
export function num(v) {
  if (v === undefined || v === null || String(v).trim() === '') return null
  const n = Number(v)
  return Number.isNaN(n) ? null : n
}
