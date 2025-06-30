import React from 'react';
import { DataGrid, DataGridProps, GridRowSelectionModel, GridSortDirection } from '@mui/x-data-grid';
import { CustomToolbar } from '.';

type CustomTableProps = Omit<DataGridProps, 'rows' | 'columns'> & {
  rows: any[];
  columns: any[];
  containerSx?: React.CSSProperties | object;
  handleDeleteSelected?: (ids: any[]) => Promise<void | boolean>;
  searchText: string;
};


const defaultProps = {
  pageSizeOptions: [5, 10, 20],
  disableColumnMenu: true,
  checkboxSelection: true,
  checkboxSelectionVisibleOnly: true,
  disableRowSelectionOnClick: true,
  initialState: {
    pagination: { paginationModel: { pageSize: 5, page: 0 } },
    columns: { columnVisibilityModel: { description: false } },
    sorting: {
      sortModel: [{ field: 'id', sort: 'asc' as GridSortDirection}], // sorts by 'id' ascending initially
    },
  },
};



export default function CustomTable({
  rows,
  columns,
  containerSx = { width: '100%' },
  sx,
  handleDeleteSelected,
  searchText,
  ...otherProps
}: CustomTableProps) {
  // Merge default props with overrides
  const mergedProps = {
    ...defaultProps,
    ...otherProps,
  };

  const [, refreshToolbar] = React.useReducer((x) => x + 1, 0); // Trigger minimal update
  const selectionRef = React.useRef<GridRowSelectionModel>({
    type: 'include',
    ids: new Set(),
  });
  const handleSelectionChange = (newSelection : any) => {
    selectionRef.current = newSelection;
    refreshToolbar();
  };

  // console.log("Custom table rendered");

  return (
    <div style={containerSx}>
      <DataGrid
        rows={rows}
        columns={columns}
        sx={{
          backgroundColor: '#ffffff',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          border: 0,
          borderRadius: 0,
          '.MuiDataGrid-columnHeader': {
            backgroundColor: '#f2f5f7',
            border: 0,
          },
          '.MuiDataGrid-columnHeaderTitle': {
            fontSize: '0.875rem',
            border: 0,
          },
          '.MuiDataGrid-cell': {
            fontSize: 14,
            color: '#333',
          },
          '.MuiDataGrid-row:hover': {
            backgroundColor: '#e3f2fd',
          },
          '.MuiDataGrid-footerContainer': {
            border: 0,
          },
          '.MuiDataGrid-columnSeparator': {
            color: '#ccc',
            visibility: 'visible',
            width: 2,
          },
          '.MuiDataGrid-selectedRowCount': {
            display: 'none',
          },
          ...sx,
        }}
        onRowSelectionModelChange={handleSelectionChange}
        slots={{
            toolbar: () => (
              <CustomToolbar
                searchText={searchText}
                selectedCount={selectionRef.current.ids.size}
                handleDeleteSelected={async () => {
                    if(handleDeleteSelected){
                        const selectedIds = [...selectionRef.current.ids];
                        handleDeleteSelected(selectedIds);
                    }
                }}
              />
            ),
          }}
        {...mergedProps}
      />
    </div>
  );
}
