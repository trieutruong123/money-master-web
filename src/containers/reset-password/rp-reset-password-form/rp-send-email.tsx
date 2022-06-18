import { Card, Typography, CardContent, Box, TextField, FormControl, Button } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { colorScheme } from 'utils/color-scheme';
const RPSendEmail = observer(() => {
    const [errorMessage, setErrorMessage] = useState<string>('');


    return <>
        <Card sx={{ my: 5, mx: 1 }}>
            <Typography
                sx={{
                    pt: 2,
                    fontSize: '2rem',
                }}
                align="center"
            >
                Send email
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
                        label={content.email}
                        {...register('email')}
                        variant="outlined"
                        error={typeof errors.email?.message !== 'undefined'}
                        helperText={errors.email?.message}
                    ></TextField>

                </Box>
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
            </CardContent>
        </Card></>
})

export default RPSendEmail;