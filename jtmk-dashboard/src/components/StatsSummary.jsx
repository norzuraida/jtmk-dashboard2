const STATS = [
  { key: 'available',  label: 'Available',   cssVar: '--color-available'  },
  { key: 'in_class',   label: 'In Class',    cssVar: '--color-in_class'   },
  { key: 'outstation', label: 'Outstation',  cssVar: '--color-outstation' },
  { key: 'on_leave',   label: 'On Leave',    cssVar: '--color-on_leave'   },
]

export default function StatsSummary({ lecturers }) {
  const counts = lecturers.reduce((acc, l) => {
    acc[l.status.current] = (acc[l.status.current] ?? 0) + 1
    return acc
  }, {})

  return (
    <div className="stats-summary">
      {STATS.map(({ key, label, cssVar }) => (
        <div
          key={key}
          className="stat-tile"
          style={{ borderLeftColor: `var(${cssVar})` }}
        >
          <span className="stat-tile__count" style={{ color: `var(${cssVar})` }}>
            {counts[key] ?? 0}
          </span>
          <span className="stat-tile__label">{label}</span>
        </div>
      ))}
    </div>
  )
}
