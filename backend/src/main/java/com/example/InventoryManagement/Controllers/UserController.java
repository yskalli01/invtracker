package com.example.InventoryManagement.Controllers;

import com.example.InventoryManagement.Domain.DTO.UserDTO;
import com.example.InventoryManagement.Domain.DTO.LoginDTO;
import com.example.InventoryManagement.Domain.Entities.UserEntity;
import com.example.InventoryManagement.Services.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.MediaType;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import jakarta.validation.Valid;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;

import java.util.ArrayList;

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

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createWithImage(
            @RequestPart("user") UserDTO userDTO,
            @RequestPart(value = "image", required = false) MultipartFile image
    ) throws IOException {
    
        if (image != null && !image.isEmpty()) {
            String fileName = UUID.randomUUID() + "_" + image.getOriginalFilename();
            Path imagePath = Paths.get("uploads", fileName);
            Files.createDirectories(imagePath.getParent());
            Files.copy(image.getInputStream(), imagePath, StandardCopyOption.REPLACE_EXISTING);
            userDTO.setImagePath("/uploads/" + fileName);
        }
        UserEntity userEntity = mapper.map(userDTO, UserEntity.class);
        UserEntity savedUser = userService.save(userEntity);
        UserDTO savedUserDTO = mapper.map(savedUser, UserDTO.class);
    
        return ResponseEntity.ok(savedUserDTO);
    }

    @PatchMapping(path = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> updateWithImage(
            @PathVariable("id") Long id,
            @RequestPart("user") UserDTO userDTO,
            @RequestPart(value = "image", required = false) MultipartFile image
    ) throws IOException {

        Optional<UserEntity> optionalUser = userService.findById(id);
        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", "User with ID " + id + " not found"));
        }

        UserEntity existingUser = optionalUser.get();

        
        if (userDTO.getPassword() == null || userDTO.getPassword().isEmpty()) {
            userDTO.setPassword(existingUser.getPassword());
        }

        userDTO.setRole(existingUser.getRole());
        userDTO.setId(id);

        if (image != null && !image.isEmpty()) {
            String fileName = UUID.randomUUID() + "_" + image.getOriginalFilename();
            Path imagePath = Paths.get("uploads", fileName);
            Files.createDirectories(imagePath.getParent());
            Files.copy(image.getInputStream(), imagePath, StandardCopyOption.REPLACE_EXISTING);
            userDTO.setImagePath("/uploads/" + fileName);
        }

        UserEntity userEntity = mapper.map(userDTO, UserEntity.class);
        UserEntity updatedUser = userService.update(userEntity);
        UserDTO updatedUserDTO = mapper.map(updatedUser, UserDTO.class);

        return ResponseEntity.ok(updatedUserDTO);
    }


    // @CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.OPTIONS})
    @GetMapping("/images/uploads/{filename:.+}")
    public ResponseEntity<?> getImage(@PathVariable String filename) {
        try {
            Path filePath = Paths.get("uploads").resolve(filename).normalize();
            Resource resource = new UrlResource(filePath.toUri());
            if (!resource.exists() || !resource.isReadable()) {
                return ResponseEntity.ok().body("The image doesn't exist"); 
            }

            String contentType = "application/octet-stream";
            if (filename.endsWith(".jpg") || filename.endsWith(".jpeg")) {
                contentType = MediaType.IMAGE_JPEG_VALUE;
            } else if (filename.endsWith(".png")) {
                contentType = MediaType.IMAGE_PNG_VALUE;
            }

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
                    .body(resource);

        } catch (MalformedURLException e) {
            return ResponseEntity.ok().body("Error on importing image");
        }
    }


    @PostMapping("/login")
    public ResponseEntity<UserEntity> login(@RequestBody LoginDTO loginRequest) {
        UserEntity user = userService.login(loginRequest.getEmail(), loginRequest.getPassword());
        return ResponseEntity.ok(user);
    }
}
