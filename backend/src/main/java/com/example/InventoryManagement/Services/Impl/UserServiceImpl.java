package com.example.InventoryManagement.Services.Impl;

import com.example.InventoryManagement.Domain.Entities.UserEntity;
import com.example.InventoryManagement.Repositories.UserRepository;
import com.example.InventoryManagement.Services.UserService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl extends GenericServiceImpl<UserEntity,Long> implements UserService {

    private final UserRepository userRepository;
    public UserServiceImpl(UserRepository userRepository){
        super(userRepository);
        this.userRepository = userRepository;
    }

    @Override
    public List<UserEntity> getByRole(String role) {
        return userRepository.getByRole(role);
    }
}
