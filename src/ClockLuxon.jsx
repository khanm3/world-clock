import { DateTime } from "luxon";

export default function ClockLuxon({ tz }) {
    const dt = DateTime.local({ zone: tz })
    console.log(dt)
    return (
        <div className="clock-face">
            <span className="time">{dt.toLocaleString(DateTime.TIME_SIMPLE)}</span>
            <br/>
            <span className="zone">{dt.zoneName}</span>
            <br />
            <span className="date">{dt.toLocaleString(DateTime.DATE_HUGE)}</span>
        </div>
    )
}
