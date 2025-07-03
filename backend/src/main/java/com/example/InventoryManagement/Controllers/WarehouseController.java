package com.example.InventoryManagement.Controllers;
import com.example.InventoryManagement.Domain.DTO.WarehouseDTO;
import com.example.InventoryManagement.Domain.Entities.ProductEntity;
import com.example.InventoryManagement.Domain.Entities.WarehouseEntity;
import com.example.InventoryManagement.Services.WarehouseService;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/warehouses")
public class WarehouseController extends GenericController<WarehouseEntity, WarehouseDTO, Long> {
    private final WarehouseService warehouseService;
    private final ModelMapper mapper;

    public WarehouseController(WarehouseService warehouseService, ModelMapper mapper) {
        super(warehouseService, mapper, WarehouseEntity.class, WarehouseDTO.class);
        this.warehouseService = warehouseService;
        this.mapper = mapper;
    }

    @GetMapping(path = "/util")
    public ResponseEntity<?> getMonthlyWarehouseUtilisation(){
        return ResponseEntity.ok(warehouseService.getMonthlyWarehouseUtilisation());
    }

    @Override
    @GetMapping
    public List<WarehouseDTO> getAllElements() {
        List<WarehouseEntity> warehouses = warehouseService.findAll();
        List<WarehouseDTO> warehousesDTO = new ArrayList<>();

        for(WarehouseEntity warehouse : warehouses){
            Integer capacity = warehouse.getCapacity();
            Integer productsQuantity = 0;
            for(ProductEntity product : warehouse.getProducts()){
                productsQuantity += product.getQuantity();
            }
            
            warehouse.setUtilisation(capacity - productsQuantity > 0 ? (double) productsQuantity/capacity : 0.0);
            WarehouseDTO warehouseDTO = mapper.map(warehouse,WarehouseDTO.class);
            warehousesDTO.add(warehouseDTO);
        }
    
        return warehousesDTO;
    }
}