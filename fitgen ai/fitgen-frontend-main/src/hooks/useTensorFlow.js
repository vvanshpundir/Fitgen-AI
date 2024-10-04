// hooks/useTensorFlow.js
import { useEffect } from "react";
import * as tf from "@tensorflow/tfjs";

export const useTensorFlow = () => {
  useEffect(() => {
    async function initializeTF() {
      await tf.setBackend("webgpu");
      await tf.ready();
      console.log("TensorFlow is ready with backend:", tf.getBackend());
    }

    initializeTF();
  }, []);
};
