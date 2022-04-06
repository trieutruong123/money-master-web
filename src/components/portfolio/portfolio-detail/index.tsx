import {
  Box,
  Container,
  Grid,
  IconButton,
  Tooltip,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { AssetAllocation } from './asset-allocation';
import { DailyReturns } from './daily-return';
import { AssetsDetail } from './assets-detail';
import { AddNewAssetsModal } from './add-new-assets-modal';
import { portfolioDetailStore } from 'store';
import { PortfolioAllocation, PortfolioItem } from 'types';

interface IProps{
  portfolioId:string,
}

export const PortfolioDetail = observer(({ portfolioId}:IProps) => {
  useEffect(() => {
    const fetchData = async () => {
      portfolioDetailStore.setPortfolioId(portfolioId);
      await portfolioDetailStore.fetchPortfolioDetailData();
      await portfolioDetailStore.fetchRealEstate();
      await portfolioDetailStore.fetchBankSaving();
      await portfolioDetailStore.fetchCoinData();
    };
    fetchData();
  }, []);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const {
    cryptoDetail,
    cashDetail,
    stockDetail,
    realEstateDetail,
    bankingDetail,
    portfolioAllocationData,
    isOpenAddNewAssetModal,
  } = portfolioDetailStore;
  return (
    <Box
      sx={{
        display: 'flex',
        height: '100%',
        overflow: 'hidden',
        width: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flex: '1 1 auto',
          overflow: 'hidden',
        }}
      >
        <Box sx={{ overflow: 'auto' }}>
          <Container sx={{ padding: isMobile ? '0px' : 'initial' }}>
            <Grid container spacing={3} display="fex" justifyContent="center">
              <AssetAllocation assetAllocationData={portfolioAllocationData} />
              {/* <DailyReturns dailyReturnsData={portfolioDetailData} /> */}
              <AssetsDetail
                cryptoDetail={cryptoDetail}
                cashDetail={cashDetail}
                stockDetail={stockDetail}
                realEstateDetail={realEstateDetail}
                bankingDetail={bankingDetail}
              />
            </Grid>
          </Container>
        </Box>
      </Box>
      <AddNewAssetsModal />
      <Tooltip title="Add new assets">
        <IconButton
          onClick={() => {
            portfolioDetailStore.setOpenAddNewAssetModal(
              !isOpenAddNewAssetModal,
            );
          }}
          color="success"
          sx={{ position: 'absolute', right: '6vw', bottom: '6vh' }}
        >
          <AddCircleIcon sx={{ width: '4rem', height: '4rem' }} />
        </IconButton>
      </Tooltip>
    </Box>
  );
});
