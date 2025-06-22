import { useState } from 'react';
import type { SupplierProps } from './components/supplier-table-row';

// ----------------------------------------------------------------------


type ApplyFilterProps = {
  inputData: SupplierProps[];
  filterName: string;
  comparator: (a: any, b: any) => number;
};

export function applyFilter({ inputData, comparator, filterName }: ApplyFilterProps) {
  const stabilizedThis = inputData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  
  inputData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    inputData = inputData.filter(
      (supplier) => supplier.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 
                    || supplier.address.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  return inputData;
}


export type SupplierFielsdProps = {
  name: string;
  address: string;
  email: string;
  phone: string;
  setName: (value: string) => void;
  setAddress: (value: string) => void;
  setEmail: (value: string) => void;
  setPhone : (value: string) => void
};

export function useSupplierFields(){
  const [name,setName] = useState('');
  const [address,setAddress] = useState('');
  const [email,setEmail] = useState('');
  const [phone,setPhone] = useState('');
  return{
    name,
    setName,
    address,
    setAddress,
    email,
    setEmail,
    phone,
    setPhone
  }
}