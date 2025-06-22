import { useCallback, useEffect, useState } from "react";
import { axios } from "src/api";



export function useMetrics(){
    const [inStockCount,setInStockCount] = useState(0);
    const [lowStockCount,setLowStockCount] = useState(0);
    const [zeroStockCount,setZeroStockCount] = useState(0);
    const [stockValue,setStockValue] = useState(0);
    const [earnings,setEarnings] = useState(0);
    const [productCount,setProductCount] = useState(0);
    const [warehouseUtil,setWarehouseUtil] = useState(0);

    const getProductCount = useCallback(async (min: number, max: number | null) => {
        try {
          const params: { min: number; max?: number } = { min };
          if (max != null) {
            params.max = max;
          }
          const response = await axios.get('products/quantity', { params });
          return response.data as number;
        } catch (error) {
          console.error(error);
          return null; 
        }
      }, []);

      const getStockValue = useCallback(async() => {
        try{
            const response = await axios.get('products/value');
            return response.data as number;
        }
        catch(error){
            console.error(error);
            return null;
        }
      },[])

      const getOverallEarnings = useCallback(async() => {
        try{
            const response = await axios.get('orders/earnings');
            return response.data as number;
        }
        catch(error){
            console.error(error);
            return null;
        }
      },[])

      const getWarehouseUtil = useCallback(async() => {
        try{
            const response = await axios.get('warehouses/util');
            return response.data as number;
        }
        catch(error){
            console.error(error);
            return null;
        }
      },[])

      useEffect(() => {
        const fetchStockCounts = async () => {
          const inStock = await getProductCount(1, null);      // quantity >= 1
          const lowStock = await getProductCount(1, 5);        // for example: low stock range (1 to 5)
          const zeroStock = await getProductCount(0, 0);       // quantity == 0
          const productCount = await getProductCount(0,null);
          const stockValue = await getStockValue();
          const earnings = await getOverallEarnings();
          const util = await getWarehouseUtil();
      
          if (inStock !== null) setInStockCount(inStock);
          if (lowStock !== null) setLowStockCount(lowStock);
          if (zeroStock !== null) setZeroStockCount(zeroStock);
          if (stockValue !== null) setStockValue(stockValue);
          if (productCount !== null) setProductCount(productCount);
          if(earnings !== null) setEarnings(earnings);
          if(util !== null) setWarehouseUtil(util);
        };
      
        fetchStockCounts();
      }, [getProductCount]);

    return {
        inStockCount,
        lowStockCount,
        zeroStockCount,
        productCount,
        stockValue,
        earnings,
        warehouseUtil
    }
}