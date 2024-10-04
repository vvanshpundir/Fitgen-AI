import React, { useState, useEffect } from "react";
import { auth } from "../firebase";

const EditProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setName(user.displayName || "");
      setEmail(user.email || "");
    }
  }, []);

  const handleUpdateName = async (e) => {
    e.preventDefault();
    try {
      await auth.currentUser.updateProfile({ displayName: name });
      setSuccess("Name updated successfully!");
      setError("");
    } catch (error) {
      setError(error.message);
      setSuccess("");
    }
  };

  const handleUpdateEmail = async (e) => {
    e.preventDefault();
    try {
      await auth.currentUser.updateEmail(email);
      setSuccess("Email updated successfully!");
      setError("");
    } catch (error) {
      setError(error.message);
      setSuccess("");
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await auth.currentUser.updatePassword(newPassword);
      setSuccess("Password updated successfully!");
      setError("");
    } catch (error) {
      setError(error.message);
      setSuccess("");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-8">Edit Profile</h2>
      <form onSubmit={handleUpdateName} className="mb-4">
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2" htmlFor="name">
            Name
          </label>
          <input
            className="w-full p-3 rounded bg-gray-700 text-white"
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter new name"
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded mb-4"
          type="submit"
        >
          Update Name
        </button>
      </form>

      <form onSubmit={handleUpdateEmail} className="mb-4">
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
            placeholder="Enter new email"
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded mb-4"
          type="submit"
        >
          Update Email
        </button>
      </form>

      <form onSubmit={handleUpdatePassword}>
        <div className="mb-4">
          <label
            className="block text-sm font-semibold mb-2"
            htmlFor="newPassword"
          >
            New Password
          </label>
          <input
            className="w-full p-3 rounded bg-gray-700 text-white"
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New password"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-sm font-semibold mb-2"
            htmlFor="confirmPassword"
          >
            Confirm Password
          </label>
          <input
            className="w-full p-3 rounded bg-gray-700 text-white"
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-500 text-sm">{success}</p>}
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded"
          type="submit"
        >
          Update Password
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
