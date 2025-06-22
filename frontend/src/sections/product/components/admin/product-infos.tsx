import { Grid, Rating, Typography } from "@mui/material";
import { ProductProps } from "../../config";

type ProductInformationsProps = {
  row: ProductProps;
};

export function ProductInformations({ row }: ProductInformationsProps) {
  return (
    <Grid container spacing={2}>
      {/* Image Section (left) */}
      <Grid container size={{ xs: 12, sm: 6 }}>
        <Grid size={{ xs: 12 }}>
          {row.imagePath && (
            <img
              src={`http://localhost:8080/products/images${row.imagePath.startsWith('/') ? row.imagePath : '/' + row.imagePath}`}
              alt={row.name}
              style={{ width: '100%', maxHeight: 300, objectFit: 'cover', borderRadius: 8 }}
            />
          )}
        </Grid>
      </Grid>

      {/* Info Section (right) */}
      <Grid container size={{ xs: 12, sm: 6 }} spacing={1}>
        <Grid size={{ xs: 12 }}>
          <Typography variant="h6" fontWeight="bold">{row.name}</Typography>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Rating name="product-rating" value={row.averageRating} precision={0.5} readOnly />
        </Grid>

        <Grid size={{ xs: 4 }}>
          <Typography fontWeight="bold">Unit Price:</Typography>
        </Grid>
        <Grid size={{ xs: 8 }} textAlign="left">
          <Typography>{row.unitPrice}</Typography>
        </Grid>

        <Grid size={{ xs: 4 }}>
          <Typography fontWeight="bold">Quantity:</Typography>
        </Grid>
        <Grid size={{ xs: 8 }} textAlign="left">
          <Typography>{row.quantity}</Typography>
        </Grid>

        <Grid size={{ xs: 4 }}>
          <Typography fontWeight="bold">Category:</Typography>
        </Grid>
        <Grid size={{ xs: 8 }} textAlign="left">
          <Typography>{row.category}</Typography>
        </Grid>

        <Grid size={{ xs: 4 }}>
          <Typography fontWeight="bold">Warehouse:</Typography>
        </Grid>
        <Grid size={{ xs: 8 }} textAlign="left">
          <Typography>{row.warehouse?.name || '-'}</Typography>
        </Grid>

        <Grid size={{ xs: 4 }}>
          <Typography fontWeight="bold">Supplier:</Typography>
        </Grid>
        <Grid size={{ xs: 8 }} textAlign="left">
          <Typography>{row.supplier?.name || '-'}</Typography>
        </Grid>
      </Grid>

     

      {/* Description Section (full width) */}
      <Grid size={{ xs: 12 }} mt={2}>
        <Typography fontWeight="bold" gutterBottom>Description</Typography>
        <Typography>{row.description}</Typography>
      </Grid>
    </Grid>
  );
}
