package com.adil.server.mapper;

import com.adil.server.dto.CartDetailDTO;
import com.adil.server.entity.CartDetail;
import com.adil.server.repository.BookRepository;
import com.adil.server.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CartDetailMapperr {

    private final CartRepository cartRepository;
    private final BookRepository bookRepository;

    @Autowired
    public CartDetailMapperr(CartRepository cartRepository, BookRepository bookRepository) {
        this.cartRepository = cartRepository;
        this.bookRepository = bookRepository;
    }

    public CartDetailDTO toDto(CartDetail cartDetail) {
        if (cartDetail == null) {
            return null;
        }

        return CartDetailDTO.builder()
                .id(cartDetail.getId())
                .quantity(cartDetail.getQuantity())
                .cartId(cartDetail.getCart() != null ? cartDetail.getCart().getId() : null)
                .bookId(cartDetail.getBook() != null ? cartDetail.getBook().getId() : null)
                .build();
    }

    public CartDetail toEntity(CartDetailDTO cartDetailDTO) {
        if (cartDetailDTO == null) {
            return null;
        }

        CartDetail.CartDetailBuilder builder = CartDetail.builder()
                .id(cartDetailDTO.getId())
                .quantity(cartDetailDTO.getQuantity());

        if (cartDetailDTO.getCartId() != null) {
            cartRepository.findById(cartDetailDTO.getCartId())
                    .ifPresent(builder::cart);
        }

        if (cartDetailDTO.getBookId() != null) {
            bookRepository.findById(cartDetailDTO.getBookId())
                    .ifPresent(builder::book);
        }

        return builder.build();
    }
}
