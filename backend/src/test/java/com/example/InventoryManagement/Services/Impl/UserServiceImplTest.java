package com.example.InventoryManagement.Services.Impl;

import com.example.InventoryManagement.Domain.Entities.UserEntity;
import com.example.InventoryManagement.Repositories.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;


@ExtendWith(MockitoExtension.class)
class UserServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserServiceImpl userService;

    @Test
    void shouldSaveUserWithEncodedPasswordAndClientRole() {
        UserEntity user = new UserEntity();
        user.setEmail("test@example.com");
        user.setPassword("plainPassword");

        when(userRepository.existsByEmail("test@example.com")).thenReturn(false);
        when(passwordEncoder.encode("plainPassword")).thenReturn("encodedPassword");
        when(userRepository.save(any(UserEntity.class))).thenAnswer(i -> i.getArgument(0));

        UserEntity savedUser = userService.save(user);

        assertEquals("encodedPassword", savedUser.getPassword());
        assertEquals("CLIENT", savedUser.getRole());
        verify(userRepository).save(user);
    }


    @Test
    void shouldThrowIfEmailAlreadyExists() {
        UserEntity user = new UserEntity();
        user.setEmail("existing@example.com");

        when(userRepository.existsByEmail("existing@example.com")).thenReturn(true);

        assertThrows(RuntimeException.class, () -> userService.save(user));
    }


    @Test
    void shouldEncodeNewPasswordWhenPasswordChanged() {
        UserEntity existing = new UserEntity();
        existing.setId(1L);
        existing.setPassword("oldEncoded");

        UserEntity incoming = new UserEntity();
        incoming.setId(1L);
        incoming.setPassword("newPassword");

        when(userRepository.findById(1L)).thenReturn(Optional.of(existing));
        when(passwordEncoder.encode("newPassword")).thenReturn("newEncoded");
        when(userRepository.save(any(UserEntity.class))).thenAnswer(i -> i.getArgument(0));

        UserEntity result = userService.update(incoming);

        assertEquals("newEncoded", result.getPassword());
    }


    @Test
    void shouldLoginSuccessfullyWhenPasswordMatches() {
        UserEntity user = new UserEntity();
        user.setEmail("test@example.com");
        user.setPassword("encodedPassword");

        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches("plainPassword", "encodedPassword")).thenReturn(true);

        UserEntity result = userService.login("test@example.com", "plainPassword");

        assertEquals("test@example.com", result.getEmail());
        assertNull(result.getPassword()); // password should be null after login
    }

    @Test
    void shouldThrowWhenPasswordDoesNotMatch() {
        UserEntity user = new UserEntity();
        user.setEmail("test@example.com");
        user.setPassword("encodedPassword");

        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches("wrongPassword", "encodedPassword")).thenReturn(false);

        assertThrows(RuntimeException.class, () -> userService.login("test@example.com", "wrongPassword"));
    }

}