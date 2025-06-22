import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import { CustomPopover } from 'src/components/popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import { Iconify } from 'src/components/iconify';
import { usePopover } from 'src/components/popover';
import { CustomModal, useModal } from 'src/components/modal';
import { useClientContext } from '../context/useClientContext';
import { UserProps } from '../config';
import { CustomTableRow } from 'src/components/table';

// ----------------------------------------------------------------------

type UserTableRowProps = {
  row: UserProps;
  selected: boolean;
  onSelectRow: () => void;
};



export function UserTableRow({ row, selected, onSelectRow }: UserTableRowProps) {
  // MODAL
  const modal = useModal();

  // POPOVER
  const popover = usePopover();

  const { deleteClient } = useClientContext();

  const handleDeleteUser = async() => {
    await deleteClient(row.id);
    popover.handleClosePopover();
  }

  return (
    <>
      <CustomTableRow selected ={selected} onSelectRow = {onSelectRow} popover = {popover}>

        <TableCell component="th" scope="row">
          <Box
            sx={{
              gap: 2,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Avatar alt={row.name} sx={{ width: 28, height: 28 }} />
            {row.name}
          </Box>
        </TableCell>

        <TableCell>{row.address}</TableCell>

        <TableCell>{row.email}</TableCell>

        <TableCell>{row.phone}</TableCell>

      </CustomTableRow>
      

      
      <CustomPopover
        openPopover={popover.openPopover}
        handleClosePopover={popover.handleClosePopover}
        functions = {[
          { function: () => {
            modal.handleOpen();
            popover.handleClosePopover();
          }, icon: 'solar:eye-bold', functionText: 'Show info', color: 'default' },
          { function: handleDeleteUser, icon: 'solar:trash-bin-trash-bold', functionText: 'Delete user', color: 'red' }
        ]}
      />

      <CustomModal 
        open = {modal.open}
        handleClose={modal.handleClose}
        title = {"Title"}
      />
    </>
  );
}
