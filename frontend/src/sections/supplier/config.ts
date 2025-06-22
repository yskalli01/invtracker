export type SupplierProps = {
    id ?: number | null;
    name: string;
    address: string;
    email: string;
    phone: string,
    country : string
};

export const supplier : SupplierProps = {
    id: null,
    name: '',
    address: '',
    email: '',
    phone: '',
    country : ''
};