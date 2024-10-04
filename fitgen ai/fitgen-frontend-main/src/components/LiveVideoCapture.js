import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import * as tf from "@tensorflow/tfjs";
import * as posedetection from "@tensorflow-models/pose-detection";
import { loadModel } from "../utils/loadModel";
import { pushUpRules } from "../utils/rules";
import { useTensorFlow } from "../hooks/useTensorFlow";

const LiveVideoCapture = ({ modelPath }) => {
  const webcamRef = useRef(null);
  const [reps, setReps] = useState(0);
  const [currentStage, setCurrentStage] = useState("");
  const [model, setModel] = useState(null);
  const [detector, setDetector] = useState(null);
  useTensorFlow();

  // Load the model and pose detector
  useEffect(() => {
    const initModelAndDetector = async () => {
      const loadedModel = await loadModel(modelPath);
      setModel(loadedModel);
      const loadedDetector = await posedetection.createDetector(
        posedetection.SupportedModels.MoveNet,
        {
          modelType: posedetection.movenet.modelType.SINGLEPOSE_LIGHTNING,
        }
      );
      setDetector(loadedDetector);
    };

    initModelAndDetector();
  }, [modelPath]);

  // Function to handle predictions
  const handlePredict = async () => {
    if (
      webcamRef.current &&
      webcamRef.current.video.readyState === 4 &&
      detector &&
      model
    ) {
      const video = webcamRef.current.video;
      const poses = await detector.estimatePoses(video);
      if (poses.length > 0) {
        const keypoints = poses[0].keypoints.map((k) => [k.x, k.y]).flat();
        const inputTensor = tf.tensor2d(keypoints, [1, keypoints.length]);
        const prediction = model.predict(inputTensor);
        const stage = getStage(prediction);
        countReps(stage);
        inputTensor.dispose();
      }
    }
  };

  // Use an interval to run prediction
  useEffect(() => {
    const interval = setInterval(() => {
      handlePredict();
    }, 1000); // Adjust interval time as needed
    return () => clearInterval(interval);
  }, [detector, model]);

  // Update current stage and count reps
  const getStage = (prediction) => {
    const labelIndex = prediction.argMax(-1).dataSync()[0];
    return pushUpRules.nameStage[labelIndex];
  };

  const countReps = (stage) => {
    if (currentStage === "Down" && stage === "Up") {
      setReps(reps + 1);
    }
    setCurrentStage(stage);
  };

  return (
    <div className="video-container">
      <Webcam ref={webcamRef} style={{ width: "100%", height: "auto" }} />
      <div className="overlay">
        <p>Reps: {reps}</p>
        <p>Current Stage: {currentStage}</p>
      </div>
    </div>
  );
};

export default LiveVideoCapture;
