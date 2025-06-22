package com.example.InventoryManagement.Exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.CannotCreateTransactionException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<?> handleRuntimeErrors(RuntimeException ex){
        return ResponseEntity.badRequest().body(Map.of("error", ex.getMessage()));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        // Concatenate all field errors into a single string separated by semicolons
        Map<String,String> mapErrors = new HashMap<>();
        List<String> errors = ex.getBindingResult().getFieldErrors().stream()
                .map(error -> error.getDefaultMessage()).toList();


        Map<String, Object> body = new HashMap<>();
        body.put("errors", errors);
        body.put("status", HttpStatus.BAD_REQUEST.value());

        return new ResponseEntity<>(body, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(CannotCreateTransactionException.class)
    public ResponseEntity<String> handleDatabaseConnectionFailure(CannotCreateTransactionException ex) {
        return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE)
                .body(Map.of("error","Database is temporarily unavailable. Please try again later.").toString());
    }
}
