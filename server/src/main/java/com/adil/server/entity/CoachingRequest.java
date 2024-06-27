package com.adil.server.entity;

import com.adil.server.entity.enums.RequestStatus;
import com.adil.server.entity.enums.RequestType;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "T_Coaching_Request")
public class CoachingRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CR_idCoaching_request")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "CR_type", nullable = false)
    private RequestType type;

    @Column(name = "CR_requestDateTime", nullable = false)
    private LocalDateTime requestDateTime;

    @Enumerated(EnumType.STRING)
    @Column(name = "CR_status", nullable = false)
    private RequestStatus status;

    @ManyToOne
    @JoinColumn(name = "U_idUser", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "S_idService", nullable = false)
    private Service service;
}
