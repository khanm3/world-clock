import { useState, useRef, useEffect } from "react"
import moment from "moment-timezone"

export default function Clock({ formatString = "MMMM Do YYYY, h:mm:ss a Z", timezone }) {
  const [timeString, setTimeString] = useState(() => moment().tz(timezone).format(formatString))
  // const [timeString, setTimeString] = useState("")
  const intervalId = useRef(null)

  useEffect(() => {
    intervalId.current = setInterval(() => {
      setTimeString(moment().tz(timezone).format(formatString))
    }, 1000)

    return () => {
      clearInterval(intervalId.current)
    }
  }, [])

  return (
    <div className="clock">
      {timezone}
      <br/>
      <time>{timeString}</time>
    </div>
  )
}
