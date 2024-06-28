package com.adil.server.mapper;

import com.adil.server.dto.UserDTO;
import com.adil.server.entity.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserDTO toDto(User user);
    User toEntity(UserDTO userDTO);
}
