import { useState } from 'react'
import StatusBadge from '../components/StatusBadge'

// ── Avatar helpers (same logic as LecturerCard) ──────────────────────────────
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

// ── Date helpers ─────────────────────────────────────────────────────────────
function formatReturnDate(dateStr) {
  if (!dateStr) return null
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
}

function timeAgo(isoString) {
  if (!isoString) return null
  const diffMs = Date.now() - new Date(isoString).getTime()
  const diffMins = Math.floor(diffMs / 60000)
  if (diffMins < 1) return 'just now'
  if (diffMins < 60) return `${diffMins} min${diffMins !== 1 ? 's' : ''} ago`
  const diffHours = Math.floor(diffMins / 60)
  if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`
  const diffDays = Math.floor(diffHours / 24)
  return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`
}

function getTodaySlots(schedule) {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' })
  const dayEntry = schedule.find((d) => d.day === today)
  return dayEntry ? dayEntry.slots : []
}

// ── SVG Icons ────────────────────────────────────────────────────────────────
function IconArrowLeft() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M19 12H5M12 5l-7 7 7 7" />
    </svg>
  )
}

function IconPhone() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5 19.79 19.79 0 0 1 1.61 4.9 2 2 0 0 1 3.58 2.72h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.09a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

function IconMail() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  )
}

function IconDoor() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 21h18M9 21V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v16" />
      <path d="M13 12h.01" />
    </svg>
  )
}

function IconPin() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

// ── Component ────────────────────────────────────────────────────────────────
export default function LecturerDetail({ lecturer, onBack }) {
  const [imgError, setImgError] = useState(false)
  const { personal, academic, contact, status, schedule } = lecturer
  const fullName = `${personal.title} ${personal.name}`
  const initials = getInitials(personal.name)
  const todaySlots = getTodaySlots(schedule)
  const showReturn = (status.current === 'outstation' || status.current === 'on_leave') && status.returnDate

  return (
    <div className="lecturer-detail">
      {/* ── Back button ── */}
      <button className="detail-back-btn" onClick={onBack} aria-label="Go back">
        <IconArrowLeft />
        <span>Back</span>
      </button>

      {/* ── Hero ── */}
      <div className="detail-hero">
        {personal.photo && !imgError ? (
          <img
            className="detail-avatar-lg"
            src={personal.photo}
            alt={fullName}
            onError={() => setImgError(true)}
          />
        ) : (
          <div
            className="detail-avatar-lg detail-avatar-lg--initials"
            style={{ backgroundColor: avatarColor(lecturer.id) }}
            aria-hidden="true"
          >
            {initials}
          </div>
        )}
        <h1 className="detail-hero__name">{fullName}</h1>
        <p className="detail-hero__rank">{academic.rank}</p>
        <StatusBadge status={status.current} />
      </div>

      {/* ── Current Status ── */}
      <section className="detail-section">
        <h2 className="detail-section__title">Current Status</h2>
        <div className="detail-contact-row">
          <IconPin />
          <span>{status.location}</span>
        </div>
        {status.detail && (
          <p className="detail-status-detail">{status.detail}</p>
        )}
        {status.current === 'in_class' && status.availableFrom && (
          <p className="detail-status-meta">Available from: <strong>{status.availableFrom}</strong></p>
        )}
        {showReturn && (
          <p className="detail-status-meta">Returns: <strong>{formatReturnDate(status.returnDate)}</strong></p>
        )}
        {status.updatedAt && (
          <p className="detail-last-updated">Last updated: {timeAgo(status.updatedAt)}</p>
        )}
      </section>

      {/* ── Contact ── */}
      <section className="detail-section">
        <h2 className="detail-section__title">Contact</h2>
        <div className="detail-contact-row">
          <IconPhone />
          <span>Ext. {contact.extension}</span>
        </div>
        <div className="detail-contact-row">
          <IconMail />
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
        </div>
        <div className="detail-contact-row">
          <IconPhone />
          <a href={`tel:${contact.phone}`}>{contact.phone}</a>
        </div>
        <div className="detail-contact-row">
          <IconDoor />
          <span>Room {academic.officeRoom}</span>
        </div>
      </section>

      {/* ── Subjects ── */}
      <section className="detail-section">
        <h2 className="detail-section__title">Subjects Taught</h2>
        <div className="detail-subjects">
          {academic.subjects.map((subj) => (
            <span key={subj} className="subject-tag">{subj}</span>
          ))}
        </div>
      </section>

      {/* ── Today's Schedule ── */}
      <section className="detail-section">
        <h2 className="detail-section__title">Today's Schedule</h2>
        {todaySlots.length > 0 ? (
          <div className="detail-schedule">
            {todaySlots.map((slot, i) => (
              <div key={i} className="schedule-slot">
                <span className="schedule-slot__time">{slot.time}</span>
                <div className="schedule-slot__info">
                  <span className="schedule-slot__subject">{slot.subject}</span>
                  <span className="schedule-slot__meta">{slot.room} · {slot.group}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="detail-empty-schedule">No classes scheduled today</p>
        )}
      </section>
    </div>
  )
}
