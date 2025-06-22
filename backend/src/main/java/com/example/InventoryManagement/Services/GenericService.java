package com.example.InventoryManagement.Services;
import java.util.List;
import java.util.Optional;

public interface GenericService<T,ID> {
    T save(T element);
    List<T> findAll();
    Optional<T> findById(ID id);
    void delete(ID id);
    void deleteAllByIdIn(ID[] ids);
    boolean isExists(ID id);
    T partialUpdate(T element, ID id);
}
