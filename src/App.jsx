import Clock from "./Clock"

export default function App() {



  return (
    <>
      <header>
        <h1>Time Converter!</h1>
      </header>
      <main>
        <Clock timezone="America/New_York" />
        <br />
        <Clock timezone="Asia/Dhaka" />
      </main>
    </>
  )
}
