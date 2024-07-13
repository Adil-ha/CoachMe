package com.adil.server.service.impl;

import com.adil.server.dto.CartDTO;
import com.adil.server.dto.CartDetailDTO;
import com.adil.server.entity.Book;
import com.adil.server.entity.Cart;
import com.adil.server.entity.CartDetail;
import com.adil.server.mapper.CartMapperr;
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
    private final CartMapperr cartMapper;
    private final BookRepository bookRepository;

    @Override
    public CartDTO createCart(CartDTO cartDTO) {
        Cart cart = cartMapper.toEntity(cartDTO);
        Cart savedCart = cartRepository.save(cart);
        return cartMapper.toDto(savedCart);
    }

    @Override
    public CartDTO getCartByUserId(Long userId) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Cart not found"));
        updateTotalAmount(cart); // Met à jour le montant total du panier
        return cartMapper.toDto(cart);
    }

    @Override
    public void addBookToCart(Long cartId, CartDetailDTO cartDetailDTO) {
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        Book book = bookRepository.findById(cartDetailDTO.getBookId())
                .orElseThrow(() -> new RuntimeException("Book not found"));

        Optional<CartDetail> existingCartDetailOptional = cart.getCartDetails().stream()
                .filter(cartDetail -> cartDetail.getBook().getId().equals(cartDetailDTO.getBookId()))
                .findFirst();

        if (existingCartDetailOptional.isPresent()) {
            CartDetail existingCartDetail = existingCartDetailOptional.get();
            existingCartDetail.setQuantity(existingCartDetail.getQuantity() + cartDetailDTO.getQuantity());
        } else {
            CartDetail cartDetail = CartDetail.builder()
                    .cart(cart)
                    .book(book)
                    .quantity(cartDetailDTO.getQuantity())
                    .build();
            cart.getCartDetails().add(cartDetail);
        }

        cartRepository.save(cart);
        updateTotalAmount(cart);
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

        updateTotalAmount(cart);
    }

    @Override
    public void clearCart(Long cartId) {
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        cart.getCartDetails().clear();
        cartRepository.save(cart);

        updateTotalAmount(cart);
    }

    private void updateTotalAmount(Cart cart) {
        double totalAmount = cart.getCartDetails().stream()
                .mapToDouble(cartDetail -> cartDetail.getQuantity() * cartDetail.getBook().getPrice())
                .sum();

    }
}
