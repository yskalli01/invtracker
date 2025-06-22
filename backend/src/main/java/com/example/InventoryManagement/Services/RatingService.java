package com.example.InventoryManagement.Services;


import java.util.List;

import com.example.InventoryManagement.Domain.Entities.RatingEntity;

public interface RatingService extends GenericService<RatingEntity,Long>{
    List<RatingEntity> findByProductId(Long productId);
} 
