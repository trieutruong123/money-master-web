import {
  Box,
  useTheme,
  Button,
  ButtonProps,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { grey } from '@mui/material/colors';
import { MdMoveToInbox } from 'react-icons/md';
import { getSupportedCurrencyList } from 'shared/helpers';
import { portfolioDetailStore } from 'shared/store';
import { TransferToInvestFundType } from 'shared/types';
import { AssetTypeName } from 'shared/constants';
import { useCallback, useState } from 'react';
import { BankSavingItem, CustomAssetItem, RealEstateItem } from 'shared/models';
import { observer } from 'mobx-react-lite';

const CancelButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: 'ffffff',
  backgroundColor: grey[400],
  '&:hover': {
    backgroundColor: grey[500],
  },
}));

interface FormValues {
  currencyCode: string;
  amount: number;
}

export const PDTransferToInvestFundForm = observer(() => {
  const [errorMessage, setErrorMessage] = useState<string>('');

  const theme = useTheme();
  const { transferedAssetInfo } = portfolioDetailStore;
  const transferedAssetDetail = portfolioDetailStore.findAssetByIdAndType(
    transferedAssetInfo?.assetType || AssetTypeName.custom,
    transferedAssetInfo?.assetId || -1,
  );
  const currencyList = getSupportedCurrencyList();

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

  const handleCloseModal = () => {
    portfolioDetailStore.setOpenTransferToInvestFundModal(false);
  };

  const checkWhetherAllowedPartialTransfer = useCallback(() => {
    const arr: Array<string | undefined> = [
      AssetTypeName.realEstate,
      AssetTypeName.bankSaving,
      AssetTypeName.custom,
    ];
    return !arr.includes(transferedAssetInfo?.assetType);
  }, [transferedAssetInfo]);

  const checkWhetherAllowedChangingCurrency = useCallback(() => {
    const arr: Array<string | undefined> = [
      AssetTypeName.cryptoCurrency,
      AssetTypeName.stock,
    ];
    return arr.includes(transferedAssetInfo?.assetType);
  }, [transferedAssetInfo]);

  const defaultCurrencyCode = useCallback(() => {
    if (
      transferedAssetInfo?.assetType === AssetTypeName.realEstate ||
      transferedAssetInfo?.assetType === AssetTypeName.bankSaving ||
      transferedAssetInfo?.assetType === AssetTypeName.custom
    ) {
      // @ts-ignore
      return transferedAssetDetail?.inputCurrency;
    } else {
      // @ts-ignore
      return transferedAssetDetail?.currencyCode || 'USD';
    }
  }, [transferedAssetDetail]);

  const defaultAmount = useCallback(() => {
    if (transferedAssetInfo?.assetType === AssetTypeName.realEstate) {
      // @ts-ignore
      return transferedAssetDetail?.currentPrice;
    } else if (
      transferedAssetInfo?.assetType === AssetTypeName.bankSaving ||
      transferedAssetInfo?.assetType === AssetTypeName.custom
    ) {
      // @ts-ignore
      return transferedAssetDetail?.inputMoneyAmount;
    } else {
      return 0;
    }
  }, [transferedAssetDetail]);

  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    if (
      typeof transferedAssetInfo !== 'undefined' &&
      typeof transferedAssetDetail !== 'undefined'
    ) {
      const res = await portfolioDetailStore.transferAssetToInvestFund({
        referentialAssetId: transferedAssetInfo.assetId,
        referentialAssetType: transferedAssetInfo.assetType,
        amount: data.amount,
        currencyCode: data.currencyCode,
        isTransferringAll: !checkWhetherAllowedPartialTransfer(),
      });
      if (res.isError) {
        setErrorMessage(res.data.data);
      } else {
        portfolioDetailStore.setUpdateInvestFund(true);
        portfolioDetailStore.setUpdateReport(true);
        portfolioDetailStore.setOpenTransferToInvestFundModal(false);
      }
    }
  };

  return (
    <Box
      id="transfer-to-invest-fund-form"
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        px: '1rem',
        py: '1rem',
        [theme.breakpoints.down('xs')]: {
          px: '2rem',
        },
      }}
    >
      <MdMoveToInbox fill={'#90CAF9'} size={100} />
      <h2>Transfer {transferedAssetDetail?.name} to invest fund</h2>
      <Box
        id="transfer-asset-to-invest-fund"
        component="form"
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: 'flex',
          alignItems: 'stretch',
          flexDirection: 'column',
          width: '100%',
        }}
      >
        <Grid container spacing="2">
          <Typography
            variant="body1"
            color="error"
            height="1.5rem"
            align="center"
            width="100%"
          >
            {errorMessage}
          </Typography>
          <TextField
            type="number"
            fullWidth
            inputProps={{
              step: 'any',
              readOnly: !checkWhetherAllowedPartialTransfer(),
            }}
            sx={{ mt: 1, display: 'block' }}
            id="outlined-cash-amount"
            label={`*${'Amount'}`}
            {...register('amount')}
            variant="outlined"
            defaultValue={defaultAmount()}
            error={typeof errors.amount?.message !== 'undefined'}
            helperText={errors.amount?.message}
          ></TextField>
          <Grid item sx={{ mt: 1, display: 'block', width: '100%' }}>
            <FormControl fullWidth>
              <InputLabel id="currency-list">{'Currency Code'}</InputLabel>
              <Select
                variant="outlined"
                labelId="currency-list"
                id="cash-currency-list-select"
                label={`*${'Currency Code'}`}
                value={
                  !checkWhetherAllowedChangingCurrency()
                    ? defaultCurrencyCode()
                    : undefined
                }
                defaultValue={
                  checkWhetherAllowedChangingCurrency()
                    ? defaultCurrencyCode()
                    : undefined
                }
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
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'end',
          pt: '1rem',
          width: '100%',
        }}
      >
        <CancelButton
          variant="contained"
          onClick={handleCloseModal}
          color="warning"
          sx={{
            mr: '2rem',
            bg: 'appColor.theme',
            fontSize: '1.4rem',
            height: '2.5rem',
          }}
        >
          Cancel
        </CancelButton>
        <Button
          type="submit"
          variant="contained"
          form="transfer-asset-to-invest-fund"
          color="success"
          sx={{
            mr: '2rem',
            fontSize: '1.4rem',
            height: '2.5rem',
          }}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
});
