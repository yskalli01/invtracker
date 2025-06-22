package com.example.InventoryManagement.Controllers;

import com.example.InventoryManagement.Domain.DTO.OrderItemDTO;
import com.example.InventoryManagement.Domain.Entities.OrderItemEntity;
import com.example.InventoryManagement.Mappers.OrderItemMapper;
import com.example.InventoryManagement.Services.OrderItemService;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/orderitems")
public class OrderItemController extends GenericController<OrderItemEntity, OrderItemDTO, Long> {
    @Autowired
    private OrderItemService orderService;
    @Autowired
    private ModelMapper mapper;
    @Autowired
    private OrderItemMapper orderItemMapper;

    public OrderItemController(OrderItemService orderService, ModelMapper mapper) {
        super(orderService, mapper, OrderItemEntity.class, OrderItemDTO.class);
    }

    @Override
    @PostMapping
    public ResponseEntity<?> createElement(@RequestBody @Valid OrderItemDTO orderDTO) {
        OrderItemEntity entity = orderItemMapper.toEntity(orderDTO);
        OrderItemEntity saved = orderService.save(entity);
        return ResponseEntity.ok(orderItemMapper.toDto(saved));
    }

    @Override
    @PutMapping(path = "/{id}")
    public ResponseEntity<?> fullUpdateElement(@RequestBody OrderItemDTO elementDTO, @PathVariable("id") Long id) {
        if (!orderService.isExists(id)) return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        elementDTO.setId(id);
        return createElement(elementDTO);
    }
}
