import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import { useEffect, useState } from 'react';
import { extractLocations, getEvents } from './api';

import './App.css';

const App = () => {
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);  //1 of the requirements
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState("see all cities")

  useEffect(() => {
    fetchData();
          {/* adding CurrentNOE */}
  }, [currentCity, currentNOE]);

  const fetchData = async () => {
          {/* adding CurrentNOE as parameter */}
    const allEvents = await getEvents(currentNOE);
    const filteredEvents = currentCity === "see all cities" ?
      allEvents :
      allEvents.filter(event => event.location === currentCity)
    setEvents(filteredEvents.slice(0, parseInt(currentNOE)));     //transforming string -> ineger
    setAllLocations(extractLocations(allEvents));
  }

  return (
    <div className="App">
      <CitySearch allLocations={allLocations} setCurrentCity={setCurrentCity} />
      {/* adding setCurrentNOE as prop */}
      <NumberOfEvents currentNOE={currentNOE} setCurrentNOE={setCurrentNOE} />  
      {/* for data-test id added from integration testin */}
      <EventList events={events} data-testid="event-list" />    
    </div>
  );
}

export default App;