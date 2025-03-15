import { DateTime } from "luxon";

export default function ClockLuxon() {
    const dt = DateTime.now()
    console.log(dt)
    return (
        <div>
            <time>
                {dt.toLocaleString(DateTime.TIME_SIMPLE)}
                <br/>
                {dt.toLocaleString(DateTime.DATE_HUGE)}
            </time>
        </div>
    )
}
