import { useState, useEffect, useRef } from "react"
import { DateTime, Settings } from "luxon"
import { clsx } from "clsx"
import { getOffsetFromLocalZone, getOffsetCaption } from "./utils"


export default function Clock({ tz, selected, selectClock, is12HFormat }) {
    // State values
    const dtRef = useRef(DateTime.local({ zone: tz }))
    const [dt, setDt] = useState(dtRef.current)

    // Derived values
    const time12H = dt.toLocaleString({...DateTime.TIME_SIMPLE, time12H: true})
    const time24H = dt.toLocaleString(DateTime.TIME_24_SIMPLE)
    const city = dt.zoneName.split("/")[1].replace("_", " ")

    // Update state and trigger rerender only when minute changes
    useEffect(() => {
        const intervalId = setInterval(() => {
            const prevDt = dtRef.current
            dtRef.current = DateTime.local({ zone: tz })

            // update state when minute changes
            const minuteFormat = {minute: "numeric"}
            if (dtRef.current.toLocaleString(minuteFormat) !== prevDt.toLocaleString(minuteFormat)) {
                setDt(dtRef.current)
            }

        }, 1000)

        return () => {
            clearInterval(intervalId)
        }
    }, [])

    const offset = getOffsetFromLocalZone(dt)
    const caption = getOffsetCaption(dt, offset)

    return (
        <div className="clock-widget">
            <button
                className={clsx("clock-face", selected && "clock-face-selected")}
                onClick={selectClock}
                aria-label={city}
                data-testid="clock-face"
            >
                <span className="date">{dt.toLocaleString({weekday: "long", month: "long", day: "numeric"})}</span>
                <br />
                <span className="time">{is12HFormat ? time12H : time24H}</span>
                <br/>
                <span className="zone">{dt.zoneName}</span>

            </button>
            <span className="clock-caption">
                {caption}
            </span>
        </div>
    )
}
