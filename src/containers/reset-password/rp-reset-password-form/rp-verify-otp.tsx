import { Card, Typography, CardContent, Box, TextField, Button } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { colorScheme } from 'utils/color-scheme';
import { accountStore, rootStore } from 'shared/store';
import {content as i18n} from 'i18n';
import { SubmitHandler, useForm } from 'react-hook-form';
import { RPFormContants } from 'shared/constants';

type FormValues = {
    otpCode: number;
  };
  

const RPVerifyOTP = observer(() => {

    const [errorMessage, setErrorMessage] = useState<string>('');
    const content = i18n[rootStore.locale].resetPassword;
  
    const validationSchema = Yup.object().shape({
        otpCode: Yup.number()
        .required(String(content.error.otpCodeRequired))
        .min(100000,String(content.error.OTPCodeMustBeExact6Digits))
        .max(999999,String(content.error.OTPCodeMustBeExact6Digits)),
    });
    const formOptions = { resolver: yupResolver(validationSchema) };
    const { register, reset, handleSubmit, formState, getValues, setError } =
      useForm<FormValues>(formOptions);
    const { errors } = formState;
  
    const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
      const res = await accountStore.verifyOTPCode({
        otpCode: data.otpCode,
        email:accountStore.email,
      });
      if (res.isError) {
        setErrorMessage(res.data.data);
      } else {
        accountStore.setNextForm(RPFormContants.resetPassword);
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
            {content.enterOTPCode}
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
                <TextField
                    fullWidth
                    sx={{ my: 1, display: 'block' }}
                    id="outlined-email-address"
                    label={content.OTPVerification}
                    {...register('otpCode')}
                    variant="outlined"
                    type = 'number'
                    error={typeof errors.otpCode?.message !== 'undefined'}
                    helperText={errors.otpCode?.message}
                ></TextField>

            </Box>
            <Button
                variant="contained"
                sx={{
                    bgcolor: colorScheme.blue400,
                    mt: 1,
                    '&:hover': {
                        bgcolor: colorScheme.blue400,
                    },
                }}
            >
                {content.verify}
            </Button>
        </CardContent>
    </Card></>
})

export default RPVerifyOTP;