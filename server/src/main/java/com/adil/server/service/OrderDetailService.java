package com.adil.server.service;

import com.adil.server.dto.OrderDetailDTO;

import java.util.List;

public interface OrderDetailService {

    OrderDetailDTO createOrderDetail(OrderDetailDTO orderDetailDTO);
    OrderDetailDTO getOrderDetailById(Long id);
    List<OrderDetailDTO> getAllOrderDetails();
    OrderDetailDTO updateOrderDetail(Long id, OrderDetailDTO orderDetailDTO);
    void deleteOrderDetail(Long id);
}
