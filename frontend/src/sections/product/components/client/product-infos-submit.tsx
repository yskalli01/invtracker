import { Box, Button, Grid, Paper, Rating, TextField, Typography } from "@mui/material";
import { ProductProps } from "../../config";
import { fCurrency } from "src/utils/format-number";
import { useState } from "react";
import { useProductClientContext } from "../../context/useClientProductContext";


type ProductInformationsProps = {
    row : ProductProps,
    onAddToCart : () => void
}

export function ProductInformations({ row, onAddToCart }: ProductInformationsProps) {
  const [quantity, setQuantity] = useState<number | ''>('');
  const { addToCartItem } = useProductClientContext();

  // Handler to restrict quantity input
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === '' ? '' : Number(e.target.value);

    if (value === '') {
      setQuantity('');
      return;
    }

    if (value > (row.quantity ?? 0)) {
      setQuantity(row.quantity ?? 0);
    } else if (value < 0) {
      setQuantity(0);
    } else {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    if (quantity !== '' && quantity > 0) {
      addToCartItem({ product: row, quantity: quantity as number });
      onAddToCart();  
    }
  };

  return (
    <Grid container spacing={3}>
      {/* Left side: image */}
      <Grid size={{xs:12, sm:6}}>
        {row.imagePath && (
          <img
            src={`http://localhost:8080/products/images${row.imagePath.startsWith('/') ? row.imagePath : '/' + row.imagePath}`}
            alt={row.name}
            style={{ width: '100%', maxHeight: 300, objectFit: 'cover', borderRadius: 8 }}
          />
        )}
      </Grid>

      {/* Right side: product info */}
      <Grid size={{xs:12, sm:6}} container spacing={2}>
        <Grid size={{xs:12}}>
          <Typography variant="h5" fontWeight="bold">
            {row.name}
          </Typography>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Rating name="product-rating" value={row.averageRating} precision={0.5} readOnly />
        </Grid>

        <Grid size={{xs:6}}>
          <Typography fontWeight="bold">Unit Price:</Typography>
        </Grid>
        <Grid size={{xs:6}}>
          <Typography>{row.unitPrice != null ? fCurrency(row.unitPrice) : '-'}</Typography>
        </Grid>

        <Grid size={{xs:6}}>
          <Typography fontWeight="bold">Quantity in stock:</Typography>
        </Grid>
        <Grid size={{xs:6}}>
          <Typography>{row.quantity}</Typography>
        </Grid>

        <Grid size={{xs:6}}>
          <Typography fontWeight="bold">Category:</Typography>
        </Grid>
        <Grid size={{xs:6}}>
          <Typography>{row.category}</Typography>
        </Grid>

        <Grid size={{xs:12}}>
          <TextField
            id="quantity"
            label="Quantity"
            type="number"
            variant="outlined"
            fullWidth
            inputProps={{
              min: 0,
              max: row.quantity,
              step: 1,
              pattern: '[0-9]*',
            }}
            value={quantity}
            onChange={handleQuantityChange}
          />
        </Grid>

        

        <Grid size={{xs:12}}>
          <Button
            variant="contained"
            color="primary"
            disabled={quantity === '' || quantity <= 0}
            onClick={handleAddToCart}
            fullWidth
          >
            Add to Cart
          </Button>
        </Grid>
      </Grid>

      {/* Description full width */}
      <Grid size={{xs:12}}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Description
        </Typography>
        <Typography>{row.description || 'No description available.'}</Typography>
      </Grid>
      
      <Grid size={{xs:12}}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Customer Reviews
      </Typography>

      {row.ratings.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          No reviews available.
        </Typography>
      ) : (
        row.ratings.map((rating, index) => (
          <Paper
            key={index}
            elevation={2}
            sx={{ p: 2, mb: 2, borderRadius: 2, backgroundColor: "#f9f9f9" }}
          >
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
              <Typography variant="subtitle1" fontWeight="bold">
                {rating?.user?.name || "Anonymous"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {rating?.ratingValue} ★
              </Typography>
            </Box>

            <Typography variant="body2" color="text.primary">
              {rating?.comment || "No comment provided."}
            </Typography>
          </Paper>
        ))
        )}
      </Grid>
    </Grid>
  );
}
