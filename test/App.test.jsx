import { render, screen } from "@testing-library/react"
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

test("search bar doesn't insert duplicate time zones", async () => {
    const { user, search } = setup(<App />)

    await user.type(search, "London")
    await user.keyboard("{Enter}")

    const numClocksBefore = screen.getAllByTestId("clock-face")

    await user.type(search, "London")
    await user.keyboard("{Enter}")

    const numClocksAfter = screen.getAllByTestId("clock-face")

    expect(numClocksBefore).toEqual(numClocksAfter)
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

test("offset from NY to LA is -3h", async () => {
    const { user, search } = setup(<App localZone="America/New_York" />)
    await user.type(search, "Los Angeles")
    await user.keyboard("{Enter}")
    expect(screen.getByRole("button", {name: "Los Angeles"})).toHaveTextContent("-3h")
})

test("offset from NY to NY is +0h", () => {
    setup(<App localZone="America/New_York" />)
    expect(screen.getByRole("button", {name: "New York"})).toHaveTextContent("+0h")
})

test("offset from LA to NY is +3h", async () => {
    const { user, search } = setup(<App localZone="America/Los_Angeles" />)
    await user.type(search, "New York")
    await user.keyboard("{Enter}")
    expect(screen.getByRole("button", {name: "New York"})).toHaveTextContent("+3h")
})

// assumption: system time zone is America/New_York
test("New York default time format is 12h", async () => {
    setup(<App />)
    expect(screen.getByRole("button", {name: "New York"})).toHaveTextContent(/AM|PM/)
})

test("clicking close button removes clock", async () => {
    const { user, search } = setup(<App localZone="America/New_York" />)
    await user.type(search, "London")
    await user.keyboard("{Enter}")
    const clocksBeforeRemoval = screen.getAllByTestId("clock-face")
    const removeLondonBtn = screen.getByRole("button", {name: "Remove London"})
    await user.click(removeLondonBtn)
    const clocksAfterRemoval = screen.getAllByTestId("clock-face")
    expect(clocksBeforeRemoval.length).toEqual(clocksAfterRemoval.length + 1)
})
