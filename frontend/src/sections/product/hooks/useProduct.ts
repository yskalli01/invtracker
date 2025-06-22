import { useCallback } from 'react';
import { axios } from 'src/api/axios';
import { useCRUD } from 'src/hooks/useCRUD';
import { ProductProps } from 'src/sections/product/config';
import { notify } from 'src/utils/toast-helper';


export function useProduct() {
  const messages = {
    createSuccess : 'Product created successfully',
    updateSuccess : 'Product updated successfully',
    deleteSuccess : 'The product has been deleted successfully',
    deleteAllSuccess : "Products have been deleted successfully"
  }
  
  const{
    elements : products,
    setElements : setProducts,
    deleteElement: deleteProduct,
    deleteElements: deleteProducts,
    loading
  } = useCRUD<ProductProps>({basePath:'products',messages});


  const createProduct = useCallback(async (data: ProductProps, filePath: File | null) => {
    try {
      const formData = new FormData();
  
      // Build a product object (as expected by backend)
      const productData = {
        name: data.name,
        category: data.category,
        description: data.description,
        warehouse: data.warehouse,
        supplier: data.supplier,
        unitPrice: data.unitPrice,
        purchasePrice : data.purchasePrice,
        quantity: data.quantity,
      };
  
      formData.append("product", new Blob([JSON.stringify(productData)], { type: "application/json" }));
  
      if (filePath) {
        formData.append("image", filePath); 
      }
      
  
      const response = await axios.post("products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // console.log("Create product ",response);
  
      notify(messages.createSuccess, "success");
      setProducts((prev) => [...prev, response.data]);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }, []);

  const modifyProduct = useCallback(async (data: ProductProps, filePath: File | null, id : number) => {
    try {
      const formData = new FormData();
  
      // Build a product object (as expected by backend)
      let productData = {
        name: data.name,
        category: data.category,
        description: data.description,
        warehouse: data.warehouse,
        supplier: data.supplier,
        unitPrice: data.unitPrice,
        purchasePrice : data.purchasePrice,
        quantity: data.quantity,
      };
  
      
  
      if (filePath) {
        formData.append("image", filePath); // ✅ must match @RequestPart("image")
      }
      else{
        productData = {...(productData as any), imagePath : data.imagePath};
      }

      formData.append("product", new Blob([JSON.stringify(productData)], { type: "application/json" }));

     
      const response = await axios.patch(`products/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("The updated product",response);
  
      notify(messages.updateSuccess, "success");
      setProducts((prev) =>
        prev.map((product) =>
          product && product.id === id
            ? { ...response.data, averageRating: product.averageRating } 
            : product
        )
      );
    
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }, []);
  
  
  return{
    loading,
    products,
    createProduct,
    modifyProduct,
    deleteProduct,
    deleteProducts
  }
}



