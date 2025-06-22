import React, { useState } from "react";
import { Badge, IconButton, InputAdornment, Menu, MenuItem, TextField, Tooltip, Typography, styled } from "@mui/material";
import { ColumnsPanelTrigger, 
    ExportCsv, 
    ExportPrint, 
    FilterPanelTrigger, 
    QuickFilter, 
    QuickFilterClear, 
    QuickFilterControl, 
    Toolbar, 
    ToolbarButton, 
    ToolbarButtonProps } from "@mui/x-data-grid";

import CancelIcon from '@mui/icons-material/Cancel';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import FilterListIcon from '@mui/icons-material/FilterList';
import FileDownloadIcon from '@mui/icons-material/FileDownload';



const StyledQuickFilter = styled(QuickFilter)({
    display: 'grid',
    alignSelf : 'flex-start',
    flexGrow : 1,
});

// const StyledToolbarButton = styled(ToolbarButton as React.ComponentType<ToolbarButtonProps>)(
// ({ theme, ownerState }: { theme: any; ownerState: { expanded: boolean } }) => ({
//     gridArea: '1 / 1',
//     width: 'min-content',
//     height: 'min-content',
//     zIndex: 1,
//     opacity: ownerState.expanded ? 0 : 1,
//     pointerEvents: ownerState.expanded ? 'none' : 'auto',
//     transition: theme.transitions.create(['opacity']),
// })
// );

const StyledTextField = styled(TextField)<{ ownerState: { expanded: boolean } }>(
({ theme, ownerState }: { theme: any; ownerState: { expanded: boolean } }) => ({
    gridArea: '1 / 1',
    overflowX: 'clip',
    width: ownerState.expanded ? 350 : 'var(--trigger-width)',
    opacity: ownerState.expanded ? 1 : 0,
    transition: theme.transitions.create(['width', 'opacity']),
})
);

export function CustomToolbar({
  handleDeleteSelected,
  selectedCount,
  searchText,
}: {
  selectedCount: number;
  handleDeleteSelected: () => void;
  searchText: string;
  searchInput?: string;
  setSearchInput?: (value: string) => void;
}) {
    const [exportMenuOpen, setExportMenuOpen] = React.useState(false);
    const exportAnchorRef = React.useRef<HTMLButtonElement | null>(null);

    
  
    if (selectedCount > 0) {
      return (
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
          <Typography variant="subtitle2">{selectedCount} selected</Typography>
          <Tooltip title="Delete selected">
            <IconButton color="error" onClick={handleDeleteSelected}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      );
    }
    
    return (
      <Toolbar sx={{ gap: 1, p: 2 }}>
        <StyledQuickFilter>
          <QuickFilterControl
            render={({ ref, ...controlProps }, state) => (
              <StyledTextField
                {...controlProps}
                ownerState={{ expanded: true }}
                inputRef={ref}
                aria-label="Search"
                placeholder={`Search ${searchText}...`}
                size="small"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon fontSize="small" />
                      </InputAdornment>
                    ),
                    endAdornment: state.value ? (
                      <InputAdornment position="end">
                        <QuickFilterClear
                          edge="end"
                          size="small"
                          aria-label="Clear search"
                          material={{ sx: { marginRight: -0.75 } }}
                        >
                          <CancelIcon fontSize="small" />
                        </QuickFilterClear>
                      </InputAdornment>
                    ) : null,
                    ...controlProps.slotProps?.input,
                  },
                  ...controlProps.slotProps,
                }}
              />
            )}
          />
        </StyledQuickFilter>
  
        <Tooltip title="Columns">
          <ColumnsPanelTrigger
            render={(props) => (
              <ToolbarButton {...props}  aria-label="Columns">
                <ViewColumnIcon fontSize="small" />
              </ToolbarButton>
            )}
          />
        </Tooltip>
  
        <Tooltip title="Filters">
          <FilterPanelTrigger
            render={(props, state) => (
              <ToolbarButton {...props} aria-label="Filters">
                <Badge
                  badgeContent={state.filterCount}
                  color="primary"
                  variant={state.filterCount > 0 ? 'standard' : 'dot'}
                  invisible={state.filterCount === 0}
                >
                  <FilterListIcon fontSize="small" />
                </Badge>
              </ToolbarButton>
            )}
          />
        </Tooltip>

        <Tooltip title="Export">
          <ToolbarButton
            ref={exportAnchorRef}
            aria-controls={exportMenuOpen ? 'export-menu' : undefined}
            aria-haspopup="true"
            onClick={() => setExportMenuOpen(true)}
          >
            <FileDownloadIcon fontSize="small" />
          </ToolbarButton>
        </Tooltip> 

        <Menu
          id="export-menu"
          anchorEl={exportAnchorRef.current}
          open={exportMenuOpen}
          onClose={() => setExportMenuOpen(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          MenuListProps={{ 'aria-labelledby': 'export-button' }}
        >
          <ExportPrint
            render={({ onClick }) => (
              <MenuItem
                onClick={(event) => {
                  if (onClick) {
                    onClick(event);  // pass the event here
                  }
                  setExportMenuOpen(false);
                }}
              >
                Print
              </MenuItem>
            )}
          />

          <ExportCsv
            render={({ onClick }) => (
              <MenuItem
                onClick={(event) => {
                  if (onClick) {
                    onClick(event); 
                  }
                  setExportMenuOpen(false); 
                }}
              >
                Download CSV
              </MenuItem>
            )}
          />
        </Menu>

      </Toolbar>
    );
  }