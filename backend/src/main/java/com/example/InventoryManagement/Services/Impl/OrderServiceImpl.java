package com.example.InventoryManagement.Services.Impl;
import com.example.InventoryManagement.Domain.Entities.*;
import com.example.InventoryManagement.Repositories.OrderItemRepository;
import com.example.InventoryManagement.Repositories.OrderRepository;
import com.example.InventoryManagement.Repositories.ProductRepository;
import com.example.InventoryManagement.Repositories.UserRepository;
import com.example.InventoryManagement.Services.OrderService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.stream.Collectors;


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


    public OrderServiceImpl(OrderRepository orderRepository){
        super(orderRepository);
    }

    @Override
    public OrderEntity save(OrderEntity element) {
        if (element.getStatus() == null || element.getStatus().isBlank()) {
            element.setStatus("Pending");
        }
        
        element.setOrderDate(LocalDateTime.now());
        // System.out.println("The order date "+ element.getOrderDate());

        
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
        // System.out.println("Saved order: ID=" + savedOrder.getId() +
        //             ", Date=" + savedOrder.getOrderDate() +
        //             ", Status=" + savedOrder.getStatus() +
        //             ", UserID=" + (savedOrder.getUser() != null ? savedOrder.getUser().getId() : "null") +
        //             ", Items=" + savedOrder.getOrderItems().size());

        // // ✅ Now save stock movements referencing persisted order items
        // for (OrderItemEntity savedItem : savedOrder.getOrderItems()) {
        //     ProductEntity product = savedItem.getProduct();

        //     StockMovementEntity stockMovement = StockMovementEntity.builder()
        //             .product(product)
        //             .orderItem(savedItem) // now it has ID
        //             .quantityChanged(savedItem.getQuantity())
        //             .finalQuantity(product.getQuantity()) // product already updated
        //             .reason("ORDER")
        //             .movementDate(savedOrder.getOrderDate())
        //             .build();

        //     stockMovementRepository.save(stockMovement);
        // }

        return savedOrder;
    }

    @Override
    public void updateOrderStatus(Long id, String status) {
        orderRepository.updateOrderStatus(id,status);
    }


    // Admin
    @Override
    public Map<String,Double> getMonthlyOverallEarning() {
        List<OrderEntity> orders = orderRepository.findAll();
        Map<String,Double> monthlyOverallEarning = new LinkedHashMap<>();

        LocalDateTime now = LocalDateTime.now();

        for(int i = 11; i >= 0; i--){
            YearMonth yearMonth = YearMonth.from(now).minusMonths(i);
            LocalDateTime startOfMonth = LocalDate.of(yearMonth.getYear(), yearMonth.getMonth(), 1).atTime(0, 0, 0);
            LocalDateTime endOfMonth = yearMonth.atEndOfMonth().atTime(23, 59, 59);
            String monthAbreviation = yearMonth.format(DateTimeFormatter.ofPattern("MMM",Locale.ENGLISH));

            

            double sum = orders.stream()
                        .filter(order -> order.getStatus().equals("Confirmed") && 
                        (order.getOrderDate().equals(startOfMonth) ||
                        order.getOrderDate().equals(endOfMonth) ||
                        (order.getOrderDate().isAfter(startOfMonth) && order.getOrderDate().isBefore(endOfMonth)) 
                        ))
                        .flatMap(order -> order.getOrderItems().stream())
                        .mapToDouble(orderItem -> 
                            (orderItem.getProduct() != null) ? 
                            (Math.abs(orderItem.getProduct().getPurchasePrice() - orderItem.getProduct().getUnitPrice())) * orderItem.getQuantity() : 0
                        )
                        .sum();

            
            
            monthlyOverallEarning.put(monthAbreviation,sum);
        }
        

        return monthlyOverallEarning;
    }

    @Override
    public Map<String,Long> getMonthlyOrders(){
        List<OrderEntity> orders = orderRepository.findAll();
        Map<String,Long> monthlyOrders = new LinkedHashMap<>();
        LocalDateTime now = LocalDateTime.now();
        for(int i = 11; i >= 0; i--){
            YearMonth yearMonth = YearMonth.from(now).minusMonths(i);
            LocalDateTime startOfMonth = LocalDate.of(yearMonth.getYear(), yearMonth.getMonth(), 1).atTime(0, 0, 0);
            LocalDateTime endOfMonth = yearMonth.atEndOfMonth().atTime(23, 59, 59);
            String monthAbreviation = yearMonth.format(DateTimeFormatter.ofPattern("MMM",Locale.ENGLISH));


            long count = orders.stream()
                        .filter(order -> order.getOrderDate().equals(startOfMonth) ||
                            order.getOrderDate().equals(endOfMonth) ||
                            (order.getOrderDate().isAfter(startOfMonth) && order.getOrderDate().isBefore(endOfMonth)) 
                            )
                        .count();
            
            
            monthlyOrders.put(monthAbreviation,count);
        }

        return monthlyOrders;
    }


    // Client
    @Override
    public Map<String,Long> getMonthlyOrdersByUserId(Long id,String status){
        List<OrderEntity> orders = orderRepository.getOrdersByUserId(id);
        Map<String,Long> monthlyOrders = new LinkedHashMap<>();
        LocalDateTime now = LocalDateTime.now();
        for(int i = 11; i >= 0; i--){
            YearMonth yearMonth = YearMonth.from(now).minusMonths(i);
            LocalDateTime startOfMonth = LocalDate.of(yearMonth.getYear(), yearMonth.getMonth(), 1).atTime(0, 0, 0);
            LocalDateTime endOfMonth = yearMonth.atEndOfMonth().atTime(23, 59, 59);
            String monthAbreviation = yearMonth.format(DateTimeFormatter.ofPattern("MMM",Locale.ENGLISH));


            long count = orders.stream()
                    .filter(order -> !status.equals("All") ?
                            (order.getStatus().equals(status) &&
                                    (   order.getOrderDate().equals(startOfMonth) ||
                                            order.getOrderDate().equals(endOfMonth) ||
                                            (order.getOrderDate().isAfter(startOfMonth) && order.getOrderDate().isBefore(endOfMonth))
                                    )
                            ) :
                            (
                                    order.getOrderDate().equals(startOfMonth) ||
                                            order.getOrderDate().equals(endOfMonth) ||
                                            (order.getOrderDate().isAfter(startOfMonth) && order.getOrderDate().isBefore(endOfMonth))
                            )
                    )
                    .count();


            monthlyOrders.put(monthAbreviation,count);
        }

        return monthlyOrders;
    }

    @Override
    public Map<String,Double> getMonthlyOrdersCostByUserId(Long id){
        List<OrderEntity> orders = orderRepository.getOrdersByUserId(id);
        Map<String,Double> monthlyOrders = new LinkedHashMap<>();
        LocalDateTime now = LocalDateTime.now();
        for(int i = 11; i >= 0; i--){
            YearMonth yearMonth = YearMonth.from(now).minusMonths(i);
            LocalDateTime startOfMonth = LocalDate.of(yearMonth.getYear(), yearMonth.getMonth(), 1).atTime(0, 0, 0);
            LocalDateTime endOfMonth = yearMonth.atEndOfMonth().atTime(23, 59, 59);
            String monthAbreviation = yearMonth.format(DateTimeFormatter.ofPattern("MMM",Locale.ENGLISH));


            Double count = orders.stream()
                    .filter(order -> order.getStatus().equals("Confirmed") &&
                            (
                                    order.getOrderDate().equals(startOfMonth) ||
                                            order.getOrderDate().equals(endOfMonth) ||
                                            (order.getOrderDate().isAfter(startOfMonth) && order.getOrderDate().isBefore(endOfMonth))
                            )
                    )
                    .flatMap(order -> order.getOrderItems().stream())
                    .mapToDouble(orderItem -> orderItem.getProduct().getUnitPrice())
                    .sum();


            monthlyOrders.put(monthAbreviation,count);
        }

        return monthlyOrders;
    }


    @Override
    public Map<String,Long> getOrdersByCountry(){
        List<OrderEntity> orders = orderRepository.findAll();
        Map<String,Long> ordersCountByCountry = new HashMap<>();
        
        for(OrderEntity order : orders){
            String country = order.getUser().getCountry();
            ordersCountByCountry.put(country,ordersCountByCountry.getOrDefault(country,(long) 0) + 1);
        }
        
        return ordersCountByCountry;
    }

    @Override
    public Map<String,Integer> getProductsByCategory(Long id){
        List<OrderEntity> orders = orderRepository.getOrdersByUserId(id);
        List<ProductEntity> products = orders.stream()
                                        .flatMap(order -> order.getOrderItems().stream())
                                        .map(orderItem -> orderItem.getProduct())
                                        .toList();
                                        

        // List<ProductEntity> products = productRepository.findAll();

        Map<String,Integer> productsByCategory = new LinkedHashMap<>();
        
        for(ProductEntity product : products){
            String category = product.getCategory();
            productsByCategory.put(category,productsByCategory.getOrDefault(category,(int) 0) + 1);
        }

        Map<String, Integer> sorted = productsByCategory.entrySet().stream()
                                    .sorted(Map.Entry.comparingByValue()) 
                                    .limit(10)
                                    .collect(Collectors.toMap(
                                            Map.Entry::getKey,
                                            Map.Entry::getValue,
                                            (e1, e2) -> e1,
                                            LinkedHashMap::new)); 

        return sorted;
    }
}