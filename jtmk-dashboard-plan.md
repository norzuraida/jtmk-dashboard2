# JTMK Lecturer Availability Dashboard — Plan

## Overview

Build a brand-new mobile-first, read-only web dashboard for the JTMK (Jabatan Teknologi Maklumat & Komunikasi) department. The app shows all lecturers and their current availability status (Available, In Class, Outstation, On Leave) along with their location, contact details, and daily schedule.

**Stack:** React + Vite + plain CSS (no UI library)
**Data source:** Static `lecturers.json` file (no backend)
**Scope:** Read-only dashboard — no admin/edit features in this phase
**Target:** Mobile screens (375px–430px), responsive up to desktop

---

## Architecture

```
jtmk-dashboard/
├── public/
│   └── assets/photos/         ← placeholder avatar images
├── src/
│   ├── data/
│   │   └── lecturers.json     ← single source of truth
│   ├── components/
│   │   ├── BottomNav.jsx
│   │   ├── TopHeader.jsx
│   │   ├── StatsSummary.jsx
│   │   ├── FilterBar.jsx
│   │   ├── LecturerCard.jsx
│   │   ├── StatusBadge.jsx
│   │   └── SkeletonCard.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Lecturers.jsx
│   │   ├── Schedule.jsx
│   │   └── Announcements.jsx
│   ├── hooks/
│   │   └── useClock.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
└── package.json
```

---

## Sub-Tasks

---

### Sub-Task 1 — Project Scaffold

**Intent:** Create the `jtmk-dashboard` project folder with Vite + React, install dependencies, and set up the base file structure and global CSS variables.

**Expected Outcomes:**
- `jtmk-dashboard/` folder exists inside the playground
- `npm run dev` starts without errors
- Global CSS variables for JTMK navy (`#003366`) and gold (`#C9A84C`) are defined
- Base reset/font styles applied
- Folder structure matches the architecture above

**Todo List:**
1. Scaffold a new Vite + React project in `jtmk-dashboard/`
2. Remove boilerplate (App.css, logo, counter demo)
3. Create folder structure: `src/data`, `src/components`, `src/pages`, `src/hooks`
4. Define CSS custom properties in `index.css` (colors, font, spacing, status colors)
5. Add a basic `App.jsx` with placeholder text to confirm dev server works

**Relevant Context:**
- No UI libraries — plain CSS only
- Color theme: primary `#003366` (navy), accent `#C9A84C` (gold)
- Status colors: available=`#22c55e`, in_class=`#3b82f6`, outstation=`#f59e0b`, on_leave=`#ef4444`

**Status:** [x] done

---

### Sub-Task 2 — Lecturer Data File

**Intent:** Create the `lecturers.json` data file with 10 realistic JTMK sample lecturers covering all four statuses and a variety of academic ranks, subjects, and schedules.

**Expected Outcomes:**
- `src/data/lecturers.json` exists with 10 lecturer entries
- All four status values are represented: `available`, `in_class`, `outstation`, `on_leave`
- Each lecturer has: `id`, `personal` (title, name, photo, gender), `academic` (rank, specialization, subjects, officeRoom), `contact` (extension, email, phone), `status` (current, location, detail, availableFrom, returnDate, updatedAt), `schedule` array
- Data is realistic for a Malaysian polytechnic ICT department

**Todo List:**
1. Create `src/data/lecturers.json` using the agreed schema
2. Add 10 lecturers with varied statuses (3 available, 3 in_class, 2 outstation, 2 on_leave)
3. Include realistic Malaysian names with appropriate titles (Dr., Ts., En., Pn.)
4. Add a `department` metadata block at the top (name, short, institution, theme)
5. Add placeholder photo paths pointing to `/assets/photos/lecXXX.jpg`

**Relevant Context:**
- Schema agreed in planning chat — see the full JSON example discussed earlier
- Titles used in Malaysian academia: Dr., Prof., Ts. (Technologist), En. (Encik), Pn. (Puan)
- Subjects should reflect real ICT topics: Networking, AI, Web Tech, Cybersecurity, IoT, etc.

