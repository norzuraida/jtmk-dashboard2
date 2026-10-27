import { useState, useEffect } from 'react'
import data from '../data/lecturers.json'
import StatsSummary from '../components/StatsSummary'
import FilterBar from '../components/FilterBar'
import LecturerCard from '../components/LecturerCard'
import SkeletonCard from '../components/SkeletonCard'

const ALL_LECTURERS = data.lecturers

export default function Home({ onSelectLecturer }) {
  const [query, setQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const filtered = ALL_LECTURERS.filter((l) => {
    const fullName = `${l.personal.title} ${l.personal.name}`.toLowerCase()
    const matchesSearch = fullName.includes(query.toLowerCase())
    const matchesFilter = activeFilter === null || l.status.current === activeFilter
    return matchesSearch && matchesFilter
  })

  return (
    <div className="home-page">
      {/* Sticky search bar */}
      <div className="search-bar-wrapper">
        <div className="search-bar">
          <svg className="search-bar__icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            className="search-bar__input"
            type="search"
            placeholder="Search lecturer…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search lecturer"
          />
        </div>
      </div>

      <div className="home-page__inner">
        {/* Stats grid */}
        <StatsSummary lecturers={ALL_LECTURERS} />

        {/* Filter chips */}
        <FilterBar activeFilter={activeFilter} onFilter={setActiveFilter} />

        {/* Card list */}
        {isLoading ? (
          <div className="card-list">
            {Array.from({ length: 4 }, (_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : filtered.length > 0 ? (
          <div className="card-list">
            {filtered.map((l) => (
              <LecturerCard
                key={l.id}
                lecturer={l}
                onSelect={onSelectLecturer}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <p>No lecturers found</p>
            <p className="empty-state__sub">Try adjusting your search or filter</p>
          </div>
        )}
      </div>
    </div>
  )
}
