package com.example.InventoryManagement.Services;

import com.example.InventoryManagement.Domain.Entities.OrderItemEntity;

public interface OrderItemService extends GenericService<OrderItemEntity,Long> {
    OrderItemEntity partialUpdate(OrderItemEntity orderItem, Long id);
}
