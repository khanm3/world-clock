import { useState, useEffect } from "react"
import { DateTime, Settings } from "luxon"
import { getCountryForTimezone } from "countries-and-timezones"
import Clock from "./Clock"
import logo from "./assets/logo.png"

export default function App() {
  // State values
  const [dateTime, setDateTime] = useState(() => DateTime.now())

  // Derived values
  const timeWithSeconds = dateTime.toLocaleString(DateTime.TIME_24_WITH_SECONDS)
  const dateHuge = dateTime.toLocaleString(DateTime.DATE_HUGE)
  const ianaZone = dateTime.zoneName
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

  return (
    <>
      <header>
        <a href="/" className="logo">
          <img src={logo}></img>
          <span className="logo-text">WorldClocks</span>
        </a>
      </header>
      <main>
        {/* todo: add component for big clock display */}
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

            <div className="clock-container">
                <Clock tz="America/New_York" />
                <Clock tz="Asia/Dhaka" />
            </div>
          </div>
      </main>
    </>
  )
}
