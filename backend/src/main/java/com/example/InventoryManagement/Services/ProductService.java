package com.example.InventoryManagement.Services;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;
import java.util.Map;

import com.example.InventoryManagement.Domain.Entities.ProductEntity;

public interface ProductService extends GenericService<ProductEntity,Long> {
    // public int findByQuantityBetweenFlexible(Integer min,Integer max);
    // public Double getPriceOfAllProducts();
    // public List<ProductEntity> getProductRevisions(Long productId);
    // public ProductEntity getProductRevisionForWholeDate(Long productId, LocalDate date);
    public Map<String, Double> getMonthlyTotalPriceOfAllProducts();
    public Map<String,Integer> getMonthlyCountProductByQuantityBetween(Integer min, Integer max);
    public Map<String, Integer> getProductsByCategory();
}

