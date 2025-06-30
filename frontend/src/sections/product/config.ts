import { JSX, LazyExoticComponent, lazy } from "react";
import { WarehouseProps, warehouse } from "../warehouse/config";
import { SupplierProps, supplier } from "../supplier/config";
import { UserProps } from "../user/config";

const ProductAdminViewContext = lazy(()=>import('./view/products-admin-context'));
const ProductClientViewContext = lazy(()=>import('./view/products-client-context'));


// Showing different views depending on role 
export const roleViews: {
    ADMIN: LazyExoticComponent<() => JSX.Element>;
    CLIENT: LazyExoticComponent<() => JSX.Element>;
  } = {
    ADMIN: ProductAdminViewContext,
    CLIENT: ProductClientViewContext,
  };




export type ProductProps = {
  id ?: number | null
  name : string,
  unitPrice : number | null,
  purchasePrice : number | null,
  quantity : number | null,
  category : string,
  description ?: string,
  warehouse : WarehouseProps,
  supplier : SupplierProps,
  imagePath ?: string,
  averageRating : number|null,
  ratings : ProductRatingProps[]
}

export const product : ProductProps = {
  id : null,
  name : '',
  unitPrice : null,
  quantity : null,
  purchasePrice : null,
  category : '',
  warehouse : warehouse,
  supplier : supplier,
  description : '',
  averageRating : null,
  ratings : []
}


export type ProductRatingProps = {
  id ?: number | null,
  ratingValue ?: number | null;
  comment ?: string,
  product : ProductProps,
  user: UserProps
}