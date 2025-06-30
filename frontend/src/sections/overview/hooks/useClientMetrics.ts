import { useCallback, useEffect, useState } from "react";
import { axios } from "src/api";
import { useAuth } from "src/context/auth-context";


export function useMetrics(){
    const {user} = useAuth();
    const [monthlyOrders,setMonthlyOrders] = useState<{ [key:string] : number}>({});
    const [monthlyPendingOrders,setMonthlyPendingOrders] = useState<{ [key:string] : number}>({});
    const [monthlyConfirmedOrders,setMonthlyConfirmedOrders] = useState<{ [key:string] : number}>({});
    const [monthlyCancelledOrders,setMonthlyCancelledOrders] = useState<{ [key:string] : number}>({});
    const [monthlyOrdersCost,setMonthlyOrdersCost] = useState<{ [key:string] : number}>({});
    const [productsByCategory, setProductsByCategory] = useState<{ [key: string]: number }>({});
    


    const getMonthlyOrders = useCallback(async(id : number, status : string) => {
    try{
        const response = await axios.get(`orders/monthly/${id}/${status}`);
        return response.data;
    }
    catch(error){
        console.error(error);
        return null;
    }
    },[])

    const getMonthlyOrderCost= useCallback(async(id : number) => {
        try{
            const response = await axios.get(`orders/cost/${id}`);
            return response.data;
        }
        catch(error){
            console.error(error);
            return null;
        }
        },[])

    const getProductsByCategory = useCallback(async(id : number) => {
        try{
            const response = await axios.get(`orders/categories/${id}`);
            return response.data;
        }
        catch(error){
            console.error(error);
            return null;
        }
        },[])

    


    useEffect(() => {
        const fetchStockCounts = async () => {
            const monthlyOrders = await getMonthlyOrders(user?.id as number,'All');
            if (monthlyOrders !== null) setMonthlyOrders(monthlyOrders);

            const monthlyPendingOrders = await getMonthlyOrders(user?.id as number,'Pending');
            if (monthlyPendingOrders !== null) setMonthlyPendingOrders(monthlyPendingOrders);

            const monthlyConfirmedOrders = await getMonthlyOrders(user?.id as number,'Confirmed');
            if (monthlyConfirmedOrders !== null) setMonthlyConfirmedOrders(monthlyConfirmedOrders);

            const monthlyCancelledOrders = await getMonthlyOrders(user?.id as number,'Cancelled');
            if (monthlyCancelledOrders !== null) setMonthlyCancelledOrders(monthlyCancelledOrders);

            const monthlyOrdersCost = await getMonthlyOrderCost(user?.id as number);
            if (monthlyOrdersCost !== null) setMonthlyOrdersCost(monthlyOrdersCost);

            const productsByCategory = await getProductsByCategory(user?.id as number);
            if (productsByCategory !== null) setProductsByCategory(productsByCategory);

        };
        fetchStockCounts();
    }, []);

    return {
        monthlyOrders,
        monthlyPendingOrders,
        monthlyConfirmedOrders,
        monthlyCancelledOrders,
        monthlyOrdersCost,
        productsByCategory
    }
}