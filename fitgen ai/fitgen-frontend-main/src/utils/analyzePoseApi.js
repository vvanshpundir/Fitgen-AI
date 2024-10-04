import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/";

export const analyzePose = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}body-analyzer/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      return {
        error: true,
        message: `Unexpected status code received: ${response.status}`,
      };
    }
  } catch (error) {
    if (error.response) {
      return {
        error: true,
        message:
          error.response.data.message || "An error occurred on the server.",
      };
    } else if (error.request) {
      return {
        error: true,
        message: "No response from server, check your network connection.",
      };
    } else {
      return {
        error: true,
        message: error.message || "An unknown error occurred.",
      };
    }
  }
};
