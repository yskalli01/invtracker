package com.example.InventoryManagement.Services;
import com.example.InventoryManagement.Domain.Entities.ProductEntity;

public interface ProductService extends GenericService<ProductEntity,Long> {
    public int findByQuantityBetweenFlexible(Integer min,Integer max);
    public Double getPriceOfAllProducts();
}

