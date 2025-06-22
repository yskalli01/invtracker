import { useCallback, useEffect, useState } from 'react';
import { axios } from 'src/api/axios';
import { OrderItemProps, OrderProps, orderItem } from 'src/sections/order/config';
import { ProductProps, ProductRatingProps } from 'src/sections/product/config';
import { notify } from 'src/utils/toast-helper';


export function useProductClient() {

    const [products,setProducts] = useState<ProductProps[]>([]);
    const [cartItems, setCartItems] = useState<OrderItemProps[]>([]);
    const [loading,setLoading] = useState(true);
  
    useEffect(() => {
        async function fetchElements() {
          try {
            const response = await axios.get('products');
            setProducts(response.data);
            setLoading(false);
          } catch (error) {
            console.log(error);
            setLoading(false);
          }
        }
        fetchElements();
    }, []);

    const addToCartItem = useCallback((newItem: OrderItemProps) => {
      setCartItems((prev) => {
        const index = prev.findIndex(
          (item) => item.product.id === newItem.product.id
        );
    
        if (index === -1) {
          // New item: but clamp quantity to product stock max
          const quantity = Math.min(newItem.quantity ?? 0, newItem.product.quantity ?? 0);
          return [...prev, { ...newItem, quantity }];
        } else {
          // Existing item: sum quantities but clamp to product stock max
          const updatedItems = [...prev];
          const existingItem = updatedItems[index];
    
          const maxQuantity = existingItem.product.quantity ?? 0;
          const totalQuantity = (existingItem.quantity ?? 0) + (newItem.quantity ?? 0);
    
          updatedItems[index] = {
            ...existingItem,
            quantity: totalQuantity > maxQuantity ? maxQuantity : totalQuantity,
          };
    
          return updatedItems;
        }
      });
    }, []);
    

    const deleteFromCartItem = useCallback((id:any) =>{
      setCartItems((prev)=>prev.filter((cartItem => cartItem.product.id != id)));
    },[])

    const orderItems = useCallback(async (data: OrderProps) => {
      try {
        await axios.post('orders', data);
        notify('Order has been successfully created', 'success');
    
        // setCartItems([]);
    
        // // Subtract quantities from products
        setProducts((prevProducts) =>
          prevProducts.map((product) => {
            const orderedItem = data.orderItems.find(
              (item) => item.product.id === product.id
            );
    
            if (orderedItem) {
              return {
                ...product,
                quantity: Math.max(0, (product.quantity ?? 0) - (orderedItem.quantity ?? 0)), 
              };
            }
    
            return product;
          })
        );
    
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    }, []);
    

    const getAverageRatingByProductId = useCallback(async (id: number) => {
      try {   
        const response = await axios.get(`ratings/product/${id}`);
        return response.data;
      } catch (error) {
        console.log(error);
        return false;
      }
    }, []);

    const postRating = useCallback(async (data: ProductRatingProps) => {
      try {   
        const response = await axios.post(`ratings`,data);
        console.log("The response is ",response);
        return response.data.element;
      } catch (error) {
        console.log(error);
        return false;
      }
    }, []);


  return {
    loading,
    products,
    addToCartItem,
    orderItems,
    cartItems,
    setCartItems,
    deleteFromCartItem,
    getAverageRatingByProductId,
    postRating
  }
}



