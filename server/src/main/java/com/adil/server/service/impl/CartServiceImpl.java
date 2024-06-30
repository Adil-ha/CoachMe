package com.adil.server.service.impl;

import com.adil.server.dto.CartDTO;
import com.adil.server.entity.Book;
import com.adil.server.entity.Cart;
import com.adil.server.entity.CartDetail;
import com.adil.server.mapper.CartMapper;
import com.adil.server.repository.BookRepository;
import com.adil.server.repository.CartRepository;
import com.adil.server.service.CartService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class CartServiceImpl implements CartService {
    private final CartRepository cartRepository;
    private final CartMapper cartMapper;
    private final BookRepository bookRepository;

    @Override
    public CartDTO createCart(CartDTO cartDTO) {
        Cart cart = cartMapper.toEntity(cartDTO);
        Cart savedCart = cartRepository.save(cart);
        return cartMapper.toDto(savedCart);
    }

    @Override
    public CartDTO getCartByUserId(Long userId) {
        Cart cart = cartRepository.findByUserId(userId).orElseThrow(() -> new RuntimeException("Cart not found"));
        return cartMapper.toDto(cart);
    }

    @Override
    public void addBookToCart(Long cartId, Long bookId, int quantity) {
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new RuntimeException("Book not found"));

        Optional<CartDetail> existingCartDetailOptional = cart.getCartDetails().stream()
                .filter(cartDetail -> cartDetail.getBook().getId().equals(bookId))
                .findFirst();

        if (existingCartDetailOptional.isPresent()) {
            CartDetail existingCartDetail = existingCartDetailOptional.get();
            existingCartDetail.setQuantity(existingCartDetail.getQuantity() + quantity);
        } else {
            CartDetail cartDetail = CartDetail.builder()
                    .cart(cart)
                    .book(book)
                    .quantity(quantity)
                    .build();
            cart.getCartDetails().add(cartDetail);
        }

        cartRepository.save(cart);
    }


    @Override
    public void removeBookFromCart(Long cartId, Long bookId) {
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        Optional<CartDetail> existingCartDetailOptional = cart.getCartDetails().stream()
                .filter(cartDetail -> cartDetail.getBook().getId().equals(bookId))
                .findFirst();

        if (existingCartDetailOptional.isPresent()) {
            CartDetail existingCartDetail = existingCartDetailOptional.get();
            cart.getCartDetails().remove(existingCartDetail);
            cartRepository.save(cart);
        } else {
            throw new RuntimeException("Book not found in the cart");
        }
    }


    @Override
    public double calculateTotalAmount(Long cartId) {
        Cart cart = cartRepository.findById(cartId).orElseThrow(() -> new RuntimeException("Cart not found"));
        return cart.getCartDetails().stream()
                .mapToDouble(cartDetail -> cartDetail.getQuantity() * cartDetail.getBook().getPrice())
                .sum();
    }
}
