import { IconButton } from '@mui/material';
import { Iconify } from 'src/components/iconify';
import { usePopover, CustomPopover, functionsProps } from 'src/components/popover';
import { CustomModal, useModal } from 'src/components/modal';
import { useFormFields } from 'src/hooks/useFormFields';
import { OrderProps, OrderStatusProps, order } from '../config';
import { useOrderContext } from '../context/useOrderContext';
import { OrderItemInfos } from './order-item-infos';

interface ActionsCellProps {
  params : OrderProps;
}

export function OrderActionCells({ 
    params
}: ActionsCellProps) {
    
  const popover = usePopover();

  const modal = useModal();
    
  const{ orders, setOrderStatus } = useOrderContext();

  // console.log(params);

  // const{ values, setFieldsFromObject } = useFormFields<OrderProps>(order);

  // const handledeleteOrder = async()=>{
  //   if (rowId !== undefined) {
  //     await deleteOrder(rowId);
  //     popover.handleClosePopover();
  //   }
  // }
  
  const handleOpenClick = () =>{
    // const selectedOrder = orders.find((row) => row.id === rowId);
    // if (selectedOrder) {
    //   setFieldsFromObject(selectedOrder);
      modal.handleOpen();                   
      popover.handleClosePopover();         
    // }
  }

  const handleSetOrderStatus = async (status: OrderStatusProps) => {
    await setOrderStatus(params.id as number, status);
  };

  const handleModalClose = () => {
    // setFieldsFromObject(order);
    modal.handleClose();
  };


  return (
    <>
        <IconButton size="small" onClick={(e) => popover.handleOpenPopover(e)}>
            <Iconify icon="eva:more-vertical-fill" />
        </IconButton>

        <CustomPopover
          openPopover={popover.openPopover}
          handleClosePopover={popover.handleClosePopover}
          functions={[
            { function: () => handleOpenClick(), icon: 'solar:eye-bold', functionText: 'Show items', color: 'default' },
            params.status === 'Pending' ? { function: () => handleSetOrderStatus("Confirmed"), icon: 'solar:check-circle-bold', functionText: 'Activate order', color: 'green' } : null,
            params.status === 'Pending' ? { function: () => handleSetOrderStatus("Cancelled"), icon: 'solar:cancel-circle-bold', functionText: 'Cancel order', color: 'red' } : null
          ].filter((fn): fn is functionsProps => fn !== null)} // Type predicate (fn is functionProps)
        />

        <CustomModal open={modal.open} handleClose={handleModalClose} title = {"Items of the order"}>
            {OrderItemInfos(params)}
        </CustomModal>
    </>
  );
}