import { IconButton } from '@mui/material';
import { Iconify } from 'src/components/iconify';
import { usePopover, CustomPopover } from 'src/components/popover';
import { CustomModal, useModal } from 'src/components/modal';
import { useFormFields } from 'src/hooks/useFormFields';
import { SupplierProps, supplier } from '../config';
import { SupplierForm } from './supplier-form';
import { useSupplierContext } from '../context/useSupplierContext';
import { useMemo } from 'react';

interface ActionsCellProps {
  params : SupplierProps;
}

export function SupplierActionCells({ 
    params
}: ActionsCellProps) {
    
  const popover = usePopover();

  const modal = useModal();
    
  const{ deleteSupplier } = useSupplierContext();


  const handleDeleteSupplier = async()=>{
    if (params.id !== undefined) {
      await deleteSupplier(params.id);
      popover.handleClosePopover();
    }
  }
  
  const handleOpenClick = (modal : ReturnType<typeof useModal>) =>{
    modal.handleOpen();                   
    popover.handleClosePopover();         
  }

  

  const memoisedValue = useMemo(()=> (params) ,[]);


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
                { function: () => handleOpenClick(modal), icon: 'solar:pen-bold', functionText: 'Modify supplier', color: 'default' },
                { function: handleDeleteSupplier, icon: 'solar:trash-bin-trash-bold', functionText: 'Delete supplier', color: 'red' }
              ]}
        />

        <CustomModal open={modal.open} handleClose={modal.handleClose} title="Modify supplier">
            <SupplierForm
              operation={"Modify"}
              initialValue={memoisedValue}
              buttonText="Save changes" 
            />
        </CustomModal>
    </>
  );
}