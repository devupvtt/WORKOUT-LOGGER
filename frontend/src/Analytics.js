import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

function Analytics({ workouts }) {

  const data = workouts.map(w => ({
    date: w.date,
    weight: w.weight
  }));

  return (
    <div>
      <h2>📊 Progress Chart</h2>

      <LineChart width={300} height={200} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="weight" stroke="#00ffcc" />
      </LineChart>
    </div>
  );
}

export default Analytics;