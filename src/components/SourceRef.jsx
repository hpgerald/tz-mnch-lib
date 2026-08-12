// Source-page marker. source_page may be a single page or "7,9,11".
export default function SourceRef({ page }) {
  if (!page) return null
  const pages = String(page).trim()
  const label = pages.includes(',') ? `pp. ${pages}` : `p. ${pages}`
  return <span className="src">Source {label}</span>
}
