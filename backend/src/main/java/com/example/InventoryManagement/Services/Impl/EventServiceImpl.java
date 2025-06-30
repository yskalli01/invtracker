package com.example.InventoryManagement.Services.Impl;

import com.example.InventoryManagement.Domain.Entities.EventEntity;
import com.example.InventoryManagement.Repositories.EventRepository;
import com.example.InventoryManagement.Services.EventService;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class EventServiceImpl implements EventService {

    private final EventRepository eventRepository;
    private EventEntity event;

    public EventServiceImpl(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    @Override
    public List<EventEntity> findAll() {
        return eventRepository.findAll();
    }

    @Override
    public EventEntity findById(Long id) {
        return eventRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Could not find event id=" + id));
    }

    @Override
    public EventEntity insert(EventEntity event) {
        return eventRepository.save(event);
    }
    
    @Override
    public EventEntity update(EventEntity event) {
        EventEntity eventFromDB = findById(event.getId());
        BeanUtils.copyProperties(event, eventFromDB, "id, Guid");
        return eventRepository.save(event);
    }

    @Override
    public EventEntity deleteById(Long id) {
        EventEntity event = findById(id);
        eventRepository.deleteById(id);
        return event;
    }

}
