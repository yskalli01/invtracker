import { useMemo } from 'react';
import { DashboardContent } from 'src/layouts/dashboard';
import { PageHeader } from 'src/components/pageHeader';
import { useSupplierContext } from '../context/useSupplierContext';
import { CustomModal, useModal } from 'src/components/modal';
import { useFormFields } from 'src/hooks/useFormFields';
import { SupplierForm } from '../components/supplier-form';
import { SupplierProps, supplier } from '../config';


import { Avatar, Box, Tooltip } from '@mui/material';

import SettingsIcon from '@mui/icons-material/Settings';
import CustomTable from 'src/components/table/custom-table';
import { SupplierActionCells } from '../components/supplier-action-cells';
// ----------------------------------------------------------------------






const renderProductCell = (params : any) => {
  const { imagePath, name } = params.row;
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Avatar
        // src={
        //   imagePath
        //     ? `http://localhost:8080/products/images${imagePath.startsWith('/') ? imagePath : '/' + imagePath}`
        //     : undefined
        // }
        alt={name}
        sx={{ width: 28, height: 28 }}
      >
        {!imagePath && name?.[0]?.toUpperCase()}
      </Avatar>
      {name}
    </Box>
  );
};

const columns = [
  { field: 'id', headerName: 'ID', minWidth: 40, flex: 0.3 },
  { field: 'name', headerName: 'Supplier', minWidth: 80, flex: 1, sortable: false, filterable: true, renderCell: renderProductCell},
  { field: 'address', headerName: 'Address', minWidth: 80, flex: 1 },
  { field: 'email', headerName: 'Email', minWidth: 80, flex: 1 },
  { field: 'phone', headerName: 'Phone', minWidth: 80, flex: 1 },
  { field: 'country', headerName: 'Country', minWidth: 80, flex: 1 },
  {
    field: 'actions',
    renderHeader: () => (
      <Tooltip title="Actions">
        <SettingsIcon
          fontSize="small"
          style={{ display: 'block', margin: 'auto', cursor: 'default' }}
        />
      </Tooltip>
    ),
    width: 60,
    sortable: false,
    filterable: false,
    hide: true,
    renderCell: (params: any) => (
      <SupplierActionCells params={params.row} />
    ),
  },
];




export function SupplierView() {
  const modal = useModal();
  const {deleteSuppliers, suppliers, loading} = useSupplierContext();
  const{ setFieldsFromObject } = useFormFields<SupplierProps>(supplier);
  

  const handleModalClose = () => {
    setFieldsFromObject(supplier);
    modal.handleClose();
  };

  const memoisedSupplier = useMemo(()=> (supplier) ,[]);

  // const memoizedForm = useMemo(() => (
  //   <SupplierForm
  //     operation="Create"
  //     initialValue={supplier}
  //     buttonText="Create supplier"
  //   />
  // ), [supplier]);


  return (
    <>
    <DashboardContent>
      {/* Title for suppliers and button for new supplier*/}
      
      <PageHeader title='Suppliers'  buttonLabel = 'Add new supplier' action={modal.handleOpen}/>    

      <CustomTable
          rows={suppliers}
          columns={columns}
          loading = {loading}
          pagination
          handleDeleteSelected={deleteSuppliers}
          searchText='suppliers'
          showToolbar
        />

    </DashboardContent>

    <CustomModal open={modal.open} handleClose={handleModalClose} title={"Create supplier"}>
    <SupplierForm
      operation="Create"
      initialValue={memoisedSupplier}
      buttonText="Create supplier"
    />
    </CustomModal>
    </>
  );
}
