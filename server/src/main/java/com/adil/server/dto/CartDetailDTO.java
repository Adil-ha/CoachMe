package com.adil.server.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartDetailDTO {
    private Long id;
    private int quantity;
    private Long cartId;
    private Long bookId;

}
