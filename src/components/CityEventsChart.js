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
        const city = location.split((/, | - /))[0]      //to receive name of city
        return { city, count };     //same as {city: city, count: count}
      })
      return data;
    };
  
    // scatterchart from recharts
  return (
    <ResponsiveContainer width="99%" height={400}>
      <ScatterChart
        margin={{
          top: 20,
          right: 20,
          bottom: 80,
          left: 20,
        }}
      >
        <CartesianGrid />
        <XAxis type="category" dataKey="city" name="city" stroke="#BCDCDB" angle={60} interval={0} tick={{ dx: 20, dy: 40, fontSize: 14 }}/>
        <YAxis type="number" dataKey="count" name="no of events" allowDecimals={false} stroke="#BCDCDB" />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Scatter name="NOE by city" data={data} fill="#ff6361" />
      </ScatterChart>
    </ResponsiveContainer>
  );
}

export default CityEventsChart;