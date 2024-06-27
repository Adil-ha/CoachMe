package com.adil.server.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "T_Cart")
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "C_idCart")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "U_idUser", nullable = false)
    private User user;

    @OneToMany(mappedBy = "cart")
    private List<CartDetail> cartDetails;
}
