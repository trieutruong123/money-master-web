import { Box, Container, Grid, IconButton } from '@mui/material';
import { useState } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { AssetAllocation } from './asset-allocation';
import { DailyReturns } from './daily-return';
import { Portfolio } from './portfolio';
import { portfolioData } from './portfolio-detail-data';

export const PortfolioDetail = () => {
  const [portfolioDataSet, setPortfolioDataSet] = useState<any>(
    portfolioData.portfolioData,
  );
  const [assetAllocationData, setAssetAllocationData] = useState<any>(
    portfolioData.portfolioAllocation,
  );
  const [portfolioValue, setPortfolioValue] = useState(
    portfolioData.portfolioValue,
  );
  const [todaysChange, setTodaysChange] = useState(portfolioData.todaysChange);

  // const getPortfolioData = async () => {
  //   try {
  //     setPortfolioValue(portfolioData.portfolioValue);
  //     setTodaysChange(portfolioData.todaysChange);
  //     setPortfolioDataSet(portfolioData.portfolioData);
  //     setAssetAllocationData(portfolioData.portfolioAllocation);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  // getPortfolioData();

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
        <Box sx ={{overflow:'auto'}}>
          <Container>
            <Grid container spacing={3}>
              <AssetAllocation assetAllocationData={assetAllocationData} />
              <DailyReturns dailyReturnsData={portfolioDataSet} />
              <Portfolio data={portfolioDataSet} />
            </Grid>
          </Container>
        </Box>
      </Box>
      <IconButton
        color="success"
        sx={{ position: 'absolute', right: '5vw', bottom: '5vh' }}
      >
        <AddCircleIcon sx={{ width: '5rem', height: '5rem' }} />
      </IconButton>
    </Box>
  );
};
