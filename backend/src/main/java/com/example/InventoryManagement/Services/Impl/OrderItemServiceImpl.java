package com.example.InventoryManagement.Services.Impl;

import com.example.InventoryManagement.Domain.Entities.*;
import com.example.InventoryManagement.Repositories.*;
import com.example.InventoryManagement.Services.OrderItemService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class OrderItemServiceImpl extends GenericServiceImpl<OrderItemEntity,Long> implements OrderItemService {
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private OrderItemRepository orderItemRepository;

    public OrderItemServiceImpl(OrderItemRepository orderItemRepository){
        super(orderItemRepository);
    }

    @Override
    public OrderItemEntity save(OrderItemEntity element) {

        ProductEntity product = element.getProduct();
        if(product != null){
            if (product.getId() != null) {
                product = productRepository.findById(product.getId()).orElseThrow(() -> new EntityNotFoundException("Product not found"));
            }
            element.setProduct(product);
        }
        return super.save(element);
    }
}