**Status:** [x] done

---

### Sub-Task 3 — Bottom Tab Navigation + App Shell

**Intent:** Build the persistent app shell: a top header bar and a bottom tab navigation that switches between the four main pages (Home, Lecturers, Schedule, Announcements).

**Expected Outcomes:**
- `BottomNav.jsx` renders 4 tabs with icons and labels: Home, Lecturers, Schedule, Announcements
- Active tab is highlighted in JTMK gold
- `TopHeader.jsx` shows the JTMK logo/name, page title, and a live clock
- `App.jsx` renders the shell with page routing via React state (no router library needed)
- Tapping a tab switches the visible page

**Todo List:**
1. Create `TopHeader.jsx` — shows department name + current page title + live time via `useClock.js`
2. Create `useClock.js` hook — returns current time string, updates every minute
3. Create `BottomNav.jsx` — 4 tabs with SVG icons, active state styling
4. Wire `App.jsx` to manage `activePage` state, render correct page component
5. Style shell in CSS: fixed top header, fixed bottom nav, scrollable middle content area

**Relevant Context:**
- No React Router — use simple `useState` for active page switching
- Bottom nav must be fixed so it stays visible while scrolling
- Content area needs `padding-bottom` to avoid overlap with bottom nav

**Status:** [x] done

---

### Sub-Task 4 — Home Page

**Intent:** Build the main Home screen with a search bar, 2×2 stats summary grid, horizontal status filter chips, and a vertically scrollable list of lecturer cards.

**Expected Outcomes:**
- Search input filters lecturer cards by name in real time
- 2×2 stats grid shows live counts: Available, In Class, Outstation, On Leave
- Filter chips let the user show only lecturers of a selected status
- Lecturer cards show: photo/avatar, title + name, rank, status badge, location
- Skeleton cards show while data is "loading" (simulated 1-second delay)

**Todo List:**
1. Create `StatsSummary.jsx` — 2×2 grid of stat tiles, each with count + label + status color
2. Create `FilterBar.jsx` — horizontal scrollable row of filter chips (All + 4 statuses)
3. Create `StatusBadge.jsx` — colored pill with status label; pulsing dot for `available`
4. Create `LecturerCard.jsx` — card with avatar, name, rank, status badge, location, available-from time
5. Create `SkeletonCard.jsx` — animated grey placeholder card
6. Build `Home.jsx` — combines search bar, stats, filter bar, and card list with simulated loading

**Relevant Context:**
- Filter and search should work together (both applied simultaneously)
- Avatar fallback: use initials in a colored circle if photo is missing
- Pulsing green dot animation using CSS `@keyframes`
- Stats counts must react to data (derived from `lecturers.json`)

**Status:** [x] done

---

### Sub-Task 5 — Lecturer Detail Screen

**Intent:** When a lecturer card is tapped, show a full-screen detail view with their complete profile, status, contact information, subject tags, and today's schedule.

**Expected Outcomes:**
- Tapping a card opens a detail screen (slides in from right or fades in)
- Detail screen shows: large avatar, full name + title, rank, status badge, location/detail
- Contact section: extension, email (tap to open mail), phone (tap to call)
- Subject tags displayed as styled chips
- Today's schedule listed as time-slot rows (filtered to current day)
- Back button returns to the previous page
- "Last updated" timestamp shown at the bottom

**Todo List:**
1. Add `selectedLecturer` state to `App.jsx` — when set, renders detail screen over current page
2. Create `LecturerDetail.jsx` page with all sections: hero, status, contact, subjects, schedule
3. Style large circular avatar with initial fallback
4. Filter schedule to show only today's slots; show "No classes today" if empty
5. Add tap-to-call (`tel:`) and tap-to-email (`mailto:`) links
6. Add slide-in or fade-in CSS transition when detail screen appears

**Relevant Context:**
- `selectedLecturer` is passed from `Home.jsx` (and later `Lecturers.jsx`) up to `App.jsx`
- Day matching: use `new Date().toLocaleDateString('en-US', { weekday: 'long' })` to get current day name
- Return date should only show for `outstation` and `on_leave` statuses

