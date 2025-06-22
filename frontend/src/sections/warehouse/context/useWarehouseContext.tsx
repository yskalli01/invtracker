import { useWarehouse } from '../hooks/useWarehouse'; 
import { createGenericContext } from 'src/context/create-generic-context';


export const [WarehouseProvider, useWarehouseContext] = createGenericContext(useWarehouse);

