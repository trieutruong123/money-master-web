import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, TextField, useTheme } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { colorScheme } from 'utils/color-scheme';
import { cashDetailStore } from 'shared/store';
import { AssetTypeName, TransactionRequestType } from 'shared/constants';
import { getCurrencyByCode } from 'shared/helpers';

type FormValues = {
  amount: number,
};

interface IProps {
  handleFormSubmit: Function;
  content: any
}

export const WithdrawToOutsideForm = ({ handleFormSubmit, content }: IProps) => {
  const theme = useTheme();
  const validationSchema = Yup.object().shape({
    amount: Yup.number()
      .required('Amount is required')
      .typeError('Amount must be a number')
      .positive('Amount must be greater than zero'),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, reset, handleSubmit, formState, getValues, setError } =
    useForm<FormValues>(formOptions);
  const { errors } = formState;

  const onSubmit: SubmitHandler<FormValues> = (data: any) => {
    const res = handleFormSubmit({
      amount: data.amount,
      valueOfReferentialAssetBeforeCreatingTransaction:cashDetailStore.cashDetail?.amount||0,
      amountInDestinationAssetUnit: data.amount,
      currencyCode: cashDetailStore.cashDetail?.currencyCode || 'USD',
      transactionType: TransactionRequestType.withdrawToOutside,
      destinationAssetId: null,
      destinationAssetType: null,
      referentialAssetId: cashDetailStore.cashDetail?.id,
      referentialAssetType: AssetTypeName.cash,
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
        label={`${content.transactionForm.inputMoney}*`}
        {...register('amount')}
        variant="outlined"
        error={typeof errors.amount?.message !== 'undefined'}
        helperText={errors.amount?.message}
        inputProps={{
          step: 'any',
        }}
        InputProps={{
          endAdornment: getCurrencyByCode(cashDetailStore.cashDetail?.currencyCode || 'USD')?.symbol || '',
        }}
      ></TextField>
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
        {content.transactionForm.withdraw}
      </Button>
    </Box>
  );
};
