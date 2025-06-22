package com.example.InventoryManagement.Services.Impl;

import com.example.InventoryManagement.Domain.Entities.ProductEntity;
import com.example.InventoryManagement.Domain.Entities.SupplierEntity;
import com.example.InventoryManagement.Domain.Entities.WarehouseEntity;
import com.example.InventoryManagement.Repositories.ProductRepository;
import com.example.InventoryManagement.Repositories.SupplierRepository;
import com.example.InventoryManagement.Repositories.WarehouseRepository;
import com.example.InventoryManagement.Services.ProductService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class ProductServiceImpl extends GenericServiceImpl<ProductEntity,Long> implements ProductService {
    @Autowired
    private WarehouseRepository warehouseRepository;
    @Autowired
    private SupplierRepository supplierRepository;
    @Autowired
    private ProductRepository productRepository;

    public ProductServiceImpl(ProductRepository productRepository){
        super(productRepository);
    }

    @Override
    public ProductEntity save(ProductEntity element) {
        element.setWarehouse(resolveWarehouse(element.getWarehouse()));
        element.setSupplier(resolveSupplier(element.getSupplier()));
    
        WarehouseEntity warehouse = element.getWarehouse();
    
        if (warehouse != null) {
            int currentQuantity = warehouse.getProducts().stream()
                .mapToInt(ProductEntity::getQuantity)
                .sum();
    
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

    @Override
    public int findByQuantityBetweenFlexible(Integer min,Integer max){
        return productRepository.findByQuantityBetweenFlexible(min,max);
    }

    @Override
    public Double getPriceOfAllProducts(){
        return productRepository.getPriceOfAllProducts();
    }

}
