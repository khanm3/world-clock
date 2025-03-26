import { useState } from "react"
import Select from "react-select"
import { zoneOptions } from "./zones"

export default function ComboBox({ setSelectedOptions }) {
    const [value, setValue] = useState(null)

    function handleChange(option) {
        setSelectedOptions(prev => prev.includes(option) ? prev : [...prev, option])
        // reset after selection
        setValue(null)
    }

    return (
        <Select
            classNames={{container: (_) => "search"}}
            options={zoneOptions}
            value={value}
            placeholder="Search for a city to add"
            onChange={handleChange}
        />
    )
}
