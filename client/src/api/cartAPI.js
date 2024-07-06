import axiosInstance from "./axiosConfig";

export const fetchCartByUserId = (userId) => {
  return axiosInstance.get(`/carts/user/${userId}`);
};

export const createCart = (cartData) => {
  return axiosInstance.post("/carts", cartData);
};

export const calculateTotalAmount = (cartId) => {
  return axiosInstance.get(`/carts/${cartId}/total`);
};
