import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import mainImage from "../images/Main.jpeg";
import exercise1 from "../images/Exercise1.png";
import exercise2 from "../images/Exercise2.png";
import exercise3 from "../images/Exercise3.png";
import exercise4 from "../images/Exercise4.png";
import Modal from "./Modal";
import { FaSignInAlt, FaUserPlus, FaInfoCircle } from "react-icons/fa";

const LandingPage = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const handleLoginClick = () => {
    navigate("/auth?type=login");
  };

  const handleSignUpClick = () => {
    navigate("/auth?type=signup");
  };

  const handleExerciseClick = (exercise) => {
    if (exercise === "Exercise 1") {
      setModalContent(
        <>
          <h2 className="text-2xl font-bold mb-4">Squats</h2>
          <p>
            <strong>How to do:</strong> Stand with your feet shoulder-width
            apart. Lower your body as if you were going to sit in a chair,
            keeping your back straight and your knees over your ankles. Push
            through your heels to return to the starting position.
          </p>
          <br />
          <p>
            <strong>Equipments required:</strong> None (optional: dumbbells or
            barbell for added resistance).
          </p>
          <br />
          <p>
            <strong>Benefits:</strong> Strengthens the legs, glutes, and core.
            Improves flexibility and balance.
          </p>
        </>
      );
    } else if (exercise === "Exercise 2") {
      setModalContent(
        <>
          <h2 className="text-2xl font-bold mb-4">Situps</h2>
          <p>
            <strong>How to do:</strong> Lie on your back with your knees bent
            and feet flat on the floor. Place your hands behind your head or
            across your chest. Lift your upper body towards your knees, exhaling
            as you go up. Inhale as you return to the starting position.
          </p>
          <br />
          <p>
            <strong>Equipments required:</strong> None (optional: mat for
            comfort).
          </p>
          <br />
          <p>
            <strong>Benefits:</strong> Strengthens the abdominal muscles,
            improves core stability, and enhances overall fitness.
          </p>
        </>
      );
    } else if (exercise === "Exercise 3") {
      setModalContent(
        <>
          <h2 className="text-2xl font-bold mb-4">Pull-ups</h2>
          <p>
            <strong>How to do:</strong> Hang from a bar with your hands slightly
            wider than shoulder-width apart, palms facing away from you. Pull
            your body up until your chin is above the bar, then slowly lower
            yourself back to the starting position.
          </p>
          <br />
          <p>
            <strong>Equipments required:</strong> Pull-up bar.
          </p>
          <br />
          <p>
            <strong>Benefits:</strong> Strengthens the back, shoulders, and
            arms. Improves grip strength and upper body endurance.
          </p>
        </>
      );
    } else if (exercise === "Exercise 4") {
      setModalContent(
        <>
          <h2 className="text-2xl font-bold mb-4">Push-ups</h2>
          <p>
            <strong>How to do:</strong> Start in a plank position with your
            hands slightly wider than shoulder-width apart. Lower your body
            until your chest nearly touches the floor, keeping your back
            straight and your elbows close to your body. Push back up to the
            starting position.
          </p>
          <br />
          <p>
            <strong>Equipments required:</strong> None (optional: mat for
            comfort).
          </p>
          <br />
          <p>
            <strong>Benefits:</strong> Strengthens the chest, shoulders,
            triceps, and core. Improves upper body strength and endurance.
          </p>
        </>
      );
    } else {
      setModalContent(<p>Details about {exercise} will go here.</p>);
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalContent(null);
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
          <h2 className="text-4xl font-bold mt-4">
            Get in the best shape of your life
          </h2>
          <p className="text-gray-400 mb-6">
            Start your personalized training plan. Get results with FitTrack.
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={handleLoginClick}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 flex items-center"
            >
              <FaSignInAlt className="mr-2" /> Log in
            </button>
            <button
              onClick={handleSignUpClick}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 flex items-center"
            >
              <FaUserPlus className="mr-2" /> Sign up
            </button>
          </div>
        </section>
        <section>
          <h3 className="text-2xl font-bold mb-4 text-center">
            Train smarter, not harder
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div
              className="bg-gray-800 p-4 rounded cursor-pointer"
              onClick={() => handleExerciseClick("Exercise 1")}
            >
              <img
                src={exercise1}
                alt="Exercise 1"
                className="w-full h-48 object-cover rounded"
              />
            </div>
            <div
              className="bg-gray-800 p-4 rounded cursor-pointer"
              onClick={() => handleExerciseClick("Exercise 2")}
            >
              <img
                src={exercise2}
                alt="Exercise 2"
                className="w-full h-48 object-cover rounded"
              />
            </div>
            <div
              className="bg-gray-800 p-4 rounded cursor-pointer"
              onClick={() => handleExerciseClick("Exercise 3")}
            >
              <img
                src={exercise3}
                alt="Exercise 3"
                className="w-full h-48 object-cover rounded"
              />
            </div>
            <div
              className="bg-gray-800 p-4 rounded cursor-pointer"
              onClick={() => handleExerciseClick("Exercise 4")}
            >
              <img
                src={exercise4}
                alt="Exercise 4"
                className="w-full h-48 object-cover rounded"
              />
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        <div className="flex justify-center">
          <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 flex items-center">
            <FaInfoCircle className="mr-2" /> Learn More
          </button>
        </div>
        <p className="mt-4">&copy; 2024 FitTrack. All rights reserved.</p>
      </footer>
      <Modal show={showModal} onClose={handleCloseModal}>
        {modalContent}
      </Modal>
    </div>
  );
};

export default LandingPage;
