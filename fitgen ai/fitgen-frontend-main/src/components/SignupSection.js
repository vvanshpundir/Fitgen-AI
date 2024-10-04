import React, { useState } from "react";

const SignupSection = ({
  handleEmailAuth,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  name,
  setName,
  error,
}) => {
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [nameError, setNameError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

  const handleConfirmPasswordBlur = () => {
    setConfirmPasswordError(
      password === confirmPassword ? "" : "Passwords do not match."
    );
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (confirmPassword) {
      setConfirmPasswordError(
        e.target.value === confirmPassword ? "" : "Passwords do not match."
      );
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (password) {
      setConfirmPasswordError(
        password === e.target.value ? "" : "Passwords do not match."
      );
    }
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    setNameError(value ? "" : "Name is required.");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      validateEmail(email) &&
      validatePassword(password) &&
      password === confirmPassword &&
      name
    ) {
      handleEmailAuth(e);
    } else {
      if (!validateEmail(email)) setEmailError("Invalid email format.");
      if (!validatePassword(password))
        setPasswordError("Password must be at least 6 characters long.");
      if (password !== confirmPassword)
        setConfirmPasswordError("Passwords do not match.");
      if (!name) setNameError("Name is required.");
    }
  };

  return (
    <>
      <h2 className="text-3xl font-bold mb-8 text-center">Sign up for free</h2>
      <form
        onSubmit={handleSubmit}
        onKeyPress={(e) => {
          if (e.key === "Enter") handleSubmit(e);
        }}
      >
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2" htmlFor="name">
            Name
          </label>
          <input
            className="w-full p-3 rounded bg-gray-700 text-white"
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            placeholder="Type your name here"
          />
          {nameError && <p className="text-red-500 text-sm">{nameError}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="w-full p-3 rounded bg-gray-700 text-white"
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
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
            onChange={handlePasswordChange}
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
        <div className="mb-4 relative">
          <label
            className="block text-sm font-semibold mb-2"
            htmlFor="confirmPassword"
          >
            Confirm Password
          </label>
          <input
            className="w-full p-3 pr-12 rounded bg-gray-700 text-white"
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            onBlur={handleConfirmPasswordBlur}
            placeholder="Confirm your password"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? "Hide" : "Show"}
          </button>
          {confirmPasswordError && (
            <p className="text-red-500 text-sm">{confirmPasswordError}</p>
          )}
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className="mb-4">
          <button
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded"
            type="submit"
          >
            Sign up
          </button>
        </div>
        <p className="text-center text-sm text-gray-400">
          By continuing, you agree to FitGen's Terms of Service and Privacy
          Policy.
        </p>
      </form>
    </>
  );
};

export default SignupSection;
