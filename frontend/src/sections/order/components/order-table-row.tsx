import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import { CustomPopover, functionsProps } from 'src/components/popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import { Iconify } from 'src/components/iconify';
import { usePopover } from 'src/components/popover';
import { CustomModal, useModal } from 'src/components/modal';
import { Label } from 'src/components/label';
import { OrderProps, OrderStatusProps, configStatus } from '../config';
import { OrderItemInfos } from './order-item-infos';
import { fDate, formatPatterns } from 'src/utils/format-time';
import { useOrderContext } from '../context/useOrderContext';
import { CustomTableRow } from 'src/components/table';

// ----------------------------------------------------------------------

type OrderTableRowProps = {
  row: OrderProps;
  selected: boolean;
  onSelectRow: () => void;
};

export function OrderTableRow({ row, selected, onSelectRow }: OrderTableRowProps) {
  // MODAL
  const modal = useModal();

  // POPOVER
  const popover = usePopover();

  const {setOrderStatus} = useOrderContext();

  const handleSetOrderStatus = async (status: OrderStatusProps) => {
    await setOrderStatus(row.id!, status);
  };
  
  return (
    <>
      
      <CustomTableRow selected ={selected} onSelectRow = {onSelectRow} popover = {popover}>

        <TableCell component="th" scope="row">
          <Box
            sx={{
              gap: 1.5,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Avatar alt={row.user.name} sx={{ width: 28, height: 28 }} />
            <span>{row.user.name}</span>
          </Box>
        </TableCell>

        <TableCell>{fDate(row.orderDate, formatPatterns.split.date)}</TableCell>

        <TableCell>
          <Label color={configStatus[row.status] || 'default'}>
            {row.status}
          </Label>
        </TableCell>

      </CustomTableRow> 


      <CustomPopover
        openPopover={popover.openPopover}
        handleClosePopover={popover.handleClosePopover}
        functions={[
          { function: () => {
            modal.handleOpen();
            popover.handleClosePopover();
          }, icon: 'solar:eye-bold', functionText: 'Show items', color: 'default' },
          row.status === 'Pending' ? { function: () => handleSetOrderStatus("Confirmed"), icon: 'solar:check-circle-bold', functionText: 'Activate order', color: 'green' } : null,
          row.status === 'Pending' ? { function: () => handleSetOrderStatus("Cancelled"), icon: 'solar:cancel-circle-bold', functionText: 'Cancel order', color: 'red' } : null
        ].filter((fn): fn is functionsProps => fn !== null)} // Type predicate (fn is functionProps)
      />


      <CustomModal 
        open = {modal.open}
        handleClose={modal.handleClose}
        title = {"Items of the order"}
      >
        {OrderItemInfos(row)}
      </CustomModal>
    </>
  );
}

