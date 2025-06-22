package com.example.InventoryManagement.Domain.Entities;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "Orders")
public class OrderEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id")
    private Long id;
    @Column(name = "order_date")
    private LocalDateTime orderDate;
    private String status;

    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST,CascadeType.MERGE})
    @JoinColumn(name = "user_id")
    private UserEntity user;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, mappedBy = "order")
    private List<OrderItemEntity> orderItems = new ArrayList<>();
}


