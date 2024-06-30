package com.adil.server.service;

import com.adil.server.dto.CoachingRequestDTO;
import com.adil.server.entity.enums.RequestStatus;

import java.util.List;

public interface CoachingRequestService {
    CoachingRequestDTO createCoachingRequest(CoachingRequestDTO coachingRequestDTO);
    CoachingRequestDTO getCoachingRequestById(Long id);
    List<CoachingRequestDTO> getAllCoachingRequests();
    void updateCoachingRequestStatus(Long id, RequestStatus status);
    void deleteCoachingRequest(Long id);
}
