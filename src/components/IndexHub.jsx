import { Link } from 'react-router-dom'

// The numbered Index hub — primary navigation device.
// items: [{ num: '01', title, desc, to }]
export default function IndexHub({ items, ariaLabel = 'Index' }) {
  return (
    <nav aria-label={ariaLabel}>
      <ol className="hub">
        {items.map((it) => (
          <li className="hub__item" key={it.num + it.title}>
            <Link className="hub__link" to={it.to}>
              <span className="hub__num" aria-hidden="true">
                {it.num}
              </span>
              <span>
                <span className="hub__title">{it.title}</span>
                {it.desc && <span className="hub__desc">{it.desc}</span>}
              </span>
              <span className="hub__arrow" aria-hidden="true">
                →
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  )
}
