import { Box, Button, Card, CardContent, CardHeader, Divider, FormControl, InputLabel, OutlinedInput, Typography, FormHelperText } from "@mui/material";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useRouter } from "next/router";
import { content as i18n } from 'i18n';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useCallback, useEffect, useState } from "react";
import { rootStore, userStore } from "shared/store";
import { httpError } from "shared/helpers";

interface IProps {
}


type FormValues = {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
};


const APResetPassword = ({ }: IProps) => {
    const [errorMessage, setErrorMessage] = useState<string>('');
    const router = useRouter();
    const { locale } = router;

    const content = locale === 'vi' ? i18n['vi'].profilePage.resetPassword : i18n['en'].profilePage.resetPassword;

    const validationSchema = Yup.object().shape({
        oldPassword: Yup.string()
            .required(String(content.passwordRequired))
            .min(8, String(content.passwordMin)),
        newPassword: Yup.string()
            .required(String(content.newPasswordRequired))
            .min(8, String(content.newPasswordMin))
            .notOneOf(
                [Yup.ref('oldPassword'), null],
                String(content.oldNewPasswordMustBeDifferent),
            ),
        confirmPassword: Yup.string()
            .required(String(content.confirmPasswordRequired))
            .oneOf(
                [Yup.ref('newPassword'), null],
                String(content.confirmPasswordNotMatch),
            ),
    });
    const formOptions = { resolver: yupResolver(validationSchema) };
    const { register, reset, handleSubmit, formState, getValues, setError } =
        useForm<FormValues>(formOptions);
    const { errors } = formState;

    const onSubmit: SubmitHandler<FormValues> = useCallback(async (data: any) => {
        const res = await userStore.updatePassword({
            oldPassword: data.oldPassword,
            newPassword: data.newPassword,
        });
        if (res && res.isError) {
            console.log(res);
            console.log(httpError.getResetPasswordError(res)[rootStore.locale]);
            setErrorMessage(httpError.getResetPasswordError(res)[rootStore.locale]);
        }
    }, []);

    return <Box
        id="edit-profile-form"
        component="form"
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
    >
        <Card>
            <CardHeader title={content.title} />
            <Divider />
            <CardContent>
                <Typography variant="body1"
                    color="error"
                    width="100%"
                    align="center"
                    height="1.5rem">
                    {errorMessage}
                </Typography>
                <FormControl
                    error={typeof errors.oldPassword?.message !== 'undefined'}
                    sx={{ mt: 1, display: 'block' }}
                    variant="outlined"
                >
                    <InputLabel htmlFor="outlined-adornment-password">
                        {content.oldPassword}
                    </InputLabel>
                    <OutlinedInput
                        fullWidth
                        id="outlined-adornment-password"
                        type={'password'}
                        {...register('oldPassword')}
                        label={content.oldPassword}
                        aria-describedby="password-error-text"
                        autoComplete="off"
                    />
                    <FormHelperText id="password-error-text">
                        {errors.oldPassword?.message}
                    </FormHelperText>
                </FormControl>
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
                    {content.update}
                </Button>
            </Box>
        </Card>
    </Box>;
}

export default APResetPassword;