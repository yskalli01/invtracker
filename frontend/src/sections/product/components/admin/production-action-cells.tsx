import { IconButton } from '@mui/material';
import { Iconify } from 'src/components/iconify';
import { usePopover, CustomPopover } from 'src/components/popover';
import { CustomModal, useModal } from 'src/components/modal';
import { useFormFields } from 'src/hooks/useFormFields';
import { ProductProps, product } from '../../config';
import { useProductContext } from '../../context/useAdminProductContext';
import { ProductForm } from './product-form';
import { ProductInformations } from './product-infos';

interface ActionsCellProps {
  rowId: number | string;
}

export function ProductActionCells({ 
    rowId
}: ActionsCellProps) {
    
  const popover = usePopover();

  const modal = useModal();

  const modalInformations = useModal();
    
  const{ products, deleteProduct } = useProductContext();

  const{ values, setFieldsFromObject } = useFormFields<ProductProps>(product);

  const handleDeleteProduct = async()=>{
    if (rowId !== undefined) {
      await deleteProduct(rowId);
      popover.handleClosePopover();
    }
  }
  
  const handleOpenClick = (modal : ReturnType<typeof useModal>) =>{
    const selectedProduct = products.find((row) => row.id === rowId);
    if (selectedProduct) {
      setFieldsFromObject(selectedProduct);
      modal.handleOpen();                   
      popover.handleClosePopover();         
    }
  }

  const handleModalClose = () => {
    setFieldsFromObject(product);
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
            functions={[
            { function: () => handleOpenClick(modalInformations), icon: 'solar:eye-bold', functionText: 'Show informations', color: 'default' },
            { function: () => handleOpenClick(modal), icon: 'solar:pen-bold', functionText: 'Modify product', color: 'default' },
            { function: handleDeleteProduct, icon: 'solar:trash-bin-trash-bold', functionText: 'Delete product', color: 'red'},
            ]}
        />

        <CustomModal open={modal.open} handleClose={handleModalClose} title="Modify product">
            <ProductForm
              operation={"Modify"}
              initialValue={values}
              buttonText="Save changes" 
            />
        </CustomModal>

        <CustomModal
        open = {modalInformations.open}
        handleClose={modalInformations.handleClose}
        title = {`Product ${values.name}`}
      > 
        <ProductInformations 
          row={values}
        />
      </CustomModal>
    </>
  );
}