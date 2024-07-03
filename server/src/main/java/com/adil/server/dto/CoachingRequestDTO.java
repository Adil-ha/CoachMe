package com.adil.server.dto;

import com.adil.server.entity.enums.RequestStatus;
import com.adil.server.entity.enums.RequestType;
import lombok.*;

import java.time.LocalDateTime;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CoachingRequestDTO {
    private Long id;
    private RequestType type;
    private LocalDateTime requestDateTime;
    private RequestStatus status;
    private Long userId;
    private Long serviceId;
}
