export type RegisterProps = {
    imagePath : string;
    name: string;
    address: string;
    email: string;
    phone: string,
    country : string;
    password : string
};

// This one for using it with propsToHeader to generate the header
export const initialRegister : RegisterProps = {
    name: '',
    imagePath : '',
    address: '',
    email: '',
    phone: '',
    country : '',
    password : ''
};


export type LoginProps = {
    email : string,
    password : string
}

export const initialLogin : LoginProps = {
    email:'',
    password:''
}



