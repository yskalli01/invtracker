package com.example.InventoryManagement.Domain.Entities;
import java.util.ArrayList;
import java.util.List;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "Warehouses")
public class WarehouseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String location;
    private Integer capacity;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, mappedBy = "warehouse")
    private List<ProductEntity> products = new ArrayList<>();


    @Transient
    private Double utilisation;
}
