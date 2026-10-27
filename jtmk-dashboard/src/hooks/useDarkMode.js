import { useState, useEffect } from 'react'

function getInitialDark() {
  const stored = localStorage.getItem('jtmk-theme')
  if (stored !== null) return stored === 'dark'
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

export default function useDarkMode() {
  const [isDark, setIsDark] = useState(getInitialDark)

  // Apply theme attribute on mount and whenever isDark changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
  }, [isDark])

  function toggleDark() {
    setIsDark((prev) => {
      const next = !prev
      localStorage.setItem('jtmk-theme', next ? 'dark' : 'light')
      return next
    })
  }

  return [isDark, toggleDark]
}
