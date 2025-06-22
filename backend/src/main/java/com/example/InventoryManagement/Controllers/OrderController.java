package com.example.InventoryManagement.Controllers;

import com.example.InventoryManagement.Domain.DTO.OrderDTO;
import com.example.InventoryManagement.Domain.Entities.OrderEntity;
import com.example.InventoryManagement.Enums.OrderStatus;
import com.example.InventoryManagement.Mappers.OrderMapper;
import com.example.InventoryManagement.Services.OrderService;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/orders")
public class OrderController extends GenericController<OrderEntity, OrderDTO, Long> {
    @Autowired
    private OrderService orderService;
    @Autowired
    private ModelMapper mapper;
    @Autowired
    private OrderMapper orderMapper;

    public OrderController(OrderService orderService, ModelMapper mapper) {
        super(orderService, mapper, OrderEntity.class, OrderDTO.class);
    }

    @Override
    @PostMapping
    public ResponseEntity<?> createElement(@Valid @RequestBody OrderDTO orderDTO) {
        OrderEntity entity = orderMapper.toEntity(orderDTO);
        OrderEntity saved = orderService.save(entity);
        return ResponseEntity.ok(orderMapper.toDto(saved));
    }

    @Override
    @PutMapping(path = "/{id}")
    public ResponseEntity<?> fullUpdateElement(@RequestBody OrderDTO elementDTO, @PathVariable("id") Long id) {
        if (!orderService.isExists(id)) return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        elementDTO.setId(id);
        return createElement(elementDTO);
    }

    @PutMapping("/{id}/{status}")
    public ResponseEntity<?> updateOrderStatus(
            @PathVariable Long id,
            @PathVariable OrderStatus status) {

        orderService.updateOrderStatus(id, status.name());
        return ResponseEntity.ok("Order updated successfully with status " + status);
    }

    @GetMapping("/earnings")
    public ResponseEntity<?> getOverallEarning(){
        return ResponseEntity.ok(orderService.getOverallEarning());
    }

}
