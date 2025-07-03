package com.example.InventoryManagement.Controllers;

import com.example.InventoryManagement.Domain.DTO.ProductDTO;
import com.example.InventoryManagement.Domain.DTO.RatingDTO;
import com.example.InventoryManagement.Domain.Entities.ProductEntity;
import com.example.InventoryManagement.Domain.Entities.RatingEntity;
import com.example.InventoryManagement.Mappers.ProductMapper;
import com.example.InventoryManagement.Repositories.RatingRepository;
import com.example.InventoryManagement.Services.ProductService;
import com.example.InventoryManagement.Services.RatingService;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;
import java.util.UUID;
import java.util.Date;




@RestController
@RequestMapping(path = "/products")
public class ProductController extends GenericController<ProductEntity, ProductDTO, Long> {
    private final ProductService productService;

    private final ModelMapper mapper;
    @Autowired
    private RatingService ratingService;
    @Autowired
    private ProductMapper productMapper;

    public ProductController(ProductService productService, ModelMapper mapper) {
        super(productService, mapper, ProductEntity.class, ProductDTO.class);
        this.productService = productService;
        this.mapper = mapper;
    }

    public static double calculateAverage(List<Double> numbers) {
        if (numbers == null || numbers.isEmpty()) {
            return 0;
        }
        double sum = 0;
        for (Double num : numbers) {
            sum += num;
        }
        return sum / numbers.size();
    }


    @Override
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> createElement(ProductDTO elementDTO) throws NoSuchMethodException {
        return super.createElement(elementDTO);
    }

    @Override
    @GetMapping
    public List<ProductDTO> getAllElements() {
        List<ProductEntity> products = productService.findAll();
        List<ProductDTO> productDTOs = new ArrayList<>();
    
        for (ProductEntity product : products) {
            // Fetch ratings
            List<RatingEntity> ratings = ratingService.findByProductId(product.getId());
    
            // Convert to DTOs
            List<RatingDTO> ratingDTOs = ratings.stream()
                .map(rating -> mapper.map(rating, RatingDTO.class))
                .toList();
    
            // Extract rating values
            List<Double> ratingValues = ratingDTOs.stream()
                .map(RatingDTO::getRatingValue)
                .filter(Objects::nonNull)
                .toList();
    
            // Calculate average
            double averageRating = calculateAverage(ratingValues);
    
            // Map product to ProductDTO
            ProductDTO dto = mapper.map(product, ProductDTO.class);
    
            // Attach additional data to the DTO
            dto.setAverageRating(averageRating);
            dto.setRatings(ratingDTOs); 
    
            productDTOs.add(dto);
        }
    
        return productDTOs;
    }
    

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createWithImage(
            @RequestPart("product") ProductDTO productDTO,
            @RequestPart(value = "image", required = false) MultipartFile image
    ) throws IOException {
    
        if (image != null && !image.isEmpty()) {
            String fileName = UUID.randomUUID() + "_" + image.getOriginalFilename();
            Path imagePath = Paths.get("uploads", fileName);
            Files.createDirectories(imagePath.getParent());
            Files.copy(image.getInputStream(), imagePath, StandardCopyOption.REPLACE_EXISTING);
            productDTO.setImagePath("/uploads/" + fileName);
        }

        
        // Map and save the product
        ProductEntity productEntity = mapper.map(productDTO, ProductEntity.class);
        ProductEntity savedProduct = productService.save(productEntity);
        ProductDTO savedProductDTO = mapper.map(savedProduct, ProductDTO.class);
    
        return ResponseEntity.ok(savedProductDTO);
    }
    

    @PatchMapping(path = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> updateWithImage(
            @PathVariable("id") Long id,
            @RequestPart("product") ProductDTO productDTO,
            @RequestPart(value = "image", required = false) MultipartFile image
    ) throws IOException {
        if (!productService.isExists(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", "Product with ID " + id + " not found"));
        }
        productDTO.setId(id);

        // Handle image update if a new image is uploaded
        if (image != null && !image.isEmpty()) {
            String fileName = UUID.randomUUID() + "_" + image.getOriginalFilename();
            Path imagePath = Paths.get("uploads", fileName);
            Files.createDirectories(imagePath.getParent());
            Files.copy(image.getInputStream(), imagePath, StandardCopyOption.REPLACE_EXISTING);
            productDTO.setImagePath("/uploads/" + fileName);
        }

        ProductEntity productEntity = mapper.map(productDTO, ProductEntity.class);

        ProductEntity updatedProduct = productService.save(productEntity);

        ProductDTO updatedProductDTO = mapper.map(updatedProduct, ProductDTO.class);

        // Return updated DTO or entity
        return ResponseEntity.ok(updatedProductDTO);
    }


    // @CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.OPTIONS})
    @GetMapping("/images/uploads/{filename:.+}")
    public ResponseEntity<?> getImage(@PathVariable String filename) {
        try {
            Path filePath = Paths.get("uploads").resolve(filename).normalize();
            Resource resource = new UrlResource(filePath.toUri());

            // If the file doesn't exist or is not readable, return an empty 200 OK with no body
            if (!resource.exists() || !resource.isReadable()) {
                return ResponseEntity.ok().body("The image doesn't exist"); // or ResponseEntity.noContent().build();
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

   @GetMapping("/values")
   public ResponseEntity<?> getMonthlyTotalPriceOfAllProducts() {
       return ResponseEntity.ok(productService.getMonthlyTotalPriceOfAllProducts());
   }
   
   @GetMapping("/quantities")
    public ResponseEntity<?> getMonthlyCountProductByQuantityBetween(
            @RequestParam(required = false, defaultValue = "0") Integer min,
            @RequestParam(required = false) Integer max
    ) {
        return ResponseEntity.ok(productService.getMonthlyCountProductByQuantityBetween(min,max));
   }
   
   @GetMapping("/category")
    public ResponseEntity<?> getProductsByCategory() {
        return ResponseEntity.ok(productService.getProductsByCategory());
   }

}
