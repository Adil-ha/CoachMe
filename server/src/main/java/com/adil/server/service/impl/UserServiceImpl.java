package com.adil.server.service.impl;

import com.adil.server.dto.UserDTO;
import com.adil.server.entity.User;
import com.adil.server.entity.enums.UserRole;
import com.adil.server.exception.DuplicateEmailException;
import com.adil.server.exception.InvalidEmailException;
import com.adil.server.mapper.UserMapper;
import com.adil.server.repository.UserRepository;
import com.adil.server.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.regex.Pattern;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserDetailsService, UserService{
    private UserRepository userRepository;
    private BCryptPasswordEncoder passwordEncoder;
    private UserMapper userMapper;

    @Override
    public void register(User user){
        String emailRegex = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$";
        Pattern pattern = Pattern.compile(emailRegex);

        if(!pattern.matcher(user.getEmail()).matches()){
            throw new InvalidEmailException("Votre est email est invalide");
        }
        Optional<User> optionalUser = userRepository.findByEmail(user.getEmail());
        if(optionalUser.isPresent()){
            throw new DuplicateEmailException("Votre mail existe déjà");
        }
        String cryptPassword = this.passwordEncoder.encode(user.getPassword());
        user.setPassword(cryptPassword);
        user.setRole(UserRole.ROLE_USER);
        this.userRepository.save(user);
    }

    @Override
    public User loadUserByUsername(String username) throws UsernameNotFoundException {
        return
                this.userRepository
                        .findByEmail(username)
                        .orElseThrow(()-> new UsernameNotFoundException("Aucun utilisateur ne correspond à cette identifiant"));

    }

    @Override
    public Optional<User> findById(Long userId) {
        return userRepository.findById(userId);
    }

    @Override
    public UserDTO getUserById(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        return userMapper.toDto(user);
    }
}
