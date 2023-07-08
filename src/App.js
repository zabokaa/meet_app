import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import { Component, useEffect, useState } from 'react';
import { extractLocations, getEvents } from './api';

import './App.css';

const App = () => {
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);  //1 of the requirements
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState("see all cities")

  useEffect(() => {
    fetchData();
  }, [currentCity, currentNOE]);

  const fetchData = async () => {
    const allEvents = await getEvents();
    const filteredEvents = currentCity === "see all cities" ?
      allEvents :
      allEvents.filter(event => event.location === currentCity)
    setEvents(filteredEvents.slice(0, currentNOE));
    setAllLocations(extractLocations(allEvents));


  }

  return (
    <div className="App">
      <CitySearch allLocations={allLocations} setCurrentCity={setCurrentCity} onSearchResult={(value)=>{
        setCurrentCity(value);}
      }></CitySearch>
      <NumberOfEvents onNumberChanged={
        (value)=>{
        console.log('value received from numberof events Component', value );
        setCurrentNOE(value);
       }} />
      <EventList events={events} />
    </div>
  );
}

export default App;