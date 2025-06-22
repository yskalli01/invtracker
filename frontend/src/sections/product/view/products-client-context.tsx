import { ProductClientProvider } from "../context/useClientProductContext";
import ProductClientView from "./products-client-view";


export default function ProductClientViewWithContext(){
    return(
        <ProductClientProvider>
            <ProductClientView />
        </ProductClientProvider>
    )
}