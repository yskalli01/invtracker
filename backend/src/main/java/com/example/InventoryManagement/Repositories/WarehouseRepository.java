package com.example.InventoryManagement.Repositories;

import com.example.InventoryManagement.Domain.Entities.WarehouseEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WarehouseRepository extends JpaRepository<WarehouseEntity,Long> {
}
