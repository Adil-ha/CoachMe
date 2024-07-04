package com.adil.server.service;

import com.adil.server.dto.PerformanceDTO; // Assurez-vous d'importer PerformanceDTO au lieu de ServiceDTO

import java.util.List;

public interface PerformanceService {
    PerformanceDTO createPerformance(PerformanceDTO performanceDTO);
    List<PerformanceDTO> getAllPerformances();
    PerformanceDTO getPerformanceById(Long id);
    PerformanceDTO updatePerformance(Long id, PerformanceDTO performanceDTO);
    boolean deletePerformance(Long id);
}
