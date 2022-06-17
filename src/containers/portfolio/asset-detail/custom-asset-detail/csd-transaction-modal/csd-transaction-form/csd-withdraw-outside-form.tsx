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
import { customAssetsDetailStore, stockDetailStore } from 'shared/store';
import { colorScheme } from 'utils';
import * as Yup from 'yup';

interface IProps {
    handleFormSubmit: Function;
    content: any,
}
type FormValues = {
    amount: number;
    currencyCode: string;
    fee: number;
    tax: number;
};

const CSDWithdrawToOutside = observer(({ handleFormSubmit, content }: IProps) => {
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down('sm'));
    const validationSchema = Yup.object().shape({
        amount: Yup.number()
            .required('Amount is required')
            .typeError('Amount must be a number')
            .positive('Amount must be greater than zero'),
        currencyCode: Yup.string().required().default('USD'),
        tax: Yup.number()
            .positive('Tax must be greater than zero')
            .typeError('Tax must be a number'),
        fee: Yup.number()
            .typeError('Fee must be a number')
            .positive('Fee must be greater than zero'),
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
            currencyCode: customAssetsDetailStore.customAssetDetail?.inputCurrency || 'USD',
            transactionType: TransactionRequestType.withdrawToOutside,
            destinationAssetId: null,
            destinationAssetType: null,
            referentialAssetId: customAssetsDetailStore.customAssetDetail?.id,
            referentialAssetType: AssetTypeName.custom,
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
            <Typography color='primary'>*  {content.transactionForm.allMoneyFromAssetWillBeWithdrawn}</Typography>

            <TextField
                type="number"
                fullWidth
                inputProps={{
                    step: 'any',
                    readOnly: true,
                }}
                sx={{ mt: 1, display: 'block' }}
                id="outlined-cash-amount"
                label={`${content.transactionForm.amount}*`}
                variant="outlined"
                value={customAssetsDetailStore.customAssetDetail?.inputMoneyAmount}
                error={typeof errors.amount?.message !== 'undefined'}
                helperText={errors.amount?.message}
            ></TextField>
            <Box mt='10px'></Box>

            <FormControl fullWidth>
                <InputLabel id="currency-list">{content.transactionForm.currency}*</InputLabel>
                <Select
                    variant="outlined"
                    labelId="currency-list"
                    id="cash-currency-list-select"
                    label={`${content.transactionForm.currency}*`}
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
                {content.transactionForm.withdrawButton}
            </Button>
        </Box>
    );
});

export default CSDWithdrawToOutside;