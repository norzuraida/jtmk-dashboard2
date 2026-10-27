import { useState } from 'react'
import lecturersData from '../data/lecturers.json'
import StatusBadge from '../components/StatusBadge'

// ── Avatar helpers (same logic as LecturerCard) ────────────────────────────
function getInitials(name) {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0][0].toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

const AVATAR_COLORS = [
  '#003366', '#1a6b8a', '#2d7d46', '#7c3d8a',
  '#b85c00', '#8a2d2d', '#2d5f8a', '#5c6b00',
]
function avatarColor(id) {
  let hash = 0
  for (let i = 0; i < id.length; i++) hash = id.charCodeAt(i) + ((hash << 5) - hash)
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length]
}

// ── Sort orders ────────────────────────────────────────────────────────────
const STATUS_ORDER = { available: 0, in_class: 1, outstation: 2, on_leave: 3 }
const RANK_ORDER = { 'Associate Professor': 0, 'Senior Lecturer': 1, 'Lecturer': 2 }

const SORT_OPTIONS = [
  { key: 'name',   label: 'Name A–Z' },
  { key: 'status', label: 'Status' },
  { key: 'rank',   label: 'Rank' },
]

function sortLecturers(lecturers, sortBy) {
  return [...lecturers].sort((a, b) => {
    if (sortBy === 'name') {
      return a.personal.name.localeCompare(b.personal.name)
    }
    if (sortBy === 'status') {
      return (STATUS_ORDER[a.status.current] ?? 99) - (STATUS_ORDER[b.status.current] ?? 99)
    }
    if (sortBy === 'rank') {
      return (RANK_ORDER[a.academic.rank] ?? 99) - (RANK_ORDER[b.academic.rank] ?? 99)
    }
    return 0
  })
}

// ── Row avatar sub-component ───────────────────────────────────────────────
function RowAvatar({ lecturer }) {
  const [imgError, setImgError] = useState(false)
  const { personal } = lecturer
  const initials = getInitials(personal.name)

  if (personal.photo && !imgError) {
    return (
      <img
        className="lecturer-row__avatar"
        src={personal.photo}
        alt={`${personal.title} ${personal.name}`}
        onError={() => setImgError(true)}
      />
    )
  }
  return (
    <div
      className="lecturer-row__avatar lecturer-row__avatar--initials"
      style={{ backgroundColor: avatarColor(lecturer.id) }}
      aria-hidden="true"
    >
      {initials}
    </div>
  )
}

// ── Chevron icon ───────────────────────────────────────────────────────────
function ChevronRight() {
  return (
    <svg className="lecturer-row__chevron" width="16" height="16" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  )
}

// ── Main component ─────────────────────────────────────────────────────────
export default function Lecturers({ onSelectLecturer }) {
  const [sortBy, setSortBy] = useState('name')
  const allLecturers = lecturersData.lecturers
  const sorted = sortLecturers(allLecturers, sortBy)

  return (
    <div className="lecturers-page">
      {/* Header: count + sort chips */}
      <div className="lecturers-header">
        <span className="lecturers-header__count">{allLecturers.length} Lecturers</span>
        <div className="sort-chips" role="group" aria-label="Sort order">
          {SORT_OPTIONS.map(opt => (
            <button
              key={opt.key}
              className={`sort-chip${sortBy === opt.key ? ' sort-chip--active' : ''}`}
              onClick={() => setSortBy(opt.key)}
              aria-pressed={sortBy === opt.key}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <ul className="lecturer-list" role="list">
        {sorted.map((lecturer) => {
          const fullName = `${lecturer.personal.title} ${lecturer.personal.name}`
          return (
            <li key={lecturer.id} className="lecturer-list__item">
              <div
                className="lecturer-row"
                role="button"
                tabIndex={0}
                onClick={() => onSelectLecturer(lecturer)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelectLecturer(lecturer) }}
                aria-label={`View profile for ${fullName}`}
              >
                <RowAvatar lecturer={lecturer} />
                <div className="lecturer-row__info">
                  <p className="lecturer-row__name">{fullName}</p>
                  <p className="lecturer-row__rank">{lecturer.academic.rank}</p>
                </div>
                <div className="lecturer-row__status">
                  <StatusBadge status={lecturer.status.current} />
                  <p className="lecturer-row__location">{lecturer.status.location}</p>
                </div>
                <ChevronRight />
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
