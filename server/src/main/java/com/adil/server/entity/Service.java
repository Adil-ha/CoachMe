package com.adil.server.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "T_Service")
public class Service {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "S_idService")
    private Long id;

    @Column(name = "S_type", nullable = false, unique = true)
    private String type;

    @Column(length = 10000, name = "S_description", nullable = false)
    private String description;

    @Column(name = "S_image")
    private String image;
}
