package com.adil.server.mapper;

import com.adil.server.dto.CartDTO;
import com.adil.server.entity.Cart;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface CartMapper {
    @Mapping(source = "user.id", target = "userId")
    CartDTO toDto(Cart cart);

    @Mapping(source = "userId", target = "user.id")
    Cart toEntity(CartDTO cartDTO);

    @AfterMapping
    default void calculateTotalAmount(Cart cart, @MappingTarget CartDTO cartDTO) {
        double totalAmount = cart.getCartDetails().stream()
                .mapToDouble(cartDetail -> cartDetail.getQuantity() * cartDetail.getBook().getPrice())
                .sum();
        cartDTO.setTotalAmount((float) totalAmount);
    }
}