package com.example.InventoryManagement.Controllers;

import com.example.InventoryManagement.Domain.DTO.RatingDTO;
import com.example.InventoryManagement.Domain.Entities.RatingEntity;
import com.example.InventoryManagement.Services.RatingService;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/ratings")
public class RatingController extends GenericController<RatingEntity, RatingDTO, Long> {
    @Autowired
    private RatingService ratingService;
    @Autowired
    private ModelMapper mapper;

    public RatingController(RatingService ratingService, ModelMapper mapper) {
        super(ratingService, mapper, RatingEntity.class, RatingDTO.class);
    }

    @GetMapping("/product/{id}")
    public ResponseEntity<?> findByProductId(@PathVariable("id") Long productId) {
        List<RatingEntity> ratings = ratingService.findByProductId(productId);
        List<RatingDTO> resultingRatings = new ArrayList<>();
        for(RatingEntity rating : ratings){
            RatingDTO ratingDTO = mapper.map(rating,RatingDTO.class);
            resultingRatings.add(ratingDTO);
        }
        return ResponseEntity.ok(resultingRatings);
    }
}