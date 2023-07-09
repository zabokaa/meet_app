import { useState } from "react";

const NumberOfEvents = ( {onNumberChanged} ) => {

  const [number, setNumber] = useState(32);

  const handleInputChanged = (event) => {
    const value = event.target.value;
    setNumber(value);
    onNumberChanged(value);
  }

  return (
    <div id="number-of-events">
      <label htmlFor="number-of-events-input">NUMBER OF EVENTS </label>
      <input
        type="text"
        id="number-of-events-input"
        className="number-of-events-input"
            placeholder="number of displayed events"
        value={number}
        onChange={handleInputChanged}
      />
    </div>
  );
}

export default NumberOfEvents;