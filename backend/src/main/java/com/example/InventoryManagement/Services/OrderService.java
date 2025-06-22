package com.example.InventoryManagement.Services;
import com.example.InventoryManagement.Domain.Entities.OrderEntity;

public interface OrderService extends GenericService<OrderEntity,Long> {
    OrderEntity partialUpdate(OrderEntity order, Long id);
    void updateOrderStatus(Long id, String status);
    double getOverallEarning();
}
