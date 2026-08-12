import { Link } from 'react-router-dom'

// A paper card. Every paper has an internal page (slug): a full explainer if
// one's been written, otherwise a record page with a link to the source.
export default function PaperCard({ paper }) {
  const built = paper.has_explainer === 'yes'
  return (
    <Link className="refcard" to={`/${paper.slug}`}>
      <div className="refcard__top">
        <span className="refcard__title">{paper.title}</span>
        {paper.tier && <span className="refcard__badge">Tier {paper.tier}</span>}
      </div>
      <div className="refcard__meta">
        {paper.journal && <span>{paper.journal}</span>}
        {paper.year && <span>{paper.year}</span>}
        {paper.setting && <span>{paper.setting}</span>}
        {built ? (
          <span className="refcard__deep">Explainer →</span>
        ) : (
          <span className="refcard__ext">Record →</span>
        )}
      </div>
    </Link>
  )
}

export function PaperList({ papers }) {
  if (!papers || papers.length === 0) return <p className="topic-empty">No papers here yet.</p>
  return (
    <ul className="reflist">
      {papers.map((p) => (
        <li key={p.id}>
          <PaperCard paper={p} />
        </li>
      ))}
    </ul>
  )
}
