import axiosInstance from "./axiosConfig";

const BASE_API_URL = "http://localhost:8090";

const loginAPI = {
  async login(newLogin) {
    try {
      const response = await axiosInstance.post(
        `${BASE_API_URL}/login`,
        newLogin
      );
      return response.data;
    } catch (error) {
      console.error("Login error:", error.response.data);
      throw error.response.data;
    }
  },

  async register(newUser) {
    try {
      const response = await axiosInstance.post(
        `${BASE_API_URL}/register`,
        newUser
      );
      return response.data;
    } catch (error) {
      console.error("Registration error:", error.response.data);
      throw error.response.data;
    }
  },

  async logout() {
    try {
      const headers = { Authorization: `Bearer ${accountService.getToken()}` };
      const response = await axiosInstance.post(
        `${BASE_API_URL}/logout`,
        null,
        { headers }
      );
      return response.data;
    } catch (error) {
      console.error("Logout error:", error.response.data);
      throw error.response.data;
    }
  },

  async fetchUserById(userId) {
    try {
      const headers = { Authorization: `Bearer ${accountService.getToken()}` };
      const response = await axiosInstance.get(
        `${BASE_API_URL}/user/${userId}`,
        { headers }
      );
      return response.data;
    } catch (error) {
      console.error("Fetch user error:", error.response.data);
      throw error.response.data;
    }
  },
};

export default loginAPI;
