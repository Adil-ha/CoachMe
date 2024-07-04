package com.adil.server.controller;

import com.adil.server.dto.CoachingRequestDTO;
import com.adil.server.dto.ReponseMessage;
import com.adil.server.entity.enums.RequestStatus;
import com.adil.server.service.CoachingRequestService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/coaching-requests")
@AllArgsConstructor
public class CoachingRequestController {
    private final CoachingRequestService coachingRequestService;

    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_USER')")
    @PostMapping
    public ResponseEntity<ReponseMessage> createCoachingRequest(@RequestBody CoachingRequestDTO coachingRequestDTO) {
        CoachingRequestDTO createdRequest = coachingRequestService.createCoachingRequest(coachingRequestDTO);
        ReponseMessage response = ReponseMessage.builder()
                .message("Votre demande de coaching a été créée avec succès!")
                .data(createdRequest)
                .build();
        return ResponseEntity.ok(response);
    }
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @GetMapping("/{id}")
    public ResponseEntity<CoachingRequestDTO> getCoachingRequestById(@PathVariable Long id) {
        CoachingRequestDTO coachingRequest = coachingRequestService.getCoachingRequestById(id);
        return ResponseEntity.ok(coachingRequest);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @GetMapping
    public ResponseEntity<List<CoachingRequestDTO>> getAllCoachingRequests() {
        List<CoachingRequestDTO> coachingRequests = coachingRequestService.getAllCoachingRequests();
        return ResponseEntity.ok(coachingRequests);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PutMapping("/{id}/status")
    public ResponseEntity<Void> updateCoachingRequestStatus(@PathVariable Long id, @RequestParam RequestStatus status) {
        coachingRequestService.updateCoachingRequestStatus(id, status);
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCoachingRequest(@PathVariable Long id) {
        coachingRequestService.deleteCoachingRequest(id);
        return ResponseEntity.noContent().build();
    }
}
