import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { auth, googleProvider, appleProvider } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import ForgotPasswordModal from "./ForgotPasswordModal";
import LoginSection from "./LoginSection";
import SignupSection from "./SignupSection";
import { FaGoogle, FaApple, FaArrowRight, FaArrowLeft } from "react-icons/fa";

const AuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const type = queryParams.get("type");
    setIsLogin(type === "login");
  }, [location]);

  const handleAuthToggle = () => {
    setIsLogin(!isLogin);
    setError("");
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Invalid email format.");
      return;
    }

    if (!validatePassword(password)) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      if (isLogin) {
        await handleLogin(e);
      } else {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await updateProfile(userCredential.user, { displayName: name });
        navigate("/home");
      }
    } catch (error) {
      setError(`Firebase: ${error.message}`);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/home");
    } catch (error) {
      setError(`Firebase: ${error.message}`);
    }
  };

  const handleAppleAuth = async () => {
    try {
      await signInWithPopup(auth, appleProvider);
      navigate("/home");
    } catch (error) {
      setError(`Firebase: ${error.message}`);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");
    } catch (error) {
      setError(`Firebase: ${error.message}`);
    }
  };

  const handleForgotPassword = () => {
    setIsForgotPasswordOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <div className="text-center mb-4">
        <p className="text-gray-400 mb-4">Login or Signup with:</p>
        <div className="flex justify-center space-x-4 mb-4">
          <button
            onClick={handleGoogleAuth}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center"
          >
            <FaGoogle className="mr-2" /> Continue with Google
          </button>
          <button
            onClick={handleAppleAuth}
            className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded flex items-center"
          >
            <FaApple className="mr-2" /> Continue with Apple
          </button>
        </div>
        <p className="text-gray-400 mb-4">OR</p>
      </div>
      <div className="bg-gray-800 p-8 rounded shadow-md w-full max-w-4xl flex">
        <div
          className={`w-1/2 p-4 flex flex-col justify-center ${
            isLogin ? "bg-gray-800" : "bg-gray-700"
          }`}
        >
          {isLogin ? (
            <LoginSection
              handleEmailAuth={handleEmailAuth}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              error={error}
              handleForgotPassword={handleForgotPassword}
              handleAuthToggle={handleAuthToggle}
            />
          ) : (
            <button
              onClick={handleAuthToggle}
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded flex items-center justify-center"
            >
              <FaArrowRight className="mr-2" /> Already have an account? Log in
            </button>
          )}
        </div>
        <div
          className={`w-1/2 p-4 flex flex-col justify-center ${
            isLogin ? "bg-gray-700" : "bg-gray-800"
          }`}
        >
          {!isLogin ? (
            <SignupSection
              handleEmailAuth={handleEmailAuth}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              confirmPassword={confirmPassword}
              setConfirmPassword={setConfirmPassword}
              name={name}
              setName={setName}
              error={error}
              handleAuthToggle={handleAuthToggle}
            />
          ) : (
            <button
              onClick={handleAuthToggle}
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded flex items-center justify-center"
            >
              <FaArrowLeft className="mr-2" /> Don't have an account? Sign up
            </button>
          )}
        </div>
      </div>
      <ForgotPasswordModal
        isOpen={isForgotPasswordOpen}
        onClose={() => setIsForgotPasswordOpen(false)}
      />
    </div>
  );
};

export default AuthPage;
