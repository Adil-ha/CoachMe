package com.adil.server.dto;

import com.adil.server.entity.enums.OrderStatus;
import lombok.*;

import java.time.LocalDateTime;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderDTO {
    private Long id;
    private LocalDateTime orderDate;
    private OrderStatus status;
    private Long userId;
    private float tva;
    private float totalAmount;
}
