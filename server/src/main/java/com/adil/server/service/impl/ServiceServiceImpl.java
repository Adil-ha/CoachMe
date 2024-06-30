package com.adil.server.service.impl;

import com.adil.server.dto.ServiceDTO;
import com.adil.server.entity.Service;
import com.adil.server.mapper.ServiceMapper;
import com.adil.server.repository.ServiceRepository;
import com.adil.server.service.ServiceService;
import lombok.AllArgsConstructor;


import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@org.springframework.stereotype.Service
@AllArgsConstructor
public class ServiceServiceImpl implements ServiceService {

    private final ServiceRepository serviceRepository;
    private final ServiceMapper serviceMapper;

    @Override
    public ServiceDTO createService(ServiceDTO serviceDTO) {
        Service service = serviceMapper.toEntity(serviceDTO);
        Service savedService = serviceRepository.save(service);
        return serviceMapper.toDto(savedService);
    }

    @Override
    public List<ServiceDTO> getAllServices() {
        List<Service> services = serviceRepository.findAll();
        return services.stream()
                .map(serviceMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public ServiceDTO getServiceById(Long id) {
        Optional<Service> serviceOptional = serviceRepository.findById(id);
        return serviceOptional.map(serviceMapper::toDto).orElse(null);
    }

    @Override
    public ServiceDTO updateService(Long id, ServiceDTO serviceDTO) {
        Optional<Service> existingServiceOptional = serviceRepository.findById(id);
        if (existingServiceOptional.isPresent()) {
            Service existingService = existingServiceOptional.get();
            existingService.setType(serviceDTO.getType());
            existingService.setDescription(serviceDTO.getDescription());
            existingService.setImage(serviceDTO.getImage());
            Service updatedService = serviceRepository.save(existingService);
            return serviceMapper.toDto(updatedService);
        } else {
            return null;
        }
    }

    @Override
    public boolean deleteService(Long id) {
        Optional<Service> serviceOptional = serviceRepository.findById(id);
        if (serviceOptional.isPresent()) {
            serviceRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }
}

