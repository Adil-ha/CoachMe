package com.adil.server.mapper;

import com.adil.server.dto.OrderDTO;
import com.adil.server.entity.Order;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface OrderMapper {
    @Mapping(source = "user.id", target = "userId")
    OrderDTO toDto(Order order);

    @Mapping(source = "userId", target = "user.id")
    Order toEntity(OrderDTO orderDTO);

    @AfterMapping
    default void calculateTotalAmount(Order order, @MappingTarget OrderDTO orderDTO) {
        float totalAmount = (float) order.getOrderDetails().stream()
                .mapToDouble(orderDetail -> orderDetail.getQuantity() * orderDetail.getBook().getPrice())
                .sum();
        orderDTO.setTotalAmount(totalAmount);
        orderDTO.setTva(totalAmount * (5.5f / 100));
    }


}
