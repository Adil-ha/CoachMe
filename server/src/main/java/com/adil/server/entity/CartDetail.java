package com.adil.server.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "T_Cart_Detail")
public class CartDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CD_idCart_detail")
    private Long id;

    @Column(name = "CD_quantity", nullable = false)
    private int quantity;

    @ManyToOne
    @JoinColumn(name = "C_idCart", nullable = false)
    private Cart cart;

    @ManyToOne
    @JoinColumn(name = "B_idBook", nullable = false)
    private Book book;
}
