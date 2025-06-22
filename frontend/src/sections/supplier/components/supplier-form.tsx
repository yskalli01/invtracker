import {
    Grid,
    TextField,
    Button,
    Box,
    Autocomplete
  } from "@mui/material";
  import { useState, memo } from "react";
  import { notify } from "src/utils/toast-helper";
  import { SupplierProps } from "../config";
  import { useFormFields } from "src/hooks/useFormFields";
  import { useSupplierContext } from "../context/useSupplierContext";
  import { CountryType, countries } from "src/types/countries";
  import { MuiTelInput } from "mui-tel-input";
  
  type SupplierFormProps = {
    operation: string;
    initialValue: SupplierProps;
    buttonText: string;
  };
  
  export const SupplierForm = memo(function SupplierForm({
    operation,
    initialValue,
    buttonText
  }: SupplierFormProps) {
    const { createSupplier, modifySupplier } = useSupplierContext();
    const { values, setField, resetFields } = useFormFields<SupplierProps>(initialValue);
    const [emailError, setEmailError] = useState(false);
  
    const validateEmail = (email: string) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setField("email", value);
      setEmailError(value !== "" && !validateEmail(value));
    };
  
    const handleCreateSupplier = async () => {
      const success = await createSupplier({ ...values });
      if (success) resetFields();
    };
  
    const handleModifySupplier = async () => {
      const { id, ...data } = values;
      await modifySupplier(data, initialValue.id as number);
    };
  
    return (
      <Grid container spacing={{ xs: 2, md: 4 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {/* Name */}
        <Grid size={{xs:2,sm:4,md:4}}>
          <TextField
            label="Name"
            variant="standard"
            required
            fullWidth
            value={values.name}
            onChange={(e) => setField("name", e.target.value)}
          />
        </Grid>
  
        {/* Address */}
        <Grid size={{xs:2,sm:4,md:4}}>
          <TextField
            label="Address"
            variant="standard"
            fullWidth
            value={values.address}
            onChange={(e) => setField("address", e.target.value)}
          />
        </Grid>
  
        {/* Email */}
        <Grid size={{xs:2,sm:4,md:4}}>
          <TextField
            id="email"
            type="email"
            label="Email"
            variant="standard"
            fullWidth
            required
            value={values.email}
            onChange={handleEmailChange}
            error={emailError}
            helperText={emailError ? "Please enter a valid email address" : ""}
          />
        </Grid>
  
        {/* Phone */}
        <Grid size={{xs:2,sm:4,md:6}}>
          <Box display="flex" alignItems="flex-end" height="100%">
            <MuiTelInput
              defaultCountry="MA"
              value={values.phone}
              onChange={(value) => setField("phone", value)}
              variant="standard"
              fullWidth
              required
            />
          </Box>
        </Grid>
  
        {/* Country */}
        <Grid size={{xs:2,sm:4,md:6}}>
          <Autocomplete
            id="country-select-demo"
            options={countries}
            autoHighlight
            value={countries.find((c) => c.label === values.country) || null}
            onChange={(_, newValue) => setField("country", newValue?.label || "")}
            getOptionLabel={(option) => option.label}
            renderOption={(props, option) => {
              const { key, ...optionProps } = props;
              return (
                <Box
                  key={key}
                  component="li"
                  sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                  {...optionProps}
                >
                  <img
                    loading="lazy"
                    width="20"
                    srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                    src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                    alt=""
                  />
                  {option.label} ({option.code}) +{option.phone}
                </Box>
              );
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Country"
                variant="standard"
                fullWidth
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "new-password"
                }}
              />
            )}
          />
        </Grid>
  
        {/* Submit Button */}
        <Grid size={{xs:12}}>
          <Button
            variant="contained"
            sx={{ width: "15%", minWidth: "200px" }}
            onClick={() => {
              if (emailError) {
                notify("Insert the fields correctly", "error");
                return;
              }
              operation === "Create" ? handleCreateSupplier() : handleModifySupplier();
            }}
          >
            {buttonText}
          </Button>
        </Grid>
      </Grid>
    );
  });
  