import { Link, NavLink } from 'react-router-dom'

// Masthead + primary nav. `base` is the paper slug (or undefined on the shelf).
export default function Nav({ base }) {
  const to = (path) => (base ? `/${base}${path}` : path)
  const links = base
    ? [
        ['', 'Overview'],
        ['/numbers', 'Numbers'],
        ['/timeline', 'Timeline'],
        ['/what-it-means', 'What it means'],
        ['/data', 'Data'],
        ['/about', 'About'],
      ]
    : [
        ['/', 'Layers'],
        ['/map', 'Evidence map'],
        ['/papers', 'Papers'],
      ]

  return (
    <header className="masthead">
      <div className="container masthead__inner">
        <Link className="masthead__brand" to="/">
          Tanzania MNCH Library{base ? <span>&nbsp;/ {base}</span> : null}
        </Link>
        <nav className="nav" aria-label="Primary">
          {links.map(([path, label]) => (
            <NavLink key={label} to={to(path)} end={path === '' || path === '/'}>
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
