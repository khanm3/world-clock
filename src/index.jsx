import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App"
import AppLuxon from "./AppLuxon"
import './index.css'

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <AppLuxon />
    </StrictMode>
)
