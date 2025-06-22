export type WarehouseProps = {
    id?: number | null;
    name: string;
    location: string;
    capacity: string,
    utilisation : number|null
};
  
export const warehouse: WarehouseProps = {
    id: null,
    name: '',
    location: '',
    capacity: '',
    utilisation : null
};