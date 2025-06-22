import { ProductProvider } from "../context/useAdminProductContext";
import ProductAdminView from "./products-admin-view";


export default function ProductAdminViewWithContext(){
    return(
        <ProductProvider>
            <ProductAdminView />
        </ProductProvider>
    )
}