// Number + text helpers. Never fabricate: blanks pass through untouched.

export function fmtNum(v) {
  if (v === undefined || v === null || String(v).trim() === '') return ''
  const n = Number(v)
  if (Number.isNaN(n)) return String(v)
  return n.toLocaleString('en-US')
}

// Shorten a unit string for the big-number display; longer units go in labels.
export function shortUnit(unit) {
  if (!unit) return ''
  const u = String(unit)
  if (u.includes('%') || u.toLowerCase() === 'percent') return '%'
  if (u.includes('per 1,000')) return 'per 1,000'
  return ''
}

// Pick rows from an array by an ordered list of ids, preserving that order.
export function pickByIds(rows, idKey, ids) {
  const map = new Map(rows.map((r) => [r[idKey], r]))
  return ids.map((id) => map.get(id)).filter(Boolean)
}
