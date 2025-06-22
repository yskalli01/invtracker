package com.example.InventoryManagement.Domain.Entities;
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
@Table(name = "Suppliers")
public class SupplierEntity {
    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private String email;
    private String phone;
    private String address;
    private String country;
}
