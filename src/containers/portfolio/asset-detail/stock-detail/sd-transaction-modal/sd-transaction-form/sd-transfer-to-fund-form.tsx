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
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AssetTypeName } from 'shared/constants';
import { getSupportedCurrencyList } from 'shared/helpers';
import { stockDetailStore } from 'shared/store';
import { colorScheme } from 'utils';
import * as Yup from 'yup';

interface IProps {
  handleFormSubmit: Function;
}

type FormValues = {
  amount: number;
  currencyCode: string;
};

const SDTransferToFundForm = observer(({ handleFormSubmit }: IProps) => {
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
      referentialAssetId: stockDetailStore.stockDetail?.id,
      referentialAssetType: AssetTypeName.stock,
      currencyCode: data.currencyCode || 'USD',
      amount: data.amount,
      isTransferingAll: false,
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
          id="stock-currency-list-select"
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
        TRANSFER TO INVEST FUND
      </Button>
    </Box>
  );
});

export default SDTransferToFundForm;
