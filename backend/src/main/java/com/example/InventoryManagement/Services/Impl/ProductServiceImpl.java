package com.example.InventoryManagement.Services.Impl;

import com.example.InventoryManagement.Domain.Entities.ProductEntity;
import com.example.InventoryManagement.Domain.Entities.SupplierEntity;
import com.example.InventoryManagement.Domain.Entities.WarehouseEntity;
import com.example.InventoryManagement.Repositories.ProductRepository;
import com.example.InventoryManagement.Repositories.SupplierRepository;
import com.example.InventoryManagement.Repositories.WarehouseRepository;
import com.example.InventoryManagement.Services.ProductService;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Optional;
import java.util.PriorityQueue;
import java.util.stream.Collectors;

import org.hibernate.envers.AuditReader;
import org.hibernate.envers.AuditReaderFactory;
import org.hibernate.envers.DefaultRevisionEntity;
import org.hibernate.envers.RevisionType;
import org.hibernate.envers.query.AuditEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

@Service
public class ProductServiceImpl extends GenericServiceImpl<ProductEntity,Long> implements ProductService {
    @Autowired
    private WarehouseRepository warehouseRepository;
    @Autowired
    private SupplierRepository supplierRepository;
    @Autowired
    private ProductRepository productRepository;

    @PersistenceContext
    private EntityManager entityManager;

    public ProductServiceImpl(ProductRepository productRepository){
        super(productRepository);
    }

    // @Override
    // @Transactional
    // public List<ProductEntity> getProductRevisions(Long productId) {
    //     AuditReader auditReader = AuditReaderFactory.get(entityManager);

    //     // Get all revision numbers for this product
    //     List<Number> revisions = auditReader.getRevisions(ProductEntity.class, productId);

    //     List<ProductEntity> productHistory = new ArrayList<>();
        
    //     for (Number revision : revisions) {
    //         ProductEntity productRevision = auditReader.find(ProductEntity.class, productId, revision);
    //         productHistory.add(productRevision);
    //     }


    //     return productHistory;
    // }


    // public ProductEntity getProductRevisionForWholeDate(Long productId, LocalDate date) {
    //     AuditReader auditReader = AuditReaderFactory.get(entityManager);

    //     // Convert to end of day
    //     Date endOfDay = Date.from(date.atTime(23, 59, 59, 999_999_999).atZone(ZoneId.systemDefault()).toInstant());

    //     Number revisionNumber = auditReader.getRevisionNumberForDate(endOfDay);

    //     if (revisionNumber == null) {
    //         return null;
    //     }

    //     return auditReader.find(ProductEntity.class, productId, revisionNumber);
    // }



    @Override
    public ProductEntity save(ProductEntity element) {
        element.setWarehouse(resolveWarehouse(element.getWarehouse()));
        element.setSupplier(resolveSupplier(element.getSupplier()));

        WarehouseEntity warehouse = element.getWarehouse();

        if (warehouse != null) {
            int currentQuantity = warehouse.getProducts().stream()
                .mapToInt(ProductEntity::getQuantity)
                .sum();
            if(element.getId() != null) currentQuantity -= element.getQuantity();
            int availableCapacity = warehouse.getCapacity() - currentQuantity;
            if (element.getQuantity() > availableCapacity) {
                throw new RuntimeException(String.format(
                    "Input quantity (%d) exceeds available warehouse capacity (%d). Please provide a quantity ≤ %d.",
                    element.getQuantity(),
                    warehouse.getCapacity(),
                    availableCapacity
                ));
            }
        }

        //System.out.println("The element " + element);

        return super.save(element);
    }


    // Helper functions
    private WarehouseEntity resolveWarehouse(WarehouseEntity warehouse) {
        if (warehouse != null && warehouse.getId() != null) {
            return warehouseRepository.findById(warehouse.getId())
                .orElseThrow(() -> new EntityNotFoundException("Warehouse not found"));
        }
        return null;
    }
    

    private SupplierEntity resolveSupplier(SupplierEntity supplier) {
        if (supplier != null && supplier.getId() != null) {
            return supplierRepository.findById(supplier.getId())
                .orElseThrow(() -> new EntityNotFoundException("Supplier not found"));
        }
        return null;
    }


    // @Override
    // public int findByQuantityBetweenFlexible(Integer min,Integer max){
    //     return productRepository.findByQuantityBetweenFlexible(min,max);
    // }


    // @Override
    // public Double getPriceOfAllProducts(){
    //     return productRepository.getPriceOfAllProducts();
    // }

