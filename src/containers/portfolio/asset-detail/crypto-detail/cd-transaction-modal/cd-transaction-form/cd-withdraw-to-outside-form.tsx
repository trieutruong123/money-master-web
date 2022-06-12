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
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AssetTypeName, TransactionRequestType } from 'shared/constants';
import { getSupportedCurrencyList } from 'shared/helpers';
import { cryptoDetailStore } from 'shared/store';
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


const CDWithdrawToOutsideForm = observer(({ handleFormSubmit, content }: IProps) => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));
  const validationSchema = Yup.object().shape({
    amount: Yup.number()
      .required('Amount is required')
      .typeError('Amount must be a number')
      .positive('Amount must be greater than zero'),
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
      amount: data.amount,
      amountInDestinationAssetUnit: 0,
      currencyCode: data.currencyCode || 'USD',
      transactionType: TransactionRequestType.withdrawToOutside,
      destinationAssetId: null,
      destinationAssetType: null,
      referentialAssetId: cryptoDetailStore.cryptoDetail?.id,
      referentialAssetType: AssetTypeName.cryptoCurrency,
      isTransferringAll: false,
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
      <TextField
        type="number"
        fullWidth
        sx={{ my: 1, display: 'block' }}
        id="outlined-amount"
        inputProps={{
          step: 'any',
        }}
        label={`${content.transactionForm.amount}*`}
        {...register('amount')}
        variant="outlined"
        error={typeof errors.amount?.message !== 'undefined'}
        helperText={errors.amount?.message}
      ></TextField>
      <FormControl fullWidth>
        <InputLabel id="currency-list">{content.transactionForm.currency}*</InputLabel>
        <Select
          variant="outlined"
          labelId="currency-list"
          id="crypto-currency-list-select"
          label={`${content.transactionForm.currency}*`}
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
export default CDWithdrawToOutsideForm;
