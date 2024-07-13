package com.adil.server.wrapper;

import com.adil.server.entity.enums.OrderStatus;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderStatusWrapper {
    private OrderStatus orderStatus;
}
