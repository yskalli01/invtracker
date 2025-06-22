import React, { useEffect, useState } from 'react';
import { PageHeader } from 'src/components/pageHeader';
import { CustomModal, useModal } from 'src/components/modal';
import { useFormFields } from 'src/hooks/useFormFields';
import { ProductProps, product } from 'src/sections/product/config';
import { useProductContext } from '../context/useAdminProductContext';
import { ProductForm } from '../components/admin/product-form';
import { Avatar, Box, Rating, Tooltip} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import CustomTable from 'src/components/table/custom-table';
import { ProductActionCells } from '../components/admin/production-action-cells';
import { axios } from 'src/api/axios';
// ----------------------------------------------------------------------





export default function ProductAdminView() {

  // MODAL => modal for creating/updating product
  const modal = useModal();

  const {products, deleteProducts, loading} = useProductContext();

  const { setFieldsFromObject } = useFormFields<ProductProps>(product);
  const handleModalClose = () => {
    setFieldsFromObject(product);
    modal.handleClose();
  };




  
  // For the definition of columns 
  const renderProductCell = React.useCallback((params : any) => {
    const { imagePath, name } = params.row;
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Avatar
          src={
            imagePath
              ? `http://localhost:8080/products/images${imagePath.startsWith('/') ? imagePath : '/' + imagePath}`
              : undefined
          }
          alt={name}
          sx={{ width: 28, height: 28 }}
        >
          {!imagePath && name?.[0]?.toUpperCase()}
        </Avatar>
        {name}
      </Box>
    );
  }, []);

  

  const columns = React.useMemo(() => [
    { field: 'id', headerName: 'ID', minWidth: 40, flex: 0.3 },
    { field: 'name', headerName: 'Product', minWidth: 150, flex: 1.5, sortable: true, filterable: true, renderCell: renderProductCell},
    { field: 'unitPrice', headerName: 'Price', minWidth: 80, type: 'number', flex: 0.7 },
    { field: 'purchasePrice', headerName: 'Cost', minWidth: 80, type: 'number', flex: 0.7 },
    { field: 'quantity', headerName: 'Quantity', minWidth: 100, type: 'number', flex: 0.7 },
    { field: 'category', headerName: 'Category', minWidth: 120, flex: 1 },
    { field: 'description', headerName: 'Description', minWidth: 200, flex: 2, hide: true },
    { field: 'warehouse', headerName: 'Warehouse', minWidth: 150, flex: 2, valueGetter: (params: any) => params?.name || ''},
    { field: 'supplier', headerName: 'Supplier', minWidth: 150, flex: 1, valueGetter: (params: any) => params?.name || ''},
    {
      field: 'averageRating',
      headerName: 'Avg. Rating',
      minWidth: 120,
      flex: 2,
      sortable: true,
      filterable: true,
      renderCell: (params: any) => {
        return (
          <Rating
            name={`avg-rating-${params.row.id}`}
            value={params.row.averageRating}
            precision={0.1}
            readOnly
            size="small"
          />
        );
      }
    },
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
      minWidth: 60,
      flex: 0.3,
      sortable: false,
      filterable: false,
      hide: true,
      renderCell: (params: any) => (
        <ProductActionCells rowId={params.id} />
      ),
    },
  ], [renderProductCell]);
  
  return (
    <>
      
      <PageHeader title='Products' buttonLabel='Add products' action={modal.handleOpen}/>      

      <CustomTable
          rows={products}
          columns={columns}
          loading={loading}
          // rowBuffer={2}
          // experimentalFeatures={{ lazyLoading: true }}
          // rowHeight={50}
          // columnBufferPx={100} 
          // loading={loading}
          pagination
          handleDeleteSelected={deleteProducts}
          searchText='products'
          showToolbar
        />

      {/* Create / Modify modal */}
      <CustomModal 
        open = {modal.open}
        handleClose={handleModalClose}
        title = {"Create product"}
      >
        <ProductForm 
          operation={"Create"}
          initialValue={product}
          buttonText={"Create product"}
        />
      </CustomModal>      
    </>
  );
}
