package com.example.InventoryManagement.Services.Impl;

import com.example.InventoryManagement.Domain.Entities.ProductEntity;
import com.example.InventoryManagement.Domain.Entities.WarehouseEntity;
import com.example.InventoryManagement.Repositories.WarehouseRepository;
import com.example.InventoryManagement.Services.WarehouseService;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import org.hibernate.envers.AuditReader;
import org.hibernate.envers.AuditReaderFactory;
import org.hibernate.envers.DefaultRevisionEntity;
import org.hibernate.envers.RevisionType;
import org.hibernate.envers.query.AuditEntity;
import org.springframework.stereotype.Service;

@Service
public class WarehouseServiceImpl extends GenericServiceImpl<WarehouseEntity,Long> implements WarehouseService {

    private final WarehouseRepository warehouseRepository;

    @PersistenceContext
    EntityManager entityManager;

    public WarehouseServiceImpl(WarehouseRepository warehouseRepository){
        super(warehouseRepository);
        this.warehouseRepository = warehouseRepository;
    }

    @Override
    public Map<String,Double> getMonthlyWarehouseUtilisation() {
        AuditReader auditReader = AuditReaderFactory.get(entityManager);
        Map<String,Double> monthlyUtilisation = new LinkedHashMap<>();

        LocalDate now = LocalDate.now();


        for(int i = 11; i >= 0 ; i--){
            YearMonth yearMonth = YearMonth.from(now).minusMonths(i);
            LocalDateTime endOfMonth = yearMonth.atEndOfMonth().atTime(23, 59, 59);
            Date snapshotTime = Date.from(endOfMonth.atZone(ZoneId.systemDefault()).toInstant());
            String monthAbreviation = endOfMonth.format(DateTimeFormatter.ofPattern("MMM",Locale.ENGLISH));

            Number revision;
            try{
                revision = auditReader.getRevisionNumberForDate(snapshotTime);
            }   
            catch(org.hibernate.envers.exception.RevisionDoesNotExistException e){
                monthlyUtilisation.put(monthAbreviation, 0.0);
                continue;
            }

            List<Object[]> revisions = auditReader.createQuery()
                .forRevisionsOfEntity(WarehouseEntity.class, false, true)
                .add(AuditEntity.revisionNumber().le(revision))
                .getResultList();

            Map<Long,Integer> latestRevisionNumbers = new LinkedHashMap<>();
            Map<Long,WarehouseEntity> latestWarehouseState = new LinkedHashMap<>();
            Map<Long,RevisionType> latestRevisionType = new LinkedHashMap<>();

            for(Object[] revisionEntry : revisions){
                WarehouseEntity warehouse = (WarehouseEntity) revisionEntry[0];
                DefaultRevisionEntity revisionEntity = (DefaultRevisionEntity) revisionEntry[1];
                RevisionType revisionType = (RevisionType) revisionEntry[2];
                int revisionNumber = revisionEntity.getId();
                Long warehouseId = warehouse.getId();
                
                if(!latestWarehouseState.containsKey(warehouseId) || revisionNumber > latestRevisionNumbers.get(warehouseId)){
                    latestRevisionNumbers.put(warehouseId,revisionNumber);
                    latestWarehouseState.put(warehouseId,warehouse);
                    latestRevisionType.put(warehouseId,revisionType);
                }
            }
            
            double warehouseUtil = 0;
            int warehouseCount = 0;

            for(Long warehouseId : latestWarehouseState.keySet()){
                RevisionType revisionType = latestRevisionType.get(warehouseId);
                if(revisionType == RevisionType.DEL) continue;
                WarehouseEntity warehouse = latestWarehouseState.get(warehouseId);
                warehouseCount++;
                int capacity = warehouse.getCapacity();
                int overallQuantity = 0;
                for(ProductEntity product : warehouse.getProducts()){
                    overallQuantity += product.getQuantity();
                }
                if(overallQuantity > 0){
                    warehouseUtil += (double) overallQuantity/capacity;
                }
            }

            Double result = warehouseCount != 0 ? warehouseUtil / warehouseCount : 1.0;
            monthlyUtilisation.put(monthAbreviation,result);

        }

        return monthlyUtilisation;
    }
}
