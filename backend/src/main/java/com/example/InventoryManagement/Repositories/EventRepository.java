package com.example.InventoryManagement.Repositories;

import com.example.InventoryManagement.Domain.Entities.EventEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventRepository extends JpaRepository<EventEntity,Long> {
}
