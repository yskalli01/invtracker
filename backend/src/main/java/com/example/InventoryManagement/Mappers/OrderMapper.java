package com.example.InventoryManagement.Mappers;

import com.example.InventoryManagement.Domain.DTO.*;
import com.example.InventoryManagement.Domain.Entities.*;
import org.hibernate.query.Order;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface OrderMapper {

    OrderEntity toEntity(OrderDTO dto);

    OrderDTO toDto(OrderEntity entity);

    OrderItemEntity toEntity(OrderItemDTO dto);

    OrderItemDTO toDto(OrderItemEntity entity);

    List<OrderDTO> toDtoList(List<OrderEntity> entities);

    UserEntity toEntity(UserDTO dto);

    UserDTO toDto(UserEntity entity);

    ProductEntity toEntity(ProductDTO dto);

    ProductDTO toDto(ProductEntity entity);

    SupplierEntity toEntity(SupplierDTO dto);

    SupplierDTO toDto(SupplierEntity entity);

    WarehouseEntity toEntity(WarehouseDTO dto);

    WarehouseDTO toDto(WarehouseEntity entity);
}
