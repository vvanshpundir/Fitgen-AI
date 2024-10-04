import React, { useState, useEffect } from "react";
import { analyzePose } from "../utils/analyzePoseApi";
import Modal from "./Modal";
import { BsFillEyeFill } from "react-icons/bs";

function calculateDifferences(apiResponse, baselineData) {
  const results = {};
  Object.keys(baselineData).forEach((key) => {
    const baseline = baselineData[key] * 2.54;
    const current = apiResponse[key] * 2.54;
    const difference = current - baseline;

    results[key.replace("_", " ")] = {
      baseline: baseline,
      current: current,
      difference: difference,
    };
  });
  return results;
}

const BodyMeasurementPage = () => {
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState("");
  const [height, setHeight] = useState("");
  const [error, setError] = useState("");
  const [apiResponse, setApiResponse] = useState(null);
  const [showForm, setShowForm] = useState(true);
  const [measurementData, setMeasurementData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [progressSaved, setProgressSaved] = useState("");
  const [baselineMeasurements, setBaselineMeasurements] = useState(null);
  const [bodyCalculations, setBodyCalculations] = useState(false);

  const dummyBaselineData = {
    shoulder_width_in: 20, // Example dummy value
    chest_circumference_in: 40,
    waist_width_in: 15,
    waist_circumference_in: 32,
    hip_width_in: 18,
    hip_circumference_in: 42,
    biceps_left_length_in: 12,
    biceps_right_length_in: 12,
    biceps_left_circumference_in: 13,
    biceps_right_circumference_in: 13,
    forearm_left_length_in: 10,
    forearm_right_length_in: 10,
    forearm_left_circumference_in: 11,
    forearm_right_circumference_in: 11,
    thigh_left_length_in: 20,
    thigh_right_length_in: 20,
    thigh_left_circumference_in: 24,
    thigh_right_circumference_in: 24,
    calf_left_length_in: 15,
    calf_right_length_in: 15,
    calf_left_circumference_in: 16,
    calf_right_circumference_in: 16,
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setProgressSaved("");

    if (!image || !height || height <= 0) {
      setError(
        "Please fill in all fields with valid values and upload an image."
      );
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", image); // Ensure this is the file object
      formData.append("height", height);

      const data = await analyzePose(formData); // Adjust this call to match expected function parameters
      if (data && !data.error) {
        setApiResponse(data);
        setShowForm(false);
        setMeasurementData(calculateDifferences(data, dummyBaselineData));
      } else {
        setError(
          data.message || "Failed to get a valid response from the server."
        );
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      setError(error.message || "Failed to submit data. Please try again.");
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0]; // Get the first file from the file input
    if (file) {
      setImage(file);
      const newImageUrl = URL.createObjectURL(file);
      setImageURL(newImageUrl);
    }
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleReset = () => {
    setImage(null);
    setImageURL("");
    setHeight("");
    setApiResponse(null);
    setShowForm(true);
    setBodyCalculations(false);
    setMeasurementData(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <main className="flex-grow p-6 px-8">
        <section className="bg-gray-800 p-6 rounded shadow-md text-center mb-8">
          {showForm && (
            <h2 className="text-4xl font-bold mt-4">Submit Your Health Data</h2>
          )}
          <div className="flex justify-center items-center">
            {showForm && (
              <form onSubmit={handleSubmit} className="mt-8">
                <div className="bg-gray-700 p-4 rounded shadow-inner text-left mb-6">
                  <p className="text-sm">
                    <strong>IMPORTANT INSTRUCTIONS:</strong>
                    <br />
                    1. Stand straight with a straight posture.
                    <br />
                    2. Extend your arms horizontally to the sides in a "T"
                    shape.
                    <br />
                    3. Stand with your feet shoulder-width apart and a small gap
                    between your toes.
                    <br />
                    4. Wear form-fitting clothes to accurately capture your
                    body's dimensions.
                    <br />
                    5. Choose a plain, well-lit background to avoid shadows and
                    distractions.
                    <br />
                    6. Ensure your entire body is visible from head to toe in
                    the frame with no obstructions.
                    <br />
                    7. Position the camera at eye level and directly in front of
                    you, placed at a distance to capture your full height and
                    width.
                  </p>
                </div>

                <div>
                  <input
                    type="file"
                    onChange={handleImageChange}
                    className="text-white bg-gray-700 file:bg-blue-500 file:border-0 file:py-2 file:px-4 file:rounded file:text-white file:hover:bg-blue-700 mb-4"
                  />
                  {imageURL && (
                    <>
                      <button
                        onClick={toggleModal}
                        className="ml-2 bg-gray-800 hover:bg-gray-800 text-white py-2 px-4 rounded"
                      >
                        <BsFillEyeFill className="inline-block w-4 h-4 mr-2" />{" "}
                      </button>
                      <Modal show={showModal} onClose={toggleModal}>
                        <img
                          src={imageURL}
                          alt="Uploaded"
                          className="w-full max-w-xs rounded"
                        />
                      </Modal>
                    </>
                  )}
                </div>
                <label className="block mb-2">Height (in inches):</label>
                <input
                  type="number"
                  step="0.1"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="Enter your height in inches"
                  className="bg-gray-800 border border-gray-700 rounded py-2 px-4 mb-4 w-full"
                />
                {error && (
                  <div className="bg-red-500 text-white p-2 rounded mb-4">
                    {error}
                  </div>
                )}
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
                >
                  Submit
                </button>
              </form>
            )}
          </div>

          <br></br>
          {measurementData && (
            <div className="my-8 p-4 bg-gray-800 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-center text-white mb-4">
                Body Measurement Details
              </h3>
              <table className="w-full text-sm text-left text-white">
                <thead className="text-xs text-white uppercase bg-blue-500">
                  <tr>
                    <th scope="col" className="py-3 px-6">
                      Measurement Name
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Baseline (Cm)
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Current (cm)
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Difference (cm)
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-700">
                  {Object.entries(measurementData).map(([key, values]) => (
                    <tr
                      key={key}
                      className="border-b border-gray-600 hover:bg-gray-600"
                    >
                      <td className="py-2 px-6">{key}</td>
                      <td className="py-2 px-6">
                        {values.baseline.toFixed(1)}
                      </td>
                      <td className="py-2 px-6">{values.current.toFixed(1)}</td>
                      <td className="py-2 px-6">
                        {Math.abs(values.difference).toFixed(1)}
                        {values.difference < 0 ? " (decrease)" : " (increase)"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {!showForm && (
            <div>
              {error && (
                <div className="bg-red-500 text-white p-2 rounded mb-4">
                  {error}
                </div>
              )}
              {progressSaved && (
                <div className="bg-green-500 text-white p-2 rounded mb-4">
                  {progressSaved}
                </div>
              )}
              <button
                onClick={handleReset}
                className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded m-4"
              >
                Re-upload
              </button>
              {/* <button
                onClick={saveProgressHandler}
                className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded m-4"
              >
                Save Progress
              </button> */}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default BodyMeasurementPage;
