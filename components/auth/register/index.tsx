import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { observer } from 'mobx-react-lite';
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
import { userService, firebaseService } from 'services';
import { authStore, userStore } from 'store';
import { previousPath } from 'helpers';

type FormValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

export const RegisterForm = observer(() => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loginError, setLoginError] = useState<string>('');

  useEffect(() => {
    if (userService.isAuthToken()) {
      const authenIsValidToken = async () => {
        return await userService.fetchUserInfo();
      };
      authenIsValidToken();
    }
  }, []);

  useEffect(() => {
    if (!authStore.isAuthenticating) {
      if (userStore.user) {
        const redirect = previousPath.getPreviousPath();
        router.push(redirect);
        previousPath.clearRedirect();
        console.log(redirect);
      }
    }
  }, [router, previousPath, authStore.isAuthenticating, userStore.user]);

  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email is invalid'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Password must match')
      .required('Confirm password is required'),
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
    const res = await userService.register({
      email: getValues('email'),
      password: getValues('password'),
    });
    if (res.isError) {
      setLoginError(res?.data?.data);
    } else router.push('/');
  };

  const googleSignUp = async () => {
    const res: any = await firebaseService.googleLogin();
  };

  const facebookSignUp = async () => {
    const res: any = await firebaseService.facebookLogin();
  };

  return (
    <Grid container spacing={1} alignItems="center" justifyContent="center">
      <Grid item xs={12} sm={8} md={5} xl={3}>
        <Card sx={{ my: 5, mx: 1 }}>
          <Typography
            sx={{
              fontSize: '2rem',
            }}
            align="center"
          >
            Sign up
          </Typography>
          <Typography
            variant="body1"
            align="center"
            color={colorScheme.red500}
            sx={{ display: 'static', height: '1.2rem' }}
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
                sx={{ my: 1, display: 'block' }}
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
              <FormControl
                error={typeof errors.confirmPassword?.message !== 'undefined'}
                sx={{ my: 1, display: 'block' }}
                variant="outlined"
              >
                <InputLabel htmlFor="outlined-adornment-confirm-password">
                  Confirm password
                </InputLabel>
                <OutlinedInput
                  fullWidth
                  id="outlined-adornment-confirm-password"
                  {...register('confirmPassword')}
                  type={showPassword ? 'text' : 'password'}
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
                  label="Confirm password"
                  aria-describedby="confirm-password-error-text"
                />
                <FormHelperText id="password-error-text">
                  {errors.confirmPassword?.message}
                </FormHelperText>
              </FormControl>
              <br />
              <Button
                type="submit"
                variant="contained"
                sx={{ bg: colorScheme.theme }}
              >
                Sign up
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
              startIcon={<GoogleIcon />}
              onClick={googleSignUp}
            >
              Sign up with Google{' '}
            </Button>
            <Button
              variant="contained"
              sx={{ bg: colorScheme.facebook, mt: 1 }}
              startIcon={<FacebookIcon />}
              onClick={facebookSignUp}
            >
              Sign up with Facebook{' '}
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
});
