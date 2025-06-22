package com.example.InventoryManagement.Domain.DTO;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductDTO {
    private Long id;
    private String name;
    private Double unitPrice;
    private Double purchasePrice;
    private Integer quantity;
    private String category;
    private String imagePath;
    private String description;
    private WarehouseDTO warehouse;
    private SupplierDTO supplier;
    private Double averageRating; 
    private List<RatingDTO> ratings;
}
