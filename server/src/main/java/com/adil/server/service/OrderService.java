package com.adil.server.service;

import com.adil.server.dto.OrderDTO;
import com.adil.server.dto.OrderDetailDTO;
import com.adil.server.entity.enums.OrderStatus;

import java.util.List;

public interface OrderService {

    OrderDTO createOrder(OrderDTO orderDTO);

    OrderDTO getOrderById(Long orderId);

    List<OrderDTO> getAllOrders();

    void addBookToOrder(Long orderId, OrderDetailDTO orderDetailDTO);

    void removeBookFromOrder(Long orderId, Long bookId);

    void deleteOrder(Long orderId);

    void updateOrderStatus(Long orderId, OrderStatus newStatus);

}
