import axios from "axios";

const API_URL = "http://localhost:3000";

// Comments api
export const fetchComments = async (postId) => {
  const response = await axios.get(`${API_URL}/comments/${postId}`);
  return response.data;
};

export const createComment = async (postId, content, token) => {
  console.log(postId);
  const response = await axios.post(`${API_URL}/comments/${postId}`, content, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateComment = async (commentId, content, token) => {
  const response = await axios.put(
    `${API_URL}/comments/${commentId}`,
    { content },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

export const deleteComment = async (commentId, token) => {
  const response = await axios.delete(`${API_URL}/comments/${commentId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
