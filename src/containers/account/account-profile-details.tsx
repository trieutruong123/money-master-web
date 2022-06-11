import { useCallback, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  TextField,
  MenuItem,
  Select
} from '@mui/material';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { rootStore, userStore } from 'shared/store';
import { observer } from 'mobx-react-lite';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { DesktopDatePicker, LocalizationProvider } from '@mui/lab';
import { useRouter } from 'next/router';
import { content } from 'i18n';

interface IProps {
  translatedContent: any,
}

type FormValues = {
  firstName: string,
  lastName: string,
  email: string,
  gender?: string,
};

export const AccountProfileDetails = observer(({ translatedContent }: IProps) => {
  const router = useRouter();
  const { locale } = router;
  const [date, setDate] = useState<Date | null>(new Date());
  const user = userStore.user;
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('Firtname is required'),
    lastName: Yup.string().required('Last name is required'),
    gender: Yup.string(),
    email: Yup.string().required(''),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState } =
    useForm<FormValues>(formOptions);
  const { errors } = formState;


  const genders = [{ id: 'male', content: 'Male' }, { id: 'female', content: 'Female' }]
  console.log(translatedContent);
  const { header, body, footer } = translatedContent;

  const onSubmit: SubmitHandler<FormValues> = useCallback(async (data: any) => {
    const payload = {
      email: user?.email || '',
      firstName: data.firstName,
      lastName: data.lastName,
      gender: data.gender,
      birthday: date,
    }
    const res = await userStore.updateUserInfo(payload);

    if (res && !res.isError) {
      rootStore.raiseNotification(
        content[rootStore.locale].success.update,
        "success"
      );
    }
    else {
      rootStore.raiseError(
        content[rootStore.locale].error.failedToLoadInitialData
      );
    }
  }, []);

  const handleDateChange = (newValue: Date | null) => {
    setDate(newValue);
  };

  return (
    <Box
      id="edit-profile-form"
      component="form"
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Card>
        <CardHeader subheader={header.content} title={header.title} />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                id="outlined-email"
                variant="outlined"
                type="text"
                label={'Email*'}
                InputProps={{
                  readOnly: true,
                }}
                defaultValue={user?.email}
                value={user?.email}
                {...register('email')}
                error={typeof errors.email?.message !== 'undefined'}
                helperText={errors.email?.message}
                fullWidth
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                id="outlined-name"
                variant="outlined"
                type="text"
                label={'Last name*'}
                defaultValue={user?.lastName}
                {...register('lastName')}
                error={typeof errors.lastName?.message !== 'undefined'}
                helperText={errors.lastName?.message}
                fullWidth
              ></TextField>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                id="outlined-name"
                variant="outlined"
                type="text"
                label={'First name*'}
                defaultValue={user?.firstName}
                {...register('firstName')}
                error={typeof errors.firstName?.message !== 'undefined'}
                helperText={errors.firstName?.message}
                fullWidth
              ></TextField>
            </Grid>

            <Grid item sm={6} xs={12} >
              <FormControl fullWidth>
                <InputLabel id="gender">*Gender</InputLabel>
                <Select
                  id="gender-select"
                  labelId="gender"
                  label="*Gender"
                  defaultValue={
                    user?.gender || ''
                  }
                  variant="outlined"
                  {...register('gender')}
                >
                  {genders.map((item, index) => {
                    return (
                      <MenuItem key={item.id} value={item.id}>
                        {item.content}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item sm={6} xs={12}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="Birthday"
                  inputFormat="dd/MM/yyyy"
                  value={date}
                  onChange={handleDateChange}
                  renderInput={(params) => (
                    <TextField sx={{ width: '100%' }} {...params} />
                  )}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2,
            width: '100%'
          }}
        >
          <Button color="primary" variant="contained" type='submit'>
            {footer.saveDetails}
          </Button>
        </Box>
      </Card>
    </Box>
  );
});
