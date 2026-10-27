import { useState } from 'react'
import StatusBadge from './StatusBadge'

// Derive initials from a full name string
function getInitials(name) {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0][0].toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

// Stable color from id for the initials circle
const AVATAR_COLORS = [
  '#003366', '#1a6b8a', '#2d7d46', '#7c3d8a',
  '#b85c00', '#8a2d2d', '#2d5f8a', '#5c6b00',
]
function avatarColor(id) {
  let hash = 0
  for (let i = 0; i < id.length; i++) hash = id.charCodeAt(i) + ((hash << 5) - hash)
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length]
}

// Format returnDate "2025-07-16" → "16 Jul 2025"
function formatReturnDate(dateStr) {
  if (!dateStr) return null
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
}

export default function LecturerCard({ lecturer, onSelect }) {
  const [imgError, setImgError] = useState(false)
  const { personal, academic, status } = lecturer
  const fullName = `${personal.title} ${personal.name}`
  const initials = getInitials(personal.name)

  const showAvailableFrom =
    status.current === 'in_class' && status.availableFrom
  const showReturnDate =
    (status.current === 'outstation' || status.current === 'on_leave') && status.returnDate

  return (
    <div
      className="lecturer-card"
      role="button"
      tabIndex={0}
      onClick={() => onSelect(lecturer)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelect(lecturer) }}
    >
      {/* Avatar */}
      {personal.photo && !imgError ? (
        <img
          className="lecturer-card__avatar"
          src={personal.photo}
          alt={fullName}
          onError={() => setImgError(true)}
        />
      ) : (
        <div
          className="lecturer-card__avatar lecturer-card__initials"
          style={{ backgroundColor: avatarColor(lecturer.id) }}
          aria-hidden="true"
        >
          {initials}
        </div>
      )}

      {/* Info */}
      <div className="lecturer-card__info">
        <p className="lecturer-card__name">{fullName}</p>
        <p className="lecturer-card__rank">{academic.rank}</p>
        <StatusBadge status={status.current} />
        <p className="lecturer-card__location">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          {status.location}
        </p>
        {showAvailableFrom && (
          <p className="lecturer-card__sub-info">Available from {status.availableFrom}</p>
        )}
        {showReturnDate && (
          <p className="lecturer-card__sub-info">Returns: {formatReturnDate(status.returnDate)}</p>
        )}
      </div>
    </div>
  )
}
