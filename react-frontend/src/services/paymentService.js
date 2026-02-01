import axios from 'axios';
import API_BASE_URL from '../config/api';

// Create axios instance
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Payment Service
export const paymentService = {
  // Tạo thanh toán
  createPayment: async (amount, orderInfo, baseUrl = window.location.origin) => {
    try {
      const response = await axiosInstance.post('/create-payment', {
        amount,
        orderInfo,
        baseUrl,
      });
      return response.data;
    } catch (error) {
      console.error('Error creating payment:', error);
      throw error;
    }
  },

  // Xử lý callback từ VNPay
  handleCallback: async (queryParams) => {
    try {
      const response = await axiosInstance.get('/payment-callback', {
        params: queryParams,
      });
      return response.data;
    } catch (error) {
      console.error('Error handling callback:', error);
      throw error;
    }
  },

  // Query thông tin thanh toán
  getPaymentInfo: async (orderId, transactionId) => {
    try {
      const response = await axiosInstance.get('/payment-info', {
        params: { orderId, transactionId },
      });
      return response.data;
    } catch (error) {
      console.error('Error getting payment info:', error);
      throw error;
    }
  },
};

export default paymentService;
