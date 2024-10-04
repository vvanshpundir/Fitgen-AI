import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import LiveVideoCapture from "./LiveVideoCapture"; // Make sure the path is correct
import exerciseGif from "../images/exercise.gif"; // Correct path to your exercise GIF

const ExercisePage = () => {
  const location = useLocation();
  const { exercise, time, sets, description } = location.state || {};
  const [elapsedTime, setElapsedTime] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [remainingSets, setRemainingSets] = useState(sets);
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [isWorkoutStarted, setIsWorkoutStarted] = useState(false);
  const [workoutComplete, setWorkoutComplete] = useState(false);

  useEffect(() => {
    if (intervalId) {
      clearInterval(intervalId);
    }
  }, [intervalId]);

  const handleStartWorkout = () => {
    if (isWorkoutStarted) return;
    setIsWorkoutStarted(true);
    setWorkoutComplete(false);
    setIsCountingDown(true);
    let countdownValue = 5;
    const countdownInterval = setInterval(() => {
      setCountdown(countdownValue);
      countdownValue -= 1;
      if (countdownValue < 0) {
        clearInterval(countdownInterval);
        setIsCountingDown(false);
        setCountdown(5); // Reset countdown value for next start
        const interval = setInterval(() => {
          setElapsedTime((prevTime) => {
            if (prevTime >= time) {
              clearInterval(interval);
              if (remainingSets > 1) {
                setRemainingSets(remainingSets - 1);
                setElapsedTime(0);
                setIsWorkoutStarted(false); // Enable the button for the next set
              } else {
                setRemainingSets(0);
                setWorkoutComplete(true);
              }
              return time;
            }
            return prevTime + 1;
          });
        }, 1000);
        setIntervalId(interval);
      }
    }, 1000);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const totalTimeInSeconds = time;
  const percentage = (elapsedTime / totalTimeInSeconds) * 100;

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <main className="flex-grow p-6 px-8">
        <div className="flex">
          <div className="relative w-2/3 pr-4">
            <LiveVideoCapture
              isCountingDown={isCountingDown}
              countdown={countdown}
              overlayContent={
                <CircularProgressbar
                  value={percentage}
                  text={formatTime(elapsedTime)}
                  styles={buildStyles({
                    textColor: "#ffffff",
                    textSize: "34px",
                    pathColor: "#00bfff",
                    trailColor: "#d6d6d6",
                  })}
                />
              }
            />
          </div>
          <div className="w-1/3 pl-4">
            <img
              src={exerciseGif}
              alt="Exercise"
              className="w-full h-48 object-contain rounded mb-4"
            />
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-800 p-4 rounded text-center">
                <p className="text-gray-400">Sets Remaining</p>
                <p className="text-2xl font-bold">{remainingSets}</p>
              </div>
              <div className="bg-gray-800 p-4 rounded text-center">
                <p className="text-gray-400">Calories Burned</p>
                <p className="text-2xl font-bold">45 cal</p>
              </div>
              <div className="bg-gray-800 p-4 rounded text-center">
                <p className="text-gray-400">Average Pace</p>
                <p className="text-2xl font-bold">14 min/mi</p>
              </div>
              <div className="bg-gray-800 p-4 rounded text-center">
                <p className="text-gray-400">Distance Traveled</p>
                <p className="text-2xl font-bold">2.7 mi</p>
              </div>
            </div>
            <button
              onClick={handleStartWorkout}
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded w-full mt-4 mb-4"
              disabled={isWorkoutStarted && !workoutComplete}
            >
              {workoutComplete ? "Workout Complete" : "Start Workout"}
            </button>
            <button
              className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded w-full mb-4"
              onClick={() => setDetailsVisible(!detailsVisible)}
            >
              {detailsVisible
                ? "Hide Exercise Details"
                : "Show Exercise Details"}
            </button>
            {detailsVisible && (
              <div className="bg-gray-800 p-4 rounded mb-4">
                <p className="text-gray-400 mb-2">
                  <strong>Exercise:</strong> {exercise}
                </p>
                <p className="text-gray-400 mb-2">
                  <strong>Total Time:</strong> {formatTime(totalTimeInSeconds)}
                </p>
                <p className="text-gray-400 mb-2">
                  <strong>No. of Sets:</strong> {sets}
                </p>
                <p className="text-gray-400 mb-2">
                  <strong>Description:</strong> {description}
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p className="mt-4">&copy; 2024 FitMotion. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ExercisePage;
