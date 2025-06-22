package com.example.InventoryManagement.Mappers;
import org.mapstruct.Mapper;
import com.example.InventoryManagement.Domain.DTO.ProductDTO;
import com.example.InventoryManagement.Domain.DTO.SupplierDTO;
import com.example.InventoryManagement.Domain.DTO.WarehouseDTO;
import com.example.InventoryManagement.Domain.Entities.ProductEntity;
import com.example.InventoryManagement.Domain.Entities.SupplierEntity;
import com.example.InventoryManagement.Domain.Entities.WarehouseEntity;

@Mapper(componentModel = "spring")
public interface ProductMapper {
    ProductEntity toEntity(ProductDTO dto);

    ProductDTO toDto(ProductEntity entity);

    SupplierEntity toEntity(SupplierDTO dto);

    SupplierDTO toDto(SupplierEntity entity);

    WarehouseEntity toEntity(WarehouseDTO dto);

    WarehouseDTO toDto(WarehouseEntity entity);
}
