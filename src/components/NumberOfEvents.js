import { useState } from "react";
import App from "../App";

const NumberOfEvents = ({ currentNOE, setCurrentNOE }) => {

  const [number, setNumber] = useState(32);

  const handleInputChanged = (event) => {
    const value = event.target.value;
    setNumber(value);
  }      

  return (
    <div id="number-of-events">
      <label htmlFor="number-of-events-input">number of events: </label>
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