package com.example.InventoryManagement.Domain.DTO;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDTO {
    private Long id;
    private String name;
    @Pattern(regexp = "ADMIN|CLIENT", message = "Role must be ADMIN or CLIENT")
    private String role;
    @Email(message = "The email is not valid")
    private String email;
    private String phone;
    private String address;
    private String country;
}
