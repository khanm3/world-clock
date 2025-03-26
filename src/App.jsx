import { useState, useEffect } from "react"
import { DateTime, Settings } from "luxon"
import { getCountryForTimezone } from "countries-and-timezones"
import Clock from "./Clock"
import ComboBox from "./ComboBox"
import logo from "./assets/logo.png"
import { zoneOptions } from "./zones"

export default function App() {
  const localZone = zoneOptions.find(opt => opt.value === Intl.DateTimeFormat().resolvedOptions().timeZone)

  // State values
  const [dateTime, setDateTime] = useState(() => DateTime.now())
  const [zones, setZones] = useState([localZone]) // contains { value, label }
  const [selectedZone, setSelectedZone] = useState(localZone.value) // contains value

  // Derived values
  const dtSelectedZone = dateTime.setZone(selectedZone)
  const timeWithSeconds = dtSelectedZone.toLocaleString(DateTime.TIME_24_WITH_SECONDS)
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
          <time className="main-clock">
            {timeWithSeconds}
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
                Current time
              </span>
              <div className="format-switcher">
                12h | 24h
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
