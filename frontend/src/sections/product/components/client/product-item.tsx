import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';

import { fCurrency } from 'src/utils/format-number';
import { useState, useEffect } from 'react';
import { ProductProps } from '../../config';
import { CustomModal, useModal } from 'src/components/modal';
import { ProductInformations } from './product-infos-submit';
import { useProductClientContext } from '../../context/useClientProductContext';
import { axios } from 'src/api';

// ----------------------------------------------------------------------



export function ProductItem({ product }: { product: ProductProps }) {
  // const renderStatus = (
  //   <Label
  //     variant="inverted"
  //     color={(product.status === 'sale' && 'error') || 'info'}
  //     sx={{
  //       zIndex: 9,
  //       top: 16,
  //       right: 16,
  //       position: 'absolute',
  //       textTransform: 'uppercase',
  //     }}
  //   >
  //     {product.status}
  //   </Label>
  // );

  const modal = useModal();

  // const [rating,setRating] = useState<number>(5);
  // const {getAverageRatingByProductId} = useProductClientContext();

  // const [averageRating, setAverageRating] = useState<number | null>(null);

  // useEffect(() => {
  //   async function fetchAverageRating() {
  //     try {
  //       const response = await axios.get(`/ratings/product/${product.id}`);
  //       setAverageRating(response.data);  // assuming backend returns a number
  //     } catch (error) {
  //       console.error(error);
  //       setAverageRating(null);
  //     }
  //   }
  //   fetchAverageRating();
  // }, []);

  const renderImg = (
    <Box
      component="img"
      alt={product.name}
      src={`http://localhost:8080/products/images${product.imagePath?.startsWith('/') ? product.imagePath : '/' + product.imagePath}`}
      sx={{
        top: 0,
        width: 1,
        height: 1,
        objectFit: 'cover',
        position: 'absolute',
      }}
    />
  );

  const renderPrice = (
    <Typography variant="subtitle1">
      <Typography
        component="span"
        variant="body1"
        sx={{
          color: 'text.disabled',
          textDecoration: 'line-through',
        }}
      >
        {product.unitPrice && fCurrency(product.unitPrice)}
      </Typography>
      &nbsp;
      {fCurrency(product.unitPrice)}
    </Typography>
  );

  return (
    <>
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {/* {product.status && renderStatus} */}
        {renderImg}
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        {/* <Link color="inherit" underline="hover" variant="subtitle2" noWrap>
          {product.name}
        </Link> */}


      <Typography
        color="inherit"
        variant="subtitle2"
        style={{ cursor: "pointer" }}
        onClick={modal.handleOpen}
      >
        {product.name}
      </Typography>

      {/* {typeof product.rating === 'number' && ( */}
        <Rating
          name={`product-rating-${product.id}`}
          value={product.averageRating}
          precision={0.5}
          readOnly
          size="small"
          sx={{ mt: 0.5 }}
        />

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* <ColorPreview colors={product.colors} /> */}
          {renderPrice}
        </Box>
      </Stack>
    </Card>
    
    <CustomModal open = {modal.open} handleClose={modal.handleClose} title = {`Product ${product.name} informations`}>
      <ProductInformations
        row={product}
        onAddToCart={modal.handleClose}
      />
    </CustomModal>
    </>
  );
}
