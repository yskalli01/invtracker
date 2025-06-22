package com.example.InventoryManagement.Domain.Entities;

import jakarta.persistence.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "ratings")
public class RatingEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // The rating value, e.g., 1 to 5 stars
    private Double ratingValue;

    // Optional comment or review text
    @Column(columnDefinition = "TEXT")
    private String comment;

    // Link to the product this rating belongs to
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private ProductEntity product;

    // Link to the user who gave the rating
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;
}
