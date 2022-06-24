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
    content: any
}

type FormValues = {
    amount: number;
    currencyCode: string;
};

const CSDTransferToFundForm = observer(({ handleFormSubmit, content }: IProps) => {
    const theme = useTheme();
    const validationSchema = Yup.object().shape({
        amount: Yup.number()
            .required('Amount is required')
            .typeError('Amount must be a number')
            .positive('Amount must be greater than zero'),
        currencyCode: Yup.string().required().default('USD'),
    });

    const formOptions = { resolver: yupResolver(validationSchema) };
    const { register, reset, handleSubmit, formState, getValues, setError } =
        useForm<FormValues>(formOptions);
    const { errors } = formState;
    const currencyList = getSupportedCurrencyList();

    const onSubmit: SubmitHandler<FormValues> = (data: any) => {
        const res = handleFormSubmit({
            amount: customAssetsDetailStore.customAssetDetail?.inputMoneyAmount,
            valueOfReferentialAssetBeforeCreatingTransaction:customAssetsDetailStore.customAssetDetail?.inputMoneyAmount,
            amountInDestinationAssetUnit: customAssetsDetailStore.customAssetDetail?.inputMoneyAmount,
            currencyCode: customAssetsDetailStore.customAssetDetail?.inputCurrency.toUpperCase() || 'USD',
            transactionType: TransactionRequestType.moveToFund,
            referentialAssetType: AssetTypeName.custom,
            referentialAssetId: customAssetsDetailStore.customAssetDetail?.id,
            destinationAssetId: null,
            destinationAssetType: 'fund',
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
            <Typography color='primary'>*  {content.transactionForm.allMoneyFromAssetWillBeTransferred}</Typography>
            <TextField
                type="number"
                fullWidth
                sx={{ mt: 1, display: 'block' }}
                inputProps={{
                    step: 'any',
                    readOnly: true,
                }}
                id="outlined-amount"
                label={`${content.transactionForm.amount}*`}
                value={customAssetsDetailStore.customAssetDetail?.inputMoneyAmount}
                variant="outlined"
                error={typeof errors.amount?.message !== 'undefined'}
                helperText={errors.amount?.message}
            ></TextField>
            <Box mt='10px'></Box>

            <FormControl fullWidth>
                <InputLabel id="currency-list">{content.transactionForm.currency}*</InputLabel>
                <Select
                    variant="outlined"
                    labelId="currency-list"
                    id="stock-currency-list-select"
                    label={`${content.transactionForm.currency}*`}
                    value={customAssetsDetailStore.customAssetDetail?.inputCurrency || 'USD'}
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
                {content.transactionForm.moveToFund}
            </Button>
        </Box>
    );
});

export default CSDTransferToFundForm;


