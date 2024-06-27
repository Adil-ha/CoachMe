package com.adil.server.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "T_Book")
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "B_idBook")
    private Long id;

    @Column(name = "B_title", nullable = false, unique = true)
    private String title;

    @Column(name = "B_author", nullable = false)
    private String author;

    @Column(name = "B_price", nullable = false)
    private float price;

    @Column(name = "B_description", nullable = false)
    private String description;

    @Column(name = "B_image", nullable = false)
    private String image;
}
