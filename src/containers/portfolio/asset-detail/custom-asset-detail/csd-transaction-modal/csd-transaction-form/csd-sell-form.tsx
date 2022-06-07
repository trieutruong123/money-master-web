import { yupResolver } from '@hookform/resolvers/yup';
import {
    Box,
    Button,
    TextField,
    FormControl,
    Select,
    MenuItem,
    InputLabel,
    useTheme,
    Grid,
    useMediaQuery,
    Typography,
} from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { colorScheme } from 'utils/color-scheme';
import { TransactionRequestType, AssetTypeName } from 'shared/constants';
import { customAssetsDetailStore, stockDetailStore } from 'shared/store';
import { getSupportedCurrencyList } from 'shared/helpers';
import { CashItem } from 'shared/models';
import { observer } from 'mobx-react-lite';

type FormValues = {
    amount: number;
    currencyCode: string;
    destinationCurrencyCode: string;
    fee: number;
    tax: number;
};

interface IProps {
    handleFormSubmit: Function;
}



export const CSDSellForm = observer(({ handleFormSubmit }: IProps) => {
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down('sm'));
    const validationSchema = Yup.object().shape({
        amount: Yup.number(),
        currencyCode: Yup.string().required().default('USD'),
        destinationCurrencyCode: Yup.string().required(''),
        fee: Yup.number(),
        tax: Yup.number(),
    });

    const formOptions = { resolver: yupResolver(validationSchema) };
    const { register, reset, handleSubmit, formState, getValues, setError } =
        useForm<FormValues>(formOptions);
    const { errors } = formState;
    const currencyList = getSupportedCurrencyList();

    const onSubmit: SubmitHandler<FormValues> = (data: any) => {
        const res = handleFormSubmit({
            amount: customAssetsDetailStore.customAssetDetail?.inputMoneyAmount,
            amountInDestinationAssetUnit: 0,
            currencyCode: data.currencyCode || 'USD',
            transactionType: TransactionRequestType.withdrawToCash,
            destinationAssetId: customAssetsDetailStore.cashDetail?.find(item => item.currencyCode === data.destinationCurrencyCode)?.id,
            destinationAssetType: AssetTypeName.cash,
            referentialAssetId: customAssetsDetailStore.customAssetDetail?.id,
            referentialAssetType: AssetTypeName.custom,
            isTransferringAll: false,
            isUsingFundAsSource: false,
            fee: data.fee,
            tax: data.tax,
        });
    };

    return (
        <Box
            component="form"
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
                height: 'inherit',
                justifyContent: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch',
                mx: '3rem',
                [theme.breakpoints.down('xs')]: {
                    mx: '2rem',
                },
            }}
        >
            <Typography color='primary'>* All money from asset will be sold</Typography>
            <TextField
                type="number"
                fullWidth
                inputProps={{
                    step: 'any',
                    readOnly: true,
                }}
                sx={{ mt: 1, display: 'block' }}
                id="outlined-cash-amount"
                label={`${'Amount'}*`}
                variant="outlined"
                value={customAssetsDetailStore.customAssetDetail?.inputMoneyAmount}
                error={typeof errors.amount?.message !== 'undefined'}
                helperText={errors.amount?.message}
            ></TextField>
            <Box mt='10px'></Box>
            <FormControl fullWidth>
                <InputLabel id="currency-list">{'Currency Code*'}</InputLabel>
                <Select
                    variant="outlined"
                    labelId="currency-list"
                    id="cash-currency-list-select"
                    label={`${'Currency Code'}*`}
                    value={customAssetsDetailStore.customAssetDetail?.inputCurrency.toUpperCase()}
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
            <Box mt='10px'></Box>
            <FormControl fullWidth>
                <InputLabel id="destination-cash">{'Destination cash*'}</InputLabel>
                <Select
                    variant="outlined"
                    labelId="destination-cash"
                    id="crypto-destination-cash-select"
                    label={`${'Select destination cash'}*`}
                    {...register('destinationCurrencyCode')}
                    defaultValue={customAssetsDetailStore.cashDetail?.at(0)?.currencyCode || 'USD'}
                    required
                >
                    {customAssetsDetailStore.currencyList?.map((item, index) => {
                        return (
                            <MenuItem key={item.code} value={item.code}>
                                {item.code} - {item.name}
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
            <Grid container spacing={isXs ? 1 : 2}>
                <Grid item xs={12} sm={6} sx={{ display: 'block' }}>
                    <TextField
                        type="number"
                        fullWidth
                        inputProps={{
                            step: 'any'
                        }}
                        sx={{ mt: '10px', display: 'block' }}
                        id="outlined-fee"
                        label={`${"Fee"}`}
                        {...register('fee')}
                        variant="outlined"
                        defaultValue={0}
                        error={typeof errors.fee?.message !== 'undefined'}
                        helperText={errors.fee?.message} />
                </Grid>
                <Grid item xs={12} sm={6} sx={{ display: 'block' }}>
                    <TextField
                        type="number"
                        fullWidth
                        inputProps={{
                            step: 'any'
                        }}
                        sx={{ mt: '10px', display: 'block' }}
                        id="outlined-tax"
                        label={`${"Tax (%)"}`}
                        {...register('tax')}
                        variant="outlined"
                        defaultValue={0}
                        error={typeof errors.tax?.message !== 'undefined'}
                        helperText={errors.tax?.message} />
                </Grid>
            </Grid>
            <Button
                type="submit"
                variant="contained"
                sx={{
                    mt: 'auto',
                    bg: colorScheme.theme,
                    width: '100%',
                    fontSize: '1.4rem',
                    height: '2.5rem',
                }}
            >
                SELL
            </Button>
        </Box>
    );
});

export default CSDSellForm;