package com.adil.server.mapper;

import com.adil.server.dto.OrderDTO;
import com.adil.server.entity.Order;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface OrderMapper {

    @Mapping(target = "userId", source = "user.id")
    OrderDTO toDto(Order order);

    @Mapping(target = "user", ignore = true)
    Order toEntity(OrderDTO orderDTO);

    @Mapping(target = "user", ignore = true)
    void updateFromDto(OrderDTO orderDTO, @MappingTarget Order order);
}

