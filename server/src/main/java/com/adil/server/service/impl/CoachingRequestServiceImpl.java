package com.adil.server.service.impl;

import com.adil.server.dto.CoachingRequestDTO;
import com.adil.server.entity.CoachingRequest;
import com.adil.server.entity.enums.RequestStatus;
import com.adil.server.mapper.CoachingRequestMapper;
import com.adil.server.repository.CoachingRequestRepository;

import com.adil.server.service.CoachingRequestService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class CoachingRequestServiceImpl implements CoachingRequestService {
    private final CoachingRequestRepository coachingRequestRepository;
    private final CoachingRequestMapper coachingRequestMapper;

    @Override
    public CoachingRequestDTO createCoachingRequest(CoachingRequestDTO coachingRequestDTO) {
        CoachingRequest coachingRequest = coachingRequestMapper.toEntity(coachingRequestDTO);
        coachingRequest.setStatus(RequestStatus.PENDING);
        coachingRequest.setRequestDateTime(LocalDateTime.now());
        CoachingRequest savedCoachingRequest = coachingRequestRepository.save(coachingRequest);
        return coachingRequestMapper.toDto(savedCoachingRequest);
    }

    @Override
    public CoachingRequestDTO getCoachingRequestById(Long id) {
        CoachingRequest coachingRequest = coachingRequestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Coaching request not found"));
        return coachingRequestMapper.toDto(coachingRequest);
    }

    @Override
    public List<CoachingRequestDTO> getAllCoachingRequests() {
        return coachingRequestRepository.findAll().stream()
                .map(coachingRequestMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public void updateCoachingRequestStatus(Long id, RequestStatus status) {
        CoachingRequest coachingRequest = coachingRequestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Coaching request not found"));
        coachingRequest.setStatus(status);
        coachingRequestRepository.save(coachingRequest);
    }

    @Override
    public void deleteCoachingRequest(Long id) {
        CoachingRequest coachingRequest = coachingRequestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Coaching request not found"));
        coachingRequestRepository.delete(coachingRequest);
    }
}

