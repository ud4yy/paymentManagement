import axios from 'axios';

// Base URL for your backend
const API_URL = "http://localhost:5001/api";

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
});

// Register API call
export const register = async (userData) => {
  const response = await api.post('/register', userData);
  return response.data;
};

// Login API call
export const login = async (credentials) => {
  const response = await api.post('/login', credentials);
  return response.data;
};

// Refresh token API call
export const refreshToken = async () => {
  const response = await api.post('/refresh-token');
  return response.data;
};

// Payment API call
export const createPayment = async (paymentData, token) => {
  const response = await api.post('/payment', paymentData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

// Get payment history
export const getPaymentHistory = async (from, to, token) => {
  console.log(from);
  console.log(to);
  console.log(token);
  const response = await api.get(`/payment?from=${from}&to=${to}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  console.log(response.data);
  return response.data;
};

// Get a specific payment by ID
export const getPaymentById = async (id, token) => {
  const response = await api.get(`/payment/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};
