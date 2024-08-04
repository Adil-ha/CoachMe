package com.adil.server.controller;

import com.adil.server.dto.PerformanceDTO;
import com.adil.server.service.PerformanceService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/performances")
@AllArgsConstructor
public class PerformanceController {
    private final PerformanceService performanceService;

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PostMapping
    public ResponseEntity<PerformanceDTO> createPerformance(@RequestBody PerformanceDTO performanceDTO) {
        PerformanceDTO createdPerformance = performanceService.createPerformance(performanceDTO);
        return ResponseEntity.ok(createdPerformance);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PerformanceDTO> getPerformanceById(@PathVariable Long id) {
        PerformanceDTO performance = performanceService.getPerformanceById(id);
        return ResponseEntity.ok(performance);
    }

    @GetMapping
    public ResponseEntity<List<PerformanceDTO>> getAllPerformances() {
        List<PerformanceDTO> performances = performanceService.getAllPerformances();
        return ResponseEntity.ok(performances);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<PerformanceDTO> updatePerformance(@PathVariable Long id, @RequestBody PerformanceDTO performanceDTO) {
        PerformanceDTO updatedPerformance = performanceService.updatePerformance(id, performanceDTO);
        return ResponseEntity.ok(updatedPerformance);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePerformance(@PathVariable Long id) {
        boolean deleted = performanceService.deletePerformance(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}

