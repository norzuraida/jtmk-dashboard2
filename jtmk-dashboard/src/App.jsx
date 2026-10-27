import { useState } from 'react'
import './index.css'

import TopHeader from './components/TopHeader'
import BottomNav from './components/BottomNav'
import Home from './pages/Home'
import Lecturers from './pages/Lecturers'
import Schedule from './pages/Schedule'
import Announcements from './pages/Announcements'
import LecturerDetail from './pages/LecturerDetail'

const PAGES = {
  home: Home,
  lecturers: Lecturers,
  schedule: Schedule,
  announcements: Announcements,
}

function App() {
  const [activePage, setActivePage] = useState('home')
  const [selectedLecturer, setSelectedLecturer] = useState(null)

  // When a lecturer is selected, show the detail screen instead of the normal shell
  if (selectedLecturer) {
    return (
      <LecturerDetail
        lecturer={selectedLecturer}
        onBack={() => setSelectedLecturer(null)}
      />
    )
  }

  const PageComponent = PAGES[activePage] ?? Home

  return (
    <>
      <TopHeader activePage={activePage} />
      <main className="content-area">
        <PageComponent
          onSelectLecturer={setSelectedLecturer}
        />
      </main>
      <BottomNav activePage={activePage} onNavigate={setActivePage} />
    </>
  )
}

export default App
