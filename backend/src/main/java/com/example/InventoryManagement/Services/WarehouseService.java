package com.example.InventoryManagement.Services;

import com.example.InventoryManagement.Domain.Entities.WarehouseEntity;

public interface WarehouseService extends GenericService<WarehouseEntity,Long> {
    WarehouseEntity partialUpdate(WarehouseEntity warehouse, Long id);

    double getWarehouseUtilisation();
}
