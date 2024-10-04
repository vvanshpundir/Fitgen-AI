import React, { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const VideoAnalysisPage = () => {
  const location = useLocation();
  const videoRef = useRef(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const parseAndSetResults = (outputString) => {
    const outputArray = outputString.trim().split("\n");
    if (outputArray.length !== 3) {
      setError("Invalid data format received from server.");
      return;
    }
    const numberOfReps = Math.round(parseFloat(outputArray[0]));
    const exerciseName = outputArray[1];
    const poseAccuracy = parseFloat(outputArray[2]).toFixed(2) + "%";
    setResult({ numberOfReps, exerciseName, poseAccuracy });
  };

  const uploadVideo = async () => {
    if (!location.state.video) {
      setError("No video file selected.");
      return;
    }

    setLoading(true);
    const videoFile = location.state.video;
    const formData = new FormData();
    formData.append("video", videoFile);

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/analyze_video/", // Django API URL assuming it's running locally on port 5000
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      parseAndSetResults(response.data.output);
      setError("");
    } catch (err) {
      console.error("API call failed:", err);
      setError("Failed to process video: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <main className="flex-grow p-6 px-8">
        <section className="bg-gray-800 p-6 rounded shadow-md text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Analyze Your Workout</h1>
          {loading ? (
            <>
              <h2 className="text-2xl font-bold">
                Analysing Video. Please Wait....
              </h2>
              <CircularProgress />
            </>
          ) : result !== null ? (
            <div className="grid grid-cols-3 gap-4">
              <Card sx={{ backgroundColor: "#201127" }}>
                {" "}
                {/* Adjusted background color */}
                <CardContent>
                  <Typography
                    sx={{ fontSize: 20, color: "white" }}
                    gutterBottom
                  >
                    Number of Repetitions
                  </Typography>
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{ color: "#4caf50" }}
                  >
                    {" "}
                    {/* Green accent color */}
                    {result.numberOfReps}
                  </Typography>
                </CardContent>
              </Card>
              <Card sx={{ backgroundColor: "#201127" }}>
                {" "}
                {/* Consistent background color */}
                <CardContent>
                  <Typography
                    sx={{ fontSize: 20, color: "white" }}
                    gutterBottom
                  >
                    Exercise Name
                  </Typography>
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{ color: "#2196f3" }}
                  >
                    {" "}
                    {/* Blue accent color */}
                    {result.exerciseName}
                  </Typography>
                </CardContent>
              </Card>
              <Card sx={{ backgroundColor: "#201127" }}>
                {" "}
                {/* Consistent background color */}
                <CardContent>
                  <Typography
                    sx={{ fontSize: 20, color: "white" }}
                    gutterBottom
                  >
                    Pose Accuracy
                  </Typography>
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{ color: "#e91e63" }}
                  >
                    {" "}
                    {/* Pink accent color */}
                    {result.poseAccuracy}
                  </Typography>
                </CardContent>
              </Card>
            </div>
          ) : (
            <>
              <video
                ref={videoRef}
                src={
                  location.state.video
                    ? URL.createObjectURL(location.state.video)
                    : ""
                }
                controls
                className="w-full h-128 object-cover rounded mb-4"
              />
              <button
                onClick={uploadVideo}
                className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-700 transition duration-300"
              >
                Start Analysis
              </button>
            </>
          )}
          {error && <p className="text-red-500">{error}</p>}
        </section>
      </main>
    </div>
  );
};

export default VideoAnalysisPage;
