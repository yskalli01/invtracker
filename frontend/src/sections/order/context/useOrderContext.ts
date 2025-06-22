import { createGenericContext } from 'src/context/create-generic-context';
import { useOrder } from '../hooks/useOrder';


export const [OrderProvider, useOrderContext] = createGenericContext(useOrder);
