import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App"
import AppLuxon from "./AppLuxon"

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <AppLuxon />
    </StrictMode>
)
