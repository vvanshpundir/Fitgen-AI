import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaDumbbell,
  FaAppleAlt,
  FaRulerCombined,
  FaUserCircle,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";
import Modal from "./Modal";

const Header = ({ isLoggedIn, onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileMenuRef = useRef(null);

  const isLandingPage = location.pathname === "/";
  const isHomePage = location.pathname === "/home";
  const isWorkoutsPage = location.pathname === "/workouts";
  const isNutritionPage = location.pathname === "/nutrition";
  const isBodyMeasurementPage = location.pathname === "/body-measurement";

  const handleHomeClick = () => {
    if (!isLoggedIn) {
      navigate("/");
    } else {
      navigate("/home");
    }
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    setShowLogoutModal(false);
    onLogout();
    navigate("/");
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (
      profileMenuRef.current &&
      !profileMenuRef.current.contains(event.target)
    ) {
      setShowProfileMenu(false);
    }
  };

  useEffect(() => {
    if (showProfileMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showProfileMenu]);

  return (
    <>
      <header className="bg-gray-900 text-white p-4 flex justify-between items-center">
        <div
          className="flex items-center cursor-pointer"
          onClick={handleHomeClick}
        >
          <div className="text-2xl font-bold">FitGen</div>
        </div>
        <nav className="flex items-center">
          {isLoggedIn ? (
            <>
              <Link
                to="/home"
                className={`mr-4 flex items-center hover:text-gray-400 ${
                  isHomePage && "underline"
                }`}
              >
                <FaHome className="mr-1" /> Home
              </Link>
              <Link
                to="/workouts"
                className={`mr-4 flex items-center hover:text-gray-400 ${
                  isWorkoutsPage && "underline"
                }`}
              >
                <FaDumbbell className="mr-1" /> Workouts
              </Link>
              <Link
                to="/nutrition"
                className={`mr-4 flex items-center hover:text-gray-400 ${
                  isNutritionPage && "underline"
                }`}
              >
                <FaAppleAlt className="mr-1" /> Nutrition
              </Link>
              <Link
                to="/body-measurement"
                className={`mr-4 flex items-center hover:text-gray-400 ${
                  isBodyMeasurementPage && "underline"
                }`}
              >
                <FaRulerCombined className="mr-1" /> Body Measurement
              </Link>
              <div className="relative" ref={profileMenuRef}>
                <button
                  onClick={toggleProfileMenu}
                  className="flex items-center space-x-2 hover:text-gray-400 focus:outline-none"
                >
                  <FaUserCircle className="text-3xl" />
                </button>
                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-2 z-50">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-white hover:bg-gray-700 flex items-center"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      <FaUser className="mr-2" /> Profile
                    </Link>
                    <button
                      onClick={handleLogoutClick}
                      className="w-full text-left block px-4 py-2 text-sm text-white hover:bg-gray-700 flex items-center"
                    >
                      <FaSignOutAlt className="mr-2" /> Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            !isLandingPage && (
              <>
                <Link
                  to="/"
                  className={`mr-4 hover:text-gray-400 ${
                    isLandingPage && "underline"
                  }`}
                  onClick={handleHomeClick}
                >
                  Home
                </Link>
              </>
            )
          )}
        </nav>
      </header>
      <div className="border-b border-white"></div>

      {showLogoutModal && (
        <Modal show={showLogoutModal} onClose={cancelLogout}>
          <h2 className="text-xl font-bold mb-4">Confirm Logout</h2>
          <p className="mb-4">Are you sure you want to log out?</p>
          <div className="flex justify-end space-x-4">
            <button
              onClick={cancelLogout}
              className="bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              onClick={confirmLogout}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 flex items-center"
            >
              <FaSignOutAlt className="mr-2" /> Logout
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Header;
