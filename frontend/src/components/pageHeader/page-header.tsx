// PageHeader.tsx
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Iconify } from '../iconify';
import { RouterLink } from 'src/routes/components';

type PageHeaderProps = {
  title: string;
  buttonLabel?: string;
  action?: () => void;
};


export function PageHeader({ title, buttonLabel, action }: PageHeaderProps) {
  // console.log("Page header rendered");
  return (
    <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>

      <Typography variant="h4" sx={{ flexGrow: 1 }}>
        {title}
      </Typography>

      {buttonLabel && (
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={action}
        >
          {buttonLabel}
        </Button>
      )}


    </Box>
  );
}
