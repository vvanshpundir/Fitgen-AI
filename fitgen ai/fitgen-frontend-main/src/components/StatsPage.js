// StatsPage.js
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", streak: 10, daysActive: 15 },
  { name: "Feb", streak: 5, daysActive: 20 },
  { name: "Mar", streak: 12, daysActive: 22 },
  { name: "Apr", streak: 8, daysActive: 18 },
  { name: "May", streak: 15, daysActive: 25 },
  { name: "Jun", streak: 10, daysActive: 20 },
];

const StatsPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h2 className="text-3xl font-bold mb-8">Stats Page</h2>
      <div className="w-full max-w-4xl">
        <h3 className="text-2xl font-bold mb-4">Monthly Activity</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <XAxis dataKey="name" stroke="#ffffff" />
            <YAxis stroke="#ffffff" />
            <Tooltip />
            <CartesianGrid stroke="#ccc" />
            <Line type="monotone" dataKey="daysActive" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="w-full max-w-4xl mt-8">
        <h3 className="text-2xl font-bold mb-4">Workout Streak</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <XAxis dataKey="name" stroke="#ffffff" />
            <YAxis stroke="#ffffff" />
            <Tooltip />
            <CartesianGrid stroke="#ccc" />
            <Line type="monotone" dataKey="streak" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StatsPage;
