package com.adil.server.mapper;

import com.adil.server.dto.CartDTO;
import com.adil.server.entity.Cart;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CartMapper {
    @Mapping(source = "user.id", target = "userId")
    CartDTO toDto(Cart cart);

    @Mapping(source = "userId", target = "user.id")
    Cart toEntity(CartDTO cartDTO);
}