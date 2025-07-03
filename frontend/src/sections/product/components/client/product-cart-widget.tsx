import type { BoxProps } from '@mui/material/Box';

import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import { Iconify } from 'src/components/iconify';
import { CustomModal, useModal } from 'src/components/modal';
import { useProductClientContext } from '../../context/useClientProductContext';
import { Button, Grid, IconButton, Rating, TextField, Typography } from '@mui/material';
import { _user, _users } from 'src/_mock';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import { ProductRatingProps } from '../../config';
import { useAuth } from 'src/context/auth-context';
import { UserProps } from 'src/sections/user/config';

// ----------------------------------------------------------------------

type CartIconProps = BoxProps & {
  totalItems: number;
};

export function CartIcon({ totalItems, sx, ...other }: CartIconProps) {
  const modal = useModal();
  const {user} = useAuth();
  const ratingModal = useModal();

  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState<string>('');

  const {cartItems, deleteFromCartItem, orderItems, postRating, setCartItems} = useProductClientContext();

  const submitRatingsForCart = async () => {
    if (!rating) return;
  
    try {
      // Prepare all ratings requests in parallel
      const ratingRequests = cartItems.map((item) => {
        console.log(item.product);
        const ratingData: ProductRatingProps = {
          ratingValue : rating,
          comment,
          user: user as UserProps,
          product: item.product
        };
  
        return postRating(ratingData);
      });
  
      // Wait for all requests to complete
      await Promise.all(ratingRequests);
  
      // Clear cart and reset inputs
      setCartItems([]);
      setRating(null);
      setComment('');
      ratingModal.handleClose();
      // console.log("All ratings submitted!");
    } catch (error) {
      // console.error("Failed to submit ratings:", error);
    }
  };

  const handleCloseRatingModal = () => {
    setCartItems([]);
    ratingModal.handleClose();
  }
  

  const handleOrderItems = async () => {
    try {
      await orderItems({
        user: user as UserProps,
        orderItems: cartItems,
      });
  
      modal.handleClose();
      ratingModal.handleOpen();
    } catch (error) {
      console.error('Order failed:', error);
    }
  };

  return (
    <>
    <Box
      // component={RouterLink}
      // href="#"
      onClick={modal.handleOpen}
      sx={[
        (theme) => ({
          right: 0,
          top: 112,
          zIndex: 999,
          display: 'flex',
          cursor: 'pointer',
          position: 'fixed',
          color: 'text.primary',
          borderTopLeftRadius: 16,
          borderBottomLeftRadius: 16,
          bgcolor: 'background.paper',
          padding: theme.spacing(1, 3, 1, 2),
          boxShadow: theme.vars.customShadows.dropdown,
          transition: theme.transitions.create(['opacity']),
          '&:hover': { opacity: 0.72 },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Badge showZero badgeContent={totalItems} color="error" max={99}>
        <Iconify icon="solar:cart-3-bold" width={24} />
      </Badge>
    </Box>
    

    <CustomModal open={modal.open} handleClose={modal.handleClose} title="Cart Items">
      <Grid container spacing={2} sx={{ p: 2 }}>
      {cartItems.map((cartItem) => (
      <Box
        key={cartItem.product.id}
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          mb: 1,
          p: 1,
          borderRadius: 1,
          border: '1px solid #e0e0e0',
          backgroundColor: 'background.paper',
          gap: 2,
        }}
      >
        {/* Image */}
        <Box
          component="img"
          src={`http://localhost:8080/products/images${
            cartItem.product.imagePath?.startsWith('/')
              ? cartItem.product.imagePath
              : '/' + cartItem.product.imagePath
          }`}
          alt={cartItem.product.name}
          sx={{
            width: 80,
            height: 80,
            objectFit: 'cover',
            borderRadius: 1,
            flexShrink: 0,
          }}
        />

        {/* Product Name */}
        <Typography
          variant="subtitle1"
          noWrap
          sx={{ flexGrow: 1, minWidth: 0 }} // flexGrow to fill available space and noWrap with ellipsis
        >
          {cartItem.product.name}
        </Typography>

        {/* Quantity */}
        <Typography
          variant="body1"
          sx={{ width: 100, textAlign: 'center', flexShrink: 0 }}
        >
          Quantity: {cartItem.quantity}
        </Typography>

        {/* Delete Icon Button */}
        <IconButton
          aria-label="delete"
          color="error"
          onClick={() => deleteFromCartItem(cartItem.product.id)}
          sx={{ flexShrink: 0 }}
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    ))}

        {/* Order Button */}
        <Grid size={{xs:12}} sx={{ mt: 2 }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleOrderItems}
            disabled={cartItems.length === 0}
          >
            Order Items
          </Button>
        </Grid>
      </Grid>
    </CustomModal>

    


    {/* Rating Modal */}
    <CustomModal open={ratingModal.open} handleClose={handleCloseRatingModal} title="Rate Your Experience">
        <Grid container spacing={2} sx={{ p: 2 }}>
          <Grid size={{xs : 12}}>
            <Rating
              name="order-rating"
              value={rating}
              onChange={(_, newValue) => setRating(newValue)}
              precision={0.5}
            />
          </Grid>
          <Grid size={{xs : 12}}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </Grid>
          <Grid size={{xs : 12}}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              disabled={!rating}
              onClick={submitRatingsForCart}
            >
              Submit Feedback
            </Button>
          </Grid>
        </Grid>
    </CustomModal>
    </>
  );
}
