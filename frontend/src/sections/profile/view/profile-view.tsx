import { Grid } from "@mui/material";
import { useRef, useState, useCallback } from "react";
import { PageHeader } from "src/components/pageHeader";
import { DashboardContent } from "src/layouts/dashboard";
import ProfileCard from "../components/ProfileCard";
import SettingsCard from "../components/SettingsCard";
import { useAuth } from "src/context/auth-context";
import { useFormFields } from "src/hooks/useFormFields";
import { UserProps } from "src/sections/user/config";
import { useProfile } from "../hooks/useProfile";

export function ProfileView() {
  const {user} = useAuth();

  const { values, setField } = useFormFields<UserProps>(user as UserProps);

  const { name , role, imagePath} = values;

  const {modifyUser} = useProfile();

  const [password,setPassword] = useState('');

  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleImageChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        setSelectedImage(file);
      }
    },
    [] 
  );

  const {id : productId, ...valuesWithoutId} = values;
  const handleModifyProduct = async () => {
    await modifyUser(
    {
        ...valuesWithoutId,
        password:password
    },
    selectedImage,
    user?.id as number
    );
  };


  return (
    <DashboardContent>
        <PageHeader title="Profile" />

        {/* <Grid container direction="column" sx={{ overflowX: "hidden" }}> */}

        {/* <Grid size={{ xs: 12, md: 6 }}>
          <img
            alt="avatar"
            style={{
              width: "100vw",
              height: "35vh",
              objectFit: "cover",
              objectPosition: "50% 50%",
              position: "relative"
            }}
            src="https://iris2.gettimely.com/images/default-cover-image.jpg"
          />
        </Grid> */}

        <Grid
          container
          direction={{ xs: "column", md: "row" }}
          spacing={2}
        >
          <Grid size={{ md: 3 }}>
            <ProfileCard
              imagePath = {imagePath}
              name={name}
              sub={role}
              selectedImage = {selectedImage}
              handleImageChange = {handleImageChange}
            />
          </Grid>

          <Grid size={{ md: 9 }}>
            <SettingsCard 
              values = {values}
              setField = {setField}
              password = {password}
              setPassword = {setPassword}
              handleModifyProduct = {handleModifyProduct}
            />
          </Grid>
        {/* </Grid> */}
      </Grid>
    </DashboardContent>
  );
}
