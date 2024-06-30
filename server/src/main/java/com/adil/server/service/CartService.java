package com.adil.server.service;

import com.adil.server.dto.CartDTO;

public interface CartService {
    CartDTO createCart(CartDTO cartDTO);
    CartDTO getCartByUserId(Long userId);
    void addBookToCart(Long cartId, Long bookId, int quantity);
    void removeBookFromCart(Long cartId, Long bookId);
    double calculateTotalAmount(Long cartId);
}
