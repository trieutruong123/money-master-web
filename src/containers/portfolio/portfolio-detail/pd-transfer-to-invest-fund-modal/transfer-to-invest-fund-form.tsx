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

export const TransferToInvestFundForm = () => {
  const theme = useTheme();
  const { transferedAssetInfo } = portfolioDetailStore;
  const transferedAssetDetail = portfolioDetailStore.findAssetByIdAndType(
    transferedAssetInfo?.assetType || AssetTypeName.others,
    transferedAssetInfo?.assetId || -1,
  );

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

  const handleCloseModal = () => {
    portfolioDetailStore.setOpenTransferToInvestFundModal(false);
  };

  const onSubmit: SubmitHandler<FormValues> = (data: any) => {
    const arr: Array<string | undefined> = [
      AssetTypeName.realEstate,
      AssetTypeName.bankSaving,
      AssetTypeName.others,
    ];
    const isContained = arr.includes(transferedAssetInfo?.assetType);
    if (
      typeof transferedAssetInfo !== 'undefined' &&
      typeof transferedAssetDetail !== 'undefined'
    ) {
      portfolioDetailStore.transferAssetToInvestFund({
        referentialAssetId: transferedAssetInfo.assetId,
        referentialAssetType: transferedAssetInfo.assetType,
        amount: data.amount,
        currencyCode: data.currencyCode,
        isTransferringAll: isContained,
      });
    }
    portfolioDetailStore.setOpenTransferToInvestFundModal(false);
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
        px: '3rem',
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
        }}
      >
        <Grid container spacing="2">
          <TextField
            type="number"
            fullWidth
            inputProps={{ step: 'any' }}
            sx={{ mt: 1, display: 'block' }}
            id="outlined-cash-amount"
            label={`*${'Amount'}`}
            {...register('amount')}
            variant="outlined"
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
                defaultValue="USD"
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
          justifyContent: 'center',
          pt: '1rem',
          width: '100%',
        }}
      >
        <CancelButton
          variant="contained"
          onClick={handleCloseModal}
          color="warning"
          sx={{
            bg: 'appColor.theme',
            fontSize: '1.4rem',
            height: '2.5rem',
          }}
        >
          Cancel
        </CancelButton>
        <Box sx={{ flexGrow: '0.5' }} />
        <Button
          type="submit"
          variant="contained"
          form="transfer-asset-to-invest-fund"
          color="success"
          sx={{
            fontSize: '1.4rem',
            height: '2.5rem',
          }}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};
