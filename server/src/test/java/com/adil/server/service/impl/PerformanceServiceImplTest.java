package com.adil.server.service.impl;

import com.adil.server.dto.PerformanceDTO;
import com.adil.server.entity.Performance;
import com.adil.server.mapper.PerformanceMapper;
import com.adil.server.repository.PerformanceRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class PerformanceServiceImplTest {

    @Mock
    private PerformanceRepository performanceRepository;

    @Mock
    private PerformanceMapper performanceMapper;

    @InjectMocks
    private PerformanceServiceImpl performanceService;

    private Performance performance;
    private PerformanceDTO performanceDTO;

    @BeforeEach
    void setUp() {
        performance = Performance.builder()
                .id(1L)
                .type("Type1")
                .description("Description1")
                .image("Image1")
                .build();

        performanceDTO = PerformanceDTO.builder()
                .id(1L)
                .type("Type1")
                .description("Description1")
                .image("Image1")
                .build();
    }

    @Test
    void createPerformance_Success() {
        when(performanceMapper.toEntity(any(PerformanceDTO.class))).thenReturn(performance);
        when(performanceRepository.save(any(Performance.class))).thenReturn(performance);
        when(performanceMapper.toDto(any(Performance.class))).thenReturn(performanceDTO);

        PerformanceDTO result = performanceService.createPerformance(performanceDTO);

        assertNotNull(result);
        assertEquals(performanceDTO.getType(), result.getType());
        verify(performanceRepository, times(1)).save(performance);
    }

    @Test
    void getAllPerformances_Success() {
        List<Performance> performances = Arrays.asList(performance);
        when(performanceRepository.findAll()).thenReturn(performances);
        when(performanceMapper.toDto(any(Performance.class))).thenReturn(performanceDTO);

        List<PerformanceDTO> result = performanceService.getAllPerformances();

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(performanceDTO.getType(), result.get(0).getType());
    }

    @Test
    void getPerformanceById_Success() {
        when(performanceRepository.findById(anyLong())).thenReturn(Optional.of(performance));
        when(performanceMapper.toDto(any(Performance.class))).thenReturn(performanceDTO);

        PerformanceDTO result = performanceService.getPerformanceById(1L);

        assertNotNull(result);
        assertEquals(performanceDTO.getType(), result.getType());
    }

    @Test
    void getPerformanceById_NotFound() {
        when(performanceRepository.findById(anyLong())).thenReturn(Optional.empty());

        PerformanceDTO result = performanceService.getPerformanceById(1L);

        assertNull(result);
    }

    @Test
    void updatePerformance_Success() {
        when(performanceRepository.findById(anyLong())).thenReturn(Optional.of(performance));
        when(performanceRepository.save(any(Performance.class))).thenReturn(performance);
        when(performanceMapper.toDto(any(Performance.class))).thenReturn(performanceDTO);

        PerformanceDTO result = performanceService.updatePerformance(1L, performanceDTO);

        assertNotNull(result);
        assertEquals(performanceDTO.getType(), result.getType());
        verify(performanceRepository, times(1)).save(performance);
    }

    @Test
    void updatePerformance_NotFound() {
        when(performanceRepository.findById(anyLong())).thenReturn(Optional.empty());

        PerformanceDTO result = performanceService.updatePerformance(1L, performanceDTO);

        assertNull(result);
        verify(performanceRepository, never()).save(any(Performance.class));
    }

    @Test
    void deletePerformance_Success() {
        when(performanceRepository.findById(anyLong())).thenReturn(Optional.of(performance));

        boolean result = performanceService.deletePerformance(1L);

        assertTrue(result);
        verify(performanceRepository, times(1)).deleteById(1L);
    }

    @Test
    void deletePerformance_NotFound() {
        when(performanceRepository.findById(anyLong())).thenReturn(Optional.empty());

        boolean result = performanceService.deletePerformance(1L);

        assertFalse(result);
        verify(performanceRepository, never()).deleteById(anyLong());
    }
}
