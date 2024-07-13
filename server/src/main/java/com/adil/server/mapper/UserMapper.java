package com.adil.server.mapper;

import com.adil.server.dto.UserDTO;
import com.adil.server.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring", uses = AddressMapper.class)
public interface UserMapper {
    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    @Mapping(source = "addresses", target = "addressDTOS")
    UserDTO toDto(User user);

    @Mapping(source = "addressDTOS", target = "addresses")
    User toEntity(UserDTO userDTO);
}
