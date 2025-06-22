package com.example.InventoryManagement.Services.Impl;

import com.example.InventoryManagement.Domain.Entities.ProductEntity;
import com.example.InventoryManagement.Domain.Entities.WarehouseEntity;
import com.example.InventoryManagement.Repositories.WarehouseRepository;
import com.example.InventoryManagement.Services.WarehouseService;
import org.springframework.stereotype.Service;

@Service
public class WarehouseServiceImpl extends GenericServiceImpl<WarehouseEntity,Long> implements WarehouseService {

    private final WarehouseRepository warehouseRepository;
    public WarehouseServiceImpl(WarehouseRepository warehouseRepository){
        super(warehouseRepository);
        this.warehouseRepository = warehouseRepository;
    }
    @Override
    public double getWarehouseUtilisation() {
        double warehouseUtil = 0;
        int warehouseCount = 0;

        for (WarehouseEntity warehouse : warehouseRepository.findAll()) {
            warehouseCount++;
            int capacity = warehouse.getCapacity();
            int overallQuantity = 0;

            for (ProductEntity product : warehouse.getProducts()) {
                overallQuantity += product.getQuantity();
            }

            if (overallQuantity > 0) {
                warehouseUtil += (double) overallQuantity / capacity;
            }
        }

        return warehouseCount != 0 ? warehouseUtil / warehouseCount : 1;
    }
}
