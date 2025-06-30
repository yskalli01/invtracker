export type UserProps = {
    id: number;
    imagePath : string;
    name: string;
    address: string;
    email: string;
    phone: string,
    country : string,
    role : string
};

// This one for using it with propsToHeader to generate the header
export const user : UserProps = {
    id: 0,
    name: '',
    imagePath : '',
    address: '',
    email: '',
    phone: '',
    country : '',
    role : ''
};



