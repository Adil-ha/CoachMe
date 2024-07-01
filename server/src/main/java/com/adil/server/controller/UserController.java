package com.adil.server.controller;

import com.adil.server.dto.AuthenticationDTO;
import com.adil.server.entity.User;
import com.adil.server.security.JwtService;
import com.adil.server.service.UserService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@Slf4j
@AllArgsConstructor
@RestController
public class UserController {
    private AuthenticationManager authenticationManager;
    private UserService userService;
    private JwtService jwtService;

    @PostMapping(path= "/register")
    public void register(@RequestBody User user){
        log.info("Inscription");
        userService.register(user);
    }

    @PostMapping(path = "/login")
    public Map<String, String> login(@RequestBody AuthenticationDTO authenticationDTO){
        final Authentication authenticate = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authenticationDTO.username(), authenticationDTO.password())
        );
        if(authenticate.isAuthenticated()){
            return this.jwtService.generate(authenticationDTO.username());
        }

        return null;
    }


    @PostMapping(path = "/logoutt")
    public void logout(){
        log.info("deconnexion");
        this.jwtService.logout();

    }
}
