package com.adil.server.mapper;

import com.adil.server.dto.PerformanceDTO;
import com.adil.server.entity.Performance;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PerformanceMapper {

    PerformanceDTO toDto(Performance performance);

    Performance toEntity(PerformanceDTO performanceDTO);
}