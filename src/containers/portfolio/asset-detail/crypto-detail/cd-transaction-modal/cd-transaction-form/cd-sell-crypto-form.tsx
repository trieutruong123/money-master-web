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
  useMediaQuery,
  Grid,
} from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { colorScheme } from 'utils/color-scheme';
import { TransactionRequestType, AssetTypeName } from 'shared/constants';
import { cryptoDetailStore } from 'shared/store';
import { getSupportedCurrencyList } from 'shared/helpers';
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
}

export const CDSellCryptoForm = observer(({ handleFormSubmit }: IProps) => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm')); const validationSchema = Yup.object().shape({
    sellPrice: Yup.number()
      .required('Price is required')
      .typeError('Price must be a number')
      .positive('Price must be greater than zero'),
    amount: Yup.number()
      .required('Amount is required')
      .typeError('Amount must be a number')
      .positive('Amount must be greater than zero'),
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
      amount: data.sellPrice * data.amount,
      amountInDestinationAssetUnit: data.amount,
      currencyCode: data.currencyCode || 'USD',
      transactionType: TransactionRequestType.withdrawToCash,
      destinationAssetId: cryptoDetailStore.cashDetail?.find(item => item.currencyCode === data.destinationCurrencyCode)?.id,
      destinationAssetType: AssetTypeName.cash,
      referentialAssetId: cryptoDetailStore.cryptoDetail?.id,
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
        sx={{ mt: '10px', display: 'block' }}
        id="outlined-sell-price"
        label={'*Sell Price'}
        {...register('sellPrice')}
        variant="outlined"
        error={typeof errors.sellPrice?.message !== 'undefined'}
        helperText={errors.sellPrice?.message}
      ></TextField>
      <TextField
        type="number"
        fullWidth
        sx={{ mt: '10px', display: 'block' }}
        id="outlined-amount"
        label={'*Amount'}
        {...register('amount')}
        variant="outlined"
        error={typeof errors.amount?.message !== 'undefined'}
        helperText={errors.amount?.message}
      ></TextField>
      <Box mt='10px'></Box>
      <FormControl fullWidth>
        <InputLabel id="currency-list">{'Currency'}</InputLabel>
        <Select
          variant="outlined"
          labelId="currency-list"
          id="crypto-currency-list-select"
          label={`*${'Currency'}`}
          defaultValue={cryptoDetailStore.cryptoDetail?.currencyCode || 'USD'}
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
      <Box mt='10px'></Box>
      <FormControl fullWidth>
        <InputLabel id="destination-cash">{'Destination cash*'}</InputLabel>
        <Select
          variant="outlined"
          labelId="destination-cash"
          id="crypto-destination-cash-select"
          label={`${'Select destination cash'}*`}
          {...register('destinationCurrencyCode')}
          defaultValue={cryptoDetailStore.cashDetail?.at(0)?.currencyCode || 'USD'}
          required
        >
          {cryptoDetailStore.currencyList?.map((item, index) => {
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
