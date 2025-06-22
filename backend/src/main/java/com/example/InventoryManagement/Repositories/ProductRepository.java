package com.example.InventoryManagement.Repositories;

import com.example.InventoryManagement.Domain.Entities.ProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

@Repository
public interface ProductRepository extends JpaRepository<ProductEntity,Long> {
    @Query("SELECT COUNT(p) FROM ProductEntity p WHERE p.quantity >= :min AND (:max IS NULL OR p.quantity <= :max)")
    int findByQuantityBetweenFlexible(
            @Param("min") Integer min,
            @Param("max") Integer max
    );

    @Query("SELECT SUM(p.unitPrice * p.quantity) FROM ProductEntity p")
    Double getPriceOfAllProducts();

}
