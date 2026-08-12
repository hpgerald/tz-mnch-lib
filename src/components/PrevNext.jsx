import { Link } from 'react-router-dom'

// Prev/next paging. prev/next: { to, title } or null.
export default function PrevNext({ prev, next, label = 'Section' }) {
  return (
    <nav className="pager" aria-label={`${label} paging`}>
      {prev ? (
        <Link className="pager__link" to={prev.to}>
          <span className="pager__dir">← Previous</span>
          <span className="pager__title">{prev.title}</span>
        </Link>
      ) : (
        <span className="pager__link pager__empty" aria-hidden="true" />
      )}
      {next ? (
        <Link className="pager__link pager__link--next" to={next.to}>
          <span className="pager__dir">Next →</span>
          <span className="pager__title">{next.title}</span>
        </Link>
      ) : (
        <span className="pager__link pager__empty" aria-hidden="true" />
      )}
    </nav>
  )
}
