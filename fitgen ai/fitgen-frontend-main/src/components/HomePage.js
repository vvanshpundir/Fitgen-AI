import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import mainImage from "../images/Main.jpeg";
import WorkoutLiveModal from "./WorkoutLiveModal";
import UploadModal from "./UploadModal";
import { FaPlay, FaUpload, FaChartLine, FaEllipsisH } from "react-icons/fa";

const HomePage = () => {
  const navigate = useNavigate();
  const [showWorkoutModal, setShowWorkoutModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const dummyStats = [
    { title: "Morning Run", date: "Jul 18, 2022" },
    { title: "Yoga Session", date: "Jul 17, 2022" },
    { title: "Afternoon Swim", date: "Jul 16, 2022" },
    { title: "Evening Bike Ride", date: "Jul 15, 2022" },
  ];

  const handleStartWorkoutLive = () => {
    setShowWorkoutModal(true);
  };

  const handleUploadWorkoutVideo = () => {
    setShowUploadModal(true);
  };

  const handleViewStats = () => {
    navigate("/stats");
  };

  const handleWorkoutModalClose = () => {
    setShowWorkoutModal(false);
  };

  const handleUploadModalClose = () => {
    setShowUploadModal(false);
  };

  const handleStart = (exercise, time, sets, description) => {
    setShowWorkoutModal(false);
    navigate("/exercise", { state: { exercise, time, sets, description } });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <main className="flex-grow p-6 px-8">
        <section className="bg-gray-800 p-6 rounded shadow-md text-center mb-8">
          <img
            src={mainImage}
            alt="Hero"
            className="w-full h-64 object-cover rounded"
          />
          <h2 className="text-4xl font-bold mt-4">Welcome to FitMotion</h2>
          <p className="text-gray-400 mb-6">
            Start a live workout or upload a video
          </p>
          <div className="flex justify-center space-x-4 mb-4">
            <button
              onClick={handleStartWorkoutLive}
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded flex items-center"
            >
              <FaPlay className="mr-2" /> Start Workout Live
            </button>
            <button
              onClick={handleUploadWorkoutVideo}
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded flex items-center"
            >
              <FaUpload className="mr-2" /> Upload Workout Video
            </button>
            <button
              onClick={() => navigate("/body-measurement")}
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded flex items-center"
            >
              <FaUpload className="mr-2" /> Body Measurement
            </button>
          </div>
        </section>
        <section className="bg-gray-800 p-6 rounded shadow-md mb-8">
          <h3 className="text-2xl font-bold mb-4">Previous Workouts</h3>
          <ul>
            {dummyStats.map((stat, index) => (
              <li
                key={index}
                className="flex justify-between items-center mb-4"
              >
                <div>
                  <p className="font-bold">{stat.title}</p>
                  <p className="text-gray-400">{stat.date}</p>
                </div>
                <button className="text-gray-400 hover:text-white">
                  <FaEllipsisH />
                </button>
              </li>
            ))}
          </ul>
        </section>
        <button
          onClick={handleViewStats}
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded mx-auto flex items-center"
        >
          <FaChartLine className="mr-2" /> View Previous Stats
        </button>
      </main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p className="mt-4">&copy; 2024 FitMotion. All rights reserved.</p>
      </footer>

      {/* Workout Modal */}
      <WorkoutLiveModal
        show={showWorkoutModal}
        onClose={handleWorkoutModalClose}
        onStart={handleStart}
      />

      {/* Upload Modal */}
      <UploadModal show={showUploadModal} onClose={handleUploadModalClose} />
    </div>
  );
};

export default HomePage;
