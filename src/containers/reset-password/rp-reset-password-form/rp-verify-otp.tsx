import {
  Card,
  Typography,
  CardContent,
  Box,
  TextField,
  Button,
  CircularProgress,
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { colorScheme } from 'utils/color-scheme';
import { accountStore, rootStore } from 'shared/store';
import { content as i18n } from 'i18n';
import { SubmitHandler, useForm } from 'react-hook-form';
import { RPFormContants } from 'shared/constants';
import { useCountdownTimer } from 'shared/hooks';
import { convertMilisecondsToString } from 'utils/time';

type FormValues = {
  otpCode: number;
};

interface IProps{
  openNextForm:Function;
}

const RPVerifyOTP = observer(({openNextForm}:IProps) => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const content = i18n[rootStore.locale].resetPassword;
  const {
    countdown,
    isRunning,
    startCountDown,
    resetCountDown,
    pauseCountDown,
  } = useCountdownTimer(300000, 1000);

  useEffect(() => {
    startCountDown();
  }, []);

  const validationSchema = Yup.object().shape({
    otpCode: Yup.number()
      .required(String(content.error.otpCodeRequired))
      .min(100000, String(content.error.OTPCodeMustBeExact6Digits))
      .max(999999, String(content.error.OTPCodeMustBeExact6Digits)),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, reset, handleSubmit, formState, getValues, setError } =
    useForm<FormValues>(formOptions);
  const { errors } = formState;

  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    const res = await accountStore.verifyOTPCode({
      otpCode: data.otpCode.toString(),
      email: accountStore.email,
    });
    if (res.isError) {
      setErrorMessage(content.error.invalidOTPCode);
    } else {
      accountStore.setNextForm(RPFormContants.resetPassword);
      openNextForm(RPFormContants.resetPassword);
    }
  };

  return (
    <>
      <Card sx={{ my: 5, mx: 1, width: 'inherit' }}>
        <Typography
          sx={{
            pt: 2,
            fontSize: '2rem',
          }}
          align="center"
        >
          {content.enterOTPCode}
        </Typography>
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Typography
            variant="body1"
            align="center"
            sx={{ display: 'static', height: '1rem' }}
            color={colorScheme.red500}
          >
            {errorMessage}
          </Typography>
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
              type="number"
              error={typeof errors.otpCode?.message !== 'undefined'}
              helperText={errors.otpCode?.message}
            ></TextField>
            <Typography
              style={{
                color: isRunning ? colorScheme.gray600 : colorScheme.red500,
              }}
            >
              {isRunning
                ? `${content.OTPCodeExpiredAfter}${convertMilisecondsToString(countdown)}`
                : `${content.OTPCodeExpired}`}
            </Typography>
            <br/>

            <Button
              type="submit"
              variant="contained"
              sx={{ bg: colorScheme.theme, textTransform: 'uppercase' }}
            >
              {content.verify}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </>
  );
});

export default RPVerifyOTP;
