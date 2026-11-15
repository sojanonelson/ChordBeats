import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:4000/api';

const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
});

const login = async (userData) => {
  try {
    const response = await axiosInstance.post('/user/login', userData);
    return response.data;
  } catch (err) {
    console.error("Login failed:", err);
    throw err;
  }
};

const signup = async (userData) => {
  try {
    const response = await axiosInstance.post('/user/register', userData);
    return response.data;
  } catch (err) {
    console.error("Register failed:", err);
    throw err;
  }
};

const googleLogin = async (userData) => {
  try {
    const response = await axiosInstance.post('/user/google-login', userData);
    return response.data;
  } catch (err) {
    console.error("Google login failed:", err);
    throw err;
  }
};

const githubLogin = async (userData) => {
  try {
    const response = await axiosInstance.post('/user/github-login', userData);
    return response.data;
  } catch (err) {
    console.error("GitHub login failed:", err);
    throw err;
  }
};

export { login, signup, googleLogin, githubLogin };
