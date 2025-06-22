package com.example.InventoryManagement.Domain.Entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "StockMovements")
public class StockMovementEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime movementDate;

    private Integer quantityChanged;

    private Integer finalQuantity;

    private String reason; // e.g., "ORDER", "RESTOCK", "RETURN", "MANUAL_ADJUSTMENT"

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private ProductEntity product;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_item_id", nullable = true)
    private OrderItemEntity orderItem;
}
