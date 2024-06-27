package com.adil.server.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "T_Address")
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "A_idAddress")
    private Long id;

    @Column(name = "A_number", nullable = false)
    private String number;

    @Column(name = "A_street", nullable = false)
    private String street;

    @Column(name = "A_town", nullable = false)
    private String town;

    @Column(name = "A_code", nullable = false)
    private String code;

    @Column(name = "A_country", nullable = false)
    private String country;

    @ManyToOne
    @JoinColumn(name = "U_idUser", nullable = false)
    private User user;
}
