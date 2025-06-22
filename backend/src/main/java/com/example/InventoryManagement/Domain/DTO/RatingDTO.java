package com.example.InventoryManagement.Domain.DTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RatingDTO {

    private Long id;

    // The rating value, e.g., 1 to 5 stars
    private Double ratingValue;

    
    private String comment;

   
    private ProductDTO product;

    
    private UserDTO user;
}