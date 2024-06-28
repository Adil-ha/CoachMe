package com.adil.server.entity;

import com.adil.server.entity.enums.OrderStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "T_Order")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "O_idOrder")
    private Long id;

    @Column(name = "O_orderDate", nullable = false)
    private LocalDateTime orderDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "O_status", nullable = false)
    private OrderStatus status;

    @Column(name = "O_tva", nullable = false)
    private float tva;

    @ManyToOne
    @JoinColumn(name = "U_idUser", nullable = false)
    private User user;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderDetail> orderDetails;
}
