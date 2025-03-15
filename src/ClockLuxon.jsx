import { useState, useEffect, useRef } from "react"
import { DateTime, Settings } from "luxon";



export default function ClockLuxon({ tz }) {
    const dtRef = useRef(DateTime.local({ zone: tz }))
    const [dt, setDt] = useState(dtRef.current)
    // console.log(tz)

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

    // returns offset in minutes
    function getOffsetFromLocalZone() {
        const local = Settings.defaultZone
        const current = dt.zone

        const localOffset = local.offset(dt.toMillis())
        const currentOffset = current.offset(dt.toMillis())

        return currentOffset - localOffset
    }

    const offset = getOffsetFromLocalZone()
    const caption = getOffsetFromLocalZone() === 0
        ? "Current time zone"
        : `${offset / 60} hours ${offset < 0 ? "behind" : "ahead"}`

    return (
        <div>
            <div className="clock-face">
                <span className="time">{dt.toLocaleString(DateTime.TIME_SIMPLE)}</span>
                <br/>
                <span className="zone">{dt.zoneName}</span>
                <br />
                <span className="date">{dt.toLocaleString(DateTime.DATE_HUGE)}</span>
                <br />
            </div>
            <div className="clock-caption">
                {caption}
            </div>
        </div>
    )
}
