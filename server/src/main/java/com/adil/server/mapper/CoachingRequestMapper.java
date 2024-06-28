package com.adil.server.mapper;

import com.adil.server.dto.CoachingRequestDTO;
import com.adil.server.entity.CoachingRequest;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CoachingRequestMapper {
    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "service.id", target = "serviceId")
    CoachingRequestDTO toDto(CoachingRequest coachingRequest);

    @Mapping(source = "userId", target = "user.id")
    @Mapping(source = "serviceId", target = "service.id")
    CoachingRequest toEntity(CoachingRequestDTO coachingRequestDTO);
}
