package com.adil.server.mapper;

import com.adil.server.dto.AddressDTO;
import com.adil.server.entity.Address;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface AddressMapper {
    @Mapping(source = "user.id", target = "userId")
    AddressDTO toDto(Address address);

    @Mapping(source = "userId", target = "user.id")
    Address toEntity(AddressDTO addressDTO);
}
