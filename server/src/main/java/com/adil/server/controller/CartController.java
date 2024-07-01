package com.adil.server.controller;

import com.adil.server.dto.CartDTO;
import com.adil.server.service.CartService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/carts")
@AllArgsConstructor
public class CartController {
    private final CartService cartService;

    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_USER')")
    @PostMapping
    public ResponseEntity<CartDTO> createCart(@RequestBody CartDTO cartDTO) {
        CartDTO createdCart = cartService.createCart(cartDTO);
        return ResponseEntity.ok(createdCart);
    }

    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_USER')")
    @GetMapping("/user/{userId}")
    public ResponseEntity<CartDTO> getCartByUserId(@PathVariable Long userId) {
        CartDTO cart = cartService.getCartByUserId(userId);
        return ResponseEntity.ok(cart);
    }

    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_USER')")
    @PostMapping("/{cartId}/books/{bookId}")
    public ResponseEntity<Void> addBookToCart(@PathVariable Long cartId, @PathVariable Long bookId, @RequestParam int quantity) {
        cartService.addBookToCart(cartId, bookId, quantity);
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_USER')")
    @DeleteMapping("/{cartId}/books/{bookId}")
    public ResponseEntity<Void> removeBookFromCart(@PathVariable Long cartId, @PathVariable Long bookId) {
        cartService.removeBookFromCart(cartId, bookId);
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_USER')")
    @GetMapping("/{cartId}/total")
    public ResponseEntity<Double> calculateTotalAmount(@PathVariable Long cartId) {
        double totalAmount = cartService.calculateTotalAmount(cartId);
        return ResponseEntity.ok(totalAmount);
    }
}
