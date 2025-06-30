package com.example.InventoryManagement.Services;
import java.util.List;
import java.util.Optional;

import com.example.InventoryManagement.Domain.Entities.EventEntity;

public interface EventService {
    List<EventEntity> findAll();

    EventEntity findById(Long id);

    EventEntity insert(EventEntity schedule);

    EventEntity update(EventEntity schedule);

    EventEntity deleteById(Long id);
}
