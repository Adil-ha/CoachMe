package com.adil.server.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class OrderDetailDTO {
    private Long id;
    private int quantity;
    private Long bookId;
    private Long orderId;
}
