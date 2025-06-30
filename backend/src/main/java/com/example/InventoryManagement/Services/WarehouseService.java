package com.example.InventoryManagement.Services;

import java.util.Map;

import com.example.InventoryManagement.Domain.Entities.WarehouseEntity;

public interface WarehouseService extends GenericService<WarehouseEntity,Long> {
    WarehouseEntity partialUpdate(WarehouseEntity warehouse, Long id);

    Map<String,Double> getMonthlyWarehouseUtilisation();
}
