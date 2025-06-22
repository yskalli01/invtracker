package com.example.InventoryManagement.Mappers;

import com.example.InventoryManagement.Domain.DTO.*;
import com.example.InventoryManagement.Domain.Entities.*;
import org.apache.catalina.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface OrderItemMapper {

    OrderItemEntity toEntity(OrderItemDTO dto);

    OrderItemDTO toDto(OrderItemEntity entity);

    OrderEntity toEntity(OrderDTO dto);

    OrderDTO toDto(OrderEntity entity);

    UserEntity toEntity(UserDTO dto);

    ProductEntity toEntity(ProductDTO dto);

    ProductDTO toDto(ProductEntity entity);

    SupplierEntity toEntity(SupplierDTO dto);

    SupplierDTO toDto(SupplierEntity entity);

    WarehouseEntity toEntity(WarehouseDTO dto);

    WarehouseDTO toDto(WarehouseEntity entity);
}
