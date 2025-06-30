package com.example.InventoryManagement.Services;
import java.util.Map;

import com.example.InventoryManagement.Domain.Entities.OrderEntity;

public interface OrderService extends GenericService<OrderEntity,Long> {
    OrderEntity partialUpdate(OrderEntity order, Long id);
    void updateOrderStatus(Long id, String status);
    Map<String,Double> getMonthlyOverallEarning();
    Map<String,Long> getMonthlyOrders();
    Map<String,Long> getOrdersByCountry();
    Map<String,Long> getMonthlyOrdersByUserId(Long id, String status);
    Map<String,Double> getMonthlyOrdersCostByUserId(Long id);
    Map<String,Integer> getProductsByCategory(Long id);
}
