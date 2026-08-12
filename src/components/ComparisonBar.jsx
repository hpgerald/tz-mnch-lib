// Information-is-Beautiful style proportional comparison bar.
// Every bar is ALSO readable as text (labels below); the visual track is
// aria-hidden so screen readers get the numbers, not the decoration.
//
// value vs comparator, scaled against `max` (defaults to the larger of the two).
export default function ComparisonBar({
  value,
  comparator,
  valueLabel,
  comparatorLabel,
  max,
  hatchComparator = true,
}) {
  const top = max ?? (Math.max(value ?? 0, comparator ?? 0) || 1)
  const pct = (n) => `${Math.max(0, Math.min(100, ((n ?? 0) / top) * 100))}%`

  return (
    <div className="cbar">
      <div className="cbar__track" aria-hidden="true">
        <div className="cbar__fill" style={{ width: pct(value) }} />
      </div>
      <div className="cbar__labels">
        <span>{valueLabel}</span>
        <span className="num">{value}</span>
      </div>
      {comparator != null && (
        <>
          <div className="cbar__track" aria-hidden="true">
            <div
              className={hatchComparator ? 'cbar__fill cbar__fill--hatch' : 'cbar__fill'}
              style={{ width: pct(comparator) }}
            />
          </div>
          <div className="cbar__labels">
            <span>{comparatorLabel}</span>
            <span className="num">{comparator}</span>
          </div>
        </>
      )}
    </div>
  )
}
