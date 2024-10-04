import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import LandingPage from "./components/LandingPage";
import HomePage from "./components/HomePage";
import { auth } from "./firebase";
import StatsPage from "./components/StatsPage";
import ExercisePage from "./components/ExercisePage";
import AuthPage from "./components/AuthPage";
import ProfilePage from "./components/ProfilePage";
import useIdleTimer from "./hooks/useIdleTimer";
import VideoAnalysisPage from "./components/VideoAnalysisPage";
import BodyMeasurementPage from "./components/BodyMeasurementPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", "true");
      } else {
        setIsLoggedIn(false);
        localStorage.setItem("isLoggedIn", "false");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    auth.signOut();
    setIsLoggedIn(false);
    localStorage.setItem("isLoggedIn", "false");
  };

  useIdleTimer(handleLogout, 3600000); // 1 hour

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/home"
              element={
                isLoggedIn ? <HomePage /> : <Navigate to="/auth?type=login" />
              }
            />
            <Route
              path="/workouts"
              element={
                isLoggedIn ? (
                  <div>Workouts Page</div>
                ) : (
                  <Navigate to="/auth?type=login" />
                )
              }
            />
            <Route
              path="/nutrition"
              element={
                isLoggedIn ? (
                  <div>Nutrition Page</div>
                ) : (
                  <Navigate to="/auth?type=login" />
                )
              }
            />
            <Route
              path="/community"
              element={
                isLoggedIn ? (
                  <div>Community Page</div>
                ) : (
                  <Navigate to="/auth?type=login" />
                )
              }
            />
            <Route
              path="/stats"
              element={
                isLoggedIn ? <StatsPage /> : <Navigate to="/auth?type=login" />
              }
            />
            <Route
              path="/exercise"
              element={
                isLoggedIn ? (
                  <ExercisePage />
                ) : (
                  <Navigate to="/auth?type=login" />
                )
              }
            />
            <Route path="/auth" element={<AuthPage />} />
            <Route
              path="/profile"
              element={
                isLoggedIn ? (
                  <ProfilePage />
                ) : (
                  <Navigate to="/auth?type=login" />
                )
              }
            />
            <Route
              path="/video-analysis"
              element={
                isLoggedIn ? (
                  <VideoAnalysisPage />
                ) : (
                  <Navigate to="/auth?type=login" />
                )
              }
            />
            <Route
              path="/body-measurement"
              element={
                isLoggedIn ? (
                  <BodyMeasurementPage />
                ) : (
                  <Navigate to="/auth?type=login" />
                )
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
