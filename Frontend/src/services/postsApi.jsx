import axios from "axios";

const API_URL = "http://localhost:3000";

// Posts api
export const fetchPosts = async () => {
  const response = await axios.get(`${API_URL}/posts`);
  return response.data;
};

export const fetchPostById = async (postId) => {
  const response = await axios.get(`${API_URL}/posts/${postId}`);
  return response.data;
};

export const fetchUserPosts = async (token) => {
  const response = await axios.get(`${API_URL}/posts/user/posts`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const createPost = async (postData, token) => {
  const response = await axios.post(`${API_URL}/posts`, postData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updatePost = async (postId, postData, token) => {
  if (!token) {
    console.error("Token is missing! Ensure it's passed correctly.");
    throw new Error("Authorization token is missing.");
  }

  const response = await axios.put(`${API_URL}/posts/${postId}`, postData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const togglePublishPost = async (postId, isPublished, token) => {
  const response = await axios.patch(
    `${API_URL}/posts/${postId}`,
    { published: isPublished },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

export const deletePost = async (postId, token) => {
  await axios.delete(`${API_URL}/posts/${postId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
