import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/users",
  withCredentials: true, 
});
export const register = async (formData) => {
  try {
    const { data } = await API.post("/register", formData);
    return data;
  } catch (err) {
    const errorMessage =
      err.response?.data?.err || "Registration failed. Try again.";
    throw new Error(errorMessage);
  }
};
