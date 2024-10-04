// src/utils/loadModel.js
import * as tf from "@tensorflow/tfjs";

let model = null;

export const loadModel = async () => {
  if (!model) {
    model = await tf.loadLayersModel("/push-up/model.json");
    console.log("Model loaded successfully");
  }
  return model;
};
