import { IANAZone } from "luxon"

// returns offset in minutes
export function getOffsetFromLocalZone(dt, localZone) {
    const local = new IANAZone(localZone)
    const current = dt.zone

    const localOffset = local.offset(dt.toMillis())
    const currentOffset = current.offset(dt.toMillis())

    return currentOffset - localOffset
}

export function getOffsetCaption(dt, offsetMinutes) {
    if (offsetMinutes === 0) {
        return "Current time"
    }
    //const nonLocalRegion = dt.zoneName.slice(dt.zoneName.indexOf("/") + 1)
    const offsetHours = offsetMinutes / 60
    const direction = offsetMinutes < 0 ? "behind" : "ahead"
    // return `${nonLocalRegion} is ${Math.abs(offsetHours)} hours ${direction}`
    return `${Math.abs(offsetHours)} hours ${direction}`
}
