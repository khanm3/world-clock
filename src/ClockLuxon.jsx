import { useState, useEffect } from "react"
import { DateTime, Settings } from "luxon";

export default function ClockLuxon({ tz }) {
    const [dt, setDt] = useState(DateTime.local({ zone: tz }))
    // console.log(tz)

    useEffect(() => {
        const intervalId = setInterval(() => {
            setDt(DateTime.local({ zone: tz }))
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
