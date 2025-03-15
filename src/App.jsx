import Clock from "./Clock"

export default function App() {
  return (
    <main>
        <div className="clock-container">
            <Clock tz="America/New_York" />
            <Clock tz="Asia/Dhaka" />
        </div>
    </main>
  )
}
