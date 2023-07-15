import React, { useEffect, useState, useCallback } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const EventGenresChart = ({ events }) => {
	const [data, setData] = useState([]);
    const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'Angular'];

	const getData = useCallback(() => {

		const data = genres.map((genre) => {
			const value = events.filter(({ summary }) => summary.split(" ").includes(genre)).length;
			return { genre, value };
		});
		return data;
	}, [events]);

	useEffect(() => {
		setData(getData());
	}, [getData]);

	const color = ["#003f5c", "#ffa600", "#bc5090", "#43b0f1", "#ff6361"];

	return (
		<ResponsiveContainer width='99%' height={400}>
			<PieChart>
				<Pie
					data={data}
					cx={200}
					cy={200}
					labelLine={false}
					outerRadius={80}
					fill="#8884d8"
					dataKey="value"
					label={({ genre, percent }) => `${genre} ${(percent * 100).toFixed(0)}%`}>
					{data.map((entry, index) => (        //entry per color
						<Cell key={`cell-${index}`} fill={color[index % color.length]} />
					))}
				</Pie>
			</PieChart>
		</ResponsiveContainer>
	);
};

export default EventGenresChart;