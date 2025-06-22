import { ProductProps, product } from "../product/config";
import { UserProps, user } from "../user/config";

export const configStatus = {
    'Pending' : '',
    'Confirmed' : 'success',
    'Delivered' : 'info',
    'Cancelled' : 'error'
} as const



// order item props
export type OrderItemProps = {
  id ?: number|null,
  quantity : number|null,
  product : ProductProps
}

export const orderItem : OrderItemProps = {
  id : null,
  quantity : null,
  product : product
}



export type OrderStatusProps = keyof typeof configStatus;


export type OrderProps = {
  id ?: number | null;
  orderDate ?: string,
  status ?: OrderStatusProps|string,
  user : UserProps,
  orderItems : OrderItemProps[]
};

export const order : OrderProps = {
  id : null,
  user: user,
  orderDate: '',
  status: '',
  orderItems : []
}





// Props for the header table
export type OrderHeadProps = {
  id: number;
  orderDate : string,
  status : string,
  user : UserProps
}

export const orderHead : OrderHeadProps = {
  id: 0,
  user: user,
  orderDate: '',
  status: '',
};
  