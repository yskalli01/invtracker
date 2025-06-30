package com.example.InventoryManagement.Services;

import com.example.InventoryManagement.Domain.Entities.UserEntity;

import java.util.List;

public interface UserService extends GenericService<UserEntity,Long> {
    List<UserEntity> getByRole(String role);
    UserEntity login(String email, String rawPassword);
    UserEntity update(UserEntity element);
}
