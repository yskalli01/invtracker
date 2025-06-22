package com.example.InventoryManagement.Services.Impl;
import com.example.InventoryManagement.Services.GenericService;
import org.springframework.data.jpa.repository.JpaRepository;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;


public abstract class GenericServiceImpl<T,ID> implements GenericService<T,ID> {
    protected JpaRepository<T,ID> repository;

    public GenericServiceImpl(JpaRepository<T,ID> repository){
        this.repository = repository;
    }

    //@SuppressWarnings("unchecked")
    public T save(T element) {
        return repository.save(element);
    }

    @Override
    public List<T> findAll(){
        return repository.findAll();
    }

    @Override
    public Optional<T> findById(ID id) {
        try {
            if (!repository.existsById(id)) {
                throw new RuntimeException("Resource with id " + id + " not found");
            }
            return repository.findById(id);
        } catch (Exception e) {
            throw new RuntimeException("Error finding resource with id " + id, e);
        }
    }

    @Override
    public void delete(ID id) {
        try {
            if (!repository.existsById(id)) {
                throw new RuntimeException("Resource with id " + id + " not found");
            }
            repository.deleteById(id);
        } catch (RuntimeException e) {
            throw e;
        } catch (Exception e) {
            throw new RuntimeException("Error deleting resource with id " + id, e);
        }
    }

    @Override
    public void deleteAllByIdIn(ID[] ids){
        Arrays.stream(ids).forEach(repository::deleteById);
    }

    @Override
    public boolean isExists(ID id){
        return repository.existsById(id);
    }

    @Override
    public T partialUpdate(T element, ID id){
        String className = element.getClass().getName();
        int length = className.length();

        // Set the id of the parameter "element" to the parameter "id"
        try {
            Method method = (id instanceof Long) ? element.getClass().getMethod("setId",Long.class)
                    : element.getClass().getMethod("setSKU", String.class);
            method.invoke(element,id);
        } catch (NoSuchMethodException | InvocationTargetException | IllegalAccessException e) {
            throw new RuntimeException(e);
        }

        // Try to find an element in the database with id and assign it the fields of the parameter "element"
        return repository.findById(id).map(existingElement -> {
            Arrays.stream(element.getClass().getMethods())
                    .filter(method -> method.getParameterCount() == 0 && method.getName().startsWith("get"))
                    .forEach(getter -> {
                        try {
                            // System.out.println("The getter is " + getter);
                            Object value = getter.invoke(element);
                            // System.out.println("The value is " + value);
                            if (value != null) {
                                // Construct setter name: getName() → setName()
                                String setterName = "set" + getter.getName().substring(3);
                                try {
                                    Method setter = existingElement.getClass().getMethod(setterName, getter.getReturnType());
                                    // System.out.println("The setter is " + setter);
                                    setter.invoke(existingElement, value);
                                } catch (NoSuchMethodException ignored) {
                                    // No matching setter found, skip it
                                }
                            }

                        } catch (IllegalAccessException | InvocationTargetException e) {
                            // Illegal Access to the method or error in executing the getter itself
                            throw new RuntimeException(e);
                        }
                    });
            return repository.save(existingElement);
        }).orElseThrow(() -> new RuntimeException("The " + className.substring(0, length - 6) + " of id " + id + " is not found"));

    }
}
