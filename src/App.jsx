import Clock from "./Clock"
import logo from "./assets/logo.png"

export default function App() {
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
            08:15:40
          </time>

          <div className="main-container">
            <div className="main-clock-info-controls">
              <span>
                New York, New York<br/>
                Current time
              </span>
              <span>
                Wednesday, March 19 2025<br/>
                Daytime ☀️
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
