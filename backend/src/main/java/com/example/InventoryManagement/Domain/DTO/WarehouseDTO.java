package com.example.InventoryManagement.Domain.DTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WarehouseDTO {
    private Long id;
    private String name;
    private String location;
    private Integer capacity;
    private Double utilisation;
}
