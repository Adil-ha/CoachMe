package com.adil.server.mapper;

import com.adil.server.dto.CartDTO;
import com.adil.server.dto.CartDetailDTO;
import com.adil.server.entity.Cart;
import com.adil.server.entity.CartDetail;
import com.adil.server.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class CartMapperr {
    private final UserRepository userRepository;
    private final CartDetailMapperr cartDetailMapper;

    @Autowired
    public CartMapperr(UserRepository userRepository, CartDetailMapperr cartDetailMapper) {
        this.userRepository = userRepository;
        this.cartDetailMapper = cartDetailMapper;
    }

    public CartDTO toDto(Cart cart) {
        if (cart == null) {
            return null;
        }

        List<CartDetailDTO> cartDetailDTOList = cart.getCartDetails().stream()
                .map(cartDetailMapper::toDto)
                .collect(Collectors.toList());

        return CartDTO.builder()
                .id(cart.getId())
                .userId(cart.getUser() != null ? cart.getUser().getId() : null)
                .totalAmount(calculateTotalAmount(cart))
                .cartDetailDTOList(cartDetailDTOList)
                .build();
    }

    public Cart toEntity(CartDTO cartDTO) {
        if (cartDTO == null) {
            return null;
        }

        Cart.CartBuilder builder = Cart.builder()
                .id(cartDTO.getId());

        if (cartDTO.getUserId() != null) {
            userRepository.findById(cartDTO.getUserId())
                    .ifPresent(builder::user);
        }

        Cart cart = builder.build();
        if (cartDTO.getCartDetailDTOList() != null) {
            List<CartDetail> cartDetails = cartDTO.getCartDetailDTOList().stream()
                    .map(cartDetailMapper::toEntity)
                    .peek(cartDetail -> cartDetail.setCart(cart))
                    .collect(Collectors.toList());
            cart.setCartDetails(cartDetails);
        }

        return cart;
    }

    private float calculateTotalAmount(Cart cart) {
        if (cart == null || cart.getCartDetails() == null) {
            return 0.0f;
        }

        return (float) cart.getCartDetails().stream()
                .mapToDouble(cartDetail -> cartDetail.getQuantity() * cartDetail.getBook().getPrice())
                .sum();
    }
}
