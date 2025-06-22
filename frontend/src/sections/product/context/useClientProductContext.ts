import { createGenericContext } from 'src/context/create-generic-context';
import { useProductClient } from '../hooks/useProductClient';


export const [ProductClientProvider, useProductClientContext] = createGenericContext(useProductClient);