package com.example.InventoryManagement.Services.Impl;

import com.example.InventoryManagement.Domain.Entities.UserEntity;
import com.example.InventoryManagement.Repositories.UserRepository;
import com.example.InventoryManagement.Services.UserService;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl extends GenericServiceImpl<UserEntity,Long> implements UserService {

    @Autowired
    private PasswordEncoder passwordEncoder;

    private final UserRepository userRepository;
    public UserServiceImpl(UserRepository userRepository){
        super(userRepository);
        this.userRepository = userRepository;
    }

    @Override
    public List<UserEntity> getByRole(String role) {
        return userRepository.getByRole(role);
    }

    @Override
    public UserEntity save(UserEntity element) {
        if (userRepository.existsByEmail(element.getEmail())) {
            throw new RuntimeException("Email already in use");
        }
        element.setPassword(passwordEncoder.encode(element.getPassword()));
        element.setRole("CLIENT");
        return userRepository.save(element);
    }

    public UserEntity update(UserEntity element) {
        Optional<UserEntity> existingUserOpt = userRepository.findById(element.getId());
    
        if (existingUserOpt.isPresent()) {
            UserEntity existingUser = existingUserOpt.get();
            String currentEncodedPassword = existingUser.getPassword();
            String incomingPassword = element.getPassword();
    
            // If the incoming password equals the existing encoded one, skip encoding
            if (incomingPassword.equals(currentEncodedPassword)) {
                // System.out.println("Password unchanged; skipping encoding");
                element.setPassword(currentEncodedPassword);
            } else {
                // It's a new password; encode it
                // System.out.println("New password detected; encoding");
                element.setPassword(passwordEncoder.encode(incomingPassword));
            }
        } else {
            // New user fallback: always encode
            element.setPassword(passwordEncoder.encode(element.getPassword()));
        }

    
        return userRepository.save(element);
    }
    
    

    @Override
    public UserEntity login(String email, String rawPassword){
        // System.out.println(email);
        UserEntity user = userRepository.findByEmail(email)
        .orElseThrow(() -> new RuntimeException("User not found"));
        // System.out.println("The password " + rawPassword);
        // System.out.println("The user " + user);
        
        boolean passwordMatches = passwordEncoder.matches(rawPassword, user.getPassword());
        if (!passwordMatches) {
            throw new RuntimeException("Invalid password");
        }
        user.setPassword(null);
        return user;
    }
}
