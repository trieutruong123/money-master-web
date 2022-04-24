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
import { toast } from 'react-toastify';
import { portfolioDetailStore, rootStore } from 'shared/store';
import { DonutChart, HorizontalBarChart } from './insight-chart';
import { AssetsDetail } from './assets-detail';
import { AddNewAssetsModal } from './add-new-assets-modal';

interface IProps {
  portfolioId: string;
  content: any;
}

const PortfolioDetail = observer(({ content, portfolioId }: IProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const {
    cryptoDetail,
    cashDetail,
    stockDetail,
    realEstateDetail,
    bankingDetail,
    customAssetDetail,
    portfolioAllocationData,
    pieChartData,
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
            <Grid container display="flex" justifyContent="center">
              {typeof pieChartData !== 'undefined' ? (
                <Grid
                  container
                  item
                  spacing={2}
                  sx={{ display: 'flex', alignItems: 'stretch' }}
                >
                  <Grid
                    item
                    lg={6}
                    md={6}
                    xl={6}
                    sm={6}
                    xs={12}
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <DonutChart
                      content={content.assetAllocation}
                      pieChartData={pieChartData}
                    />
                  </Grid>
                  <Grid
                    item
                    lg={6}
                    md={6}
                    xl={6}
                    sm={6}
                    xs={12}
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <HorizontalBarChart
                      content={content.assetAllocation}
                      pieChartData={pieChartData}
                    ></HorizontalBarChart>
                  </Grid>
                </Grid>
              ) : (
                <></>
              )}
              <AssetsDetail
                content={content}
                customAssetDetail={customAssetDetail}
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
      <AddNewAssetsModal content={content.addNewAssets} />
      <Tooltip title="Add new asset">
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

export default PortfolioDetail;
