package com.example.InventoryManagement.Repositories;

import com.example.InventoryManagement.Domain.Entities.OrderEntity;
import jakarta.transaction.Transactional;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<OrderEntity,Long> {
    @Modifying
    @Transactional
    @Query("UPDATE OrderEntity o SET o.status = :status WHERE o.id = :id")
    public void updateOrderStatus(@Param("id") Long id, @Param("status") String status);

    public List<OrderEntity> getOrdersByUserId(Long id);
}
