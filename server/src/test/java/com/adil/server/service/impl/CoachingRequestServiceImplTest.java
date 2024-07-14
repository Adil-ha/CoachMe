package com.adil.server.service.impl;

import com.adil.server.dto.CoachingRequestDTO;
import com.adil.server.entity.CoachingRequest;
import com.adil.server.entity.Performance;
import com.adil.server.entity.User;
import com.adil.server.entity.enums.RequestStatus;
import com.adil.server.entity.enums.RequestType;
import com.adil.server.mapper.CoachingRequestMapper;
import com.adil.server.repository.CoachingRequestRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CoachingRequestServiceImplTest {

    @Mock
    private CoachingRequestRepository coachingRequestRepository;

    @Mock
    private CoachingRequestMapper coachingRequestMapper;

    @InjectMocks
    private CoachingRequestServiceImpl coachingRequestService;

    private CoachingRequest coachingRequest;
    private CoachingRequestDTO coachingRequestDTO;
    private User user;
    private Performance performance;

    @BeforeEach
    void setUp() {
        user = User.builder().id(1L).name("Test User").build();
        performance = Performance.builder().id(1L).type("Test Performance").build();

        coachingRequest = CoachingRequest.builder()
                .id(1L)
                .type(RequestType.HOME)
                .requestDateTime(LocalDateTime.now())
                .status(RequestStatus.PENDING)
                .user(user)
                .performance(performance)
                .build();

        coachingRequestDTO = CoachingRequestDTO.builder()
                .id(1L)
                .type(RequestType.HOME)
                .status(RequestStatus.PENDING)
                .userId(user.getId())
                .performanceId(performance.getId())
                .build();
    }

    @Test
    void createCoachingRequest_Success() {
        when(coachingRequestMapper.toEntity(any(CoachingRequestDTO.class))).thenReturn(coachingRequest);
        when(coachingRequestRepository.save(any(CoachingRequest.class))).thenReturn(coachingRequest);
        when(coachingRequestMapper.toDto(any(CoachingRequest.class))).thenReturn(coachingRequestDTO);

        CoachingRequestDTO result = coachingRequestService.createCoachingRequest(coachingRequestDTO);

        assertNotNull(result);
        assertEquals(coachingRequestDTO.getType(), result.getType());
        verify(coachingRequestRepository, times(1)).save(coachingRequest);
    }

    @Test
    void getCoachingRequestById_Success() {
        when(coachingRequestRepository.findById(anyLong())).thenReturn(Optional.of(coachingRequest));
        when(coachingRequestMapper.toDto(any(CoachingRequest.class))).thenReturn(coachingRequestDTO);

        CoachingRequestDTO result = coachingRequestService.getCoachingRequestById(1L);

        assertNotNull(result);
        assertEquals(coachingRequestDTO.getType(), result.getType());
    }

    @Test
    void getCoachingRequestById_NotFound() {
        when(coachingRequestRepository.findById(anyLong())).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            coachingRequestService.getCoachingRequestById(1L);
        });

        assertEquals("Coaching request not found", exception.getMessage());
    }

    @Test
    void getAllCoachingRequests_Success() {
        List<CoachingRequest> coachingRequests = Arrays.asList(coachingRequest);
        when(coachingRequestRepository.findAll()).thenReturn(coachingRequests);
        when(coachingRequestMapper.toDto(any(CoachingRequest.class))).thenReturn(coachingRequestDTO);

        List<CoachingRequestDTO> result = coachingRequestService.getAllCoachingRequests();

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(coachingRequestDTO.getType(), result.get(0).getType());
    }

    @Test
    void updateCoachingRequestStatus_Success() {
        when(coachingRequestRepository.findById(anyLong())).thenReturn(Optional.of(coachingRequest));

        coachingRequestService.updateCoachingRequestStatus(1L, RequestStatus.CONFIRMED);

        assertEquals(RequestStatus.CONFIRMED, coachingRequest.getStatus());
        verify(coachingRequestRepository, times(1)).save(coachingRequest);
    }

    @Test
    void updateCoachingRequestStatus_NotFound() {
        when(coachingRequestRepository.findById(anyLong())).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            coachingRequestService.updateCoachingRequestStatus(1L, RequestStatus.CONFIRMED);
        });

        assertEquals("Coaching request not found", exception.getMessage());
        verify(coachingRequestRepository, never()).save(any(CoachingRequest.class));
    }

    @Test
    void deleteCoachingRequest_Success() {
        when(coachingRequestRepository.findById(anyLong())).thenReturn(Optional.of(coachingRequest));

        coachingRequestService.deleteCoachingRequest(1L);

        verify(coachingRequestRepository, times(1)).delete(coachingRequest);
    }

    @Test
    void deleteCoachingRequest_NotFound() {
        when(coachingRequestRepository.findById(anyLong())).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            coachingRequestService.deleteCoachingRequest(1L);
        });

        assertEquals("Coaching request not found", exception.getMessage());
        verify(coachingRequestRepository, never()).delete(any(CoachingRequest.class));
    }
}
