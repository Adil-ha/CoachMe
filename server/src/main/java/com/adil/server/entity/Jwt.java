package com.adil.server.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "T_Jwt")
public class Jwt {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JoinColumn(name = "J_id")
    private Long id;

    @JoinColumn(name = "J_value")
    private String value;

    @JoinColumn(name = "J_isDisable")
    private boolean isDisable;

    @JoinColumn(name = "J_isExpirate")
    private boolean isExpirate;

    @ManyToOne(cascade = {CascadeType.DETACH,CascadeType.MERGE})
    @JoinColumn(name = "U_idUser")
    private User user;
}
