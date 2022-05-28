import React, { useEffect, useState } from 'react';
import Link from 'next/link';
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
import { userService } from 'services';
import { authStore, userStore, rootStore } from 'shared/store';
import { httpError, previousPath } from 'shared/helpers';
import { colorScheme } from 'utils/color-scheme';

type FormValues = {
  email: string;
  password: string;
};

interface IProps {
  content: any;
}

export const LoginForm = observer(({ content }: IProps) => {
  const { locale } = useRouter();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loginError, setLoginError] = useState<string>('');
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required(String(content.error.emailRequired))
      .email(String(content.error.invalidEmail)),
    password: Yup.string()
      .required(String(content.error.passwordRequired))
      .min(8, String(content.error.passwordMin)),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, reset, handleSubmit, formState, getValues, setError } =
    useForm<FormValues>(formOptions);
  const { errors } = formState;

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
  }, [
    router,
    previousPath,
    authStore.isAuthenticating,
    userStore.user,
    locale,
  ]);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    //temporarily use startLoading here
    const res = await authStore.ManualSignIn({
      email: getValues('email'),
      password: getValues('password'),
    });
    if (res.isError) {
      const content = res.message;
      const message = locale === 'vi' ? content.vi : content.en;
      setLoginError(message);
    }
  };

  const googleSignIn = async () => {
    const res: any = await userService.googleAuthentication();
  };

  const facebookSignIn = async () => {
    const res: any = await userService.facebookAuthentication();
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
            {content.signIn}
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
                label={content.email}
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
                  label={content.password}
                  aria-describedby="password-error-text"
                />
                <FormHelperText id="password-error-text">
                  {errors.password?.message}
                </FormHelperText>
              </FormControl>
              <Link href="/reset-password" locale={locale}>
                <a style={{ marginLeft: '1rem' }} color={colorScheme.theme}>
                  {content.forgotPassword}
                </a>
              </Link>
              <br />
              <Button
                type="submit"
                variant="contained"
                sx={{ bg: colorScheme.theme }}
              >
                {content.signIn}
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
              onClick={googleSignIn}
              startIcon={<GoogleIcon />}
            >
              {content.googleSignIn}
            </Button>
            <Button
              variant="contained"
              sx={{ bg: colorScheme.facebook, my: 1 }}
              onClick={facebookSignIn}
              startIcon={<FacebookIcon />}
            >
              {content.facebookSignIn}{' '}
            </Button>
            <p style={{ marginLeft: '1rem' }}>
              {content.noAccount}{' '}
              <Link href="/sign-up" locale={locale}>
                <a color={colorScheme.theme}>{content.register}</a>
              </Link>
            </p>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
});
