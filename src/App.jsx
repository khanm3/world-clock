import { useState, useEffect } from "react"
import { DateTime, Settings } from "luxon"
import { getCountryForTimezone } from "countries-and-timezones"
import Clock from "./Clock"
import ComboBox from "./ComboBox"
import logo from "./assets/logo.png"
import { zoneOptions } from "./zones"
import { getOffsetFromLocalZone, getOffsetCaption } from "./utils"

export default function App() {
  const localZone = zoneOptions.find(opt => opt.value === Intl.DateTimeFormat().resolvedOptions().timeZone)

  // State values
  const [dateTime, setDateTime] = useState(() => DateTime.now())
  const [zones, setZones] = useState([localZone]) // contains { value, label }
  const [selectedZone, setSelectedZone] = useState(localZone.value) // contains value
  const [is12HFormat, setIs12HFormat] = useState(false)

  // Derived values
  const dtSelectedZone = dateTime.setZone(selectedZone)
  const time24H = dtSelectedZone.toLocaleString(DateTime.TIME_24_WITH_SECONDS)
  const time12H = dtSelectedZone.toLocaleString({...DateTime.TIME_WITH_SECONDS, hour: "2-digit", hour12: true})
  const time12HNumber = time12H.slice(0, time12H.length - 2)
  const time12HPeriod = time12H.slice(time12H.length - 2).toLowerCase()
  const dateHuge = dtSelectedZone.toLocaleString(DateTime.DATE_HUGE)
  const ianaZone = dtSelectedZone.zoneName
  const country = getCountryForTimezone(ianaZone).name
  const city = ianaZone.split("/")[1].replace("_", " ")

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDateTime(DateTime.now())
    }, 1000)

    console.log(ianaZone)
    console.log(country)
    console.log(city)

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  const offsetMinutes = getOffsetFromLocalZone(dtSelectedZone)
  const offsetCaption = getOffsetCaption(dtSelectedZone, offsetMinutes)

  const clockElems = zones.map(zone => (
    <Clock
      key={zone.value}
      tz={zone.value}
      selected={selectedZone === zone.value}
      select={() => setSelectedZone(zone.value)}
    />
  ))
  console.log(clockElems)

  return (
    <>
      <header>
        <a href="/" className="logo">
          <img src={logo}></img>
          <span className="logo-text">WorldClocks</span>
        </a>
      </header>
      <main>
          <time className={`main-clock-${is12HFormat ? "12h" : "24h"}`}>
            {is12HFormat ? time12HNumber : time24H}
            {is12HFormat &&
              <span className="main-clock-12h-period">
                {time12HPeriod}
              </span>
            }
          </time>

          <div className="main-container">
            <div className="main-clock-info-controls">
              <span>
                {city}, {country}
              </span>
              <span>
                {dateHuge}
              </span>
              <span>
                {offsetCaption}
              </span>
              <div className="time-format-switcher">
                <button
                  className={`btn-12h-${is12HFormat ? "selected" : "unselected"}`}
                  onClick={() => setIs12HFormat(true)}
                >12h</button>
                <button
                  className={`btn-24h-${is12HFormat ? "unselected" : "selected"}`}
                  onClick={() => setIs12HFormat(false)}
                >24h</button>
              </div>
            </div>

            <hr/>

            <ComboBox setSelectedOptions={setZones} />

            <div className="clock-container">
                {/* <Clock tz="America/New_York" />
                <Clock tz="Asia/Dhaka" /> */}
                {clockElems}
            </div>
          </div>
      </main>
    </>
  )
}
