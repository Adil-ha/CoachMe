package com.adil.server.mapper;

import com.adil.server.dto.OrderDTO;
import com.adil.server.dto.OrderDetailDTO;
import com.adil.server.entity.Order;
import com.adil.server.entity.OrderDetail;
import com.adil.server.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class OrderMapperr {

    private final UserRepository userRepository;
    private final OrderDetailMapper orderDetailMapper;

    @Autowired
    public OrderMapperr(UserRepository userRepository, OrderDetailMapper orderDetailMapper) {
        this.userRepository = userRepository;
        this.orderDetailMapper = orderDetailMapper;
    }

    public OrderDTO toDto(Order order) {
        if (order == null) {
            return null;
        }

        List<OrderDetailDTO> orderDetailDTOList = order.getOrderDetails().stream()
                .map(orderDetailMapper::toDto)
                .collect(Collectors.toList());

        return OrderDTO.builder()
                .id(order.getId())
                .orderDate(order.getOrderDate())
                .status(order.getStatus())
                .userId(order.getUser() != null ? order.getUser().getId() : null)
                .totalAmount(calculateTotalAmount(order))
                .orderDetailDTOS(orderDetailDTOList)
                .build();
    }

    public Order toEntity(OrderDTO orderDTO) {
        if (orderDTO == null) {
            return null;
        }

        Order.OrderBuilder builder = Order.builder()
                .id(orderDTO.getId())
                .orderDate(orderDTO.getOrderDate())
                .status(orderDTO.getStatus());

        if (orderDTO.getUserId() != null) {
            userRepository.findById(orderDTO.getUserId())
                    .ifPresent(builder::user);
        }

        Order order = builder.build();

        if (orderDTO.getOrderDetailDTOS() != null) {
            List<OrderDetail> orderDetails = orderDTO.getOrderDetailDTOS().stream()
                    .map(orderDetailMapper::toEntity)
                    .peek(orderDetail -> orderDetail.setOrder(order))
                    .collect(Collectors.toList());
            order.setOrderDetails(orderDetails);
        }

        return order;
    }

    private float calculateTotalAmount(Order order) {
        if (order == null || order.getOrderDetails() == null) {
            return 0.0f;
        }

        return (float) order.getOrderDetails().stream()
                .mapToDouble(orderDetail -> orderDetail.getQuantity() * orderDetail.getBook().getPrice())
                .sum();
    }
}




