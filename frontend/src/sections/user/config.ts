export type UserProps = {
    id: number;
    name: string;
    address: string;
    email: string;
    phone: string,
    country : string
};

// This one for using it with propsToHeader to generate the header
export const user : UserProps = {
    id: 0,
    name: '',
    address: '',
    email: '',
    phone: '',
    country : ''
};



