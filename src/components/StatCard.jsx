// Headline figure card. Value is big type; unit, label, note support it.
export default function StatCard({ value, unit, label, note }) {
  return (
    <div className="statcard">
      <div className="statcard__value num">
        {value}
        {unit && <span className="statcard__unit">&nbsp;{unit}</span>}
      </div>
      <span className="statcard__label">{label}</span>
      {note && <span className="statcard__note">{note}</span>}
    </div>
  )
}

export function StatGrid({ children }) {
  return <div className="statgrid">{children}</div>
}
