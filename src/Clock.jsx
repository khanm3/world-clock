import { useState, useEffect, useRef } from "react"
import { DateTime, Settings } from "luxon"
import { clsx } from "clsx"
import { getOffsetFromLocalZone } from "./utils"
import closeButton from "./assets/close-button.png"


export default function Clock({
    tz, selected, selectClock, removeClock,
    localZone = Intl.DateTimeFormat().resolvedOptions().timeZone,
    is12HFormat = Boolean(Intl.DateTimeFormat([], { hour: "numeric" }).format(0).match(/AM|PM/i))
}) {
    // State values
    const dtRef = useRef(DateTime.local({ zone: tz }))
    const [dt, setDt] = useState(dtRef.current)

    // Derived values
    const time12H = dt.toLocaleString({...DateTime.TIME_SIMPLE, time12H: true})
    const time24H = dt.toLocaleString(DateTime.TIME_24_SIMPLE)
    const city = dt.zoneName.split("/")[1].replace("_", " ")
    const date = dt.toLocaleString({month: "long", day: "numeric"})

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

    function getOffsetString() {
        const offsetMinutes = getOffsetFromLocalZone(dt, localZone)
        const sign = offsetMinutes >= 0 ? "+" : "-"
        const offsetHours = Math.abs(offsetMinutes) / 60
        return `${sign}${offsetHours}h`
    }

    return (
            <div
                className={clsx("clock-face", selected && "clock-face-selected")}
                onClick={selectClock}
                role="button"
                tabindex="0"
                aria-label={city}
                data-testid="clock-face"
            >
                <span className="offset">{getOffsetString()}</span>
                <span className="zone">{city}</span>
                <hr />
                <span className="time">{is12HFormat ? time12H : time24H}</span>
                <span className="date">{date}</span>
                <button
                    className="close-button"
                    onClick={removeClock}
                    aria-label={`Remove ${city}`}
                >
                    <img className="close-button-img" src={closeButton} />
                </button>
            </div>
    )
}
