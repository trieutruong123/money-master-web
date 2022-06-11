import { yupResolver } from '@hookform/resolvers/yup';
import {
    Box,
    TextField,
    FormControl,
    MenuItem,
    Select,
    Button,
    InputLabel,
    useTheme,
    Grid,
    useMediaQuery,
    Typography,
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AssetTypeName, TransactionRequestType } from 'shared/constants';
import { getSupportedCurrencyList } from 'shared/helpers';
import { bankSavingsDetailStore } from 'shared/store';
import { colorScheme } from 'utils';
import * as Yup from 'yup';

interface IProps {
    handleFormSubmit: Function;
}

type FormValues = {
    amount: number;
    currencyCode: string;
    fee: number;
    tax: number;
};

const BSWithdrawToOutside = observer(({ handleFormSubmit }: IProps) => {
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down('sm'));
    const validationSchema = Yup.object().shape({
        amount: Yup.number(),
        currencyCode: Yup.string().required().default('USD'),
        tax: Yup.number(),
        fee: Yup.number(),
    });

    const formOptions = { resolver: yupResolver(validationSchema) };
    const { register, reset, handleSubmit, formState, getValues, setError } =
        useForm<FormValues>(formOptions);
    const { errors } = formState;
    const currencyList = getSupportedCurrencyList();

    const onSubmit: SubmitHandler<FormValues> = (data: any) => {
        const res = handleFormSubmit({
            amount: bankSavingsDetailStore.assetDetail?.inputMoneyAmount,
            amountInDestinationAssetUnit: 0,
            currencyCode: bankSavingsDetailStore.assetDetail?.inputCurrency || 'USD',
            transactionType: TransactionRequestType.withdrawToOutside,
            destinationAssetId: null,
            destinationAssetType: null,
            referentialAssetId: bankSavingsDetailStore.assetDetail?.id,
            referentialAssetType: AssetTypeName.bankSaving,
            isTransferringAll: true,
            isUsingFundAsSource: false,
            fee: 0,
            tax: 0,
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
            <Typography color='primary'>* All money from asset will be withdrawn</Typography>

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
                value={bankSavingsDetailStore.assetDetail?.inputMoneyAmount}
                error={typeof errors.amount?.message !== 'undefined'}
                helperText={errors.amount?.message}
            ></TextField>
            <Box mt='10px'></Box>

            <FormControl fullWidth>
                <InputLabel id="currency-list">{'Currency Code'}</InputLabel>
                <Select
                    variant="outlined"
                    labelId="currency-list"
                    id="cash-currency-list-select"
                    label={`${'Currency Code'}*`}
                    value={bankSavingsDetailStore.assetDetail?.inputCurrency.toUpperCase()}
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
                WITHDRAW
            </Button>
        </Box>
    );
});

export default BSWithdrawToOutside;