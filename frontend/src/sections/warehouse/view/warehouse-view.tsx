import { useEffect, useMemo, useState } from 'react';
import {
  Card
} from '@mui/material';
import { Marker, Popup } from "react-leaflet";

import { DashboardContent } from 'src/layouts/dashboard';
import {
  getComparator,
  useTable
} from 'src/components/table';

import { PageHeader } from 'src/components/pageHeader';
import { WarehouseTableRow } from '../components/warehouse-table-row';
import { WarehouseMap } from '../components/warehouse-map';
import { useWarehouseContext } from '../context/useWarehouseContext';
import { CustomModal, useModal } from 'src/components/modal';
import { WarehouseForm } from '../components/warehouse-form';
import { useFormFields } from 'src/hooks/useFormFields';
import { GenericTable } from 'src/components/table/generic-table';
import { WarehouseProps, warehouse } from '../config';

import { Avatar, Box, Tooltip } from '@mui/material';
import { Iconify } from 'src/components/iconify';
import React from 'react';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import CustomTable from 'src/components/table/custom-table';
import { WarehouseActionCells } from '../components/warehouse-action-cells';



function parseLocation(location: string): [number, number] | null {
  if (!location) return null;
  const [lat, lng] = location.split(',').map(Number);
  return isNaN(lat) || isNaN(lng) ? null : [lat, lng];
}

const columns = [
  { field: 'id', headerName: 'ID', minWidth: 40, flex: 0.3 },
  { field: 'name', headerName: 'Name', minWidth: 80, flex: 1 },
  { field: 'location', headerName: 'Location', minWidth: 80,  flex: 1 },
  { field: 'capacity', headerName: 'Capacity', minWidth: 80, flex: 1 },
  { field: 'utilisation', headerName: 'Utilisation', minWidth: 80, flex: 1, 
      valueFormatter: (params : any) => {
      if (params == null) return '';
      return `${(params * 100).toFixed(0)}%`;
    }, 
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
    type : 'actions',
    renderCell: (params: any) => (
      <WarehouseActionCells 
        rowId={params.id}
      />
    ),
  },
]

export function WarehouseView() {
  const modal = useModal();
  
  
  // crud handling (warehouses)
  const{ setFieldsFromObject } = useFormFields<WarehouseProps>(warehouse);
  const { warehouses, deleteWarehouses, loading} = useWarehouseContext();
 


  const handleModalClose = () => {
    setFieldsFromObject(warehouse);
    modal.handleClose();
  };

  

  // Map handling
  const [mapReady, setMapReady] = useState(false);
  const visibleMarkers = useMemo(() => warehouses.slice(0, 50), [warehouses]);
  useEffect(() => {
    const timeout = setTimeout(() => setMapReady(true), 300);
    return () => clearTimeout(timeout);
  }, []);



  


  return (
    <>
      <DashboardContent>
        <PageHeader title="Warehouses" buttonLabel="Add new warehouse" action={modal.handleOpen} />

        {/* Map displaying the warehouses location  */}
        {mapReady && (
          <Card sx={{ mt: 1, mb: 1, height: 350, borderRadius:0 }}>
            <WarehouseMap>
              {visibleMarkers.map((wh) => {
                const coords = parseLocation(wh.location);
                return coords && (
                  <Marker key={wh.id} position={coords}>
                    <Popup>
                      <strong>{wh.name}</strong><br />
                      Capacity: {wh.capacity}<br />
                      Utilisation: {((wh.utilisation as number) * 100).toFixed(0)}%
                    </Popup>
                  </Marker>
                );
              })}
            </WarehouseMap>
          </Card>
        )}


        <CustomTable
          rows={warehouses}
          columns={columns}
          loading = {loading}
          pagination
          handleDeleteSelected={deleteWarehouses}
          searchText='warehouses'
          showToolbar
        />

      </DashboardContent>


      <CustomModal open={modal.open} handleClose={handleModalClose} title="Create warehouse">
        <WarehouseForm
          operation={"Create"}
          initialValue={warehouse}
          buttonText="Create supplier"
        />
      </CustomModal>


    </>
  );
}
