package com.example.InventoryManagement.Domain.Entities;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;
import org.hibernate.envers.RelationTargetAuditMode;
import org.hibernate.envers.Audited;
import org.hibernate.envers.NotAudited;

@Audited
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "Products")
public class ProductEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private Double unitPrice;
    private Integer quantity;
    private String category;
    private String imagePath;
    private Double purchasePrice;

    @Column(columnDefinition = "TEXT")
    private String description;

    @NotAudited
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "warehouse_id")
    private WarehouseEntity warehouse;

    @NotAudited
    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.MERGE})
    @JoinColumn(name = "supplier_id")
    private SupplierEntity supplier;

    @Transient
    private Double averageRating;
    
    @Transient
    private List<RatingEntity> ratings;
}
