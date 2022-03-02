import { Box, Container, Grid, IconButton, Tooltip } from '@mui/material';
import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { AssetAllocation } from './asset-allocation';
import { DailyReturns } from './daily-return';
import { Portfolio } from './portfolio';
import { portfolioDetailStore } from 'store';
import { PortfolioAllocation, PortfolioItem } from 'types';

export const PortfolioDetail = observer(() => {
  const [portfolioDataSet, setPortfolioDataSet] = useState<
    Array<PortfolioItem>
  >(portfolioDetailStore.portfolioDetailData);
  const [assetAllocationData, setAssetAllocationData] = useState<
    Array<PortfolioAllocation>
  >(portfolioDetailStore.portfolioAllocationData);
  const [portfolioValue, setPortfolioValue] = useState(
    portfolioDetailStore.portfolioValue,
  );
  const [todaysChange, setTodaysChange] = useState(
    portfolioDetailStore.todaysChange,
  );

  const { isOpenAddNewAssetModal, setOpenAddNewAssetModal } =
    portfolioDetailStore;

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
            <Grid container spacing={3}>
              <AssetAllocation assetAllocationData={assetAllocationData} />
              <DailyReturns dailyReturnsData={portfolioDataSet} />
              <Portfolio data={portfolioDataSet} />
            </Grid>
          </Container>
        </Box>
      </Box>
      <Tooltip title="Add new assets">
        <IconButton
          onClick={() => setOpenAddNewAssetModal(!isOpenAddNewAssetModal)}
          color="success"
          sx={{ position: 'absolute', right: '6vw', bottom: '6vh' }}
        >
          <AddCircleIcon sx={{ width: '4rem', height: '4rem' }} />
        </IconButton>
      </Tooltip>
    </Box>
  );
});
