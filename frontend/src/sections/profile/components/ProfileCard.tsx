// IMPORTS
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";
import { memo, useMemo } from "react";



//APP
function ProfileCard(props: any) {

  const previewImage = useMemo(() => {
    if (props.selectedImage) return URL.createObjectURL(props.selectedImage);
    if (props.imagePath) return `http://localhost:8080/products/images${props.imagePath.startsWith("/") ? props.imagePath : "/" + props.imagePath}`;
    return null;
  }, [props.selectedImage, props.imagePath]);
  

  // console.log("Rendering ProfileCard");

  return (
    <Card sx={{borderRadius:0}} variant="outlined">
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        {/* CARD HEADER START */}
        <Grid sx={{ p: "1.5rem 0rem", textAlign: "center" }}>
          {/* PROFILE PHOTO */}
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            badgeContent={
              <PhotoCameraIcon
                sx={{
                  border: "5px solid white",
                  backgroundColor: "#ffffff",
                  borderRadius: "50%",
                  padding: ".2rem",
                  width: 35,
                  height: 35
                }}
              />
            }
          >
            <input
              accept="image/*"
              type="file"
              id="profile-image-upload"
              style={{ display: 'none' }}
              onChange={props.handleImageChange}
            />

            <label htmlFor="profile-image-upload" style={{ cursor: 'pointer' }}>
              <Avatar
                src={previewImage || undefined}
                alt={props.name}
                sx={{
                  width: 100,
                  height: 100,
                  mt: 1,
                  mb: 1.5,
                }}
              >
                {!previewImage && props.name ? props.name.charAt(0) : null}
              </Avatar>
            </label>

            
          </Badge>

          {/* DESCRIPTION */}
          <Typography variant="h6">{props.name}</Typography>
          <Typography color="text.secondary">{props.sub}</Typography>
        </Grid>
        {/* CARD HEADER END */}

        {/* DETAILS */}
        {/* <Grid container>
          <Grid size={{xs : 6}} >
            <Typography style={styles.details}>Detail 1</Typography>
            <Typography style={styles.details}>Detail 2</Typography>
            <Typography style={styles.details}>Detail 3</Typography>
          </Grid>
          {/* VALUES */}
          {/* <Grid size={{xs : 6}} sx={{ textAlign: "end" }}>
            <Typography style={styles.value}>{props.dt1}</Typography>
            <Typography style={styles.value}>{props.dt2}</Typography>
            <Typography style={styles.value}>{props.dt3}</Typography>
          </Grid>
        </Grid>  */}

        {/* BUTTON */}
        {/* <Grid  style={styles.details} sx={{ width: "100%" }}>
          <Button
            variant="contained"
            color="secondary"
            sx={{ width: "99%", p: 1, my: 2 }}
          >
            View Public Profile
          </Button>
        </Grid> */}

      </Grid>
    </Card>
  );
}

export default memo(ProfileCard);
