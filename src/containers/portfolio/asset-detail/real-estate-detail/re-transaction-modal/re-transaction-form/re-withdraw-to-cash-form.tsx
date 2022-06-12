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
import { realEstateDetailStore, stockDetailStore } from 'shared/store';
import { getSupportedCurrencyList } from 'shared/helpers';
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
  content: any,
}

export const REWithdrawToCash = observer(({ handleFormSubmit, content }: IProps) => {
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
      amount: realEstateDetailStore.assetDetail?.inputMoneyAmount,
      amountInDestinationAssetUnit: 0,
      currencyCode: data.currencyCode || 'USD',
      transactionType: TransactionRequestType.withdrawToCash,
      destinationAssetId: realEstateDetailStore.cashDetail?.find(item => item.currencyCode === data.destinationCurrencyCode)?.id,
      destinationAssetType: AssetTypeName.cash,
      referentialAssetId: realEstateDetailStore.assetDetail?.id,
      referentialAssetType: AssetTypeName.realEstate,
      isTransferringAll: true,
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
      <Typography color='primary'>* {content.transactionForm.allMoneyFromAssetWillBeSold}</Typography>
      <TextField
        type="number"
        fullWidth
        inputProps={{
          step: 'any',
          readOnly: true,
        }}
        sx={{ mt: 1, display: 'block' }}
        id="outlined-cash-amount"
        label={`${content.transactionForm.inputMoney}*`}
        variant="outlined"
        value={realEstateDetailStore.assetDetail?.inputMoneyAmount}
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
          value={realEstateDetailStore.assetDetail?.inputCurrency.toUpperCase()}
        >
          {currencyList.map((item) => {
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
          defaultValue={realEstateDetailStore.cashDetail?.at(0)?.currencyCode || 'USD'}
          required
        >
          {realEstateDetailStore.currencyList?.map((item, index) => {
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

export default REWithdrawToCash;