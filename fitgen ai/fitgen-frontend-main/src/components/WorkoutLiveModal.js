import React, { useState } from "react";
import Modal from "./Modal";
import exerciseGif from "../images/exercise.gif"; // Correct path to your exercise GIF
import { FaDumbbell, FaRunning, FaSwimmer, FaBicycle } from "react-icons/fa";

const WorkoutLiveModal = ({ show, onClose, onStart }) => {
  const [exercise, setExercise] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  const [sets, setSets] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [error, setError] = useState("");

  const exercises = [
    { value: "squats", label: "Squats", icon: <FaDumbbell /> },
    { value: "pushups", label: "Push-ups", icon: <FaRunning /> },
    { value: "situps", label: "Sit-ups", icon: <FaSwimmer /> },
    { value: "pullups", label: "Pull-ups", icon: <FaBicycle /> },
  ];

  const exerciseDetails = {
    squats: {
      description:
        "Stand with your feet shoulder-width apart. Lower your body as if you were going to sit in a chair, keeping your back straight and your knees over your ankles. Push through your heels to return to the starting position.",
      gif: exerciseGif, // Replace with the actual path to your Squats GIF
    },
    pushups: {
      description:
        "Start in a plank position with your hands slightly wider than shoulder-width apart. Lower your body until your chest nearly touches the floor, keeping your back straight and your elbows close to your body. Push back up to the starting position.",
      gif: exerciseGif, // Replace with the actual path to your Push-ups GIF
    },
    situps: {
      description:
        "Lie on your back with your knees bent and feet flat on the floor. Place your hands behind your head or across your chest. Lift your upper body towards your knees, exhaling as you go up. Inhale as you return to the starting position.",
      gif: exerciseGif, // Replace with the actual path to your Sit-ups GIF
    },
    pullups: {
      description:
        "Hang from a bar with your hands slightly wider than shoulder-width apart, palms facing away from you. Pull your body up until your chin is above the bar, then slowly lower yourself back to the starting position.",
      gif: exerciseGif, // Replace with the actual path to your Pull-ups GIF
    },
  };

  const handleStart = () => {
    if (!exercise || !minutes || !seconds || !sets) {
      setError("Please fill out all fields");
      return;
    }

    const timeInSeconds = parseInt(minutes, 10) * 60 + parseInt(seconds, 10);
    onStart(
      exercise,
      timeInSeconds,
      sets,
      exerciseDetails[exercise].description
    );
    onClose();
  };

  return (
    <Modal show={show} onClose={onClose}>
      <div className="p-4 bg-gray-800 text-white rounded max-h-screen overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Start Workout Live</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleStart();
          }}
        >
          <label className="block mb-2">
            Exercise:
            <select
              className="w-full p-2 rounded bg-gray-700 text-white mt-2"
              value={exercise}
              onChange={(e) => setExercise(e.target.value)}
            >
              <option value="">Select an exercise</option>
              {exercises.map((ex) => (
                <option key={ex.value} value={ex.value}>
                  {ex.icon} {ex.label}
                </option>
              ))}
            </select>
          </label>
          <div className="flex mb-4">
            <label className="block mr-2">
              Minutes:
              <input
                type="number"
                placeholder="min"
                className="w-full p-2 rounded bg-gray-700 text-white mt-2"
                value={minutes}
                onChange={(e) => setMinutes(e.target.value)}
              />
            </label>
            <label className="block">
              Seconds:
              <input
                type="number"
                placeholder="sec"
                className="w-full p-2 rounded bg-gray-700 text-white mt-2"
                value={seconds}
                onChange={(e) => setSeconds(e.target.value)}
              />
            </label>
          </div>
          <label className="block mb-4">
            Sets:
            <input
              type="number"
              placeholder="Number of sets"
              className="w-full p-2 rounded bg-gray-700 text-white mt-2"
              value={sets}
              onChange={(e) => setSets(e.target.value)}
            />
          </label>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="flex space-x-4 mb-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
              type="submit"
            >
              Start Workout
            </button>
            {exercise && (
              <button
                type="button"
                className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded"
                onClick={() => setShowDetails(!showDetails)}
              >
                How to do the exercise
              </button>
            )}
          </div>
        </form>
        {showDetails && exercise && (
          <div className="mt-4">
            <h3 className="text-xl font-bold mb-2">
              {exercises.find((ex) => ex.value === exercise).label} Details
            </h3>
            <p className="mb-2">{exerciseDetails[exercise].description}</p>
            <img
              src={exerciseDetails[exercise].gif}
              alt="Exercise GIF"
              className="w-full rounded"
            />
          </div>
        )}
      </div>
    </Modal>
  );
};

export default WorkoutLiveModal;
