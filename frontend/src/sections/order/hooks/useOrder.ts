import { useCallback } from 'react';
import { axios } from 'src/api';
import { OrderProps, OrderStatusProps } from '../config';
import { useCRUD } from 'src/hooks/useCRUD';
import { notify } from 'src/utils/toast-helper';

export function useOrder() {
  const messages = {
    createSuccess : 'Client created successfully',
    updateSuccess : 'Clier updated successfully',
    deleteSuccess : 'The client has been deleted successfully',
    deleteAllSuccess : "Clients have been deleted successfully"
  }
  
  const{
    elements : orders,
    setElements : setOrders,
    deleteElement: deleteOrder,
    deleteElements: deleteOrders,
    loading
  } = useCRUD<OrderProps>({basePath:'orders',messages});

  const setOrderStatus = useCallback(async (id : number, status : OrderStatusProps) =>{
    try{
      const response = await axios.put(`/orders/${id}/${status}`);
      notify(response.data,'success');
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.id === id ? { ...order, status } : order
        )
      );
      return true;
    }
    catch(error : unknown){
      console.log(error);
      return false;
    }
  },[])


  

  return{
    loading,
    orders,
    setOrders,
    deleteOrder,
    deleteOrders,
    setOrderStatus
  }
}









