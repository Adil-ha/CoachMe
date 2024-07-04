package com.adil.server.service.impl;

import com.adil.server.dto.PerformanceDTO;
import com.adil.server.entity.Performance;
import com.adil.server.mapper.PerformanceMapper;
import com.adil.server.repository.PerformanceRepository;
import com.adil.server.service.PerformanceService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class PerformanceServiceImpl implements PerformanceService {

    private final PerformanceRepository performanceRepository;
    private final PerformanceMapper performanceMapper;

    @Override
    public PerformanceDTO createPerformance(PerformanceDTO performanceDTO) {
        Performance performance = performanceMapper.toEntity(performanceDTO);
        Performance savedPerformance = performanceRepository.save(performance);
        return performanceMapper.toDto(savedPerformance);
    }

    @Override
    public List<PerformanceDTO> getAllPerformances() {
        List<Performance> performances = performanceRepository.findAll();
        return performances.stream()
                .map(performanceMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public PerformanceDTO getPerformanceById(Long id) {
        Optional<Performance> performanceOptional = performanceRepository.findById(id);
        return performanceOptional.map(performanceMapper::toDto).orElse(null);
    }

    @Override
    public PerformanceDTO updatePerformance(Long id, PerformanceDTO performanceDTO) {
        Optional<Performance> existingPerformanceOptional = performanceRepository.findById(id);
        if (existingPerformanceOptional.isPresent()) {
            Performance existingPerformance = existingPerformanceOptional.get();
            existingPerformance.setType(performanceDTO.getType());
            existingPerformance.setDescription(performanceDTO.getDescription());
            existingPerformance.setImage(performanceDTO.getImage());
            Performance updatedPerformance = performanceRepository.save(existingPerformance);
            return performanceMapper.toDto(updatedPerformance);
        } else {
            return null;
        }
    }

    @Override
    public boolean deletePerformance(Long id) {
        Optional<Performance> performanceOptional = performanceRepository.findById(id);
        if (performanceOptional.isPresent()) {
            performanceRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }
}

