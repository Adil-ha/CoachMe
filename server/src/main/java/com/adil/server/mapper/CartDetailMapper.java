package com.adil.server.mapper;

import com.adil.server.dto.CartDetailDTO;
import com.adil.server.entity.CartDetail;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CartDetailMapper {
    @Mapping(source = "cart.id", target = "cartId")
    @Mapping(source = "book.id", target = "bookId")
    CartDetailDTO toDto(CartDetail cartDetail);

    @Mapping(source = "cartId", target = "cart.id")
    @Mapping(source = "bookId", target = "book.id")
    CartDetail toEntity(CartDetailDTO cartDetailDTO);
}