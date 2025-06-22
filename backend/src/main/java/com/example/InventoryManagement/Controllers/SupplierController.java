package com.example.InventoryManagement.Controllers;

import com.example.InventoryManagement.Domain.DTO.SupplierDTO;
import com.example.InventoryManagement.Domain.Entities.SupplierEntity;
import com.example.InventoryManagement.Services.SupplierService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/suppliers")
public class SupplierController extends GenericController<SupplierEntity, SupplierDTO, Long> {
    @Autowired
    private SupplierService supplierService;
    @Autowired
    private ModelMapper mapper;

    public SupplierController(SupplierService supplierService, ModelMapper mapper) {
        super(supplierService, mapper, SupplierEntity.class, SupplierDTO.class);
    }
}