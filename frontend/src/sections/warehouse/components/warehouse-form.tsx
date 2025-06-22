import React, { useState } from "react";
import { Grid, TextField, Button } from "@mui/material";
import "leaflet/dist/leaflet.css";
import { useMapView } from "../hooks/useMapView";
import { WarehouseMap } from "./warehouse-map";
import { WarehouseProps } from "../config";
import { useWarehouseContext } from "../context/useWarehouseContext";
import { useFormFields } from "src/hooks/useFormFields";

interface WarehouseFormProps {
  // clickFunction: () => void;
  // values : WarehouseProps,
  // setField : <K extends keyof WarehouseProps>(field : K, value : WarehouseProps[K]) => void;
  buttonText: string;
  initialValue : WarehouseProps;
  operation : string
}




export const WarehouseForm = React.memo(function WarehouseForm({
  // clickFunction,
  // values,
  // setField,
  buttonText,
  operation,
  initialValue
}: WarehouseFormProps) {



  const {createWarehouse, modifyWarehouse} = useWarehouseContext();


  const{ values,setField, resetFields } = useFormFields<WarehouseProps>(initialValue);
  

  const handleCreateWarehouse = async () => {
      const success = await createWarehouse({...values});
      if (success) {
        resetFields();
      }
  };

  const{id:supplierId, ...valuesWithoutId} = values;
  const handleModifyWarehouse = async () => {
      await modifyWarehouse({...valuesWithoutId}, initialValue.id as number);
  };

  
  const [capacityError, setCapacityError] = useState(false);

  const handleCapacityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^\d+$/.test(value)) {
      setCapacityError(false);
      // warehouseFields.setCapacity(value);
      setField('capacity',value);
    } else {
      setCapacityError(true);
      // warehouseFields.setCapacity("");
      setField('capacity','');
    }
  };

  // Map update of location
  const {selectedLocation,
    setSelectedLocation,
    LocationSelector,
    SearchControl,
    fetchLocationName} = useMapView();

  React.useEffect(() => {
    if (!selectedLocation) return;
  
    const { lat, lng } = selectedLocation;
    const formattedCoords = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
    
    setField('location',formattedCoords);
  
    fetchLocationName(lat, lng)
      .then((name) => {
        setField('name',name)
      })
      .catch(() => {
        setField('name',formattedCoords)
      });
  }, [selectedLocation, values]);
    
  

  return (
    <>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid size = {{ xs: 12, sm: 6, md: 6}}>
          <TextField
            label="Name"
            variant="standard"
            fullWidth
            value={values.name}
            onChange={(e) => setField('name',e.target.value)}
          />
        </Grid>

        <Grid size =  {{ xs: 12, sm: 6, md: 6}}>
          <TextField
            label="Location"
            variant="standard"
            fullWidth
            value={values.location}
            onChange={(e) => setField('location', e.target.value)}
            helperText="You can also edit location manually or select on map"
          />
        </Grid>

        <Grid size ={{ xs: 12}} sx={{ height: 300, position: 'relative', zIndex: 0 }}>
            <WarehouseMap> 
              <SearchControl setSelectedLocation={setSelectedLocation} />
              <LocationSelector selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation} />
            </WarehouseMap>
        </Grid>

        <Grid size = {{ xs: 12}}>
          <TextField
            id="capacity"
            label="Capacity"
            variant="standard"
            fullWidth
            type="text"
            value={values.capacity}
            onChange={handleCapacityChange}
            error={capacityError}
            helperText={capacityError ? "Capacity must be a number" : ""}
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          />
        </Grid>

        <Grid size = {{ xs: 12}}>
          <Button variant="contained" sx={{ width: "15%", minWidth: "200px" }} onClick={operation == "Create" ? handleCreateWarehouse : handleModifyWarehouse}>
            {buttonText}
          </Button>
        </Grid>

      </Grid>
    </>
  );
})


