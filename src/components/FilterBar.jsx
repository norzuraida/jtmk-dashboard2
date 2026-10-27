const FILTERS = [
  { label: 'All',        value: null         },
  { label: 'Available',  value: 'available'  },
  { label: 'In Class',   value: 'in_class'   },
  { label: 'Outstation', value: 'outstation' },
  { label: 'On Leave',   value: 'on_leave'   },
]

export default function FilterBar({ activeFilter, onFilter }) {
  return (
    <div className="filter-bar" role="group" aria-label="Filter by status">
      {FILTERS.map(({ label, value }) => (
        <button
          key={label}
          className={`filter-chip${activeFilter === value ? ' filter-chip--active' : ''}`}
          onClick={() => onFilter(value)}
          aria-pressed={activeFilter === value}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
