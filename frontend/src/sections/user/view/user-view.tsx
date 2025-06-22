import { DashboardContent } from 'src/layouts/dashboard';
import { PageHeader } from 'src/components/pageHeader';
import { useClientContext } from '../context/useClientContext';
import { Avatar, Box, Tooltip } from '@mui/material';
import React from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import CustomTable from 'src/components/table/custom-table';
import { UserActionCells } from '../components/user-action-cells';
// ----------------------------------------------------------------------

export function UserView() {

  const {clients, deleteClients, loading} = useClientContext(); 

  const renderProductCell = React.useCallback((params : any) => {
    const { name } = params.row;
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
          {name?.[0]?.toUpperCase()}
        </Avatar>
        {name}
      </Box>
    );
  }, []);
  
  const columns = [
    { field: 'id', headerName: 'ID', minWidth: 40, flex: 0.3 },
    { field: 'name', headerName: 'User', minWidth: 80, flex: 1, sortable: false, filterable: true, renderCell: renderProductCell},
    { field: 'address', headerName: 'Address', minWidth: 80, flex: 1 },
    { field: 'email', headerName: 'Email', minWidth: 80,  flex: 1 },
    { field: 'phone', headerName: 'Phone', minWidth: 80, flex: 1 },
    { field: 'country', headerName: 'Country', minWidth: 80, flex: 1 },
    { field: 'actions',
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
        <UserActionCells rowId={params.id} />
      ),
    },
  ]


  return (
    <DashboardContent>
      {/* Title for users and button for new user*/}
      
      <PageHeader title='Clients' />
      
      <CustomTable
          rows={clients}
          columns={columns}
          loading={loading}
          pagination
          handleDeleteSelected={deleteClients}
          searchText='users'
          showToolbar
          initialState={{
            pagination: { paginationModel: { pageSize: 5, page: 0 } },
          }}
      />

    </DashboardContent>
  );
}
