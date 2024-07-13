package com.adil.server.dto;

import com.adil.server.entity.enums.OrderStatus;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class OrderDTO {
    private Long id;
    private LocalDateTime orderDate;
    private OrderStatus status;
    private Long userId;
    private float totalAmount;
    private List<OrderDetailDTO> orderDetailDTOS= new ArrayList<>();
}
