import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';

import { RouterLink } from 'src/routes/components';

import { useRouter } from 'src/routes/hooks';

import { Iconify } from 'src/components/iconify';
import { useFormFields } from 'src/hooks/useFormFields';
import { LoginProps, initialLogin } from './config';
import { useAuth } from 'src/context/auth-context';

// ----------------------------------------------------------------------

export function SignInView() {
  // const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  // console.log("The initial login is ",initialLogin);
  const {values, setField} = useFormFields<LoginProps>(initialLogin);

  const{ login } = useAuth();

  const handleSignIn = useCallback(async (values : LoginProps) => {
    await login(values);
  }, []);

  const renderForm = (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-end',
        flexDirection: 'column',
      }}
    >
      <TextField
        fullWidth
        name="email"
        label="Email address"
        placeholder='Enter your email'
        value = {values.email}
        onChange={(e) => setField("email", e.target.value)}
        sx={{ mb: 3 }}
        slotProps={{
          inputLabel: { shrink: true },
        }}
      />

      {/* <Link variant="body2" color="inherit" sx={{ mb: 1.5 }}>
        Forgot password?
      </Link> */}

      <TextField
        fullWidth
        name="password"
        label="Password"
        placeholder='Enter your password'
        value = {values.password}
        onChange={(e) => setField("password", e.target.value)}
        type={showPassword ? 'text' : 'password'}
        slotProps={{
          inputLabel: { shrink: true },
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
        sx={{ mb: 3 }}
      />

      <Button
        fullWidth
        size="large"
        type="submit"
        color="inherit"
        variant="contained"
        onClick={() => handleSignIn(values)}
      >
        Sign in
      </Button>
    </Box>
  );

  return (
    <>
      <Box
        sx={{
          gap: 1.5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mb: 5,
        }}
      >
        <Typography variant="h5">Sign in</Typography>
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
          }}
        >
          Don’t have an account?
          <Link 
            component={RouterLink}
            href="/register"
            variant="subtitle2" 
            sx={{ ml: 0.5, cursor:"pointer" }}
          >
            Get started
          </Link>
        </Typography>
      </Box>
      {renderForm}      
    </>
  );
}
