import React from "react";
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { ProductProps, product } from "src/sections/product/config";
import Typography from '@mui/material/Typography';
import { useWarehouse } from "src/sections/warehouse/hooks/useWarehouse";
import { useSupplier } from "src/sections/supplier/hooks/useSupplier";
import { CustomStepper } from "src/components/stepper";
import { WarehouseProps, warehouse } from "src/sections/warehouse/config";
import { SupplierProps } from "src/sections/supplier/config";
import { useFormFields } from "src/hooks/useFormFields";
import { useProductContext } from "../../context/useAdminProductContext";

type ProductFormProps = {
    buttonText : string,
    initialValue : ProductProps;
    operation : string
}

const steps = ['Product informations', 'Product image', 'Product description'];

const productCategories = [
    'Electronics',
    'Clothing',
    'Home & Kitchen',
    'Beauty & Personal Care',
    'Sports & Outdoors',
    'Books',
    'Toys & Games',
    'Automotive',
    'Grocery',
    'Health & Wellness',
    'Office Supplies',
    'Pet Supplies',
    'Jewelry',
    'Footwear',
    'Furniture',
    'Baby Products',
    'Garden & Outdoors',
    'Music & Instruments',
    'Tools & Hardware',
    'Video Games'
];

type StepOneFormProps = {
    values: ProductProps;
    setField: <K extends keyof ProductProps>(field: K, value: ProductProps[K]) => void;
    warehouses: WarehouseProps[];
    suppliers: SupplierProps[];
};

type StepTwoFormProps = {
    values: ProductProps;
    selectedImage: File | null;
    handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    inputRef: React.RefObject<HTMLInputElement>;
  };
  
type StepThreeFormProps = {
    values: ProductProps;
    setField: <K extends keyof ProductProps>(field: K, value: ProductProps[K]) => void;
};

