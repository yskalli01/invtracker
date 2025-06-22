package com.example.InventoryManagement.Controllers;

import com.example.InventoryManagement.Services.GenericService;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.List;
import java.util.Map;
import java.util.Optional;

// T : Entity
// B : DTO

public abstract class GenericController<T, B, ID> {
    protected GenericService<T, ID> service;
    protected ModelMapper mapper;
    protected Class<T> classT;
    protected Class<B> classB;

    public GenericController(GenericService<T, ID> service, ModelMapper mapper, Class<T> classT, Class<B> classB) {
        this.service = service;
        this.mapper = mapper;
        this.classT = classT;
        this.classB = classB;
    }

    @PostMapping(path = {"/", ""})
    public ResponseEntity<?> createElement(@Valid @RequestBody B elementDTO) throws NoSuchMethodException {
        T elementEntity = mapper.map(elementDTO,classT);
        T savedEntity = service.save(elementEntity);

        return new ResponseEntity<>(
                Map.of(
                        "element", mapper.map(savedEntity, classB),
                        "message", "The element have been created successfully"
                ),
                HttpStatus.CREATED
        );
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<B> getElement(@PathVariable("id") ID id) {
        Optional<T> foundElement = service.findById(id);
        return foundElement.map(elementEntity -> {
            B elementDTO = mapper.map(elementEntity, classB);
            return new ResponseEntity<>(elementDTO, HttpStatus.OK);
        }).orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping(path = {"/", ""})
    public List<B> getAllElements() {
        List<T> listElements = service.findAll();
        return listElements.stream().map(element -> mapper.map(element, classB)).toList();
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<String> deleteElement(@PathVariable("id") ID id) {
        service.delete(id);
        return ResponseEntity.ok("The element with has been deleted");
    }

    @DeleteMapping(path = {"/",""})
    public ResponseEntity<String> deleteAllElement(@RequestBody ID[] ids) {
        service.deleteAllByIdIn(ids);
        return ResponseEntity.ok("The elements have been deleted");
    }

    @PatchMapping(path = "/{id}")
    public ResponseEntity<B> partialUpdateElement(@RequestBody B elementDTO, @PathVariable("id") ID id) {
        if (!service.isExists(id)) return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        T elementEntity = mapper.map(elementDTO, classT);
        T updatedElementEntity = service.partialUpdate(elementEntity, id);
        B updatedElementDTO = mapper.map(updatedElementEntity, classB);
        return ResponseEntity.ok(updatedElementDTO);
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<?> fullUpdateElement(@RequestBody B elementDTO, @PathVariable("id") ID id) throws NoSuchMethodException {
        if (!service.isExists(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("errors", "The element with " + id + " could not be found."));
        };
        try {
            Method method = elementDTO.getClass().getMethod("setId", Long.class);
            method.invoke(elementDTO, id);
        } catch (NoSuchMethodException | InvocationTargetException | IllegalAccessException e) {
            throw new RuntimeException(e);
        }
        return createElement(elementDTO);
    }
}
