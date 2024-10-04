import React, { useState, useEffect } from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const BodyCalculations = ({ height, waist, hip, weight, age, sex }) => {
  let gender = 1;
  if (sex == "female") {
    gender = 0;
    console.log("sex is female");
  }
  const bmi = weight / (height * height * 0.0254 * 0.0254);
  let VFA =
    (waist * 2.54) / (1.032 - 0.732 * bmi + 0.003 * bmi ** 2 + 0.204 * gender) -
    28.95 * Math.sqrt((hip * 2.54) / (waist * 2.54)) +
    2.85;
  if (VFA < 0) {
    VFA = -VFA;
  }
  const SMM = 0.244 * weight + 7.8 * height + 6.6 * 1 - 0.098 * age + 0 + 2.4;

  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        <Card sx={{ backgroundColor: "#201127" }}>
          {" "}
          {/* Adjusted background color */}
          <CardContent>
            <Typography sx={{ fontSize: 20, color: "white" }} gutterBottom>
              BMI
            </Typography>
            <Typography variant="h5" component="div" sx={{ color: "#4caf50" }}>
              {" "}
              {/* Green accent color */}
              {bmi.toFixed(2)}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ backgroundColor: "#201127" }}>
          {" "}
          {/* Consistent background color */}
          <CardContent>
            <Typography sx={{ fontSize: 20, color: "white" }} gutterBottom>
              Visceral Fat Area (cm x cm)
            </Typography>
            <Typography variant="h5" component="div" sx={{ color: "#2196f3" }}>
              {" "}
              {/* Blue accent color */}
              {VFA.toFixed(2)}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ backgroundColor: "#201127" }}>
          {" "}
          {/* Consistent background color */}
          <CardContent>
            <Typography sx={{ fontSize: 20, color: "white" }} gutterBottom>
              Skeletal Muscle Mass
            </Typography>
            <Typography variant="h5" component="div" sx={{ color: "#e91e63" }}>
              {" "}
              {/* Pink accent color */}
              {SMM.toFixed(2)}
            </Typography>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default BodyCalculations;
