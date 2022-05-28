import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  FormControl,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  useTheme,
} from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { colorScheme } from 'utils/color-scheme';
import { AssetTypeName, TransactionRequestType } from 'shared/constants';
import CheckBoxButton from 'shared/components/checkbox';
import { getSupportedCurrencyList } from 'shared/helpers';
import { observer } from 'mobx-react-lite';
import { stockDetailStore } from 'shared/store';

type FormValues = {
  purchasePrice: number;
  amount: number;
  date: Date;
  currencyCode: string;
  fee: string;
};

interface IProps {
  handleFormSubmit: Function;
}

export const SDBuyStockForm = observer(({ handleFormSubmit }: IProps) => {
  const [checked, setChecked] = useState<boolean>(false);
  const theme = useTheme();
  const validationSchema = Yup.object().shape({
    purchasePrice: Yup.number()
      .required('Price is required')
      .typeError('Price must be a number')
      .positive('Price must be greater than zero'),
    amount: Yup.number()
      .required('Amount is required')
      .typeError('Amount must be a number')
      .positive('Amount must be greater than zero'),
  });
  const currencyList = getSupportedCurrencyList();

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, reset, handleSubmit, formState, getValues, setError } =
    useForm<FormValues>(formOptions);
  const { errors } = formState;

  const onSubmit: SubmitHandler<FormValues> = (data: any) => {
    const res = handleFormSubmit({
      amount: data.purcharPrice,
      amountInDestinationAssetUnit: data.amount,
      currencyCode: data.currencyCode || 'USD',
      transactionType: TransactionRequestType.buyAsset,
      destinationAssetId: null,
      destinationAssetType: AssetTypeName.cash,
      isTransferringAll: false,
      // isUsingInvestFund:checked
    });
  };

  const handleChangeCheckBox = (isCheck: boolean) => {
    setChecked(isCheck);
  };

  return (
    <Box
      component="form"
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        height: 'inherit',
        overflow: 'auto',
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'stretch',
        flexDirection: 'column',
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
        id="outlined-buy-price"
        label={'*Purchase Price'}
        {...register('purchasePrice')}
        variant="outlined"
        error={typeof errors.purchasePrice?.message !== 'undefined'}
        helperText={errors.purchasePrice?.message}
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
          defaultValue={stockDetailStore.stockDetail?.currencyCode || 'USD'}
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
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent={'start'}
        sx={{ mb: 1 }}
      >
        <CheckBoxButton color="primary" onChange={handleChangeCheckBox} />
        <h4>Is money from invest fund?</h4>
      </Box>
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
});
