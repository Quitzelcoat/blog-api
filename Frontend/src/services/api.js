import axios from "axios";

const API_URL = "http://localhost:3000";

export const fetchPosts = async () => {
  const response = await axios.get(`${API_URL}/posts`);
  return response.data;
};

export const createPost = async (postData, token) => {
  const response = await axios.post(`${API_URL}/posts`, postData, {
    headers: { Authorization: `Bearer ${token}` },
  });
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
