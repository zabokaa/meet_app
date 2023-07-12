import { useState } from "react";

const NumberOfEvents = ( {onNumberChanged, setErrorAlert} ) => {

  const [number, setNumber] = useState(32);

  const handleInputChanged = (event) => {
    const value = event.target.value;
    setNumber(value);

    onNumberChanged(value);
      if (isNaN(value) || value <= 0 || value > 32) {
        setErrorAlert("please enter a number between 1 and 32.");
      } else {
        setErrorAlert("");
      }    
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