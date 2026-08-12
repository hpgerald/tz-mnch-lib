import ComparisonBar from './ComparisonBar.jsx'
import SourceRef from './SourceRef.jsx'
import { num } from '../lib/csv.js'
import { fmtNum } from '../lib/format.js'

// Shared list of figures with proportional comparison bars.
// Reused by section pages (Phase 5) and the numbers dashboard (Phase 6).
// Every bar is also readable as text (labels + numbers); the track is aria-hidden.
export default function FigureList({ figures }) {
  if (!figures || figures.length === 0) {
    return <p className="muted">No figures for this section.</p>
  }
  return (
    <ol className="figures">
      {figures.map((f) => {
        const value = num(f.value)
        const comparator = num(f.comparator_value)
        const unitSuffix =
          f.unit && String(f.unit).includes('%') ? '%' : ''
        return (
          <li className="figure" key={f.figure_id}>
            <div className="figure__head">
              <h3 className="figure__label">{f.label}</h3>
              {f.direction && <span className="tag">{f.direction}</span>}
            </div>

            <ComparisonBar
              value={value}
              comparator={comparator}
              valueLabel={`${f.value_label} — ${fmtNum(f.value)}${unitSuffix}`}
              comparatorLabel={
                comparator != null
                  ? `${f.comparator_label} — ${fmtNum(f.comparator_value)}${unitSuffix}`
                  : undefined
              }
            />

            {f.plain_language && <p className="figure__plain">{f.plain_language}</p>}

            <div className="figure__meta">
              {f.affected && (
                <span>
                  <span className="tagword">Affects</span>&nbsp;{f.affected}
                </span>
              )}
              {f.unit && <span>{f.unit}</span>}
              <SourceRef page={f.source_page} />
            </div>
          </li>
        )
      })}
    </ol>
  )
}
