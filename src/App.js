import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import CityEventsChart from './components/CityEventsChart';
import EventGenresChart from './components/EventGenresChart';
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


  useEffect(() => {
    if (navigator.onLine) {
      setWarningAlert(""); // Empty string when online
    } else {
      setWarningAlert("you are currently offline"); // alertText when offline
    }
    fetchData();
    // eslint-disable-next-line 
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
      {/* hier noch logo evtl  */}
      <h1>- MEET - app -</h1>
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
      <div className='charts-container'>
        <CityEventsChart allLocations={allLocations} events={events} />
        <EventGenresChart events={events} />
      </div>
      <div className="events-container">
        {events.map((event, index) => (
          <div className="event" key={index}>
            <EventList events={events} />
          </div>
        ))}
      </div>
    </div>

 
  );
}

export default App;