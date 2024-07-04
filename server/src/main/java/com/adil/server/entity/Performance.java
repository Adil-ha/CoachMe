package com.adil.server.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "T_Performance")
public class Performance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "P_idPerformance")
    private Long id;

    @Column(name = "P_type", nullable = false, unique = true)
    private String type;

    @Column(length = 10000, name = "P_description", nullable = false)
    private String description;

    @Column(name = "P_image")
    private String image;
}
