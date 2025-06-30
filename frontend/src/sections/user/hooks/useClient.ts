import { useState, useEffect, useCallback } from 'react';
import { axios } from 'src/api';
import { UserProps } from '../config';
import { notify } from 'src/utils/toast-helper';

export function useClient() {
  const [clients, setClients] = useState<UserProps[]>([]);
  const [loading,setLoading] = useState(true);

  const messages = {
    deleteSuccess : 'The client has been deleted successfully',
    deleteAllSuccess : "Clients have been deleted successfully"
  }

  useEffect(() => {
    async function fetchClients() {
      try {
        const response = await axios.get('/users/role/CLIENT');
        setClients(response.data);
        setLoading(false);
      } catch (error) {
         console.log(error);
         setLoading(false);
      }
    }
    fetchClients();
  }, []);

 
  const deleteClient = useCallback(async (id : number)=>{
    try {
        const response = await axios.delete(`/users/${id}`); 
        setClients((prev) => prev.filter(client => client.id !== id));
        notify(messages.deleteSuccess,'success');
        return true;
    } catch (error: unknown) {
        console.log(error);
        return false;
      }
  },[])


  const deleteClients = async (ids : any[])=>{
    try {
        const response = await axios.delete(`/users`,{data : ids}); 
        setClients((prev) => prev.filter(client => !ids.includes(client.id)));
        notify(messages.deleteSuccess,'success');
        return true;
    } catch (error: unknown) {
        console.log(error);
        return false;
      }
  }

  return{
    loading,
    clients,
    deleteClient,
    deleteClients
  }
}



