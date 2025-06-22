import { Box, MenuItem, MenuList, Popover, menuItemClasses } from "@mui/material";
import { Iconify, IconifyName } from "../iconify";



export type functionsProps = {
    functionText : string,
    function : () => void,
    icon : IconifyName,
    color : string
}


type CustomPopoverProps = {
    openPopover : Element | null,
    handleClosePopover : () => void,
    functions : functionsProps[],
    showText?: string
}

export function CustomPopover(props : CustomPopoverProps){

    return(
        <Popover
            open={!!props.openPopover}
            anchorEl={props.openPopover}
            onClose={props.handleClosePopover}
            anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
            <MenuList
              disablePadding
              sx={{
                p: 0.5,
                gap: 0.5,
                minWidth: 140,
                display: "flex",
                flexDirection: "column",
                [`& .${menuItemClasses.root}`]: {
                  px: 1,
                  gap: 2,
                  borderRadius: 0.75,
                  [`&.${menuItemClasses.selected}`]: {
                    bgcolor: "action.selected",
                  },
                },
              }}
            >
              {props.functions.map((singleFunction, index) => (
                <MenuItem key={index} onClick={singleFunction.function}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      color: singleFunction.color,
                    }}
                  >
                    <Iconify icon={singleFunction.icon} />
                    <Box component="span" sx={{ ml: 1 }}>
                      {singleFunction.functionText}
                    </Box>
                  </Box>
                </MenuItem>
              ))}
            </MenuList>
        </Popover>
    )
}