import { createGenericContext } from 'src/context/create-generic-context';
import { useProduct } from '../hooks/useProduct';


export const [ProductProvider, useProductContext] = createGenericContext(useProduct);
