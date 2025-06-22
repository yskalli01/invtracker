import { useEffect } from 'react';
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
import { SupplierForm } from './supplier-form';
import { useSupplierContext } from '../context/useSupplierContext';
import { useFormFields } from 'src/hooks/useFormFields';
import { SupplierProps, supplier } from '../config';
import { CustomTableRow } from 'src/components/table';

// ----------------------------------------------------------------------



type SupplierTableRowProps = {
  row: SupplierProps;
  selected: boolean;
  onSelectRow: () => void;
};



export function SupplierTableRow({ row, selected, onSelectRow}: SupplierTableRowProps) {

  // MODAL
  const modal = useModal();

  const {values,setField,setFieldsFromObject} = useFormFields<SupplierProps>(supplier);

  const {modifySupplier, deleteSupplier} = useSupplierContext();

  // POPOVER
  const popover = usePopover();



  const{id:supplierId, ...valuesWithoutId} = values;
  const handleModifySypplier = async () => {
    const success = await modifySupplier(
      {
        ...valuesWithoutId
      },
      row.id
    );
    if (success) modal.handleClose();
  };

  const handleDeleteSupplier = async()=>{
    if (row.id !== undefined) {
      await deleteSupplier(row.id);
      popover.handleClosePopover();
    }
  }
  
  const {id, ...rowWithoutId} = row;
  useEffect(() => {
    if (modal.open && row) {
      setFieldsFromObject(rowWithoutId);
    }
  }, [modal.open]);

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
            <Avatar alt={row.name} sx={{ width: 28, height: 28 }}/>
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
          }, icon: 'solar:pen-bold', functionText: 'Modify supplier', color: 'default' },
          { function: handleDeleteSupplier, icon: 'solar:trash-bin-trash-bold', functionText: 'Delete supplier', color: 'red' }
        ]}
      />

      <CustomModal 
        open = {modal.open}
        handleClose={modal.handleClose}
        title = {`Modify supplier ${values.name}`}
      >
        <SupplierForm 
          clickFunction={handleModifySypplier}
          values={values}
          setField={setField}
          buttonText='Modify supplier'
        />
      </CustomModal>
    </>
  );
}
