import axios from "axios";

const API_URL = "http://localhost:3000";

// Login Users api
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

// Posts api
export const updatePost = async (postId, postData, token) => {
  if (!token) {
    console.error("Token is missing! Ensure it's passed correctly.");
    throw new Error("Authorization token is missing.");
  }

  const response = await axios.post(`${API_URL}/posts/${postId}`, postData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const deletePost = async (postId, token) => {
  await axios.delete(`${API_URL}/posts/${postId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const togglePublishPost = async (postId, isPublished, token) => {
  const response = await axios.patch(
    `${API_URL}/posts/${postId}`,
    { published: isPublished },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

// Comments api
export const fetchComments = async (postId) => {
  const response = await axios.get(`${API_URL}/post/${postId}/comments`);
  return response.data;
};

export const updateComments = async (commentId, updateData, token) => {
  const response = await axios.put(
    `${API_URL}/comments/${commentId}`,
    updateData,
    {
      headers: { Authorization: `Bearer ${token} ` },
    }
  );
  return response.data;
};

export const deleteComments = async (commentId, token) => {
  const response = await axios.delete(`${API_URL}/comments/${commentId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
