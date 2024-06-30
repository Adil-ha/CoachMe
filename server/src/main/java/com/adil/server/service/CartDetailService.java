package com.adil.server.service;

import com.adil.server.dto.CartDetailDTO;

public interface CartDetailService {
    CartDetailDTO addCartDetail(Long cartId, Long bookId, int quantity);
    void removeCartDetail(Long cartDetailId);
    CartDetailDTO updateCartDetailQuantity(Long cartDetailId, int quantity);
}
