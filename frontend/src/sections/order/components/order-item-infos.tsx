import Box from '@mui/material/Box';
import { Grid, Typography } from '@mui/material';
import { OrderProps } from '../config';

export function OrderItemInfos(row: OrderProps) {
  return <Box display="flex" flexDirection="column" gap={2}>
    {row.orderItems && row.orderItems.map((orderItem) => (
      <Grid container sx={{
        border: '2px dashed',
        borderColor: 'grey.400',
        p: 2,
      }} spacing={{ xs: 2, md: 4 }} columns={{ xs: 4, sm: 8, md: 12 }}>

        {/* Id of the order item  */}
        <Grid size={{ xs: 2, sm: 4, md: 4 }}><Typography variant='body1' fontWeight="bold" mr={1}>Order Item id :</Typography></Grid>
        <Grid size={{ xs: 2, sm: 4, md: 2 }}><Typography variant='body1' textAlign={'right'}>{orderItem.id}</Typography></Grid>

        {/* Id of the product  */}
        <Grid size={{ xs: 2, sm: 4, md: 4 }}><Typography variant='body1' fontWeight="bold" mr={1}>Product id :</Typography></Grid>
        <Grid size={{ xs: 2, sm: 4, md: 2 }}><Typography variant='body1' textAlign={'right'}>{orderItem.product != undefined && orderItem.product.id}</Typography></Grid>

        {/* Name of the product  */}
        <Grid size={{ xs: 2, sm: 4, md: 4 }}><Typography variant='body1' fontWeight="bold" mr={1}>Product name :</Typography></Grid>
        <Grid size={{ xs: 2, sm: 4, md: 2 }}><Typography variant='body1' textAlign={'right'}>{orderItem.product != undefined && orderItem.product.name}</Typography></Grid>

        {/* Category of the product  */}
        <Grid size={{ xs: 2, sm: 4, md: 4 }}><Typography variant='body1' fontWeight="bold" mr={1}>Product category :</Typography></Grid>
        <Grid size={{ xs: 2, sm: 4, md: 2 }}><Typography variant='body1' textAlign={'right'}>{orderItem.product != undefined && orderItem.product.category}</Typography></Grid>

        {/* Quantity of the product in the item  */}
        <Grid size={{ xs: 2, sm: 4, md: 4 }}><Typography variant='body1' fontWeight="bold" mr={1}>Order item quantity :</Typography></Grid>
        <Grid size={{ xs: 2, sm: 4, md: 2 }}><Typography variant='body1' textAlign={'right'}>{orderItem.quantity}</Typography></Grid>
      </Grid>

    ))}
  </Box>;
}
