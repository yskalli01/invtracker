package com.example.InventoryManagement.Domain.DTO;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SupplierDTO {
    private Long id;
    @NotBlank(message = "Name is required")
    private String name;
    @Email(message = "The email is not valid")
    @NotBlank(message = "Email is required")
    private String email;
    private String phone;
    private String address;
    private String country;
}
