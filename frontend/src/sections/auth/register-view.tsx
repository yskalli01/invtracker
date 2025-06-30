import { useState, useCallback, useMemo } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { Iconify } from 'src/components/iconify';
import { MuiTelInput} from 'mui-tel-input';
import { Autocomplete, Avatar } from '@mui/material';
import { countries } from 'src/types/countries';
import { useAuth } from 'src/context/auth-context';
import { useFormFields } from 'src/hooks/useFormFields';
import { RegisterProps,initialRegister} from './config';
import { RouterLink } from 'src/routes/components';


// ----------------------------------------------------------------------

export function RegisterView() {
    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);

    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
        setSelectedImage(event.target.files[0]);
        }
    }

    const {register} = useAuth();

    const {values,setField} = useFormFields<RegisterProps>(initialRegister);

    const handleRegister = useCallback(async(values:RegisterProps,selectedImage:File|null) => {
        await register(
            values,
            selectedImage
          );
    }, []);

    const allowedCountryCodes = useMemo(
        () => countries.map((country) => country.code as any),
        []
    );

    const renderForm = (
        <Box
        sx={{
            display: 'flex',
            alignItems: 'flex-end',
            flexDirection: 'column',
        }}
        >
            <Box
                sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mb: 3,
                width: '100%',
                }}
            >
                <input
                    accept="image/*"
                    type="file"
                    id="profile-image-upload"
                    style={{ display: 'none' }}
                    onChange={handleImageChange}
                />
                <label htmlFor="profile-image-upload" style={{ cursor: 'pointer' }}>
                    <Avatar
                        sx={{ width: 96, height: 96, mb: 1 }}
                        src={selectedImage ? URL.createObjectURL(selectedImage) : undefined}
                        alt="Profile Image"
                    />
                </label>
            </Box>

            <TextField
                fullWidth
                name="name"
                label="Name"
                required
                placeholder='Enter your name'
                value = {values.name}
                onChange={(e) => setField("name", e.target.value)}
                sx={{ mb: 3 }}
                slotProps={{
                    inputLabel: { shrink: true },
                }}
            />

            <TextField
                fullWidth
                name="email"
                label="Email address"
                required
                value = {values.email}
                onChange={(e) => setField("email", e.target.value)}
                placeholder='Enter your email'
                sx={{ mb: 3 }}
                slotProps={{
                    inputLabel: { shrink: true },
                }}
            />

            <TextField
                fullWidth
                name="address"
                label="Address"
                placeholder='Enter your address'
                value = {values.address}
                onChange={(e) => setField("address", e.target.value)}
                sx={{ mb: 3 }}
                slotProps={{
                    inputLabel: { shrink: true },
                }}
            />

            <Autocomplete
                id="country-select-demo"
                options={countries}
                autoHighlight
                fullWidth
                value={countries.find((c) => c.label === values.country) || null}
                onChange={(_, newValue) => setField("country", newValue?.label || "")}
                getOptionLabel={(option) => option.label}
                renderOption={(props, option) => {
                const { key, ...optionProps } = props;
                return (
                    <Box
                    key={key}
                    component="li"
                    //   sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                    {...optionProps}
                    >
                    <img
                        loading="lazy"
                        // width="20"
                        srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                        src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                        alt=""
                    />
                    {option.label} ({option.code}) +{option.phone}
                    </Box>
                );
                }}
                renderInput={(params) => (
                <TextField
                    {...params}
                    label="Country"
                    sx={{ mb: 3 }}
                    slotProps={{
                    inputLabel: { shrink: true },
                    }}
                    placeholder='Select your country'
                    fullWidth
                    inputProps={{
                    ...params.inputProps,
                    autoComplete: "new-password"
                    }}
                />
                )}
            />

            <MuiTelInput
                defaultCountry="MA"
                onlyCountries={allowedCountryCodes}
                placeholder='Enter your phone number'
                sx={{ mb: 3 }}
                slotProps={{
                inputLabel: { shrink: true },
                }}
                value={values.phone}
                onChange={(value) => setField("phone", value)}
                fullWidth
            />

            <TextField
                fullWidth
                name="password"
                label="Password"
                required
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
                onClick={() => handleRegister(values,selectedImage)}
            >
                Register
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
        <Typography variant="h5">Register</Typography>
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
          }}
        >
          Already have an account?
          <Link 
            variant="subtitle2" 
            sx={{ ml: 0.5 }}
            component={RouterLink}
            href='/'
            >
            Sign In
          </Link>
        </Typography>
      </Box>

      {renderForm} 
    </>
  );
}
