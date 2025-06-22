package com.example.InventoryManagement.Repositories;

import com.example.InventoryManagement.Domain.Entities.SupplierEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SupplierRepository extends JpaRepository<SupplierEntity,Long> {
}
