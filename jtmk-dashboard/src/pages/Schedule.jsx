import { useState } from 'react'
import lecturersData from '../data/lecturers.json'

// ── Status colour map for left-border accent ───────────────────────────────
const STATUS_COLOR = {
  available:  '#22c55e',
  in_class:   '#3b82f6',
  outstation: '#f59e0b',
  on_leave:   '#ef4444',
}

// ── Build 7-day window starting from today ─────────────────────────────────
function buildDays() {
  const days = []
  const today = new Date()
  const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  for (let i = 0; i < 7; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() + i)
    days.push({
      index: i,
      shortDay: DAY_NAMES[d.getDay()],
      dateNum: d.getDate(),
      fullDay: d.toLocaleDateString('en-US', { weekday: 'long' }), // "Monday" etc.
    })
  }
  return days
}

// ── Aggregate all lecturers' slots for a given full-day-name ──────────────
function getScheduleForDay(dayFullName) {
  const slots = []
  for (const lecturer of lecturersData.lecturers) {
    const dayEntry = lecturer.schedule.find(s => s.day === dayFullName)
    if (!dayEntry) continue
    for (const slot of dayEntry.slots) {
      slots.push({
        time: slot.time,
        subject: slot.subject,
        room: slot.room,
        group: slot.group,
        lecturerTitle: lecturer.personal.title,
        lecturerName: lecturer.personal.name,
        lecturerStatus: lecturer.status.current,
      })
    }
  }
  // Sort by start time (first 2 digits)
  slots.sort((a, b) => {
    const timeA = parseInt(a.time.replace(/\D.*/, ''), 10)
    const timeB = parseInt(b.time.replace(/\D.*/, ''), 10)
    return timeA - timeB
  })
  return slots
}

// ── Main component ─────────────────────────────────────────────────────────
export default function Schedule() {
  const days = buildDays()
  const [selectedDay, setSelectedDay] = useState(0)

  const chosenDay = days[selectedDay]
  const slots = getScheduleForDay(chosenDay.fullDay)

  return (
    <div className="schedule-page">
      {/* Date scroller */}
      <div className="schedule-header">
        <div className="date-scroller" role="group" aria-label="Select day">
          {days.map((day) => (
            <button
              key={day.index}
              className={`date-item${day.index === selectedDay ? ' date-item--active' : ''}`}
              onClick={() => setSelectedDay(day.index)}
              aria-pressed={day.index === selectedDay}
            >
              <span className="date-item__day">{day.shortDay}</span>
              <span className="date-item__num">{day.dateNum}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Class count */}
      <p className="schedule-count">
        {slots.length === 0
          ? 'No classes scheduled'
          : `${slots.length} ${slots.length === 1 ? 'Class' : 'Classes'} — ${chosenDay.fullDay}`}
      </p>

      {/* Timetable */}
      {slots.length === 0 ? (
        <div className="schedule-empty">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
            aria-hidden="true">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <p>No classes on {chosenDay.fullDay}</p>
        </div>
      ) : (
        <ul className="schedule-list" role="list">
          {slots.map((slot, i) => (
            <li key={i}>
              <div
                className="schedule-block"
                style={{ borderLeftColor: STATUS_COLOR[slot.lecturerStatus] ?? '#003366' }}
              >
                <div className="schedule-block__time">{slot.time}</div>
                <div className="schedule-block__body">
                  <p className="schedule-block__subject">{slot.subject}</p>
                  <p className="schedule-block__lecturer">
                    {slot.lecturerTitle} {slot.lecturerName}
                  </p>
                  <p className="schedule-block__meta">
                    {slot.room} · {slot.group}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
