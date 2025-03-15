import { useState, useEffect, useRef } from "react"
import { DateTime, Settings } from "luxon";

export default function Clock({ tz }) {
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

    function getNonLocalCaption(offsetMinutes) {
        const nonLocalRegion = dt.zoneName.slice(dt.zoneName.indexOf("/") + 1)
        const offsetHours = offsetMinutes / 60
        const direction = offsetMinutes < 0 ? "behind" : "ahead"
        // return `${nonLocalRegion} is ${offsetHours} hours ${direction} of your current time zone!`
        return `${nonLocalRegion} is ${offsetHours} hours ${direction}`
    }

    const offset = getOffsetFromLocalZone()
    const caption = getOffsetFromLocalZone() === 0
        ? "Current time zone"
        : getNonLocalCaption(offset)

    return (
        <div>
            <div className="clock-face">
                <span className="date">{dt.toLocaleString({weekday: "long", month: "long", day: "numeric"})}</span>
                <br />
                <span className="time">{dt.toLocaleString(DateTime.TIME_SIMPLE)}</span>
                <br/>
                <span className="zone">{dt.zoneName}</span>

            </div>
            <span className="clock-caption">
                {caption}
            </span>
        </div>
    )
}
