package com.adil.server.service.impl;

import com.adil.server.dto.AddressDTO;
import com.adil.server.entity.Address;
import com.adil.server.entity.User;
import com.adil.server.mapper.AddressMapper;
import com.adil.server.repository.AddressRepository;
import com.adil.server.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AddressServiceImplTest {

    @Mock
    private AddressRepository addressRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private AddressMapper addressMapper;

    @InjectMocks
    private AddressServiceImpl addressService;

    private Address address;
    private AddressDTO addressDTO;
    private User user;

    @BeforeEach
    void setUp() {
        user = new User();
        user.setId(1L);

        address = new Address();
        address.setId(1L);
        address.setNumber("123");
        address.setStreet(" Main St");
        address.setTown("City");
        address.setCode("59280");
        address.setCountry("France");
        address.setUser(user);

        addressDTO = new AddressDTO();
        addressDTO.setId(1L);
        address.setNumber("123");
        addressDTO.setStreet(" Main St");
        addressDTO.setTown("City");
        address.setCode("59280");
        address.setCountry("France");
        addressDTO.setUserId(1L);
    }

    @Test
    void createAddress_Success() {
        when(userRepository.findById(anyLong())).thenReturn(Optional.of(user));
        when(addressMapper.toEntity(any(AddressDTO.class))).thenReturn(address);
        when(addressRepository.save(any(Address.class))).thenReturn(address);
        when(addressMapper.toDto(any(Address.class))).thenReturn(addressDTO);

        AddressDTO result = addressService.createAddress(addressDTO);

        assertNotNull(result);
        assertEquals(addressDTO.getStreet(), result.getStreet());
        verify(addressRepository, times(1)).save(address);
    }

    @Test
    void createAddress_UserNotFound() {
        when(userRepository.findById(anyLong())).thenReturn(Optional.empty());

        EntityNotFoundException exception = assertThrows(EntityNotFoundException.class, () -> {
            addressService.createAddress(addressDTO);
        });

        assertEquals("User not found with id: 1", exception.getMessage());
        verify(addressRepository, never()).save(any(Address.class));
    }
}
