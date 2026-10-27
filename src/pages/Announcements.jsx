const ANNOUNCEMENTS = [
  {
    id: 'ann-001',
    title: 'Mid-Semester Test Schedule Released',
    date: '2025-06-10',
    body:
      'The mid-semester test schedule for all programmes under JTMK has been published on the department notice board and the student portal. Students are advised to check their respective timetables and report any clashes to the Programme Coordinator by 13 June 2025. Attendance during the test period is compulsory.',
    tag: 'Academic',
  },
  {
    id: 'ann-002',
    title: 'JTMK Industry Day 2025',
    date: '2025-07-03',
    body:
      'JTMK will host its annual Industry Day on 3 July 2025 at Dewan Sri Poli, featuring presentations and booths from over 20 technology companies. Final-semester students are strongly encouraged to attend for networking and career opportunities. Registration is open via the student portal until 27 June 2025.',
    tag: 'Event',
  },
  {
    id: 'ann-003',
    title: 'Lab K2 Maintenance — Temporary Closure',
    date: '2025-06-18',
    body:
      'Computer Lab K2 will be closed from 18–20 June 2025 for scheduled electrical maintenance and workstation upgrades. Classes originally assigned to Lab K2 during this period have been relocated to Lab K4. Lecturers affected have been notified individually.',
    tag: 'Notice',
  },
  {
    id: 'ann-004',
    title: 'Public Holiday: Hari Raya Aidilfitri',
    date: '2025-03-31',
    body:
      'The department wishes all Muslim students, staff, and families Selamat Hari Raya Aidilfitri. The institution will be closed on 31 March and 1 April 2025 in observance of the public holiday. Normal operations resume on 2 April 2025.',
    tag: 'Holiday',
  },
]

const TAG_LABELS = {
  Academic: 'Academic',
  Event: 'Event',
  Notice: 'Notice',
  Holiday: 'Holiday',
}

function formatDate(isoDate) {
  const d = new Date(isoDate)
  return d.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

export default function Announcements() {
  return (
    <div className="announcements-page">
      <div className="announcements-header">
        <h1 className="announcements-header__title">
          Announcements
          <span className="announcements-header__badge">
            {ANNOUNCEMENTS.length}
          </span>
        </h1>
      </div>

      <ul className="announcement-list">
        {ANNOUNCEMENTS.map((item) => (
          <li key={item.id} className="announcement-card">
            <span
              className={`announcement-tag announcement-tag--${item.tag.toLowerCase()}`}
            >
              {TAG_LABELS[item.tag]}
            </span>
            <p className="announcement-title">{item.title}</p>
            <p className="announcement-date">{formatDate(item.date)}</p>
            <p className="announcement-body">{item.body}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
