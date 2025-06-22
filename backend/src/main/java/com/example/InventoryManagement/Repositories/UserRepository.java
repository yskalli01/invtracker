package com.example.InventoryManagement.Repositories;

import com.example.InventoryManagement.Domain.Entities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<UserEntity,Long> {
    public List<UserEntity> getByRole(String role);
}
