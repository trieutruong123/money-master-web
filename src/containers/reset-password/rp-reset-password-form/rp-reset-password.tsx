import { Card, Typography, CardContent, Box, InputLabel,OutlinedInput,FormHelperText, FormControl, Button } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { observer } from 'mobx-react-lite';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';import { useState } from 'react';
import { colorScheme } from 'utils/color-scheme';
import { httpService } from 'services';
import { accountStore, rootStore } from 'shared/store';
import {content as i18n} from 'i18n';
import { useRouter } from 'next/router';

type FormValues = {
    confirmPassword: string;
    newPassword: string;
  };

const RPResetPasswordForm = observer(() => {
    const [errorMessage, setErrorMessage] = useState<string>('');
    const content = i18n[rootStore.locale].resetPassword;
    const router = useRouter();
    
    const validationSchema = Yup.object().shape({
        newPassword: Yup.string()
        .required(String(content.error.passwordRequired))
        .min(8, String(content.error.passwordMin)),
        confirmPassword: Yup.string()
            .required(String(content.error.passwordRequired))
            .oneOf(
                [Yup.ref('newPassword'), null],
                String(content.error.confirmPasswordNotMatch),
            ),
    });
    const formOptions = { resolver: yupResolver(validationSchema) };
    const { register, reset, handleSubmit, formState, getValues, setError } =
      useForm<FormValues>(formOptions);
    const { errors } = formState;
  
    const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
      const res = await accountStore.resetNewPassword({
        newPassword: data.newPassword,
        email: accountStore.email
      });
      if (res.isError) {
        setErrorMessage(res.data.data);
      } else {
        rootStore.raiseNotification(content.success.resetPassword,'success');
        router.push('/sign-in');
      }
    };

    return <>
        <Card sx={{ my: 5, mx: 1 }}>
            <Typography
                sx={{
                    pt: 2,
                    fontSize: '2rem',
                }}
                align="center"
            >
                Reset Password
            </Typography>
            <Typography
                variant="body1"
                align="center"
                sx={{ display: 'static', height: '1.2rem' }}
                color={colorScheme.red500}
            >
                {errorMessage}
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
                                    <FormControl
                    error={typeof errors.newPassword?.message !== 'undefined'}
                    sx={{ mt: 1, display: 'block' }}
                    variant="outlined"
                >
                    <InputLabel htmlFor="outlined-adornment-password">
                        {content.newPassword}
                    </InputLabel>
                    <OutlinedInput
                        fullWidth
                        id="outlined-adornment-password"
                        type={'password'}
                        {...register('newPassword')}
                        label={content.newPassword}
                        aria-describedby="password-error-text"
                    />
                    <FormHelperText id="password-error-text">
                        {errors.newPassword?.message}
                    </FormHelperText>
                </FormControl>
                <FormControl
                    error={typeof errors.confirmPassword?.message !== 'undefined'}
                    sx={{ mt: 1, display: 'block' }}
                    variant="outlined"
                >
                    <InputLabel htmlFor="outlined-adornment-password">
                        {content.confirmPassword}
                    </InputLabel>
                    <OutlinedInput
                        fullWidth
                        id="outlined-adornment-password"
                        type={'password'}
                        {...register('confirmPassword')}
                        label={content.confirmPassword}
                        aria-describedby="password-error-text"
                    />
                    <FormHelperText id="password-error-text">
                        {errors.confirmPassword?.message}
                    </FormHelperText>
                </FormControl>

                </Box>
                <Button
                type = 'submit'
                    variant="contained"
                    sx={{
                        bgcolor: colorScheme.blue400,
                        mt: 1,
                        '&:hover': {
                            bgcolor: colorScheme.blue400,
                        },
                    }}
                >
                    {content.resetPassword}
                </Button>
            </CardContent>
        </Card></>
});

export default RPResetPasswordForm;