package com.adil.server.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PerformanceDTO {
    private Long id;
    private String type;
    private String description;
    private String image;
}
