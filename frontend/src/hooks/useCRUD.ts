import { useCallback, useEffect, useState } from "react";
import { axios } from 'src/api';
import { notify } from '../utils/toast-helper';

type CRUDMessagesProps = {
    createSuccess : string,
    updateSuccess : string,
    deleteSuccess : string,
    deleteAllSuccess : string
}

type CrudProps = {
    basePath : string,
    messages : CRUDMessagesProps
}


export function useCRUD<T extends{id ?: any}>({ basePath, messages = {
    createSuccess: "",
    updateSuccess: "",
    deleteSuccess: "",
    deleteAllSuccess : ""
} }: CrudProps) {
    const {
      createSuccess = 'Created successfully',
      updateSuccess = 'Updated successfully',
      deleteSuccess = 'The element has been deleted successfully',
      deleteAllSuccess = "Elements have been deleted successfully"
    } = messages;

    const [elements, setElements] = useState<T[]>([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      async function fetchElements() {
        try {
          const response = await axios.get(basePath);
          // console.log("The response is here ",response.data);
          setElements(response.data);
          setLoading(false);
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      }
      fetchElements();
    }, [basePath]);
   
  
    const createElement = useCallback(async (data : T) =>{
      try{
        const response = await axios.post(basePath,data);
        console.log(response);
        notify(messages.createSuccess,'success');
        setElements((prev) => [...prev, response.data.element]);
        return true;
      }
      catch(error : unknown){
        console.log(error);
        return false;
      }
    },[basePath])
    

    const modifyElement = useCallback(async (data : T, id : any)=>{
      if (!id) return false;
      try {
        await axios.put(`/${basePath}/${id}`, data);
        notify(messages.updateSuccess,'success');
        setElements((prev) =>
          prev.map((element) =>
            element && element.id === id ? { ...element, ...data } : element
          )
        );
        return true;
      } catch (error: unknown) {
        console.log(error);
        return false;
      }
    },[basePath])
    
  
    const deleteElement = useCallback(async (id : any)=>{
      try {
          await axios.delete(`/${basePath}/${id}`); 
          setElements((prev) => prev.filter(element => element.id !== id));
          notify(messages.deleteSuccess,'success');
          return true;
      } catch (error: unknown) {
          console.log(error);
          return false;
        }
    },[basePath])
  

    const deleteElements = useCallback(async (ids : any[])=>{
      try {
          await axios.delete(basePath,{data : ids}); 
          setElements((prev) => prev.filter(element => !ids.includes(element.id)));
          notify(messages.deleteAllSuccess,'success');
          return true;
      } catch (error: unknown) {
          console.log(error);
          return false;
        }
    },[basePath])
  
    return{
      elements,
      loading,
      setElements,
      createElement,
      modifyElement,
      deleteElement,
      deleteElements,
    }
  }