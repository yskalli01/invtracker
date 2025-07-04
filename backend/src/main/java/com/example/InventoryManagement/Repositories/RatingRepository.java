package com.example.InventoryManagement.Repositories;

import com.example.InventoryManagement.Domain.Entities.RatingEntity;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RatingRepository extends JpaRepository<RatingEntity,Long> {
    List<RatingEntity> findByProductId(Long productId);
}
