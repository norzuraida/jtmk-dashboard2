const STATUS_LABELS = {
  available: 'Available',
  in_class: 'In Class',
  outstation: 'Outstation',
  on_leave: 'On Leave',
}

export default function StatusBadge({ status }) {
  const label = STATUS_LABELS[status] ?? status

  return (
    <span className={`status-badge status-badge--${status}`}>
      {status === 'available' && <span className="pulse-dot" aria-hidden="true" />}
      {label}
    </span>
  )
}
