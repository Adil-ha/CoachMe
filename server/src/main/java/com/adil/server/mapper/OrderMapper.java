package com.adil.server.mapper;

import com.adil.server.dto.OrderDTO;
import com.adil.server.entity.Order;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface OrderMapper {
    @Mapping(source = "user.id", target = "userId")
    OrderDTO toDto(Order order);

    @Mapping(source = "userId", target = "user.id")
    Order toEntity(OrderDTO orderDTO);
}
