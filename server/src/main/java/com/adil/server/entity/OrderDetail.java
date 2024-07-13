package com.adil.server.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "T_Order_Detail")
public class OrderDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "OD_idOrder_detail")
    private Long id;

    @Column(name = "OD_quantity", nullable = false)
    private int quantity;

    @ManyToOne
    @JoinColumn(name = "B_idBook", nullable = false)
    private Book book;

    @ManyToOne
    @JoinColumn(name = "O_idOrder",nullable = false)
    private Order order;
}
