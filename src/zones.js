import { getCountryForTimezone } from "countries-and-timezones"

export const zoneOptions = Intl.supportedValuesOf('timeZone').filter(ianaString =>
        ianaString.includes("Africa")
        || ianaString.includes("America")
        || ianaString.includes("Antarctica")
        || ianaString.includes("Asia")
        || ianaString.includes("Atlantic")
        || ianaString.includes("Australia")
        || ianaString.includes("Europe")
        || ianaString.includes("Indian")
        || ianaString.includes("Pacific")
    ).map(ianaString => {
        const city = ianaString.split("/")[1].replace("_", " ")
        const country = getCountryForTimezone(ianaString).name
        return { value: ianaString, label: `${city}, ${country}` }
    })
