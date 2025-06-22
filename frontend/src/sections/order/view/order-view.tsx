import { DashboardContent } from 'src/layouts/dashboard';
import { PageHeader } from 'src/components/pageHeader';
import {configStatus } from '../config';

import { Avatar, Box, Tooltip } from '@mui/material';
import React, { useMemo } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import CustomTable from 'src/components/table/custom-table';
import { Label } from 'src/components/label';
import { fDate, fDateTime, formatPatterns } from 'src/utils/format-time';
import { useOrderContext } from '../context/useOrderContext';
import { OrderActionCells } from '../components/order-action-cells';
// ----------------------------------------------------------------------

export function OrderView() {


  const {orders, loading} = useOrderContext();

  // console.log(orders);
  const renderProductCell = React.useCallback((params : any) => {
    const { user } = params.row;
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Avatar
          // src={
          //   imagePath
          //     ? `http://localhost:8080/products/images${imagePath.startsWith('/') ? imagePath : '/' + imagePath}`
          //     : undefined
          // }
          alt={user.name}
          sx={{ width: 28, height: 28 }}
        >
          {user.name?.[0]?.toUpperCase()}
        </Avatar>
        {user.name}
      </Box>
    );
  }, []);
  
  const columns = useMemo(() => [
    { field: 'id', headerName: 'ID', minWidth: 40, flex: 0.3 },
    { field: 'name', headerName: 'User', minWidth: 80, flex: 1, sortable: true, filterable: true, renderCell: renderProductCell},
    {
      field: 'orderDate', headerName: 'Order Date', type: 'date', minWidth: 80, flex: 1,
      valueGetter: (params: any) => {
        const dateArray = params;
        if (!Array.isArray(dateArray)) return null;
        const [year, month, day, hour = 0, minute = 0, second = 0, millisecond = 0] = dateArray;
        return new Date(year, month - 1, day, hour, minute, second, millisecond / 1000000); 
      },
      renderCell: (params: any) => {
        const date = params.value;
        if (!date || !(date instanceof Date)) return '';
        return fDateTime(date);
      },
    },
        
    { field: 'status', headerName: 'Status', minWidth: 80, flex: 1,
      renderCell: (params: any) => {
        const status = params.row.status as keyof typeof configStatus;
        return (
          <Label color={configStatus[status] || 'default'}>
            {status}
          </Label>
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
      width: 60,
      sortable: false,
      filterable: false,
      hide: true,
      renderCell: (params: any) => (
        <OrderActionCells params={params.row} />
      ),
    },
  ],[])

  return (
    <DashboardContent>
      {/* Title for orders and button for new order*/}
      
      <PageHeader title='Orders' />
      <CustomTable
        rows={orders}
        columns={columns} 
        loading={loading}
        pagination
        searchText='orders'
        showToolbar
      />  
    </DashboardContent>
  );
}
