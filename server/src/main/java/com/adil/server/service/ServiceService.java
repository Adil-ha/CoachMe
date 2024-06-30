package com.adil.server.service;

import com.adil.server.dto.ServiceDTO;

import java.util.List;

public interface ServiceService {
    ServiceDTO createService(ServiceDTO serviceDTO);
    List<ServiceDTO> getAllServices();
    ServiceDTO getServiceById(Long id);
    ServiceDTO updateService(Long id, ServiceDTO serviceDTO);
    boolean deleteService(Long id);
}