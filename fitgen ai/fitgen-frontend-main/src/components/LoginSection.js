// LoginSection.js
import React, { useState } from "react";

const LoginSection = ({
  handleEmailAuth,
  email,
  setEmail,
  password,
  setPassword,
  error,
  handleForgotPassword,
}) => {
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleEmailBlur = () => {
    setEmailError(validateEmail(email) ? "" : "Invalid email format.");
  };

  const handlePasswordBlur = () => {
    setPasswordError(
      validatePassword(password)
        ? ""
        : "Password must be at least 6 characters long."
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateEmail(email) && validatePassword(password)) {
      handleEmailAuth(e);
    } else {
      if (!validateEmail(email)) setEmailError("Invalid email format.");
      if (!validatePassword(password))
        setPasswordError("Password must be at least 6 characters long.");
    }
  };

  return (
    <>
      <h2 className="text-3xl font-bold mb-8 text-center">
        Log in to your account
      </h2>
      <form
        onSubmit={handleSubmit}
        onKeyPress={(e) => {
          if (e.key === "Enter") handleSubmit(e);
        }}
      >
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="w-full p-3 rounded bg-gray-700 text-white"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={handleEmailBlur}
            placeholder="you@example.com"
          />
          {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
        </div>
        <div className="mb-4 relative">
          <label
            className="block text-sm font-semibold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="w-full p-3 pr-12 rounded bg-gray-700 text-white"
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={handlePasswordBlur}
            placeholder="Your password"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
          {passwordError && (
            <p className="text-red-500 text-sm">{passwordError}</p>
          )}
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className="mb-4">
          <button
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded"
            type="submit"
          >
            Log in
          </button>
        </div>
        <div className="text-center">
          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-blue-500 hover:underline"
          >
            Forgot Password?
          </button>
        </div>
        <p className="text-center text-sm text-gray-400 mt-4">
          By continuing, you agree to FitGen's Terms of Service and Privacy
          Policy.
        </p>
      </form>
    </>
  );
};

export default LoginSection;
