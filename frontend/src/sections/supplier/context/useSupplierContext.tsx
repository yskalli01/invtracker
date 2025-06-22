import { createGenericContext } from 'src/context/create-generic-context';
import { useSupplier } from '../hooks/useSupplier';


export const [SupplierProvider, useSupplierContext] = createGenericContext(useSupplier);
