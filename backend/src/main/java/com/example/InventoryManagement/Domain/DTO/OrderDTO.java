package com.example.InventoryManagement.Domain.DTO;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderDTO {
    private Long id;
    private LocalDateTime orderDate;
    
    @Pattern(regexp = "Pending|Confirmed|Delivered|Cancelled|Returned", message = "Order status must be either pending, confirmed, delivered or cancelled")
    private String status;

    private UserDTO user;

    private List<OrderItemDTO> orderItems;
}
