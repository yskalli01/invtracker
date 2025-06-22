import { createGenericContext } from 'src/context/create-generic-context';
import { useClient } from '../hooks/useClient';


export const [ClientProvider, useClientContext] = createGenericContext(useClient);
