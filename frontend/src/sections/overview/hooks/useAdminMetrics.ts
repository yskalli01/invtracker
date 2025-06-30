import { useCallback, useEffect, useState } from "react";
import { axios } from "src/api";



export function useMetrics(){
    const [monthlyWarehouseUtil,setMonthlyWarehouseUtil] = useState<{ [key:string] : number}>({});
    const [monthlyEarnings,setMonthlyEarnings] = useState<{[key:string] : number}>({});
    const [monthlyProductsValue, setMonthlyProductsValue] = useState<{ [key: string]: number }>({});
    const [monthlyZeroStockCount, setMonthlyZeroStockCount] = useState<{ [key: string]: number }>({});
    const [monthlyLowStockCount, setMonthlyLowStockCount] = useState<{ [key: string]: number }>({});
    const [monthlyInStockCount, setMonthlyInStockCount] = useState<{ [key: string]: number }>({});
    const [monthlyProductCount, setMonthlyProductCount] = useState<{ [key: string]: number }>({});
    const [monthlyOrders, setMonthlyOrders] = useState<{ [key: string]: number }>({});
    const [ordersByCountry, setOrdersByCountry] = useState<{ [key: string]: number }>({});
    const [productsByCategory, setProductsByCategory] = useState<{ [key: string]: number }>({});



      // const getProductCount = useCallback(async (min: number, max: number | null) => {
      //   try {
      //     const params: { min: number; max?: number } = { min };
      //     if (max != null) {
      //       params.max = max;
      //     }
      //     const response = await axios.get('products/quantity', { params });
      //     return response.data as number;
      //   } catch (error) {
      //     console.error(error);
      //     return null; 
      //   }
      // }, []);


      const getMonthlyOrders = useCallback(async() => {
        try{
          const response = await axios.get('orders/monthly');
          return response.data;
        }
        catch(error){
          console.error(error);
          return null;
        }
      },[])

      const getMonthlyOverallEarnings = useCallback(async() => {
        try{
            const response = await axios.get('orders/earnings');
            return response.data;
        }
        catch(error){
            console.error(error);
            return null;
        }
      },[])

      const getMonthlyWarehouseUtil = useCallback(async() => {
        try{
            const response = await axios.get('warehouses/util');
            return response.data;
        }
        catch(error){
            console.error(error);
            return null;
        }
      },[])

      const getMonthlyProductsValue =  useCallback(async () => {
        try {
          const response = await axios.get('products/values');
          return response.data;
        } catch (error) {
          console.error(error);
          return null; 
        }
      }, []);

      const getMonthlyProductCount = useCallback(async (min: number, max: number | null) => {
        try {
          const params: { min: number; max?: number } = { min };
          if (max != null) {
            params.max = max;
          }
          const response = await axios.get('products/quantities', { params });
          return response.data;
        } catch (error) {
          console.error(error);
          return null; 
        }
      }, []);

      const getOrdersByCountry = useCallback(async () => {
        try {
          const response = await axios.get('orders/countries');
          return response.data;
        } catch (error) {
          console.error(error);
          return null; 
        }
      }, []);

      const getProductsByCategory = useCallback(async () => {
        try {
          const response = await axios.get('products/category');
          return response.data;
        } catch (error) {
          console.error(error);
          return null; 
        }
      }, []);


      useEffect(() => {
        const fetchStockCounts = async () => {

          const monthlyEarnings = await getMonthlyOverallEarnings();
          const util = await getMonthlyWarehouseUtil();
          const monthlyProductsValue = await getMonthlyProductsValue();
          const monthlyZeroStockCount = await getMonthlyProductCount(0,0);
          const monthlyLowStockCount = await getMonthlyProductCount(1,5);
          const monthlyInStockCount = await getMonthlyProductCount(1,null);
          const monthlyProductCount = await getMonthlyProductCount(0,null);
          const monthlyOrders = await getMonthlyOrders();
          const ordersByCountry = await getOrdersByCountry();
          const productsByCategory = await getProductsByCategory();



          if (monthlyEarnings !== null) setMonthlyEarnings(monthlyEarnings);
          if(util !== null) setMonthlyWarehouseUtil(util);
          if(monthlyProductsValue != null) setMonthlyProductsValue(monthlyProductsValue);
          if(monthlyZeroStockCount != null) setMonthlyZeroStockCount(monthlyZeroStockCount);
          if(monthlyLowStockCount != null) setMonthlyLowStockCount(monthlyLowStockCount);
          if(monthlyInStockCount != null) setMonthlyInStockCount(monthlyInStockCount);
          if(monthlyProductCount != null) setMonthlyProductCount(monthlyProductCount);
          if(monthlyOrders != null) setMonthlyOrders(monthlyOrders);
          if(ordersByCountry != null) setOrdersByCountry(ordersByCountry);
          if(productsByCategory != null) setProductsByCategory(productsByCategory);

        };
        fetchStockCounts();
      }, []);

    return {
        monthlyEarnings,
        monthlyWarehouseUtil,
        monthlyProductsValue,
        monthlyZeroStockCount,
        monthlyLowStockCount,
        monthlyInStockCount,
        monthlyProductCount,
        monthlyOrders,
        ordersByCountry,
        productsByCategory
    }
}