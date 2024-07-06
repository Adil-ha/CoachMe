import axiosInstance from "./axiosConfig";

export const addBookToCart = (cartId, bookId, quantity) => {
  const payload = { cartId, bookId, quantity };
  return axiosInstance.post("/cart-details", payload);
};

export const removeBookFromCart = (cartId, bookId) => {
  return axiosInstance.delete(`/carts/${cartId}/books/${bookId}`);
};

export const updateCartDetailQuantity = (cartDetailId, quantity) => {
  const payload = { quantity };
  return axiosInstance.put(`/cart-details/${cartDetailId}`, payload);
};
