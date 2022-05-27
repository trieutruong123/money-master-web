import { useEffect, useState } from 'react';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { observer } from 'mobx-react-lite';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { NewCashAsset } from 'shared/types';
import { portfolioDetailStore, rootStore } from 'shared/store';
import { AssetTypeName } from 'shared/constants';
import { BuyCashForm } from './buy-cash-form';

interface IProps {
  openPreviousForm: (params: any) => void;
  handleClose: () => void;
  content: any;
}

export const AddNewCashForm = observer(
  ({ handleClose, openPreviousForm, content }: IProps) => {
    const [errorMessage, setErrorMessage] = useState<string>('');
    const theme = useTheme();

    useEffect(() => {
      const fetchAssetPrice = async () => {};
      fetchAssetPrice();
    }, []);

    const handleComeback = () => {
      openPreviousForm({
        curFormType: 'transaction',
        selectedType: AssetTypeName.cash,
      });
    };

    const portfolioName = portfolioDetailStore.portfolioInfo?.name || '';

    const handleFormSubmit = async (data: NewCashAsset) => {
      const res = await portfolioDetailStore.addNewCash(data);
      if (res.isError) {
        if (data.isUsingInvestFund) {
          setErrorMessage(res.data);
        } else {
          rootStore.raiseError(res?.data.en);
          handleClose();
        }
      } else {
        rootStore.raiseNotification(res.data.en, 'success');
        if (data.isUsingInvestFund) {
          portfolioDetailStore.setUpdateInvestFund(true);
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
              height: '530px',
            },
          }}
        >
          <BuyCashForm content={content} handleFormSubmit={handleFormSubmit} />
        </Box>
      </div>
    );
  },
);
