package com.adil.server.mapper;

import com.adil.server.dto.ServiceDTO;
import com.adil.server.entity.Service;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ServiceMapper {
    ServiceDTO toDto(Service service);
    Service toEntity(ServiceDTO serviceDTO);
}
