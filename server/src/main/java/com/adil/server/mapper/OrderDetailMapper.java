package com.adil.server.mapper;

import com.adil.server.dto.OrderDetailDTO;
import com.adil.server.entity.OrderDetail;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface OrderDetailMapper {
    @Mapping(source = "book.id", target = "bookId")
    @Mapping(source = "order.id", target = "orderId")
    OrderDetailDTO toDto(OrderDetail orderDetail);

    @Mapping(source = "bookId", target = "book.id")
    @Mapping(source = "orderId", target = "order.id")
    OrderDetail toEntity(OrderDetailDTO orderDetailDTO);
}
