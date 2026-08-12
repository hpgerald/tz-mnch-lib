import Layout from '../components/Layout.jsx'
import IndexHub from '../components/IndexHub.jsx'
import StatCard, { StatGrid } from '../components/StatCard.jsx'
import ComparisonBar from '../components/ComparisonBar.jsx'

const SWATCHES = [
  ['--ink', '#111111'],
  ['--grey-22', '#383838'],
  ['--grey-40', '#666666'],
  ['--grey-55', '#8c8c8c'],
  ['--grey-70', '#b3b3b3'],
  ['--grey-88', '#e0e0e0'],
  ['--grey-95', '#f4f4f4'],
  ['--paper', '#ffffff'],
]

const STEPS = [
  ['--step-5', 'Display'],
  ['--step-4', 'H1'],
  ['--step-3', 'H2'],
  ['--step-2', 'H3'],
  ['--step-1', 'Lead'],
  ['--step-0', 'Body'],
  ['--step--1', 'Small / kicker'],
]

export default function Design() {
  return (
    <Layout>
      <p className="kicker">Design system</p>
      <h1 className="h1" style={{ marginBottom: 'var(--space-6)' }}>
        Monochrome, editorial, data-first
      </h1>
      <p className="prose lead">
        Meaning comes from type, scale, thin rules and whitespace — never colour. Interactive
        elements invert to black on hover and keyboard focus.
      </p>

      <hr className="rule rule--strong" />

      {/* Palette */}
      <p className="kicker">01 · Palette</p>
      <h2 className="h3" style={{ margin: 'var(--space-3) 0 var(--space-5)' }}>
        Black, white, grey ramp only
      </h2>
      <div className="swatches">
        {SWATCHES.map(([name, hex]) => (
          <div className="swatch" key={name}>
            <div
              className="swatch__chip"
              style={{ background: `var(${name})`, borderBottom: '1px solid var(--rule)' }}
            />
            <div className="swatch__meta mono">
              <span>{name}</span>
              <span className="muted">{hex}</span>
            </div>
          </div>
        ))}
      </div>

      <hr className="rule" />

      {/* Type scale */}
      <p className="kicker">02 · Type scale</p>
      <h2 className="h3" style={{ margin: 'var(--space-3) 0 var(--space-5)' }}>
        Fluid neo-grotesque
      </h2>
      <div className="stack">
        {STEPS.map(([step, label]) => (
          <div
            key={step}
            style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-4)' }}
          >
            <span
              className="mono muted"
              style={{ fontSize: 'var(--step--1)', width: '9rem', flex: '0 0 auto' }}
            >
              {step}
            </span>
            <span
              style={{
                fontSize: `var(${step})`,
                lineHeight: 'var(--leading-tight)',
                letterSpacing: 'var(--tracking-tight)',
                fontWeight: 700,
              }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>

      <hr className="rule" />

      {/* Numbered hub states */}
      <p className="kicker">03 · Numbered index hub</p>
      <h2 className="h3" style={{ margin: 'var(--space-3) 0 var(--space-2)' }}>
        Hover or focus a row — it inverts
      </h2>
      <p className="muted" style={{ marginBottom: 'var(--space-5)' }}>
        The primary navigation device. Tab through it to see keyboard focus.
      </p>
      <IndexHub
        ariaLabel="Design sample index"
        items={[
          { num: '01', title: 'The problem', desc: 'What the paper is about, in one line.', to: '/design' },
          { num: '02', title: 'What they did', desc: 'Methods in plain language.', to: '/design' },
          { num: '03', title: 'The numbers', desc: 'Every figure with a comparison bar.', to: '/design' },
        ]}
      />

      <hr className="rule" />

      {/* Stat cards */}
      <p className="kicker">04 · Headline figures</p>
      <h2 className="h3" style={{ margin: 'var(--space-3) 0 var(--space-5)' }}>
        StatCard
      </h2>
      <StatGrid>
        <StatCard value="5.9" unit="per 1,000" label="Death rate the system reports" note="vs 24 in national surveys" />
        <StatCard value="58.3" unit="%" label="Months hospitals actually reported" note="Median across 35 hospitals" />
        <StatCard value="8,500" label="Deaths recorded per year" note="vs ~48,000 expected" />
      </StatGrid>

      <hr className="rule" />

      {/* Comparison bar */}
      <p className="kicker">05 · Comparison bar</p>
      <h2 className="h3" style={{ margin: 'var(--space-3) 0 var(--space-5)' }}>
        Proportional, and readable as text
      </h2>
      <div className="prose">
        <ComparisonBar
          value={5.9}
          comparator={24}
          valueLabel="DHIS2 routine system (2024, adjusted)"
          comparatorLabel="National survey (DHS 2022/23)"
        />
      </div>

      <hr className="rule" />

      {/* Tags */}
      <p className="kicker">06 · Direction tags</p>
      <h2 className="h3" style={{ margin: 'var(--space-3) 0 var(--space-5)' }}>
        Monochrome markers
      </h2>
      <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
        <span className="tag">Gap</span>
        <span className="tag">Lower ↓</span>
        <span className="tag tag--fill">Higher ↑</span>
        <span className="tag">● new</span>
      </div>
    </Layout>
  )
}
