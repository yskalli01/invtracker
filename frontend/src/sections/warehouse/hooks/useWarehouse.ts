import { WarehouseProps } from '../config';
import { useCRUD } from 'src/hooks/useCRUD';

export function useWarehouse() {
  const messages = {
    createSuccess : 'Warehouse created successfully',
    updateSuccess : 'Warehouse updated successfully',
    deleteSuccess : 'The warehouse has been deleted successfully',
    deleteAllSuccess : "Warehouses have been deleted successfully"
  }
  
  const{
    elements : warehouses,
    setElements : setWarehouses,
    createElement:createWarehouse,
    modifyElement: modifyWarehouse,
    deleteElement: deleteWarehouse,
    deleteElements: deleteWarehouses,
    loading
  } = useCRUD<WarehouseProps>({basePath:'warehouses',messages});

  return{
    loading,
    warehouses,
    createWarehouse,
    modifyWarehouse,
    deleteWarehouse,
    deleteWarehouses,
  }
}



