import axios from "axios";

const API_URL = "http://localhost:3000";

// Login Users api
export const signUpUser = async (userData) => {
  const response = await axios.post(`${API_URL}/users`, userData);
  return response.data;
};

export const loginUser = async (userData) => {
  const response = await axios.post(`${API_URL}/users/login`, userData);
  return response.data;
};

export const logoutUser = async (token) => {
  return axios.post(
    `${API_URL}/users/logout`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};
