import {
  Box,
  Container,
  Grid,
  IconButton,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { lazy, Suspense, useEffect } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { bankSavingsDetailStore, rootStore } from "shared/store";
import { BreadcrumbsLink } from "shared/components";
import React from "react";
import { useRouter } from "next/router";
import { AddNewTransactionModal } from "./bs-transaction-modal/bs-transaction-modal-main.tsx";

const BSTransactionHistory = lazy(() => import('./bs-transaction-history/bs-transaction-history-main'));
const BSIntroSection = lazy(() => import('./bs-intro-section/bs-intro-section-main'));

interface IProps {
}

const BankSavingsDetail = observer(({ }: IProps) => {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const router = useRouter();

  const { query } = router;
  const portfolioId = Array.isArray(query['portfolioId'])
    ? query['portfolioId'][0]
    : query['portfolioId'] || '';
  const assetId = Array.isArray(query['assetId'])
    ? query['assetId'][0]
    : query['assetId'] || '';

  useEffect(() => {
    if (typeof assetId === 'undefined') router.push('/404');

    bankSavingsDetailStore.setAssetId(assetId);
    bankSavingsDetailStore.setPortfolioId(portfolioId);
  }, [assetId, portfolioId, router, bankSavingsDetailStore]);

  useEffect(() => {
    const fetchData = async () => {
      rootStore.startLoading();
      Promise.all([bankSavingsDetailStore.fetchOverviewData()]);
      rootStore.stopLoading();
    };
    if (portfolioId && assetId && bankSavingsDetailStore.needUpdateOverviewData) {
      fetchData();
      bankSavingsDetailStore.setUpdateOverviewData(false);
    }
  }, [portfolioId, assetId, bankSavingsDetailStore.needUpdateOverviewData]);


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
                `/portfolio/${bankSavingsDetailStore.portfolioId}`,
                `/portfolio/${bankSavingsDetailStore.portfolioId}/real-estate/${bankSavingsDetailStore.assetDetail}`,
              ]}
              displayNameArr={[
                'Portfolio',
                bankSavingsDetailStore.portfolioInfo?.name ||
                bankSavingsDetailStore.portfolioId.toString(),
                bankSavingsDetailStore.assetDetail?.name ||
                bankSavingsDetailStore.assetId.toString(),
              ]}
            />
            <Typography sx={{ mb: 3 }} variant="h4">
              {bankSavingsDetailStore.assetDetail?.name || ''}
            </Typography>
          </Container>
          <Box sx={{ overflow: 'hidden', width: '100%' }}>
            <Container sx={{ padding: isMobile ? '0px' : 'initial' }}>
              <Grid
                display="flex"
                justifyContent="center"
                flexDirection="column"
              >
                <Grid item lg={12} md={12} xl={12} xs={12} mt="1rem">
                  <Suspense fallback={<></>}>
                    <BSIntroSection />
                  </Suspense>
                </Grid>
                <Grid item lg={12} md={12} xl={12} xs={12} mt="1rem">
                  <Suspense fallback={<></>}>
                    <BSTransactionHistory transactionHistoryData={bankSavingsDetailStore.transactionHistory} />
                  </Suspense>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </Box>
      </Box>
      <Box>
        <AddNewTransactionModal />
      </Box>
      <Tooltip title="Add new transaction">
        <IconButton
          onClick={() => {
            bankSavingsDetailStore.setOpenAddNewTransactionModal(
              !bankSavingsDetailStore.isOpenAddNewTransactionModal
            );
          }}
          color="success"
          sx={{ position: "absolute", right: "6vw", bottom: "6vh" }}
        >
          <AddCircleIcon sx={{ width: "4rem", height: "4rem" }} />
        </IconButton>
      </Tooltip>
    </Box>
  );
}
);

export default BankSavingsDetail;