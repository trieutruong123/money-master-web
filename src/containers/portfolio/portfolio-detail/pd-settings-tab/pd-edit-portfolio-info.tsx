
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Card, CardHeader, CardContent, Box, Grid, Select, MenuItem, FormControl, InputLabel, TextField, useMediaQuery, useTheme, Button } from "@mui/material";
import { useCallback } from 'react';
import { getSupportedCurrencyList } from 'shared/helpers';
import { portfolioDetailStore, rootStore } from 'shared/store';
import SaveIcon from '@mui/icons-material/Save';
import { content } from 'i18n';
import { DataArray } from '@mui/icons-material';

interface IProps {
}

type FormValues = {
    name: string;
    currencyCode: string;
};

const PDEditPortfolioInfo = ({ }: IProps) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        currencyCode: Yup.string(),
    });
    const formOptions = { resolver: yupResolver(validationSchema) };
    const { register, handleSubmit, formState } =
        useForm<FormValues>(formOptions);
    const { errors } = formState;

    const currencyList = getSupportedCurrencyList();
    const portfolioDetail = portfolioDetailStore.portfolioInfo
    const onSubmit: SubmitHandler<FormValues> = useCallback(async (data: any) => {
        if (data.name === portfolioDetail?.name && data.currencyCode === portfolioDetail?.initialCurrency) {
            return;
        }
        const res: { isError: boolean; data: any } = await portfolioDetailStore.editPortfolioInfo({ newName: data.name, newCurrency: data.currencyCode });

        if (!res.isError) {
            rootStore.raiseNotification(
                content[rootStore.locale].success.update,
                "success"
            );
            portfolioDetailStore.setUpdateInvestFund(true);
            portfolioDetailStore.setUpdateReport(true);
        }
        else {
            rootStore.raiseError(
                content[rootStore.locale].error.failedToLoadInitialData
            );
        }
    }, []);

    return (portfolioDetail !== undefined ?
        (
            <Card
                sx={{
                    borderRadius: '12px',
                    padding: isMobile ? '5px 0px 0px 10px' : '5px 20px 0px 20px',
                    boxShadow: '0 0 8px rgba(0,0,0,0.11)',
                    width: '100%'
                }}
            >
                <Card
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        height: '3rem',
                        boxShadow: 'none',
                    }}
                >
                    <CardHeader title="Edit portfolio info" sx={{ padding: '0px' }} />

                </Card>
                <CardContent
                    sx={{
                        width: '100%',
                        padding: '0px',
                    }}
                >
                    <Box
                        id="edit-bank-savings-form"
                        component="form"
                        autoComplete="off"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <Grid container spacing={1}>
                            <Grid item sm={12} xs={12} mt={1}>
                                <TextField
                                    id="outlined-name"
                                    variant="outlined"
                                    type="text"
                                    label={'*Name'}
                                    defaultValue={portfolioDetail.name}
                                    {...register('name')}
                                    error={typeof errors.name?.message !== 'undefined'}
                                    helperText={errors.name?.message}
                                    fullWidth
                                ></TextField>
                            </Grid>
                            <Grid item sm={12} xs={12} mt={1}>
                                <FormControl fullWidth>
                                    <InputLabel id="currency-list">*Currency</InputLabel>
                                    <Select
                                        id="currency-list-select"
                                        labelId="currency-list"
                                        label="*Currency"
                                        defaultValue={
                                            portfolioDetail.initialCurrency.toUpperCase()
                                        }
                                        variant="outlined"
                                        {...register('currencyCode')}
                                    >
                                        {currencyList.map((item, index) => {
                                            return (
                                                <MenuItem key={item.code} value={item.code}>
                                                    {item.code} - {item.name}
                                                </MenuItem>
                                            );
                                        })}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>

                    </Box>
                    <Box sx={{ display: 'flex', width: '100%', mt: '1rem', justifyContent: 'flex-end' }}>

                        <Button
                            type="submit"
                            form="edit-bank-savings-form"
                            variant="contained"
                            sx={{
                                ml: 'auto',
                                mr: '2rem',
                                px: '1.5rem',

                                fontSize: '1rem',
                                height: '2.5rem',
                            }}
                            startIcon={<SaveIcon />}
                        >
                            Save
                        </Button>
                    </Box>
                </CardContent>
            </Card>)
        : <></>);
}

export default PDEditPortfolioInfo;