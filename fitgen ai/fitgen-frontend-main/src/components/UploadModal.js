import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";

const UploadModal = ({ show, onClose }) => {
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [errorMessage, setErrorMessage] = useState(""); // State to store the error message
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setVideoFile(file);
      const previewUrl = URL.createObjectURL(file);
      setVideoPreview(previewUrl);
      setErrorMessage(""); // Clear error message when file is selected
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (videoFile) {
      console.log("Uploading video:", videoFile);
      navigate("/video-analysis", { state: { video: videoFile } }); // Redirect with video file
      onClose(); // Close the modal after submission
    } else {
      setErrorMessage("Please select a video file before uploading."); // Set error message if no file is selected
    }
  };

  return (
    <Modal show={show} onClose={onClose}>
      <div className="p-6 bg-gray-800 text-white rounded max-w-lg mx-auto">
        <h2 className="text-2xl font-bold mb-4">Upload Workout Video</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="file"
              accept="video/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500
                         file:mr-4 file:py-2 file:px-4
                         file:rounded-full file:border-0
                         file:text-sm file:font-semibold
                         file:bg-blue-500 file:text-white
                         hover:file:bg-blue-700"
            />
          </div>
          {videoPreview && (
            <div className="mb-4">
              <video src={videoPreview} controls className="w-full rounded" />
            </div>
          )}
          <div className="text-red-500 mb-2">{errorMessage}</div>{" "}
          {/* Display error message if any */}
          {videoFile && (
            <>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
              >
                Continue
              </button>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
              >
                Continue
              </button>
            </>
          )}
        </form>
      </div>
    </Modal>
  );
};

export default UploadModal;
