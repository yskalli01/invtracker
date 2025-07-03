package com.example.InventoryManagement.Controllers;
import com.example.InventoryManagement.Domain.DTO.LoginDTO;
import com.example.InventoryManagement.Domain.DTO.UserDTO;
import com.example.InventoryManagement.Domain.Entities.UserEntity;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;

import java.nio.file.Files;
import java.nio.file.Path;
import java.util.UUID;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    private UserDTO testUserDTO;

    @BeforeEach
    void setup() {
        testUserDTO = new UserDTO();
        String uniqueEmail = "testuser_" + UUID.randomUUID() + "@example.com";
        testUserDTO.setEmail(uniqueEmail);
        testUserDTO.setPassword("test123");
        testUserDTO.setRole("CLIENT");
        testUserDTO.setImagePath(null);
    }


    @Test
    void getByRole() throws Exception {
        // Create user
        MockMultipartFile userPart = new MockMultipartFile(
                "user", "", MediaType.APPLICATION_JSON_VALUE,
                objectMapper.writeValueAsBytes(testUserDTO));

        mockMvc.perform(multipart("/users").file(userPart))
                .andExpect(status().isOk());

        // Verify the created user appears in the response
        mockMvc.perform(get("/users/role/CLIENT"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*].email", hasItem(testUserDTO.getEmail())))
                .andExpect(jsonPath("$[*].role", everyItem(equalTo("CLIENT"))));
    }


    @Test
    void testCreateUserWithImage() throws Exception {
        // Create a fake image file
        byte[] content = Files.readAllBytes(Path.of("src/test/resources/test-image.jpg"));
        MockMultipartFile imageFile = new MockMultipartFile(
                "image", "test-image.jpg", MediaType.IMAGE_JPEG_VALUE, content);

        // Multipart JSON part for userDTO
        MockMultipartFile userPart = new MockMultipartFile(
                "user", "", MediaType.APPLICATION_JSON_VALUE,
                objectMapper.writeValueAsBytes(testUserDTO));

        mockMvc.perform(multipart("/users")
                        .file(userPart)
                        .file(imageFile))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.email").value(testUserDTO.getEmail()))
                .andExpect(jsonPath("$.role").value("CLIENT"))
                .andExpect(jsonPath("$.imagePath").exists());
    }

    @Test
    void updateWithImage() throws Exception {
        // Create a user first
        MockMultipartFile userPartCreate = new MockMultipartFile(
                "user", "", MediaType.APPLICATION_JSON_VALUE,
                objectMapper.writeValueAsBytes(testUserDTO));

        String response = mockMvc.perform(multipart("/users").file(userPartCreate))
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString();

        UserDTO createdUser = objectMapper.readValue(response, UserDTO.class);

        // Prepare update DTO
        createdUser.setEmail("updated@example.com");

        MockMultipartFile userPartUpdate = new MockMultipartFile(
                "user", "", MediaType.APPLICATION_JSON_VALUE,
                objectMapper.writeValueAsBytes(createdUser));

        byte[] newImageBytes = Files.readAllBytes(Path.of("src/test/resources/test-image.jpg"));
        MockMultipartFile newImage = new MockMultipartFile(
                "image", "new-image.jpg", MediaType.IMAGE_JPEG_VALUE, newImageBytes);

        mockMvc.perform(multipart("/users/" + createdUser.getId())
                        .file(userPartUpdate)
                        .file(newImage)
                        .with(req -> {
                            req.setMethod("PATCH"); // Override multipart method to PATCH
                            return req;
                        }))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.email").value("updated@example.com"))
                .andExpect(jsonPath("$.imagePath").exists());
    }


    @Test
    void getImage() throws Exception {
        // Copy a sample image to the uploads directory
        Path source = Path.of("src/test/resources/test-image.jpg");
        String uniqueName = UUID.randomUUID() + "_test-image.jpg";
        Path target = Path.of("uploads", uniqueName);
        Files.createDirectories(target.getParent());
        Files.copy(source, target);

        mockMvc.perform(get("/users/images/uploads/" + uniqueName))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.IMAGE_JPEG));
    }

    @Test
    void testLoginUser() throws Exception {
        // Create the user using testUserDTO
        MockMultipartFile userPart = new MockMultipartFile(
                "user", "", MediaType.APPLICATION_JSON_VALUE,
                objectMapper.writeValueAsBytes(testUserDTO));

        mockMvc.perform(multipart("/users").file(userPart))
                .andExpect(status().isOk());

        // Use the same testUserDTO to log in
        LoginDTO loginDTO = new LoginDTO();
        loginDTO.setEmail(testUserDTO.getEmail());  // same email
        loginDTO.setPassword(testUserDTO.getPassword());  // same password

        mockMvc.perform(post("/users/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginDTO)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.email").value(testUserDTO.getEmail()))
                .andExpect(jsonPath("$.password").doesNotExist());
    }

}