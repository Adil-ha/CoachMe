package com.adil.server.service;

import com.adil.server.dto.OrderDTO;
import com.adil.server.entity.enums.OrderStatus;

import java.util.List;

public interface OrderService {
    OrderDTO createOrder(OrderDTO orderDTO);
    OrderDTO getOrderById(Long orderId);
    List<OrderDTO> getOrdersByUserId(Long userId);
    OrderDTO updateOrderStatus(Long orderId, OrderStatus status);
    void deleteOrder(Long orderId);
}
