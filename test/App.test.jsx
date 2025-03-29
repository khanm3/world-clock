import { getAllByRole, render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { test, expect } from "vitest"
import App from "../src/App"

function setup(jsx) {
    const user = userEvent.setup()
    const renderResult = render(jsx)
    const search = screen.getByRole("combobox")
    return { user, search, ...renderResult }
}

test("displays logo text", () => {
    render(<App />)
    expect(screen.getByText("WorldClocks")).toBeInTheDocument()
})

test("search bar clears after selection", async () => {
    const { user, search } = setup(<App />)
    await user.type(search, "London")
    await user.keyboard("{Enter}")
    expect(search).toHaveValue("")
})

test("clock widgets obey 12H format", async () => {
    const { user, search } = setup(<App />)

    const button12h = screen.getByRole("button", {name: "12h"})
    user.click(button12h)

    await user.type(search, "London")
    await user.keyboard("{Enter}")
    await user.type(search, "Paris")
    await user.keyboard("{Enter}")

    const clockWidgets = screen.getAllByTestId("clock-face")
    clockWidgets.forEach(cw => expect(cw).toHaveTextContent(/AM|PM/i))
})
