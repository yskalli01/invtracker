package com.example.InventoryManagement.Services.Impl;
import com.example.InventoryManagement.Domain.Entities.*;
import com.example.InventoryManagement.Repositories.OrderItemRepository;
import com.example.InventoryManagement.Repositories.OrderRepository;
import com.example.InventoryManagement.Repositories.ProductRepository;
import com.example.InventoryManagement.Repositories.StockMovementRepository;
import com.example.InventoryManagement.Repositories.UserRepository;
import com.example.InventoryManagement.Services.OrderService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Service
public class OrderServiceImpl extends GenericServiceImpl<OrderEntity,Long> implements OrderService {
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private OrderItemRepository orderItemRepository;
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private StockMovementRepository stockMovementRepository;

    public OrderServiceImpl(OrderRepository orderRepository){
        super(orderRepository);
    }

    @Override
    public OrderEntity save(OrderEntity element) {
    // Set default status and order date
    if (element.getStatus() == null || element.getStatus().isBlank()) {
        element.setStatus("Pending");
    }
    
    element.setOrderDate(LocalDateTime.now());
    System.out.println("The order date "+ element.getOrderDate());

    // Fetch and set the user if ID exists
    UserEntity user = element.getUser();
    if (user != null && user.getId() != null) {
        user = userRepository.findById(user.getId())
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
        element.setUser(user);
    }

    List<OrderItemEntity> processedItems = new ArrayList<>();

    if (element.getOrderItems() != null) {
        for (OrderItemEntity item : element.getOrderItems()) {
            if (item.getQuantity() == null || item.getQuantity() <= 0) {
                throw new IllegalArgumentException("Invalid quantity for order item.");
            }

            ProductEntity initialProduct = item.getProduct();
            if (initialProduct == null || initialProduct.getId() == null) {
                throw new IllegalArgumentException("Product must be specified for order item.");
            }

            ProductEntity product = productRepository.findById(initialProduct.getId())
                    .orElseThrow(() -> new EntityNotFoundException("Product not found: " + initialProduct.getId()));

            // Validate stock availability
            if (product.getQuantity() < item.getQuantity()) {
                throw new IllegalArgumentException("Not enough stock for product: " + product.getName());
            }

            // Decrease product quantity
            product.setQuantity(product.getQuantity() - item.getQuantity());
            productRepository.save(product);

            // Set order-item relationship
            item.setProduct(product);
            item.setOrder(element);

            processedItems.add(item);
        }

        element.setOrderItems(processedItems);
    }

    // ✅ Save order (with order items) FIRST
    OrderEntity savedOrder = orderRepository.save(element);
    System.out.println("Saved order: ID=" + savedOrder.getId() +
                   ", Date=" + savedOrder.getOrderDate() +
                   ", Status=" + savedOrder.getStatus() +
                   ", UserID=" + (savedOrder.getUser() != null ? savedOrder.getUser().getId() : "null") +
                   ", Items=" + savedOrder.getOrderItems().size());

    // ✅ Now save stock movements referencing persisted order items
    for (OrderItemEntity savedItem : savedOrder.getOrderItems()) {
        ProductEntity product = savedItem.getProduct();

        StockMovementEntity stockMovement = StockMovementEntity.builder()
                .product(product)
                .orderItem(savedItem) // now it has ID
                .quantityChanged(savedItem.getQuantity())
                .finalQuantity(product.getQuantity()) // product already updated
                .reason("ORDER")
                .movementDate(savedOrder.getOrderDate())
                .build();

        stockMovementRepository.save(stockMovement);
    }

    return savedOrder;
}

    @Override
    public void updateOrderStatus(Long id, String status) {
        orderRepository.updateOrderStatus(id,status);
    }

    @Override
    public double getOverallEarning() {
        List<OrderEntity> orders = orderRepository.findAll();
        double sum = orders.stream()
                .flatMap(order -> order.getOrderItems().stream())
                .mapToDouble(orderItem -> 
                    (orderItem.getProduct() != null && orderItem.getProduct().getSupplier() != null ) ?
                    orderItem.getProduct().getUnitPrice() * orderItem.getQuantity() : 0
                )
                .sum();

        return sum;
    }
}