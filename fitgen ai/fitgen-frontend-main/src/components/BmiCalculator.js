import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Sector, ResponsiveContainer } from "recharts";

const BmiCalculator = ({ height, weight }) => {
  const [bmi, setBmi] = useState(null);

  useEffect(() => {
    if (height > 0 && weight > 0) {
      const heightInMeters = height * 0.0254; // Convert height from inches to meters
      const bmiValue = weight / heightInMeters ** 2; // Calculate BMI
      setBmi(bmiValue);
    }
  }, [height, weight]);

  const RADIAN = Math.PI / 180;
  const bmiCategories = [
    { name: "Underweight", value: 18.5, fill: "#3D85C6" },
    { name: "Normal", value: 6.4, fill: "#96C356" },
    { name: "Overweight", value: 4.9, fill: "#F1C232" },
    { name: "Class I Obesity", value: 4.9, fill: "#E06666" },
    { name: "Class II Obesity", value: 15.3, fill: "#CC0000" }, // Adjust based on max expected BMI value
  ];

  // Data for the gauge chart
  const chartData = [
    { name: "BMI", value: bmi || 0 },
    { name: "Rest", value: 100 - (bmi || 0) },
  ];
  const pointerData = [{ value: 1 }];
  const calculatePointerAngle = (bmi) => {
    return bmi ? 180 - ((bmi - 18) * 180) / (40 - 18) : 0; // Adjust based on BMI scale 18 to 40
  };
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF8042"];

  const Needle = ({ cx, cy, midAngle }) => {
    const RADIAN = Math.PI / 180;
    // const NEEDLE_BASE_RADIUS_PX = 5; // Example value, you can set your own
    // const NEEDLE_LENGTH_PX = 100; // Example value, you can set your own
    // const NEEDLE_COLOR = "#d0d000"; // Example value, you can set your own

    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const needleBaseCenterX = cx;
    const needleBaseCenterY = cy;
    const xbb = needleBaseCenterX - NEEDLE_BASE_RADIUS_PX * sin;
    const ybb = needleBaseCenterY + NEEDLE_BASE_RADIUS_PX * cos;
    const xp = needleBaseCenterX + NEEDLE_LENGTH_PX * cos;

    return (
      <g>
        <circle
          cx={needleBaseCenterX}
          cy={needleBaseCenterY}
          r={NEEDLE_BASE_RADIUS_PX}
          fill={NEEDLE_COLOR}
          stroke="none"
        />
        <path
          d={`M${needleBaseCenterX},${needleBaseCenterY}L${xbb + 65},${
            ybb - 65
          },L${xp}`}
          strokeWidth={2}
          stroke={NEEDLE_COLOR}
          fill={NEEDLE_COLOR}
        />
      </g>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-gray-700 rounded">
      <div className="flex justify-between items-center w-full">
        {/* Left Chart: Standard Pie Chart */}
        <div className="w-1/2 p-2">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                dataKey="value"
                data={bmiCategories}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={90}
                fill="#8884d8"
                label={(entry) => `${entry.name} (${entry.value}%)`}
                paddingAngle={5}
              >
                {bmiCategories.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Right Chart: Gauge Chart */}
        <div className="w-1/2 p-2">
          <ResponsiveContainer width="100%" height={500}>
            <PieChart>
              <Pie dataKey="value">
                {bmiCategories.map((entry) => (
                  <Cell key={`cell-${entry.name}`} fill={entry.color} />
                ))}
              </Pie>
              <Pie
                dataKey="value"
                startAngle={180}
                endAngle={0}
                data={data}
                cx={cx}
                cy={cy}
                innerRadius={iR}
                outerRadius={oR}
                stroke="none"
                fill="none"
                activeIndex={1}
                activeShape={Needle}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* BMI Display */}
      {bmi && (
        <div className="text-xl font-bold text-white mt-4">
          Your BMI: {bmi.toFixed(1)}
        </div>
      )}
    </div>
  );
};

export default BmiCalculator;
