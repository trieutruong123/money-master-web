import { useEffect, useState } from 'react';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { observer } from 'mobx-react-lite';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { BuyOtherAssetForm } from './buy-other-asset-form';
import { portfolioDetailStore, rootStore } from 'shared/store';
import {
  NewBanksSavingAsset,
  NewPortfolioCustomAsset,
  UpdatedBankSavingItem,
} from 'shared/types';
import { AssetTypeName, TransactionFormType } from 'shared/constants';
import { PersonalInterestCustomAssetItem } from 'shared/models';

interface IProps {
  handleClose: () => void;
  openPreviousForm: Function;
  content: any;
}

export const AddOtherAssetForm = observer(
  ({ handleClose, openPreviousForm, content }: IProps) => {
    const [errorMessage, setErrorMessage] = useState<string>('');
    const theme = useTheme();
    const customAssetList: Array<PersonalInterestCustomAssetItem> | undefined = portfolioDetailStore.customAssetList;
    const selectedAsset = portfolioDetailStore.selectedAsset;

    useEffect(() => {
      const fetchAssetPrice = async () => { };
      fetchAssetPrice();
    }, []);

    const handleComeback = () => {
      portfolioDetailStore.setAddedAssetInfo({ ...selectedAsset, formType: TransactionFormType.transaction, assetType: AssetTypeName.custom });
      openPreviousForm();
    };

    const portfolioName = portfolioDetailStore.portfolioInfo?.name || '';

    const handleFormSubmit = async (
      customInterestAssetInfoId: number,
      data: NewPortfolioCustomAsset,
    ) => {
      const res = await portfolioDetailStore.addNewOtherCustomAsset(
        customInterestAssetInfoId,
        data,
      );
      if (res.isError) {
        if (data.isUsingInvestFund || data.isUsingCash) {
          setErrorMessage(res.data);
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
    }

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
        <Typography
          variant="body1"
          color="error"
          width="100%"
          align="center"
          height="1.5rem"
        >
          {errorMessage}
        </Typography>
        <Box
          sx={{
            [theme.breakpoints.down('sm')]: { height: '450px' },

            [theme.breakpoints.up('sm')]: {
              height: '520px',
            },
          }}
        >
          <BuyOtherAssetForm
            customAssetList={customAssetList}
            content={content}
            handleFormSubmit={handleFormSubmit}
          />
        </Box>
      </div>
    );
  },
);
