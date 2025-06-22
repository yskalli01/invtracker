package com.example.InventoryManagement.Repositories;

import com.example.InventoryManagement.Domain.Entities.OrderItemEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItemEntity,Long> {
}
