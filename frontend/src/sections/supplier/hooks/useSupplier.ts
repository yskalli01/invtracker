import { SupplierProps } from '../config';
import { useCRUD } from 'src/hooks/useCRUD';


export function useSupplier() {
  const messages = {
    createSuccess : 'Supplier created successfully',
    updateSuccess : 'Supplier updated successfully',
    deleteSuccess : 'The supplier has been deleted successfully',
    deleteAllSuccess : "Suppliers have been deleted successfully"
  }
  
  const{
    elements : suppliers,
    setElements : setSuppliers,
    createElement:createSupplier,
    modifyElement: modifySupplier,
    deleteElement: deleteSupplier,
    deleteElements: deleteSuppliers,
    loading
  } = useCRUD<SupplierProps>({basePath:'suppliers',messages});





  return{
    loading,
    suppliers,
    createSupplier,
    modifySupplier,
    deleteSupplier,
    deleteSuppliers
  }
}



