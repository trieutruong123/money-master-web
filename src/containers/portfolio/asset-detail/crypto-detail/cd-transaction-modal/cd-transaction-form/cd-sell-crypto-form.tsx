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
} from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { colorScheme } from 'utils/color-scheme';
import { TransactionRequestType, AssetTypeName } from 'shared/constants';
import { cryptoDetailStore } from 'shared/store';
import { getSupportedCurrencyList } from 'shared/helpers';

type FormValues = {
  sellPrice: number;
  amount: number;
  currencyCode: string;
  fee?: string;
};

interface IProps {
  handleFormSubmit: Function;
}

export const CDSellCryptoForm = ({ handleFormSubmit }: IProps) => {
  const theme = useTheme();
  const validationSchema = Yup.object().shape({
    sellPrice: Yup.number()
      .required('Price is required')
      .typeError('Price must be a number')
      .positive('Price must be greater than zero'),
    amount: Yup.number()
      .required('Amount is required')
      .typeError('Amount must be a number')
      .positive('Amount must be greater than zero'),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, reset, handleSubmit, formState, getValues, setError } =
    useForm<FormValues>(formOptions);
  const { errors } = formState;
  const currencyList = getSupportedCurrencyList();

  const onSubmit: SubmitHandler<FormValues> = (data: any) => {
    const res = handleFormSubmit({
      amount: data.sellPrice,
      amountInDestinationAssetUnit: data.amount,
      currencyCode: data.currencyCode || 'USD',
      transactionType: TransactionRequestType.sellAsset,
      destinationAssetId: null,
      destinationAssetType: AssetTypeName.cash,
      isTransferringAll: false,
      // isUsingInvestFund:checked
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
        sx={{ my: 1, display: 'block' }}
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
        sx={{ my: 1, display: 'block' }}
        id="outlined-amount"
        label={'*Amount'}
        {...register('amount')}
        variant="outlined"
        error={typeof errors.amount?.message !== 'undefined'}
        helperText={errors.amount?.message}
      ></TextField>
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
      {/* <TextField
        type="number"
        fullWidth
        sx={{ my: 1, display: 'block' }}
        id="outlined-broker-fee"
        label={'Broker fee'}
        {...register('brokerFee')}
        variant="outlined"
      ></TextField> */}
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
        SAVE
      </Button>
    </Box>
  );
};
