package com.adil.server.controller;

import com.adil.server.dto.CartDetailDTO;
import com.adil.server.service.CartDetailService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cart-details")
@AllArgsConstructor
public class CartDetailController {

    private final CartDetailService cartDetailService;
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_USER')")
    @PostMapping("/{cartId}/books/{bookId}")
    public ResponseEntity<CartDetailDTO> addCartDetail(@PathVariable Long cartId, @PathVariable Long bookId, @RequestParam int quantity) {
        CartDetailDTO cartDetail = cartDetailService.addCartDetail(cartId, bookId, quantity);
        return ResponseEntity.ok(cartDetail);
    }

    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_USER')")
    @DeleteMapping("/{cartDetailId}")
    public ResponseEntity<Void> removeCartDetail(@PathVariable Long cartDetailId) {
        cartDetailService.removeCartDetail(cartDetailId);
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_USER')")
    @PutMapping("/{cartDetailId}")
    public ResponseEntity<CartDetailDTO> updateCartDetailQuantity(@PathVariable Long cartDetailId, @RequestParam int quantity) {
        CartDetailDTO updatedCartDetail = cartDetailService.updateCartDetailQuantity(cartDetailId, quantity);
        return ResponseEntity.ok(updatedCartDetail);
    }
}
