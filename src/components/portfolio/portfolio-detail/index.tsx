import { Box, Container, Grid, IconButton, Tooltip } from '@mui/material';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { AssetAllocation } from './asset-allocation';
import { DailyReturns } from './daily-return';
import { Portfolio } from './portfolio';
import { AddNewAssetsModal } from './add-new-assets-modal';
import { portfolioDetailStore } from 'store';
import { PortfolioAllocation, PortfolioItem } from 'types';

export const PortfolioDetail = observer(() => {
  useEffect(() => {
    portfolioDetailStore.fetchPortfolioDetailData();
  }, []);

  const {
    portfolioDetailData,
    portfolioAllocationData,
    portfolioValue,
    todaysChange,
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
          <Container>
            <Grid container spacing={3} display="fex" justifyContent="center">
              <AssetAllocation assetAllocationData={portfolioAllocationData} />
              <DailyReturns dailyReturnsData={portfolioDetailData} />
              <Portfolio data={portfolioDetailData} />
            </Grid>
          </Container>
        </Box>
      </Box>
      <AddNewAssetsModal />
      <Tooltip title="Add new assets">
        <IconButton
          onClick={() =>
            portfolioDetailStore.setOpenAddNewAssetModal(
              !isOpenAddNewAssetModal,
            )
          }
          color="success"
          sx={{ position: 'absolute', right: '6vw', bottom: '6vh' }}
        >
          <AddCircleIcon sx={{ width: '4rem', height: '4rem' }} />
        </IconButton>
      </Tooltip>
    </Box>
  );
});
