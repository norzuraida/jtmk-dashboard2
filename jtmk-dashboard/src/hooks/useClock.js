import { useState, useEffect } from 'react'

function getTimeString() {
  const now = new Date()
  const h = String(now.getHours()).padStart(2, '0')
  const m = String(now.getMinutes()).padStart(2, '0')
  return `${h}:${m}`
}

export default function useClock() {
  const [time, setTime] = useState(getTimeString)

  useEffect(() => {
    // Align the first tick to the next whole minute
    const now = new Date()
    const msUntilNextMinute = (60 - now.getSeconds()) * 1000 - now.getMilliseconds()

    const timeout = setTimeout(() => {
      setTime(getTimeString())
      const interval = setInterval(() => {
        setTime(getTimeString())
      }, 60_000)
      return () => clearInterval(interval)
    }, msUntilNextMinute)

    return () => clearTimeout(timeout)
  }, [])

  return time
}
