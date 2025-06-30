import { useCallback } from "react";
import { LoginProps, RegisterProps } from "../config";
import axios from "axios";


export function useAuth() {
    const messages = {
      createSuccess : 'Product created successfully',
      updateSuccess : 'Product updated successfully',
      deleteSuccess : 'The product has been deleted successfully',
      deleteAllSuccess : "Products have been deleted successfully"
    }
    
  
  
    const register = useCallback(async (data: RegisterProps, filePath: File | null) => {
      try {
        const formData = new FormData();
    
        // Build a product object (as expected by backend)
        const registerData = {
            name: data.name,
            email: data.email,
            phone: data.phone,
            address : data.address,
            country : data.country,
            password : data.password
        };
    
        formData.append("user", new Blob([JSON.stringify(registerData)], { type: "application/json" }));
    
        if (filePath) {
          formData.append("image", filePath); 
        }
        
    
        const response = await axios.post("users", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        // console.log("Create product ",response);
        // notify(messages.createSuccess, "success");
        // setProducts((prev) => [...prev, response.data]);

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    }, []);


    const login = useCallback(async (data : LoginProps) => {
        try {
            const response = await axios.post("users/login", data);
        }
        catch (error) {
            console.log(error);
            return false;
          }
    },[])
     
    return{
      register,
      login
    }
  }