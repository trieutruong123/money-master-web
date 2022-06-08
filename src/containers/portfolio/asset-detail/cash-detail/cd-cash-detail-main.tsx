import {
  Box,
  Container,
  Grid,
  IconButton,
  Tooltip,
  useTheme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { lazy, Suspense, useCallback, useEffect } from "react";
import React from "react";
import { observer } from "mobx-react-lite";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { cashDetailStore } from "shared/store";
import { BreadcrumbsLink, HypnosisLoading } from "shared/components";
import Tab from "@mui/material/Tab";
import { PACashBreadcrumbTabs } from 'shared/constants/portfolio-asset';
import { TabContext, TabList } from "@mui/lab";
import { getCurrencyByCode } from "shared/helpers";
import { useRouter } from "next/router";
import CDAddNewTransactionModal from "./cd-transaction-modal/cd-transaction-modal-main";

const CDOverviewMain = lazy(() => import("./cd-overview-tab/cd-overview-main"));
const CDMarketData = lazy(() => import("./cd-market-data-tab/cd-market-data-main"));

interface IProps { }


const CDCashDetail = observer(({ }: IProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const router = useRouter();

  const { locale, query } = router;
  const portfolioId = Array.isArray(query['portfolioId'])
    ? query['portfolioId'][0]
    : query['portfolioId'] || '';
  const assetId = Array.isArray(query['assetId'])
    ? query['assetId'][0]
    : query['assetId'] || '';

  useEffect(() => {
    cashDetailStore.resetInitialState();
  }, []);

  useEffect(() => {
    if (typeof assetId === 'undefined') router.push('/404');

    cashDetailStore.setCashId(assetId);
    cashDetailStore.setPortfolioId(portfolioId);

  }, [router.query.portfolioId, router.query.assetId]);

  const {
    isOpenAddNewTransactionModal,
  } = cashDetailStore;

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    cashDetailStore.setSelectedTab(newValue);
  };


  return (
    <Box
      sx={{
        display: "flex",
        height: "100%",
        overflow: "hidden",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flex: "1 1 auto",
          overflow: "hidden",
        }}
      >
        <Box sx={{ overflow: 'auto', width: '100%' }}>
          <Container>
            <BreadcrumbsLink
              urlArr={[
                '/portfolio',
                `/portfolio/${cashDetailStore.portfolioId}`,
                `/portfolio/${cashDetailStore.portfolioId}/cash/${cashDetailStore.cashId}`,
              ]}
              displayNameArr={[
                'Portfolio',
                cashDetailStore.portfolioInfo?.name ||
                cashDetailStore.portfolioId.toString(),
                cashDetailStore.cashDetail?.currencyCode.toUpperCase() ||
                cashDetailStore.cashId.toString(),
              ]}
            />
            <Typography sx={{ mb: 3 }} variant="h4">
              {getCurrencyByCode(cashDetailStore.cashDetail?.currencyCode || '')?.name.toUpperCase()}
            </Typography>
          </Container>

          <Container
            sx={{ padding: isMobile ? '0px' : 'initial' }}
            maxWidth="lg"
          >
            <TabContext value={cashDetailStore.selectedTab}>
              <Box sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}>
                <TabList
                  onChange={handleTabChange}
                  aria-label="basic tabs example"
                  textColor="primary"
                  indicatorColor="primary"
                >
                  <Tab
                    label={PACashBreadcrumbTabs.overview}
                    value={PACashBreadcrumbTabs.overview}
                  />
                  <Tab
                    label={PACashBreadcrumbTabs.marketData}
                    value={PACashBreadcrumbTabs.marketData}
                  />
                  <Tab
                    label={PACashBreadcrumbTabs.settings}
                    value={PACashBreadcrumbTabs.settings}
                  />
                </TabList>
              </Box>
            </TabContext>
          </Container>
          <Box sx={{ overflow: 'hidden' }}>
            <Container sx={{ padding: isMobile ? '0px' : 'initial' }}>
              <Grid
                display="flex"
                justifyContent="center"
                flexDirection="column"
              >
                {cashDetailStore.selectedTab ===
                  PACashBreadcrumbTabs.overview ?
                  (
                    <Suspense fallback={<HypnosisLoading></HypnosisLoading>}>
                      <CDOverviewMain />
                    </Suspense>
                  ) : <></>}
                {cashDetailStore.selectedTab ===
                  PACashBreadcrumbTabs.marketData ? (
                  <Suspense fallback={<HypnosisLoading></HypnosisLoading>}>
                    <CDMarketData />
                  </Suspense>
                ) : <></>}
                {cashDetailStore.selectedTab ===
                  PACashBreadcrumbTabs.settings ? (
                  <Suspense fallback={<HypnosisLoading />}>
                    <h1>You are in setting tab</h1>
                  </Suspense>
                ) : null}
              </Grid>
            </Container>
          </Box>
        </Box>
        <Box>
          <CDAddNewTransactionModal />
        </Box>
        <Tooltip title="Add new transaction">
          <IconButton
            onClick={() => {
              cashDetailStore.setOpenAddNewTransactionModal(
                !isOpenAddNewTransactionModal
              );
            }}
            color="success"
            sx={{ position: "absolute", right: "6vw", bottom: "6vh" }}
          >
            <AddCircleIcon sx={{ width: "4rem", height: "4rem" }} />
          </IconButton>
        </Tooltip>
      </Box >
    </Box>
  );
});

export default CDCashDetail;