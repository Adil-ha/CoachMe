package com.adil.server.service.impl;

import com.adil.server.dto.OrderDetailDTO;
import com.adil.server.entity.OrderDetail;
import com.adil.server.mapper.OrderDetailMapper;
import com.adil.server.repository.OrderDetailRepository;
import com.adil.server.service.OrderDetailService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class OrderDetailServiceImpl implements OrderDetailService {

    private final OrderDetailRepository orderDetailRepository;
    private final OrderDetailMapper orderDetailMapper;

    @Override
    public OrderDetailDTO createOrderDetail(OrderDetailDTO orderDetailDTO) {
        OrderDetail orderDetail = orderDetailMapper.toEntity(orderDetailDTO);
        OrderDetail savedOrderDetail = orderDetailRepository.save(orderDetail);
        return orderDetailMapper.toDto(savedOrderDetail);
    }

    @Override
    public OrderDetailDTO getOrderDetailById(Long id) {
        OrderDetail orderDetail = orderDetailRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("OrderDetail not found"));
        return orderDetailMapper.toDto(orderDetail);
    }

    @Override
    public List<OrderDetailDTO> getAllOrderDetails() {
        return orderDetailRepository.findAll().stream()
                .map(orderDetailMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public OrderDetailDTO updateOrderDetail(Long id, OrderDetailDTO orderDetailDTO) {
        OrderDetail orderDetail = orderDetailRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("OrderDetail not found"));
        orderDetail.setQuantity(orderDetailDTO.getQuantity());
        orderDetail.setBook(orderDetailMapper.toEntity(orderDetailDTO).getBook());
        orderDetail.setOrder(orderDetailMapper.toEntity(orderDetailDTO).getOrder());
        OrderDetail updatedOrderDetail = orderDetailRepository.save(orderDetail);
        return orderDetailMapper.toDto(updatedOrderDetail);
    }

    @Override
    public void deleteOrderDetail(Long id) {
        OrderDetail orderDetail = orderDetailRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("OrderDetail not found"));
        orderDetailRepository.delete(orderDetail);
    }
}

