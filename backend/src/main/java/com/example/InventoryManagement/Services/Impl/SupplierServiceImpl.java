package com.example.InventoryManagement.Services.Impl;

import com.example.InventoryManagement.Domain.Entities.SupplierEntity;
import com.example.InventoryManagement.Repositories.SupplierRepository;
import com.example.InventoryManagement.Services.SupplierService;
import org.springframework.stereotype.Service;

@Service
public class SupplierServiceImpl extends GenericServiceImpl<SupplierEntity,Long> implements SupplierService {

    private final SupplierRepository supplierRepository;
    public SupplierServiceImpl(SupplierRepository supplierRepository){
        super(supplierRepository);
        this.supplierRepository = supplierRepository;
    }
}
