package com.example.InventoryManagement.Repositories;

import com.example.InventoryManagement.Domain.Entities.UserEntity;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
class UserRepositoryTest {

    @Autowired
    private UserRepository underTest;

    @Test
    void canGetByRole() {
        String roleAdmin = "ADMIN";
        String roleUser = "CLIENT";

        UserEntity adminUser = UserEntity.builder()
                .role(roleAdmin)
                .name("AdminUser")
                .address("Admin Address")
                .build();

        UserEntity normalUser = UserEntity.builder()
                .role(roleUser)
                .name("NormalUser")
                .address("Client Address")
                .build();

        underTest.save(adminUser);
        underTest.save(normalUser);

        List<UserEntity> result = underTest.getByRole(roleAdmin);

        assertThat(result).hasSize(1);
        assertThat(result.get(0).getRole()).isEqualTo(roleAdmin);
        assertThat(result.get(0).getName()).isEqualTo("AdminUser");
    }

    @Test
    void shouldCheckWhenEmailExists() {
        String email = "user@hotmail.com";
        UserEntity user = UserEntity.builder().name("User").email(email).build();

        underTest.save(user);

        Boolean result = underTest.existsByEmail(email);
        assertThat(result).isEqualTo(true);
    }

    @Test
    void shouldCheckWhenEmailDoesNotExists() {
        String email = "user@hotmail.com";
        UserEntity user = UserEntity.builder().name("User").email(email).build();

        underTest.save(user);

        Boolean result = underTest.existsByEmail("admin@hotmail.com");
        assertThat(result).isEqualTo(false);
    }

    @Test
    void shouldReturnTheExpectedUserByEmail() {
        String email = "user@hotmail.com";
        UserEntity user = UserEntity.builder().name("User").email(email).build();

        underTest.save(user);
        Optional<UserEntity> result = underTest.findByEmail(email);
        assertThat(result).isPresent();
        assertThat(result.get().getEmail()).isEqualTo(email);
        assertThat(result.get().getName()).isEqualTo("User");
    }
}
