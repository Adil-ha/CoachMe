package com.adil.server.dto;


import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartDTO {
    private Long id;
    private Long userId;
    private float totalAmount;
    private List<CartDetailDTO> cartDetailDTOList= new ArrayList<>();
}
