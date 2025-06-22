import { IconButton } from '@mui/material';
import { Iconify } from 'src/components/iconify';
import { usePopover, CustomPopover } from 'src/components/popover';
import { CustomModal, useModal } from 'src/components/modal';
import { useFormFields } from 'src/hooks/useFormFields';
import { UserProps, user } from '../config';
import { useClientContext } from '../context/useClientContext';

interface ActionsCellProps {
  rowId: number | string;
}

export function UserActionCells({ 
    rowId,
}: ActionsCellProps) {
    
  const popover = usePopover();

  const modal = useModal();
    
  const{ clients, deleteClient } = useClientContext();

  const{ setFieldsFromObject } = useFormFields<UserProps>(user);

  const handledeleteClient = async()=>{
    if (rowId !== undefined) {
      await deleteClient(rowId as number);
      popover.handleClosePopover();
    }
  }
  
  const handleOpenClick = (modal : ReturnType<typeof useModal>) =>{
    const selectedClient = clients.find((row) => row.id === rowId);
    if (selectedClient) {
      setFieldsFromObject(selectedClient);
      modal.handleOpen();                   
      popover.handleClosePopover();         
    }
  }

  const handleModalClose = () => {
    setFieldsFromObject(user);
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
                { function: () => handleOpenClick(modal), icon: 'solar:pen-bold', functionText: 'Show info', color: 'default' },
                { function: handledeleteClient, icon: 'solar:trash-bin-trash-bold', functionText: 'Delete user', color: 'red' }
              ]}
        />

        <CustomModal open={modal.open} handleClose={handleModalClose} title="Title">
            
        </CustomModal>
    </>
  );
}