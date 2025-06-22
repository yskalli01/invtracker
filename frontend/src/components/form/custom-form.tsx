import { Alert, Box, Divider, Typography } from "@mui/material";
import { ReactNode } from "react";



const style = {
    backgroundColor : "white",
    p:3,
    boxShadow: 1,
    display:"flex",
    flexDirection:'column',
    gap:'15px' 
}

type CustomFormProps = {
    title : string,
    children ?: ReactNode
};

export function CustomForm({ title, children} : CustomFormProps){
    return(
        <Box sx = {style}>
            <Typography variant="h5" sx={{ flexGrow: 1 }}>{title}</Typography>

            <Divider sx={{ '&::before, &::after': { borderTopStyle: 'dashed' } }}>
                <Typography
                variant="overline"
                sx={{ color: 'text.secondary', fontWeight: 'fontWeightMedium' }}
                >
                </Typography>
            </Divider>

            

            {children}
            
        </Box>
    );
}