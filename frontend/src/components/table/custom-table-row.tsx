import { Checkbox, IconButton, TableCell, TableRow } from "@mui/material";
import { Iconify } from "../iconify";
import { usePopover } from 'src/components/popover';
import { ReactNode } from "react";




type CustomTableRowProps = {
    selected: boolean;
    onSelectRow: () => void;
    popover : ReturnType<typeof usePopover>;
    children : ReactNode
}


export function CustomTableRow({selected, onSelectRow, popover, children} : CustomTableRowProps) {
    return(
        <TableRow
        hover
        tabIndex={-1}
        role="checkbox"
        selected={selected}
        sx={{ 
          '& .MuiTableCell-root': {
            py: 1, 
            fontSize: '0.875rem',
          },
        }}
      >
        {/* Checkbox for the table row */}
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={onSelectRow} />
        </TableCell>
        

        {children}

        <TableCell align="right">
          <IconButton onClick={popover.handleOpenPopover} size="small">
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>
    )
}