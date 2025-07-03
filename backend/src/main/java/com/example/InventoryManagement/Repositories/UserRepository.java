package com.example.InventoryManagement.Repositories;
import java.util.Optional;
import com.example.InventoryManagement.Domain.Entities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<UserEntity,Long> {
    List<UserEntity> getByRole(String role);
    boolean existsByEmail(String email);
    Optional<UserEntity> findByEmail(String email);
}
