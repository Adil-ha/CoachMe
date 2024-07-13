package com.adil.server.mapper;

import com.adil.server.dto.OrderDetailDTO;
import com.adil.server.entity.OrderDetail;
import com.adil.server.repository.BookRepository;
import com.adil.server.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class OrderDetailMapperr {

    private final OrderRepository orderRepository;
    private final BookRepository bookRepository;

    @Autowired
    public OrderDetailMapperr(OrderRepository orderRepository, BookRepository bookRepository) {
        this.orderRepository = orderRepository;
        this.bookRepository = bookRepository;
    }

    public OrderDetailDTO toDto(OrderDetail orderDetail) {
        if (orderDetail == null) {
            return null;
        }

        return OrderDetailDTO.builder()
                .id(orderDetail.getId())
                .quantity(orderDetail.getQuantity())
                .orderId(orderDetail.getOrder() != null ? orderDetail.getOrder().getId() : null)
                .bookId(orderDetail.getBook() != null ? orderDetail.getBook().getId() : null)
                .build();
    }

    public OrderDetail toEntity(OrderDetailDTO orderDetailDTO) {
        if (orderDetailDTO == null) {
            return null;
        }

        OrderDetail.OrderDetailBuilder builder = OrderDetail.builder()
                .id(orderDetailDTO.getId())
                .quantity(orderDetailDTO.getQuantity());

        if (orderDetailDTO.getOrderId() != null) {
            orderRepository.findById(orderDetailDTO.getOrderId())
                    .ifPresent(builder::order);
        }

        if (orderDetailDTO.getBookId() != null) {
            bookRepository.findById(orderDetailDTO.getBookId())
                    .ifPresent(builder::book);
        }

        return builder.build();
    }
}
