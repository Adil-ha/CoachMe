package com.adil.server.service.impl;

import com.adil.server.dto.AddressDTO;
import com.adil.server.entity.Address;
import com.adil.server.entity.User;
import com.adil.server.mapper.AddressMapper;
import com.adil.server.repository.AddressRepository;
import com.adil.server.repository.UserRepository;
import com.adil.server.service.AddressService;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AddressServiceImpl implements AddressService {
    private final AddressRepository addressRepository;
    private final UserRepository userRepository;
    private final AddressMapper addressMapper;

    @Override
    public AddressDTO createAddress(AddressDTO addressDTO) {
        User user = userRepository.findById(addressDTO.getUserId())
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + addressDTO.getUserId()));

        Address address = addressMapper.toEntity(addressDTO);
        address.setUser(user);

        Address savedAddress = addressRepository.save(address);
        return addressMapper.toDto(savedAddress);
    }
}
