import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {
  Card,
  CardContent,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  FormHelperText,
  Button,
  Typography,
  Grid,
  Box,
} from '@mui/material';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import { colorScheme } from 'utils/color-scheme';
import { userService } from 'services';
import { Layout, Header } from 'components';

type FormValues = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loginError, setLoginError] = useState<string>('');
  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email is invalid'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, reset, handleSubmit, formState, getValues, setError } =
    useForm<FormValues>(formOptions);
  const { errors } = formState;

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    const res = await userService.login({
      email: getValues('email'),
      password: getValues('password'),
    });
    if (res.isError) {
      setLoginError(res?.data?.data);
    } else router.push('/');
  };

  const googleSignIn = async () => {
    const res: any = await userService.googleAuthentication();
  };

  const facebookSignIn = async () => {
    const res: any = await userService.facebookAuthentication();
  };

  return (
    <Layout>
      <Header></Header>
      <Grid container spacing={1} alignItems="center" justifyContent="center">
        <Grid item xs={12} sm={8} md={5} xl={3}>
          <Card sx={{ my: 5, mx: 1 }}>
            <Typography
              sx={{
                fontSize: '2rem',
              }}
              align="center"
            >
              Sign in
            </Typography>
            <Typography
              variant="body1"
              align="center"
              sx={{ display: 'static', height: '1.2rem' }}
              color={colorScheme.red500}
            >
              {loginError}
            </Typography>
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Box
                component="form"
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
                style={{
                  justifyContent: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <TextField
                  fullWidth
                  sx={{ my: 1, display: 'block' }}
                  id="outlined-email-address"
                  label="Email address"
                  {...register('email')}
                  variant="outlined"
                  error={typeof errors.email?.message !== 'undefined'}
                  helperText={errors.email?.message}
                ></TextField>
                <FormControl
                  error={typeof errors.password?.message !== 'undefined'}
                  sx={{ mt: 1, display: 'block' }}
                  variant="outlined"
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    fullWidth
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    {...register('password')}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                    aria-describedby="password-error-text"
                  />
                  <FormHelperText id="password-error-text">
                    {errors.password?.message}
                  </FormHelperText>
                </FormControl>
                <Link href="/reset-password">
                  <a style={{ marginLeft: '1rem' }} color={colorScheme.theme}>
                    Forgot password ?
                  </a>
                </Link>
                <br />
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ bg: colorScheme.theme }}
                >
                  Sign in
                </Button>
              </Box>
              <Typography
                variant="body1"
                align="center"
                color={colorScheme.red500}
              >
                or
              </Typography>
              <Button
                variant="contained"
                sx={{
                  bgcolor: colorScheme.red400,
                  mt: 1,
                  '&:hover': {
                    bgcolor: colorScheme.red500,
                  },
                }}
                onClick={googleSignIn}
                startIcon={<GoogleIcon />}
              >
                Sign in with Google
              </Button>
              <Button
                variant="contained"
                sx={{ bg: colorScheme.facebook, my: 1 }}
                onClick={facebookSignIn}
                startIcon={<FacebookIcon />}
              >
                Sign in with Facebook{' '}
              </Button>
              <p style={{ marginLeft: '1rem' }}>
                Don&apos;t have an account?{' '}
                <Link href="/register">
                  <a color={colorScheme.theme}>Register</a>
                </Link>
              </p>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}
