package com.adil.server.controller;

import com.adil.server.dto.AuthenticationDTO;
import com.adil.server.dto.UserDTO;
import com.adil.server.entity.User;
import com.adil.server.security.JwtService;
import com.adil.server.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Collections;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
class UserControllerTest {

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private UserService userService;

    @Mock
    private JwtService jwtService;

    @InjectMocks
    private UserController userController;

    private MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(userController).build();
    }

    @Test
    void register_Success() throws Exception {
        User user = new User();
        user.setName("John Doe");
        user.setEmail("john.doe@example.com");
        user.setPassword("password");

        doNothing().when(userService).register(any(User.class));

        mockMvc.perform(post("/register")
                        .contentType("application/json")
                        .content("{ \"name\": \"John Doe\", \"email\": \"john.doe@example.com\", \"password\": \"password\" }"))
                .andExpect(status().isOk());

        verify(userService, times(1)).register(any(User.class));
    }

    @Test
    void login_Success() throws Exception {
        AuthenticationDTO authenticationDTO = new AuthenticationDTO("john.doe@example.com", "password");

        Authentication authentication = mock(Authentication.class);
        when(authentication.isAuthenticated()).thenReturn(true);

        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenReturn(authentication);

        when(jwtService.generate(anyString()))
                .thenReturn(Collections.singletonMap("token", "mocked_jwt_token"));

        mockMvc.perform(post("/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{ \"username\": \"john.doe@example.com\", \"password\": \"password\" }"))
                .andExpect(status().isOk());

        verify(jwtService, times(1)).generate("john.doe@example.com");
    }

    @Test
    void getUserById_AdminRole_Success() throws Exception {
        Long userId = 1L;
        UserDTO userDTO = new UserDTO();
        userDTO.setId(userId);
        userDTO.setName("John Doe");

        when(userService.getUserById(userId)).thenReturn(userDTO);

        mockMvc.perform(get("/user/{id}", userId)
                        .contentType("application/json"))
                .andExpect(status().isOk());

        verify(userService, times(1)).getUserById(userId);
    }
}
