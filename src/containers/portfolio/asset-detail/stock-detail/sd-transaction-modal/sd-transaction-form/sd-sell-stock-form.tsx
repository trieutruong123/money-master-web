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
} from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { colorScheme } from 'utils/color-scheme';
import { TransactionRequestType, AssetTypeName } from 'shared/constants';
import { stockDetailStore } from 'shared/store';
import { getSupportedCurrencyList } from 'shared/helpers';
import { CashItem } from 'shared/models';
import { observer } from 'mobx-react-lite';

type FormValues = {
  sellPrice: number;
  amount: number;
  currencyCode: string;
  destinationCurrencyCode: string;
  fee: number;
  tax: number;
};

interface IProps {
  handleFormSubmit: Function;
  content: any
}

export const SDSellStockForm = observer(({ handleFormSubmit, content }: IProps) => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));
  const validationSchema = Yup.object().shape({
    sellPrice: Yup.number()
      .required('Price is required')
      .typeError('Price must be a number')
      .positive('Price must be greater than zero'),
    amount: Yup.number()
      .required('Amount is required')
      .typeError('Amount must be a number')
      .positive('Amount must be greater than zero'),
    destinationCurrencyCode: Yup.string().required(''),
    tax: Yup.number()
      .min(0,'Tax must be greater than zero')
      .typeError('Tax must be a number'),
    fee: Yup.number()
      .typeError('Fee must be a number')
      .min(0,'Fee must be greater than zero'),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, reset, handleSubmit, formState, getValues, setError } =
    useForm<FormValues>(formOptions);
  const { errors } = formState;
  const currencyList = getSupportedCurrencyList();

  const onSubmit: SubmitHandler<FormValues> = (data: any) => {
    const res = handleFormSubmit({
      amount: data.sellPrice * data.amount,
      valueOfReferentialAssetBeforeCreatingTransaction:stockDetailStore.stockDetail
                                                      ?stockDetailStore.stockDetail.currentPrice
                                                      *stockDetailStore.stockDetail.currentAmountHolding
                                                      :0,
      amountInDestinationAssetUnit: data.amount,
      currencyCode: data.currencyCode || 'USD',
      transactionType: TransactionRequestType.withdrawToCash,
      destinationAssetId: stockDetailStore.cashDetail?.find(item => item.currencyCode === data.destinationCurrencyCode)?.id,
      destinationAssetType: AssetTypeName.cash,
      referentialAssetId: stockDetailStore.stockDetail?.id,
      referentialAssetType: AssetTypeName.stock,
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
      <TextField
        type="number"
        fullWidth
        sx={{ mt: 1, display: 'block' }}
        id="outlined-sell-price"
        label={`${content.transactionForm.sellPrice}*`}
        inputProps={{ step: 'any' }}
        {...register('sellPrice')}
        variant="outlined"
        error={typeof errors.sellPrice?.message !== 'undefined'}
        helperText={errors.sellPrice?.message}
      ></TextField>
      <TextField
        type="number"
        fullWidth
        sx={{ mt: 1, display: 'block' }}
        id="outlined-amount"
        label={`${content.transactionForm.amount}*`}
        inputProps={{
          step: 'any',
        }}
        {...register('amount')}
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
          id="crypto-currency-list-select"
          label={`${content.transactionForm.currency}*`}
          defaultValue={stockDetailStore.stockDetail?.currencyCode || 'USD'}
          {...register('currencyCode')}
        >
          {currencyList?.map((item, index) => {
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
        <InputLabel id="destination-cash">{content.transactionForm.destinationCash}*</InputLabel>
        <Select
          variant="outlined"
          labelId="destination-cash"
          id="crypto-destination-cash-select"
          label={`${content.transactionForm.destinationCash}*`}
          {...register('destinationCurrencyCode')}
          defaultValue={stockDetailStore.cashDetail?.at(0)?.currencyCode || 'USD'}
          required
        >
          {stockDetailStore.currencyList?.map((item, index) => {
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
            label={`${content.transactionForm.fee}`}
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
            label={`${content.transactionForm.tax} (%)`}
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
        {content.transactionForm.sellButton}
      </Button>
    </Box>
  );
});
