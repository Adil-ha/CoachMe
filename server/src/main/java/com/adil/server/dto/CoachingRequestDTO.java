package com.adil.server.dto;

import lombok.*;

import java.time.LocalDateTime;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CoachingRequestDTO {
    private Long id;
    private String type;
    private LocalDateTime requestDateTime;
    private String status;
    private Long userId;
    private Long serviceId;
}
