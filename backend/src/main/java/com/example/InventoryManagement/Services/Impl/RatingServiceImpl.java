package com.example.InventoryManagement.Services.Impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.InventoryManagement.Domain.Entities.RatingEntity;
import com.example.InventoryManagement.Repositories.RatingRepository;
import com.example.InventoryManagement.Services.RatingService;

@Service
public class RatingServiceImpl extends GenericServiceImpl<RatingEntity,Long> implements RatingService {
    @Autowired
    private RatingRepository ratingRepository;
    public RatingServiceImpl(RatingRepository ratingRepository){
        super(ratingRepository);
    }
    @Override
    public List<RatingEntity> findByProductId(Long productId) {
        return ratingRepository.findByProductId(productId);
    }
}
