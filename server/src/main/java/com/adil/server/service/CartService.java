package com.adil.server.service;

import com.adil.server.dto.CartDTO;
import com.adil.server.dto.CartDetailDTO;

public interface CartService {
    CartDTO createCart(CartDTO cartDTO);
    CartDTO getCartByUserId(Long userId);
    void addBookToCart(Long cartId, CartDetailDTO cartDetailDTO);
    void removeBookFromCart(Long cartId, Long bookId);

     void clearCart(Long cartId);

}