    @Override
    public Map<String, Double> getMonthlyTotalPriceOfAllProducts() {
        AuditReader auditReader = AuditReaderFactory.get(entityManager);
        Map<String, Double> monthlyTotals = new LinkedHashMap<>();

        LocalDate now = LocalDate.now();

        for (int i = 11; i >= 0; i--) {
            YearMonth yearMonth = YearMonth.from(now).minusMonths(i);
            LocalDateTime endOfMonth = yearMonth.atEndOfMonth().atTime(23, 59, 59);
            Date snapshotTime = Date.from(endOfMonth.atZone(ZoneId.systemDefault()).toInstant());
            String monthAbbreviation = yearMonth.format(DateTimeFormatter.ofPattern("MMM", Locale.ENGLISH));

            Number revision;
            try {
                revision = auditReader.getRevisionNumberForDate(snapshotTime);
            } catch (org.hibernate.envers.exception.RevisionDoesNotExistException e) {
                monthlyTotals.put(monthAbbreviation, 0.0);
                continue;
            }

            // Fetch all revisions of ProductEntity up to 'revision', including deletions
            List<Object[]> revisions = auditReader.createQuery()
                .forRevisionsOfEntity(ProductEntity.class, false, true)
                .add(AuditEntity.revisionNumber().le(revision))
                .getResultList();

            // System.out.println("Revisions " + revisions);

            // Map to hold latest revision info per productId
            Map<Long, Integer> latestRevisionNumbers = new HashMap<>();
            Map<Long, ProductEntity> latestProductStates = new HashMap<>();
            Map<Long, RevisionType> latestRevType = new HashMap<>();

            for (Object[] revisionEntry : revisions) {
                ProductEntity product = (ProductEntity) revisionEntry[0];
                // System.out.println("The product " + product);
                DefaultRevisionEntity revEntity = (DefaultRevisionEntity) revisionEntry[1];
                RevisionType revisionType = (RevisionType) revisionEntry[2];
                int revNumber = revEntity.getId();
                Long productId = product.getId();
                
                if (!latestRevisionNumbers.containsKey(productId) || revNumber > latestRevisionNumbers.get(productId)) {
                    latestRevisionNumbers.put(productId, revNumber);
                    latestProductStates.put(productId, product);
                    latestRevType.put(productId,revisionType);
                }
            }


            
            double totalPrice = 0.0;

            for (Long productId : latestProductStates.keySet()) {
                RevisionType revisionType = latestRevType.get(productId);
                if(revisionType == RevisionType.DEL) continue;
                ProductEntity product = latestProductStates.get(productId);
                Integer qty = Optional.ofNullable(product.getQuantity()).orElse(0);
                Double price = Optional.ofNullable(product.getUnitPrice()).orElse(0.0);
                totalPrice += qty * price;

            }
            monthlyTotals.put(monthAbbreviation, totalPrice);
        }

        return monthlyTotals;
    }



    @Override
    public Map<String,Integer> getMonthlyCountProductByQuantityBetween(Integer min, Integer max) {
        AuditReader auditReader = AuditReaderFactory.get(entityManager);
        Map<String, Integer> monthlyTotals = new LinkedHashMap<>();

        LocalDate now = LocalDate.now();

        for (int i = 11; i >= 0; i--) {
            YearMonth yearMonth = YearMonth.from(now).minusMonths(i);
            LocalDateTime endOfMonth = yearMonth.atEndOfMonth().atTime(23, 59, 59);
            Date snapshotTime = Date.from(endOfMonth.atZone(ZoneId.systemDefault()).toInstant());
            String monthAbbreviation = yearMonth.format(DateTimeFormatter.ofPattern("MMM", Locale.ENGLISH));

            Number revision;
            try {
                revision = auditReader.getRevisionNumberForDate(snapshotTime);
            } catch (org.hibernate.envers.exception.RevisionDoesNotExistException e) {
                monthlyTotals.put(monthAbbreviation, 0);
                continue;
            }

            // Fetch all revisions of ProductEntity up to 'revision', including deletions
            var query = auditReader.createQuery()
            .forRevisionsOfEntity(ProductEntity.class, false, true)
            .add(AuditEntity.revisionNumber().le(revision));

            List<Object[]> revisions = query.getResultList();

            // Maps to hold latest revision info per productId
            Map<Long, Integer> latestRevisionNumbers = new HashMap<>();
            Map<Long, ProductEntity> latestProductStates = new HashMap<>();
            Map<Long, RevisionType> latestRevisionTypes = new HashMap<>();

            for (Object[] revisionEntry : revisions) {
                ProductEntity product = (ProductEntity) revisionEntry[0];
                DefaultRevisionEntity revEntity = (DefaultRevisionEntity) revisionEntry[1];
                RevisionType revType = (RevisionType) revisionEntry[2];
                int revNumber = revEntity.getId();

                Long productId = product.getId();

                // Keep only the latest revision for each product
                if (!latestRevisionNumbers.containsKey(productId) || revNumber > latestRevisionNumbers.get(productId)) {
                    latestRevisionNumbers.put(productId, revNumber);
                    latestProductStates.put(productId, product);
                    latestRevisionTypes.put(productId, revType);
                }
            }
            

            int count = 0;
            for (Long productId : latestProductStates.keySet()) {
                RevisionType revType = latestRevisionTypes.get(productId);
                ProductEntity product = latestProductStates.get(productId);
                Integer qty = Optional.ofNullable(product.getQuantity()).orElse(0);

                if (revType != RevisionType.DEL && qty >= min && (max == null || qty <= max)) {
                    count++;
                }
            }

            monthlyTotals.put(monthAbbreviation, count);

        }

        return monthlyTotals;
    }

    
    @Override
    public Map<String,Integer> getProductsByCategory(){
        List<ProductEntity> products = productRepository.findAll();
        // products.sort(Comparator.comparing(ProductEntity :: getQuantity));

        Map<String,Integer> productsByCategory = new LinkedHashMap<>();
        
        for(ProductEntity product : products){
            String category = product.getCategory();
            productsByCategory.put(category,productsByCategory.getOrDefault(category,(int) 0) + 1);
        }

        Map<String, Integer> sorted = productsByCategory.entrySet().stream()
                                    .sorted(Map.Entry.comparingByValue()) 
                                    .limit(10)
                                    .collect(Collectors.toMap(
                                            Map.Entry::getKey,
                                            Map.Entry::getValue,
                                            (e1, e2) -> e1,
                                            LinkedHashMap::new)); 

        return sorted;
    }
}
