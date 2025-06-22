package com.example.InventoryManagement.Domain.Entities;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.query.Order;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "OrderItems")
public class OrderItemEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Integer quantity;

    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST,CascadeType.MERGE})
    @JoinColumn(name = "product_id")
    private ProductEntity product;

    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST,CascadeType.MERGE})
    @JoinColumn(name = "order_id")
    private OrderEntity order;
}