**Status:** [x] done

---

### Sub-Task 6 — Lecturers Page and Schedule Page

**Intent:** Build the "All Lecturers" list page (compact rows, sortable) and the "Schedule" page (date-scrollable timetable view).

**Expected Outcomes:**
- `Lecturers.jsx` shows all lecturers as compact list rows with sort chips (Name, Status, Rank)
- Tapping a row opens the same `LecturerDetail` screen
- `Schedule.jsx` shows a horizontal date scroller (today ± 3 days) and time-slotted class blocks for the selected day
- Each schedule block shows: lecturer name, subject, room, group

**Todo List:**
1. Create `Lecturers.jsx` — compact list rows, sort chips (Name A–Z, Status, Rank)
2. Implement sort logic for each sort option
3. Create `Schedule.jsx` — date scroller at top, timetable below grouped by time slot
4. Build schedule data by aggregating all lecturers' schedule arrays for the selected day
5. Style schedule blocks with lecturer's status color as left border accent

**Relevant Context:**
- Lecturers with empty `schedule: []` (outstation/leave) are excluded from Schedule page
- Date scroller: show 7 days (today + next 6), highlight selected day
- Schedule page reads `schedule` arrays from all lecturers in `lecturers.json`

**Status:** [x] done

---

### Sub-Task 7 — Announcements Page + Dark Mode

**Intent:** Build a simple Announcements placeholder page and add a system-aware dark mode toggle to the top header.

**Expected Outcomes:**
- `Announcements.jsx` renders a static list of 3–4 sample department announcements with title, date, and body text
- Dark mode toggle in `TopHeader` switches the entire app between light and dark themes
- Dark mode respects `prefers-color-scheme` on first load
- All pages look correct in both light and dark mode

**Todo List:**
1. Create `Announcements.jsx` with 3–4 hardcoded sample announcements (cards with title, date, body)
2. Add dark mode CSS variables as overrides under `[data-theme="dark"]` selector
3. Add `useDarkMode.js` hook — reads `prefers-color-scheme`, persists choice in `localStorage`
4. Add moon/sun icon toggle button to `TopHeader.jsx`
5. Apply `data-theme` attribute to `document.documentElement` on toggle
6. Review all components for correct color variable usage in dark mode

**Relevant Context:**
- Use CSS variables throughout so dark mode only requires overriding the variable values
- Dark mode background: `#0f172a`, surface: `#1e293b`, text: `#f1f5f9`
- Persist user's dark mode preference in `localStorage` key `jtmk-theme`

**Status:** [x] done

---

### Sub-Task 8 — Polish, Responsive Tweaks, and Final Review

**Intent:** Apply final visual polish, ensure the layout works well across screen sizes (375px to 1024px+), and verify all interactions work correctly end-to-end.

**Expected Outcomes:**
- All pages look clean and consistent on 375px, 430px, and 768px+ screens
- Hover effects on cards (desktop)
- Smooth transitions between pages and on card tap
- No broken layouts, missing data, or console errors
- `npm run build` completes without errors

**Todo List:**
1. Add card hover lift effect (box-shadow transition) for desktop users
2. Add fade-in animation on page mount for all pages
3. Test all filter + search combinations on Home page
4. Test Schedule page date switching and empty states
5. Test detail screen for all 4 status types
6. Check dark mode on all pages
7. Run `npm run build` and fix any errors

**Relevant Context:**
- Responsive breakpoint: at 768px+, show a 2-column card grid instead of single column
- At 1024px+, the bottom nav can optionally become a left sidebar (stretch goal)

**Status:** [x] done

---

## Implementation Notes

- All data lives in `src/data/lecturers.json` — no API calls
- No React Router — page switching via `useState` in `App.jsx`
- No UI component library — plain CSS with custom properties
- Photos use a colored-initial avatar fallback (no broken image icons)
- Sub-tasks must be implemented in order (1 → 8) as each builds on the previous
