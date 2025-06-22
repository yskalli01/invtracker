import React from 'react';
import { IconButton } from '@mui/material';
import { Iconify } from 'src/components/iconify';
import { usePopover, CustomPopover, functionsProps } from 'src/components/popover';
import { CustomModal, useModal } from 'src/components/modal';
import { useWarehouseContext } from '../context/useWarehouseContext';
import { useFormFields } from 'src/hooks/useFormFields';
import { WarehouseProps } from '../config';
import { warehouse } from '../config';
import { WarehouseForm } from './warehouse-form';

interface ActionsCellProps {
  rowId: number | string;
//   functions : functionsProps[]
//   onEdit: (rowId: number | string) => void;
//   onDelete: (rowId: number | string) => void;
//   text : string
}

export function WarehouseActionCells({ 
    rowId, 
    // functions, 
    // onDelete, 
    // text 
}: ActionsCellProps) {
    
  const popover = usePopover();
  const modal = useModal();  
  const{ warehouses, deleteWarehouse } = useWarehouseContext();
  const{ values, setFieldsFromObject } = useFormFields<WarehouseProps>(warehouse);




  const handleDeleteWarehouse = async()=>{
    if (rowId !== undefined) {
      await deleteWarehouse(rowId);
      popover.handleClosePopover();
    }
  }

  const handleOpenModal = () =>{
    const selectedWarehouse = warehouses.find((row) => row.id === rowId);
    if (selectedWarehouse) {
      setFieldsFromObject(selectedWarehouse);
      modal.handleOpen();                   
      popover.handleClosePopover();         
    }
  }

  const handleModalClose = () => {
    setFieldsFromObject(warehouse);
    modal.handleClose();
  };


  return (
    <>
        <IconButton
            size="small"
            onClick={(e) => popover.handleOpenPopover(e)}
        >
            <Iconify icon="eva:more-vertical-fill" />
        </IconButton>

        <CustomPopover
            openPopover={popover.openPopover}
            handleClosePopover={popover.handleClosePopover}
            functions = {[
                { function: () => handleOpenModal(), icon: 'solar:pen-bold', functionText: 'Modify warehouse', color: 'default' },
                { function: handleDeleteWarehouse, icon: 'solar:trash-bin-trash-bold', functionText: 'Delete warehouse', color: 'red' }
              ]}
        />

        <CustomModal open={modal.open} handleClose={handleModalClose} title="Modify warehouse">
            <WarehouseForm
            operation={"Modify"}
            initialValue={values}
            buttonText="Save changes" 
            />
        </CustomModal>
    </>
  );
}