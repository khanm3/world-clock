import { render, screen } from "@testing-library/react"
import { test, expect } from "vitest"
import App from "../src/App"

test("displays logo text", () => {
    render(<App />)
    expect(screen.getByText("WorldClocks")).toBeInTheDocument()
})
