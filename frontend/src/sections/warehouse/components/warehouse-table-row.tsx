import React, { useEffect } from 'react';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';

import { Iconify } from 'src/components/iconify';
import { CustomPopover, usePopover } from 'src/components/popover';
import { CustomModal, useModal } from 'src/components/modal';
import { WarehouseForm } from './warehouse-form';
import { useWarehouseContext } from '../context/useWarehouseContext';
import { useFormFields } from 'src/hooks/useFormFields';
import { WarehouseProps, warehouse } from '../config';
import { CustomTableRow } from 'src/components/table';

// ----------------------------------------------------------------------



type WarehouseTableRowProps = {
  row: WarehouseProps;
  selected: boolean;
  onSelectRow: () => void;
};

export const WarehouseTableRow = React.memo(function WarehouseTableRow({
  row,
  selected,
  onSelectRow,
}: WarehouseTableRowProps) {

  const modal = useModal();
  const popover = usePopover();

  const { values,setField, setFieldsFromObject } = useFormFields<WarehouseProps>(warehouse);

  const { deleteWarehouse, modifyWarehouse} = useWarehouseContext();


  const {id,...rowWithoutId} = row;

  useEffect(() => {
    if (!modal.open || !row) return;
    setFieldsFromObject(rowWithoutId);
  }, [modal.open, row]);


  
  const {id : warehouseId, ...valuesWithoutId} = row;
  const handleModifyWarehouse = async () => {
    const success = await modifyWarehouse(
      {
        ...valuesWithoutId
      },
      row.id
    );
    if (success) modal.handleClose();
  };

  const handleDeleteWarehouse = async () => {
    if (row.id !== undefined) {
      await deleteWarehouse(row.id);
    }
  };

  return (
    <>
      <CustomTableRow selected ={selected} onSelectRow = {onSelectRow} popover = {popover}>

        <TableCell component="th" scope="row">{row.name}</TableCell>
        <TableCell>{row.location}</TableCell>
        <TableCell>{row.capacity}</TableCell>

      </CustomTableRow>

      <CustomPopover
        openPopover={popover.openPopover}
        handleClosePopover={popover.handleClosePopover}
        functions = {[
          { function: () => {
            modal.handleOpen();
            popover.handleClosePopover();
          }, icon: 'solar:pen-bold', functionText: 'Modify warehouse', color: 'default' },
          { function: handleDeleteWarehouse, icon: 'solar:trash-bin-trash-bold', functionText: 'Delete warehouse', color: 'red' }
        ]}
      />

      <CustomModal
        open={modal.open}
        handleClose={modal.handleClose}
        title={`Modify warehouse ${values.name}`}
      >
        <WarehouseForm
          clickFunction={handleModifyWarehouse}
          values={values}
          setField={setField}
          buttonText="Modify warehouse"
        />
      </CustomModal>
    </>
  );
});
