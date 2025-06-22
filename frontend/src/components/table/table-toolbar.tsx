import Tooltip from '@mui/material/Tooltip';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type TableToolbarProps = {
  numSelected: number;
  filterName : string;
  onFilterName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  deleteFunction : () => Promise<void>;
  isFilter : boolean;
  filterFunction ?: () => void;
  placeholderText : string
};

export function GenericTableToolbar({ numSelected, filterName, onFilterName, deleteFunction, isFilter, filterFunction, placeholderText }: TableToolbarProps) {
  return (
    <Toolbar
      sx={{
        height: 50,
        display: 'flex',
        justifyContent: 'space-between',
        p: (theme) => theme.spacing(0, 1, 0, 3),
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter',
        }),
      }}
    >
      {/* The left side of the toolbar that has either search input that deals with "filterName" or shows the number selected "numSelected" */}
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1" sx={{fontSize:'0.9rem'}}>
          {numSelected} selected
        </Typography>
      ) : (
        <OutlinedInput
          fullWidth
          value={filterName}
          onChange={onFilterName}
          placeholder={`Search ${placeholderText}...`}
          startAdornment={
            <InputAdornment position="start">
              <Iconify width={20} icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
            </InputAdornment>
          }
          sx={{
            maxWidth: 320,
            height: 40, // Set the desired height
            fontSize: '0.975rem', // Optional: reduce font size
            '& .MuiOutlinedInput-input': {
              py: 1, // Adjust vertical padding inside the input
            },
          }}
        />
      )}


      {/* The right side of the toolbar that either shows an icon of a filter list or if there are selected it shows a delete button for those selected */}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick = {deleteFunction}>
            <Iconify icon="solar:trash-bin-trash-bold" />
          </IconButton>
        </Tooltip>
      ) : (
        isFilter && <Tooltip title="Filter list">
          <IconButton onClick = {filterFunction}>
            <Iconify icon="ic:round-filter-list" />
          </IconButton>
        </Tooltip>
      )}
      
    </Toolbar>
  );
}
