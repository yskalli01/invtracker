// IMPORTS
import React, { useState, memo } from "react";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import { Autocomplete, Grid, TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import CustomInput from "./CustomInput";
import { countries } from "src/types/countries";
import { MuiTelInput } from "mui-tel-input";
import { useFormFields } from "src/hooks/useFormFields";
import { UserProps } from "src/sections/user/config";
import { useAuth } from "src/context/auth-context";

//APP
function SettingsCard(props:any) {
  //TAB STATES

  
  const [value, setValue] = React.useState("one");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  
  // console.log("Rendering SettingsCard");


  //BUTTON STATES
  const [edit, update] = useState({
    required: true,
    disabled: true,
    isEdit: true
  });
  
  const [showPassword,setShowPassword] = useState(false);
  // TOGGLE PASSWORD VISIBILITY
  const handlePassword = () => {
    setShowPassword(!showPassword);
  };

  //RETURN
  return (
    <Card variant="outlined" sx={{ height: "100%", width: "100%", borderRadius:0}}>
      {/* TABS */}
      <Tabs
        value={value}
        onChange={handleChange}
        sx={{marginTop:'10px'}}
      >
        <Tab value="one" label="Account details" />
        {/* <Tab value="two" label="Tab 2" />
        <Tab value="three" label="Tab 3" /> */}
      </Tabs>
      <Divider />

      {/* MAIN CONTENT CONTAINER */}
      <form>
        <CardContent
          sx={{
            p: 3
          }}
        >
          {/* FIELDS */}
          <FormControl fullWidth>
            <Grid
              container
              direction={{ xs: "column", md: "row" }}
              columnSpacing={5}
              rowSpacing={3}
            >
              {/* ROW 1: FIRST NAME */}
              <Grid component="form" size={{xs:12,md:6}}>
                <CustomInput
                  id="Name"
                  name="name"
                  value={props.values.name}
                  onChange={(e) => props.setField("name",e.target.value)}
                  title="Name"
                  req={edit.required}
                ></CustomInput>
              </Grid>

              {/* ROW 2: ADDRESS */}
              <Grid component="form" size={{xs:12,md:6}}>
                <CustomInput
                  id="Address"
                  name="address"
                  value={props.values.address}
                  onChange={(e) => props.setField("address",e.target.value)}
                  title="Address"
                  req={edit.required}
                ></CustomInput>
              </Grid>


              {/* ROW 3: EMAIL */}
              <Grid size={{xs:12,md:6}}>
                <CustomInput
                  type="email"
                  id="email"
                  name="email"
                  value={props.values.email}
                  onChange={(e) => props.setField("email",e.target.value)}
                  title="Email Address"
                  req={edit.required}
                />
              </Grid>


              {/* ROW 4: PHONE */}
              <Grid size={{xs:12,md:6}}>
                <label style={{ fontWeight: "bold" }} htmlFor="phone-select">
                  Country
                </label>
                <MuiTelInput
                  id="phone-select"
                  defaultCountry="MA"
                  margin="dense"
                  variant="standard"
                  size="small"
                  fullWidth
                  required
                  value={props.values.phone}
                  onChange={(value) => props.setField("phone", value)}
                />
              </Grid>


              {/* ROW 5: COUNTRY */}
              <Grid size={{xs:12,md:6}}>
                <label style={{ fontWeight: "bold" }} htmlFor="country-select-demo">
                  Country
                </label>
                <Autocomplete
                  id="country-select-demo"
                  options={countries}
                  autoHighlight
                  value={countries.find((c) => c.label === props.values.country) || null}
                  onChange={(_, newValue) => props.setField("country", newValue?.label || "")}
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
                      margin="dense"
                      variant="standard"
                      size="small"
                      fullWidth
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: "new-password"
                      }}
                    />
                  )}
                />
              </Grid>

              

              {/* ROW 6: PASSWORD */}
              <Grid size={{xs:12,md:6}}>
                <CustomInput
                  id="pass"
                  name="pass"
                  value={props.password}
                  onChange={(e)=>props.setPassword(e.target.value)}
                  title="Password"
                  req={edit.required}
                  type={showPassword ? "text" : "password"}
                  // PASSWORD ICON
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handlePassword}
                          edge="end"
                        >
                          {showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                >  
                </CustomInput>
              </Grid>

              {/* BUTTON */}
              <Grid
                container
                justifyContent={{ xs: "center", md: "flex-end" }}
                size = {{xs:12}}
              >
                <Button
                  sx={{ p: "1rem 2rem",  height: "3rem", width:'100%'}}
                  component="button"
                  size="large"
                  variant="contained"
                  onClick={props.handleModifyProduct}
                >
                  {edit.isEdit === false ? "UPDATE" : "EDIT"}
                </Button>
              </Grid>
            </Grid>
          </FormControl>
        </CardContent>
      </form>
    </Card>
  );
}


export default memo(SettingsCard);