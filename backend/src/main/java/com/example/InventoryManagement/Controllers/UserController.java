package com.example.InventoryManagement.Controllers;

import com.example.InventoryManagement.Domain.DTO.UserDTO;
import com.example.InventoryManagement.Domain.Entities.UserEntity;
import com.example.InventoryManagement.Services.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;


@RestController
@RequestMapping(path = "/users")
public class UserController extends GenericController<UserEntity, UserDTO, Long> {
    @Autowired
    private UserService userService;
    @Autowired
    private ModelMapper mapper;

    public UserController(UserService userService, ModelMapper mapper) {
        super(userService, mapper, UserEntity.class, UserDTO.class);
    }

    @GetMapping(path = "/role/{role}")
    public ResponseEntity<List<UserDTO>> getByRole(@PathVariable("role") String role) {
        List<UserEntity> userEntities = userService.getByRole(role);  // Make sure service returns List<UserEntity>

        List<UserDTO> userDTOs = userEntities.stream()
                .map(userEntity -> mapper.map(userEntity, UserDTO.class))
                .toList();

        return ResponseEntity.ok(userDTOs);
    }

}
