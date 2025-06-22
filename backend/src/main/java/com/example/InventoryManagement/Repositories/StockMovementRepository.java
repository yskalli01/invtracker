package com.example.InventoryManagement.Repositories;

import com.example.InventoryManagement.Domain.Entities.StockMovementEntity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StockMovementRepository extends JpaRepository<StockMovementEntity,Long> {
}