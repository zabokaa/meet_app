import { useState, useEffect } from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis, YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const CityEventsChart = ({ allLocations, events }) => {
    const [data, setData] = useState([]);
    useEffect(() => {
        setData(getData());
    }, [`${events}`]);

    const getData = () => {
      const data = allLocations.map((location) => {
      const count = events.filter((event) => event.location === location).length
        const city = location.split(', ')[0]      //to receive name of city
        return { city, count };     //same as {city: city, count: count}
      })
      return data;
    };
  }

export default CityEventsChart;