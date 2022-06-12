import { lazy, Suspense, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  IconButton,
  Tooltip,
  useTheme,
  useMediaQuery,
  Typography,
  Tab,
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { portfolioDetailStore, rootStore } from 'shared/store';
import { BreadcrumbsLink, HypnosisLoading } from 'shared/components';
import { PDBreadcrumbTabs } from 'shared/constants';
import { AddNewAssetsModal } from './pd-add-new-assets-modal';
import { DeleteAssetModal } from './pd-delete-asset-modal';
import { TabContext, TabList } from '@mui/lab';
import { useRouter } from 'next/router';
import { PDTransferAssetToInvestFundModal } from './pd-transfer-to-invest-fund-modal/pd-transfer-to-invest-fund-modal';
import { content as i18n } from 'i18n';

const PDReportTab = lazy(() => import('./pd-report-tab/pd-report-tab-main'));
const PDHoldingsTab = lazy(() => import('./pd-holdings-tab/pd-holdings-tab-main'));
const PDInvestFundTab = lazy(
  () => import('./pd-invest-fund-tab/pd-invest-fund-main'),
);
const PDSettingsTab = lazy(
  () => import('./pd-settings-tab/pd-settings-tab-main'),
);

interface IProps {
}

const PortfolioDetail = observer(({ }: IProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const router = useRouter();
  const { query, locale } = router;
  const content = locale === 'vi' ? i18n['vi'].portfolioDetailPage : i18n['en'].portfolioDetailPage;

  const portfolioId = Array.isArray(query['portfolioId'])
    ? query['portfolioId'][0]
    : query['portfolioId'] || '';

  const { isOpenAddNewAssetModal } = portfolioDetailStore;

  useEffect(() => {
    portfolioDetailStore.resetInitialState();
  }, [])

  useEffect(() => {
    rootStore.startLoading();

    portfolioDetailStore.setSelectedTabs(PDBreadcrumbTabs.holdings);
    portfolioDetailStore.setPortfolioId(portfolioId);

    rootStore.stopLoading();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [portfolioId]);

  useEffect(() => {
    const fetchData = async () => {
      rootStore.startLoading();
      Promise.all([portfolioDetailStore.fetchCash()]);
      rootStore.stopLoading();
    };
    if (
      portfolioDetailStore.needUpdatedCash
    ) {
      fetchData();
      portfolioDetailStore.setUpdateCashDetail(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [portfolioDetailStore.needUpdatedCash]);



  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    portfolioDetailStore.setSelectedTabs(newValue);
  };

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
        <Box sx={{ overflow: 'auto', width: '100%' }}>
          <Container>
            <BreadcrumbsLink
              urlArr={[
                '/portfolio',
                `/portfolio/${portfolioDetailStore.portfolioId}`,
              ]}
              displayNameArr={[
                content.breadCurmbs.portfolio,
                portfolioDetailStore.portfolioInfo?.name ||
                portfolioDetailStore.portfolioId.toString(),
              ]}
            />
            <Typography sx={{ mb: 1 }} variant="h4">
              {portfolioDetailStore.portfolioInfo?.name}
            </Typography>
          </Container>
          <Container sx={{ padding: isMobile ? '0px' : 'initial' }}>
            <TabContext value={portfolioDetailStore.selectedTabs}>
              <Box sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}>
                <TabList
                  onChange={handleTabChange}
                  aria-label="basic tabs example"
                  textColor="primary"
                  indicatorColor="primary"
                >
                  <Tab label={content.tabList.holding} value={PDBreadcrumbTabs.holdings} />
                  <Tab label={content.tabList.report} value={PDBreadcrumbTabs.report} />
                  <Tab
                    label={content.tabList.investFund}
                    value={PDBreadcrumbTabs.investFund}
                  />
                  <Tab label={content.tabList.settings} value={PDBreadcrumbTabs.settings} />
                </TabList>
              </Box>
            </TabContext>
            <Grid container display="flex" justifyContent="center" width="100%">
              {portfolioDetailStore.selectedTabs ===
                PDBreadcrumbTabs.holdings ? (
                <Suspense fallback={<HypnosisLoading></HypnosisLoading>}>
                  <PDHoldingsTab />
                </Suspense>
              ) : null}
              {portfolioDetailStore.selectedTabs === PDBreadcrumbTabs.report ? (
                <Suspense fallback={<HypnosisLoading></HypnosisLoading>}>
                  <PDReportTab />
                </Suspense>
              ) : null}
              {portfolioDetailStore.selectedTabs ===
                PDBreadcrumbTabs.investFund ? (
                <Suspense fallback={<HypnosisLoading></HypnosisLoading>}>
                  <PDInvestFundTab />
                </Suspense>
              ) : null}
              {portfolioDetailStore.selectedTabs ===
                PDBreadcrumbTabs.settings ? (
                <Suspense fallback={<HypnosisLoading></HypnosisLoading>}>
                  <PDSettingsTab />
                </Suspense>
              ) : null}
            </Grid>
          </Container>
        </Box>
      </Box>
      <AddNewAssetsModal />
      <DeleteAssetModal />
      <PDTransferAssetToInvestFundModal />
      <Tooltip title={content.addNewAssets.buttonTooltip}>
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
