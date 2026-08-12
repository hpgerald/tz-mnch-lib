import { useId, useRef } from 'react'

// A single glossary term with a hover/focus/tap tooltip. Keyboard accessible:
// the term is a <button>, the definition is role="tooltip" linked via
// aria-describedby, shown on hover and on focus-within, dismissed with Escape.
export function Term({ term, def, source }) {
  const id = useId()
  const btnRef = useRef(null)
  return (
    <span className="gloss">
      <button
        ref={btnRef}
        type="button"
        className="gloss__term"
        aria-describedby={id}
        onKeyDown={(e) => {
          if (e.key === 'Escape') btnRef.current?.blur()
        }}
      >
        {term}
      </button>
      <span role="tooltip" id={id} className="gloss__pop">
        {def}
        {source && <span className="src">Source p. {source}</span>}
      </span>
    </span>
  )
}

// Auto-wrap the first occurrence of each known glossary term inside a string.
// Longest terms first, whole-word, case-insensitive. Returns an array of
// strings and <Term> nodes.
export function GlossaryText({ text, glossary }) {
  if (!text) return null
  if (!glossary || glossary.length === 0) return text

  const terms = [...glossary].sort((a, b) => b.term.length - a.term.length)
  const used = new Set()
  let nodes = [text]

  for (const g of terms) {
    const re = new RegExp(`\\b(${escapeRe(g.term)})\\b`)
    nodes = nodes.flatMap((node, i) => {
      if (typeof node !== 'string' || used.has(g.term)) return [node]
      const m = node.match(re)
      if (!m) return [node]
      used.add(g.term)
      const before = node.slice(0, m.index)
      const after = node.slice(m.index + m[0].length)
      return [
        before,
        <Term key={`${g.term}-${i}`} term={m[0]} def={g.definition} source={g.source_page} />,
        after,
      ]
    })
  }
  return nodes.filter((n) => n !== '')
}

function escapeRe(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
