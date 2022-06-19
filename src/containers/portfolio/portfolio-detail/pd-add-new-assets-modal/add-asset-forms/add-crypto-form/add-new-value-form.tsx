import { yupResolver } from '@hookform/resolvers/yup';
import {
    Box,
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    useTheme,
    useMediaQuery,
} from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { getCurrencyByCode, getSupportedCurrencyList } from 'shared/helpers';
import { observer } from 'mobx-react-lite';
import { portfolioDetailStore } from 'shared/store';
import { AssetTypeName, TransactionRequestType, UsingMoneySource } from 'shared/constants';
import { CryptoItem } from 'shared/models';

type FormValues = {
    amount: number;
    purchasePrice: number;
    currencyCode: string;
    cashId?: number;
    fee?: number;
    tax?: number;
};

interface IProps {
    handleFormSubmit: any;
    content: any;
}

export const AddMoreValueForm = observer(({
    content,
    handleFormSubmit,
}: IProps) => {
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down('sm'));
    const cashList = portfolioDetailStore.cashDetail;
    const validationSchema = Yup.object().shape({
        purchasePrice: Yup.number()
            .required(' Purchase price is required')
            .typeError('Purchase price must be a number')
            .positive('Purchase price must be greater than zero'),
        amount: Yup.number()
            .required('Amount is required')
            .typeError('Amount must be a number')
            .positive('Amount must be greater than zero'),
        currencyCode: Yup.string().required().default('USD'),
        cashId: Yup.number().required(),
        tax: Yup.number()
            .typeError('Tax must be a number')
            .positive('Tax must be greater than zero'),
        fee: Yup.number()
            .typeError('Fee must be a number')
            .positive('Fee must be greater than zero'),
    });
    const currencyList = getSupportedCurrencyList();

    const formOptions = { resolver: yupResolver(validationSchema) };
    const { register, reset, handleSubmit, formState, getValues, setError } =
        useForm<FormValues>(formOptions);
    const { errors } = formState;

    const onSubmit: SubmitHandler<FormValues> = (data: any) => {
        const selectedCrypto = portfolioDetailStore?.selectedAsset?.cryptoCoinCode;
        const cryptoItem = portfolioDetailStore.cryptoDetail?.find((item: CryptoItem) => {
            if (item.cryptoCoinCode === selectedCrypto) {
                return true;
            }
        })
        const moneySource = portfolioDetailStore?.selectedAsset?.moneySource;
        handleFormSubmit({
            amount: data.purchasePrice * data.amount,
            amountInDestinationAssetUnit: data.amount,
            currencyCode: data.currencyCode || 'USD',
            transactionType: TransactionRequestType.addValue,
            destinationAssetId: cryptoItem?.id,
            destinationAssetType: AssetTypeName.cryptoCurrency,
            referentialAssetId: moneySource === UsingMoneySource.usingCash ? data.cashId : null,
            referentialAssetType: moneySource === UsingMoneySource.usingCash ? AssetTypeName.cash : (moneySource === UsingMoneySource.usingFund ? 'fund' : null),
            isTransferringAll: false,
            isUsingFundAsSource: moneySource === UsingMoneySource.usingFund,
            fee: data.fee,
            tax: data.tax,
        });
    };



    return (
        <Box
            sx={{
                height: 'inherit',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch',
            }}
        >
            <Box
                id="buy-crypto-form"
                component="form"
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
                sx={{
                    width: '100%',
                    overflow: 'auto',
                    display: 'flex',
                    alignItems: 'stretch',
                    flexDirection: 'column',
                    px: '3rem',
                    [theme.breakpoints.down('xs')]: {
                        px: '2rem',
                    },
                }}
            >
                <TextField
                    type="number"
                    fullWidth
                    sx={{ mt: 1, display: 'block' }}
                    id="outlined-crypto-purchase-price"
                    inputProps={{ step: 'any' }}
                    label={`${content.purchasePrice}*`}
                    {...register('purchasePrice')}
                    variant="outlined"
                    error={typeof errors.purchasePrice?.message !== 'undefined'}
                    helperText={errors.purchasePrice?.message}
                ></TextField>
                <TextField
                    type="number"
                    fullWidth
                    sx={{ mt: 1, display: 'block' }}
                    inputProps={{ step: 'any' }}
                    id="outlined-crypto-current-amount-holding"
                    label={`${content.amount}*`}
                    {...register('amount')}
                    variant="outlined"
                    error={typeof errors.amount?.message !== 'undefined'}
                    helperText={errors.amount?.message}
                ></TextField>
                <Box mt='10px' />
                <FormControl fullWidth>
                    <InputLabel id="currency-list">{content.currency}*</InputLabel>
                    <Select
                        variant="outlined"
                        labelId="currency-list"
                        id="crypto-currency-list-select"
                        label={`${content.currency}*`}
                        defaultValue="USD"
                        {...register('currencyCode')}
                        required
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
                {
                    portfolioDetailStore.selectedAsset?.moneySource === UsingMoneySource.usingCash && cashList !== undefined && cashList.length > 0 ? (
                        <Grid item xs={12} sx={{ mt: 1, display: 'block' }}>
                            <FormControl fullWidth>
                                <InputLabel id="select-cash-source">{content.selectCashSource}*</InputLabel>
                                <Select
                                    variant="outlined"
                                    labelId="your-cash"
                                    id="bank-savings-your-cash-select"
                                    label={`${content.selectCashSource}*`}
                                    defaultValue={cashList[0].id}
                                    {...register('cashId')}
                                    required
                                >
                                    {cashList.map((item, index) => {
                                        return (
                                            <MenuItem key={item.id} value={item.id}>
                                                {item.currencyCode} - {getCurrencyByCode(item.currencyCode)?.name}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                    ) : null
                }

                <Grid container spacing={isXs ? 1 : 2}>
                    <Grid item xs={12} sm={6} sx={{ display: 'block' }}>
                        <TextField
                            type="number"
                            fullWidth
                            inputProps={{
                                step: 'any'
                            }}
                            sx={{ mt: 1, display: 'block' }}
                            id="outlined-bank-savings-fee"
                            label={`${content.fee}`}
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
                            sx={{ mt: 1, display: 'block' }}
                            id="outlined-bank-savings-tax"
                            label={`${content.tax} (%)`}
                            {...register('tax')}
                            variant="outlined"
                            defaultValue={0}
                            error={typeof errors.tax?.message !== 'undefined'}
                            helperText={errors.tax?.message} />
                    </Grid>
                </Grid>
            </Box>

            <Box
                sx={{
                    mt: 'auto',
                    px: '3rem',
                    [theme.breakpoints.down('xs')]: {
                        px: '2rem',
                    },
                    width: '100%',
                }}
            >
                <Button
                    type="submit"
                    form="buy-crypto-form"
                    variant="contained"
                    sx={{
                        bg: 'appColor.theme',
                        width: '100%',
                        fontSize: '1.4rem',
                        height: '2.5rem',
                    }}
                >
                    {
                        'Add'
                    }
                </Button>
            </Box>
        </Box>
    );
});
