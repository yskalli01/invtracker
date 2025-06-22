import { Modal, Box, IconButton, Divider, Typography } from '@mui/material';
import { ReactNode, useState, useCallback, memo } from "react";
import { Iconify } from '../iconify';

const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {
        xs: '90%',  // mobile
        sm: '70%',  // tablets
        md: '60%',  // small laptops
        lg: '50%',  // desktops
        xl: '40%'   // large screens
      },
    maxHeight: '80vh',
    overflowY: 'auto',
    bgcolor: 'background.paper',
    boxShadow: 50,
};

type CustomModalProps = {
    open: boolean;
    handleClose: () => void;
    title: string;
    children ?: ReactNode
};

  



// const style = {
//     position: 'absolute' as const,
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     bgcolor: 'background.paper',
//     boxShadow: 24,
//     borderRadius: 2,
//     width: 600,
// };

export const CustomModal = memo(function CustomModal({
    open,
    handleClose,
    title,
    children,
  }: CustomModalProps) {
    return (
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Box
            sx={{
              p: 3,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant="h6" component="h2" sx={{ m: 0 }}>
              {title}
            </Typography>
  
            <IconButton
              onClick={handleClose}
              sx={{
                p: 0,
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: 'grey.100',
                },
              }}
            >
              <Iconify
                icon="solar:close-circle-bold-duotone"
                width={40}
                height={40}
              />
            </IconButton>
          </Box>
  
          <Divider sx={{ '&::before, &::after': { borderTopStyle: 'dashed' } }} />
  
          <Box sx={{ p: 3 }}>{children}</Box>
        </Box>
      </Modal>
    );
  });


export function useModal(){
    const [open, setOpen] = useState(false);
    const handleClose = useCallback(() => setOpen(false), []);
    const handleOpen = useCallback(() => setOpen(true), []);
    return{
        open,
        handleOpen,
        handleClose
    }
}



  