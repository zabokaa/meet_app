import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import { useEffect, useState } from 'react';
import { extractLocations, getEvents } from './api';
import { InfoAlert, ErrorAlert, WarningAlert } from './components/Alert';
import './App.css';

const App = () => {
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);  //1 of the requirements
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState("see all cities");
  const [infoAlert, setInfoAlert] = useState("");
  const [errorAlert, setErrorAlert] = useState("");
  const [warningAlert, setWarningAlert] = useState("");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (navigator.onLine) {
      setWarningAlert(""); // Empty string when online
    } else {
      setWarningAlert("you are currently offline"); // alertText when offline
    }
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
      <div className='alerts-container'>        
        {infoAlert.length ? <InfoAlert text={infoAlert}/> : null} 
        {errorAlert.length ? <ErrorAlert text={errorAlert}/> : null} 
        {warningAlert.length ? <WarningAlert text={warningAlert} /> : null}
      </div>
      <CitySearch allLocations={allLocations} setCurrentCity={setCurrentCity} setInfoAlert={setInfoAlert} onSearchResult={(value)=>{
        setCurrentCity(value);
      }} />
      <NumberOfEvents setErrorAlert={setErrorAlert} onNumberChanged={
        (value)=>{
        console.log('value received from number of events Component', value );
        setCurrentNOE(value);
       }} />
      <EventList events={events} />
    </div>
  );
}

export default App;