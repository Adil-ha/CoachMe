package com.adil.server.service.impl;

import com.adil.server.dto.CartDetailDTO;
import com.adil.server.entity.Book;
import com.adil.server.entity.Cart;
import com.adil.server.entity.CartDetail;
import com.adil.server.mapper.CartDetailMapper;
import com.adil.server.repository.BookRepository;
import com.adil.server.repository.CartDetailRepository;
import com.adil.server.repository.CartRepository;
import com.adil.server.service.CartDetailService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class CartDetailServiceImpl implements CartDetailService {
    private final CartDetailRepository cartDetailRepository;
    private final CartRepository cartRepository;
    private final BookRepository bookRepository;
    private final CartDetailMapper cartDetailMapper;

    @Override
    public CartDetailDTO addCartDetail(Long cartId, Long bookId, int quantity) {
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new RuntimeException("Book not found"));

        CartDetail cartDetail = CartDetail.builder()
                .cart(cart)
                .book(book)
                .quantity(quantity)
                .build();

        CartDetail savedCartDetail = cartDetailRepository.save(cartDetail);
        return cartDetailMapper.toDto(savedCartDetail);
    }

    @Override
    public void removeCartDetail(Long cartDetailId) {
        CartDetail cartDetail = cartDetailRepository.findById(cartDetailId)
                .orElseThrow(() -> new RuntimeException("Cart detail not found"));

        cartDetailRepository.delete(cartDetail);
    }

    @Override
    public CartDetailDTO updateCartDetailQuantity(Long cartDetailId, int quantity) {
        CartDetail cartDetail = cartDetailRepository.findById(cartDetailId)
                .orElseThrow(() -> new RuntimeException("Cart detail not found"));

        cartDetail.setQuantity(quantity);

        CartDetail updatedCartDetail = cartDetailRepository.save(cartDetail);
        return cartDetailMapper.toDto(updatedCartDetail);
    }
}
