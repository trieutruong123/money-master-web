import { lazy, Suspense } from 'react';
import {
  Box,
  Container,
  Grid,
  IconButton,
  Tooltip,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { portfolioDetailStore, rootStore } from 'shared/store';
import { HypnosisLoading } from 'shared/components';
import { PDBreadcrumbTabs } from 'shared/constants';
import { AddNewAssetsModal } from './add-new-assets-modal';
import { DeleteAssetModal } from './delete-asset-modal';
import { DonutChart, HorizontalBarChart } from './insight-chart';

const PDReportTab = lazy(() => import('./pd-report-tab'));
const PDHoldingsTab = lazy(() => import('./pd-holdings-tab'));
const PDInvestFundTab = lazy(() => import('./pd-invest-fund-tab'));
const PDSettingsTab = lazy(() => import('./pd-settings-tab'));

interface IProps {
  portfolioId: string;
  content: any;
}

const PortfolioDetail = observer(({ content, portfolioId }: IProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { isOpenAddNewAssetModal } = portfolioDetailStore;

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
              {portfolioDetailStore.selectedTabs ===
              PDBreadcrumbTabs.holdings ? (
                <Suspense fallback={<HypnosisLoading></HypnosisLoading>}>
                  <Box
                    display={
                      portfolioDetailStore.selectedTabs ===
                      PDBreadcrumbTabs.holdings
                        ? 'block'
                        : 'none'
                    }
                  >
                    <PDHoldingsTab content={content} />
                  </Box>
                </Suspense>
              ) : null}
              {portfolioDetailStore.selectedTabs === PDBreadcrumbTabs.report ? (
                <Suspense fallback={<HypnosisLoading></HypnosisLoading>}>
                  <Box
                    display={
                      portfolioDetailStore.selectedTabs ===
                      PDBreadcrumbTabs.report
                        ? 'block'
                        : 'none'
                    }
                  >
                    <PDReportTab content={content} />
                  </Box>
                </Suspense>
              ) : null}
              {portfolioDetailStore.selectedTabs ===
              PDBreadcrumbTabs.investFund ? (
                <Suspense fallback={<HypnosisLoading></HypnosisLoading>}>
                  <Box
                    display={
                      portfolioDetailStore.selectedTabs ===
                      PDBreadcrumbTabs.investFund
                        ? 'block'
                        : 'none'
                    }
                  >
                    <PDInvestFundTab />
                  </Box>
                </Suspense>
              ) : null}
              {portfolioDetailStore.selectedTabs ===
              PDBreadcrumbTabs.settings ? (
                <Suspense fallback={<HypnosisLoading></HypnosisLoading>}>
                  <Box
                    display={
                      portfolioDetailStore.selectedTabs ===
                      PDBreadcrumbTabs.settings
                        ? 'block'
                        : 'none'
                    }
                  >
                    <PDSettingsTab />
                  </Box>
                </Suspense>
              ) : null}
            </Grid>
          </Container>
        </Box>
      </Box>
      <AddNewAssetsModal content={content.addNewAssets} />
      <DeleteAssetModal />
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
