
import { useCallback } from "react";
import { axios } from "src/api";
import { RegisterProps } from "src/sections/auth/config";
import { notify } from "src/utils/toast-helper";



export function useProfile(){
    
    const modifyUser = useCallback(async (data: RegisterProps, filePath: File | null, id : number) => {
        try {
          const formData = new FormData();
      
          // Build a product object (as expected by backend)
          let registerData = {
            name: data.name,
            email: data.email,
            address: data.address,
            phone: data.phone,
            country: data.country,
            password: data.password,
          };
      
          
      
          if (filePath) {
            formData.append("image", filePath); 
          }
          else{
            registerData = {...(registerData as any), imagePath : data.imagePath};
          }
    
          formData.append("user", new Blob([JSON.stringify(registerData)], { type: "application/json" }));
    
         
          const response = await axios.patch(`users/${id}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
        //   console.log("The updated product",response);
      
          notify("Your profile has been updated successfully", "success");

          localStorage.setItem("user",JSON.stringify(response.data));

        //   setProducts((prev) =>
        //     prev.map((product) =>
        //       product && product.id === id
        //         ? { ...response.data, averageRating: product.averageRating } 
        //         : product
        //     )
        //   );
        
          return true;
        } catch (error) {
          console.log(error);
          return false;
        }
      }, []);

    return{
        modifyUser
    }
}

