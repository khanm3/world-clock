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
          <div className="clock-container">
              <Clock tz="America/New_York" />
              <Clock tz="Asia/Dhaka" />
          </div>
      </main>
    </>
  )
}
