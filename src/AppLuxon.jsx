import ClockLuxon from "./ClockLuxon"

export default function AppLuxon() {
  return (
    <main>
        <div className="clock-container">
            <ClockLuxon tz="America/New_York" />
            <ClockLuxon tz="Asia/Dhaka" />
        </div>
    </main>
  )
}