const StepOneForm = React.memo(function StepOneForm({values, setField, warehouses, suppliers } : StepOneFormProps) {
    return (
      <Box>
        <Box>
        <Grid container spacing={{ xs: 2, md: 4 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            <Grid size={{ xs: 2, sm: 4, md: 4}}>
                <TextField
                    id="Name"
                    label="Name"
                    variant="standard"
                    required
                    fullWidth
                    value={values.name}
                    onChange={(e)=>setField('name',e.target.value)}
                />
            </Grid>
            
            <Grid size={{ xs: 2, sm: 4, md: 4}}>
                <TextField
                    id="unit_price"
                    label="Unit price"
                    variant="standard"
                    type="number"
                    required
                    fullWidth
                    value={values.unitPrice}
                    onChange={(e)=>setField('unitPrice',Number(e.target.value))}
                />
            </Grid>

            <Grid size={{ xs: 2, sm: 4, md: 4}}>
                <TextField
                    id="purchase_price"
                    label="Purchase price"
                    variant="standard"
                    type="number"
                    required
                    fullWidth
                    value={values.purchasePrice}
                    onChange={(e)=>setField('purchasePrice',Number(e.target.value))}
                />
            </Grid>

            <Grid size={{ xs: 2, sm: 4, md: 6}}>
                <FormControl fullWidth>
                    <InputLabel id="category-label">Category</InputLabel>
                    <Select
                        labelId="category-label"
                        id="category"
                        required
                        value={values.category || ''}
                        label="Category"
                        onChange={(e) => setField('category',e.target.value)}
                    >
                        {productCategories.map((category,key) => (
                            <MenuItem key={key} value={category}>{category}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>

            <Grid size={{ xs: 2, sm: 4, md: 6}}>
                <TextField
                    id="quantity"
                    type="number"
                    label="Quantity"
                    variant="standard"
                    required
                    fullWidth
                    value={values.quantity}
                    onChange={(e)=>setField('quantity',Number(e.target.value))}
                />
            </Grid>

            <Grid size={{ xs: 2, sm: 4, md: 6}}>
                <FormControl fullWidth>
                    <InputLabel id="warehouse-label">Warehouse</InputLabel>
                    <Select
                        labelId="warehouse-label"
                        id="warehouse"
                        required
                        value={values.warehouse?.id || ''}
                        label="Warehouse"
                        onChange={(e) => {
                            const selectedWarehouse = warehouses.find(w => w.id === e.target.value);
                            if (selectedWarehouse) {
                              setField('warehouse', selectedWarehouse);
                            }
                            console.log(selectedWarehouse);
                          }}
                    >
                        {warehouses.map(singleWarehouse => (
                            <MenuItem key={singleWarehouse.id} value={singleWarehouse.id ?? ''}>{singleWarehouse.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            
            <Grid size={{ xs: 4, sm: 8, md: 6}}>
                <FormControl fullWidth>
                    <InputLabel id="supplier-label">Supplier</InputLabel>
                    <Select
                        labelId="supplier-label"
                        id="supplier"
                        required
                        value={values.supplier?.id || ''}
                        label="Supplier"
                        onChange={(e) => {
                            const selectedSupplier = suppliers.find(w => w.id === e.target.value);
                            if (selectedSupplier) {
                              setField('supplier', selectedSupplier);
                            }
                            console.log(selectedSupplier);
                          }}
                    >
                        {suppliers.map(singleSupplier => (
                            <MenuItem key={singleSupplier.id} value={singleSupplier.id ?? ''}>{singleSupplier.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>


        </Grid>
        </Box>
      </Box>
    );
});

const StepTwoForm = React.memo(function StepTwoForm({ 
    values, 
    selectedImage, 
    handleImageChange, 
    inputRef 
} : StepTwoFormProps) {
    return (

        <Box>
            <Box>
                <input
                    type="file"
                    accept="image/*"
                    ref={inputRef}
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                />
                <Button
                    variant="contained"
                    onClick={() => inputRef.current?.click()}
                >
                    Select Image
                </Button>

                <Box mt={2}>
                {selectedImage ? (
                    <>
                    <Typography variant="body1">{selectedImage.name}</Typography>
                    <img
                        src={URL.createObjectURL(selectedImage)}
                        alt="preview"
                        style={{ width: 200, marginTop: 10 }}
                    />
                    </>
                ) : values.imagePath ? (
                    <>
                    <Typography variant="body1">Current Image</Typography>
                    <img
                        src={`http://localhost:8080/products/images${values.imagePath.startsWith('/') ? values.imagePath : '/' + values.imagePath}`}
                        alt="existing"
                        style={{ width: 200, marginTop: 10 }}
                    />
                    </>
                ) : null}
                </Box>

            </Box>
        </Box>
    );
})
  
const StepThreeForm = React.memo(function StepThreeForm({ values, setField } : StepThreeFormProps) {
    return (
        <Box>
        <Grid container spacing={{ xs: 2, md: 4 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            <Grid size={{ xs: 4, sm: 8, md: 12}}>
                <TextField
                    fullWidth
                    id="outlined-multiline-static"
                    label="Description"
                    multiline
                    rows={4}
                    value={values.description}
                    onChange={(e)=>setField('description',e.target.value)}
                />
            </Grid>
        </Grid>
        </Box>
    );
})



export function ProductForm({ 
    operation,
    buttonText,
    initialValue,
    // selectedImage,
    // handleImageChange,
    // inputRef
} : ProductFormProps){

    const { warehouses } = useWarehouse();
    const { suppliers } = useSupplier();
    const { createProduct, modifyProduct } = useProductContext();

    const [selectedImage, setSelectedImage] = React.useState<File | null>(null);
    const inputRef = React.useRef<HTMLInputElement>(null);
    
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedImage(file);
        }
    };
    
    const { values, setField, resetFields } = useFormFields<ProductProps>(initialValue);
    const handleCreateProduct = async () => {
        await createProduct(
          values,
          selectedImage
        );
        resetFields();
    };

    const {id : productId, ...valuesWithoutId} = values;
    const handleModifyProduct = async () => {
        await modifyProduct(
        {
            ...valuesWithoutId
        },
        selectedImage,
        initialValue.id as number
        );
    };


    
    

    return(
        <CustomStepper steps = {steps} buttonText={buttonText} clickFunction={operation == "Create" ? handleCreateProduct : handleModifyProduct} >
            <StepOneForm  values={values} setField={setField} warehouses={warehouses} suppliers={suppliers} />
            <StepTwoForm values={values} selectedImage={selectedImage} handleImageChange={handleImageChange} inputRef={inputRef} />
            <StepThreeForm values={values} setField={setField}/>
        </CustomStepper>
    )
}



