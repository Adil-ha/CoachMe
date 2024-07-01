package com.adil.server.service;

import com.adil.server.entity.User;

import java.util.Optional;

public interface UserService {
    void register(User user);
    User loadUserByUsername(String username);
    Optional<User> findById(Long userId);
}
