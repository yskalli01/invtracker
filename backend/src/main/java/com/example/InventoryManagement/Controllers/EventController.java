package com.example.InventoryManagement.Controllers;
import com.example.InventoryManagement.Domain.Entities.EventEntity;
import com.example.InventoryManagement.Repositories.EventRepository;
import com.example.InventoryManagement.Services.EventService;

import java.util.List;
import java.util.ArrayList;
import java.util.Map;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import com.fasterxml.jackson.databind.ObjectMapper;


@RestController
@RequestMapping("/events")
public class EventController {

    private final EventService eventService;

    @Autowired
    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @PostMapping("/getData")
    public ResponseEntity<List<EventEntity>> getData(@RequestBody Object model) {
        List<EventEntity> events = eventService.findAll();
        System.out.println("Events" + events);
        return ResponseEntity.ok(events);
    }

    @PostMapping("/crudActions")
    public ResponseEntity<List<EventEntity>> crudActions(@RequestBody Object model) {
        System.out.println("Creation " + model);
        Map<String, List<Map<String, Object>>> data = (Map<String, List<Map<String, Object>>>) model;
        List<EventEntity> events = new ArrayList<>();
        ObjectMapper mapper = new ObjectMapper();

        for (String action : data.keySet()) {
            List<Map<String, Object>> actionData = data.get(action);

            for (Map<String, Object> actionItem : actionData) {
                try {
                    EventEntity eventEntity = mapper.convertValue(actionItem, EventEntity.class);
                    if ("added".equals(action)) {
                        events.add(eventService.insert(eventEntity));
                    } else if ("changed".equals(action)) {
                        events.add(eventService.update(eventEntity));
                    } else if ("deleted".equals(action)) {
                        events.add(eventService.deleteById(eventEntity.getId()));
                    }

                    return ResponseEntity.ok(events);

                } catch (Exception e) {
                    ResponseEntity.status(500).body(e.toString());
                }
            }
        }

        return ResponseEntity.ok(events);
    }

}
