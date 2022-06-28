import { useEffect, useState } from 'react';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { observer } from 'mobx-react-lite';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { BuyBankSavingsForm } from './buy-bank-savings-form';
import { portfolioDetailStore, rootStore } from 'shared/store';
import { NewBanksSavingAsset, UpdatedBankSavingItem } from 'shared/types';
import { AssetTypeName, TransactionFormType } from 'shared/constants';

interface IProps {
  openPreviousForm: Function,
  handleClose: () => void;
  content: any;
}

export const AddNewBankSavingsForm = observer(
  ({ handleClose, openPreviousForm, content }: IProps) => {
    const selectedAsset = portfolioDetailStore.selectedAsset
    const [errorMessage, setErrorMessage] = useState<string>('');
    const theme = useTheme();
    useEffect(() => {
      const fetchAssetPrice = async () => { };
      fetchAssetPrice();
    }, []);

    const handleComeback = () => {
      portfolioDetailStore.setAddedAssetInfo({ ...selectedAsset, formType: TransactionFormType.transaction, assetType: AssetTypeName.bankSaving });
      openPreviousForm();
    };

    const portfolioName = portfolioDetailStore.portfolioInfo?.name || '';

    const handleFormSubmit = async (data: NewBanksSavingAsset) => {
      console.log(data);
      const res = await portfolioDetailStore.addNewBankSaving(data);
      if (res.isError) {
        if (data.isUsingInvestFund || data.isUsingCash) {
          setErrorMessage(res.data.data);
        } else {
          rootStore.raiseError(res?.data.en);
          handleClose();
        }
      } else {
        rootStore.raiseNotification(res.data.en, 'success');
        if (data.isUsingInvestFund) {
          portfolioDetailStore.setUpdateInvestFund(true);
        } else if (data.isUsingCash) {
          portfolioDetailStore.setUpdateCashDetail(true);
        }
        portfolioDetailStore.setUpdateReport(true);
        handleClose();
      }
    };

    return (
      <div style={{ height: 'inherit' }}>
        <div style={{ marginTop: '1rem' }}>
          <h2
            id="modal-modal-title"
            style={{
              fontWeight: 700,
              fontSize: '2rem',
              lineHeight: 1.375,
              textAlign: 'center',
            }}
          >
            {content.title}
          </h2>
          <IconButton
            sx={{ position: 'absolute', left: '2rem', top: '1rem' }}
            onClick={handleComeback}
          >
            <ArrowBackIcon />
          </IconButton>
        </div>
        <div style={{ marginLeft: '3rem', marginTop: '1rem' }}>
          <p
            style={{
              marginTop: '0.4rem',
              textTransform: 'uppercase',
              fontWeight: 'bold',
            }}
          >
            {portfolioName}
          </p>
        </div>
        <Typography variant="body1"
          color="error"
          width="100%"
          align="center"
          height="1.5rem">
          {errorMessage}
        </Typography>
        <Box
          sx={{
            [theme.breakpoints.down('sm')]: { height: '450px' },

            [theme.breakpoints.up('sm')]: {
              height: '530px',
            },
          }}
        >
          <BuyBankSavingsForm
            content={content}
            handleFormSubmit={handleFormSubmit}
          />
        </Box>
      </div>
    );
  },
);
