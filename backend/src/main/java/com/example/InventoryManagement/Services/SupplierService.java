package com.example.InventoryManagement.Services;

import com.example.InventoryManagement.Domain.Entities.SupplierEntity;

public interface SupplierService extends GenericService<SupplierEntity,Long> {
    SupplierEntity partialUpdate(SupplierEntity supplier, Long id);
}