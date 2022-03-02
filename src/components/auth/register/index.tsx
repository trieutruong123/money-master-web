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
import { userService, googleAuth, facebookAuth } from 'services';
import { authStore, userStore } from 'store';
import { httpError, previousPath } from 'helpers';

type FormValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

interface IProps {
  content: any;
}

export const RegisterForm = observer(({ content }: IProps) => {
  const router = useRouter();
  const { locale } = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [registerError, setRegisterError] = useState<string>('');

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
        router.push(redirect, redirect, { locale: locale });
        previousPath.clearRedirect();
      }
    }
  }, [router, previousPath, authStore.isAuthenticating, userStore.user, locale]);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required(String(content.error.emailRequired))
      .email(String(content.error.invalidEmail)),
    password: Yup.string()
      .required(String(content.error.passwordRequired))
      .min(8, String(content.error.passwordMin)),
    confirmPassword: Yup.string()
      .required(String(content.error.confirmPasswordRequired))
      .oneOf(
        [Yup.ref('password'),null],
        String(content.error.confirmPasswordNotMatch),
      ),
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
      const content = httpError.getSignUpError(res);
      const message = locale ==='vi'? content.vi: content.en; 
      setRegisterError(message);
    } else router.push('/', '/', { locale: locale });
  };

  const googleSignUp = async () => {
    const res: any = await googleAuth.googleLogin();
  };

  const facebookSignUp = async () => {
    const res: any = await facebookAuth.facebookLogin();
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
            {content.signUp}
          </Typography>
          <Typography
            variant="body1"
            align="center"
            color={colorScheme.red500}
            sx={{ display: 'static', height: '1.2rem' }}
          >
            {registerError}
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
                label={content.email}
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
                  label={content.password}
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
                  label={content.confirmPassword}
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
                {content.signUp}
              </Button>
            </Box>
            <Typography
              variant="body1"
              align="center"
              color={colorScheme.red500}
            >
              {content.or}
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
              {content.googleSignUp}{' '}
            </Button>
            <Button
              variant="contained"
              sx={{ bg: colorScheme.facebook, mt: 1 }}
              startIcon={<FacebookIcon />}
              onClick={facebookSignUp}
            >
              {content.facebookSignUp}{' '}
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
});
