import { Box, Container, Grid, IconButton, Tooltip, Typography, useMediaQuery, useTheme } from "@mui/material";
import { observer } from "mobx-react-lite";
import { lazy, Suspense, useEffect } from "react";
import { realEstateDetailStore, rootStore } from "shared/store";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { BreadcrumbsLink } from "shared/components";
import { useRouter } from "next/router";
import { AddNewTransactionModal } from "./re-transaction-modal/re-transaction-modal";
import { content as i18n } from 'i18n';


const REIntroSection = lazy(() => import("./re-intro-section/re-intro-section-main"));
const RETransactionHistory = lazy(() => import('./re-transaction-history/re-transaction-history-main'));

interface IProps {
}

const RealEstateDetail = observer(({ }: IProps) => {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const router = useRouter();
  const { locale, query } = router;
  const content = locale === 'vi' ? i18n['vi'].realEstateDetailPage : i18n['en'].realEstateDetailPage;

  const portfolioId = Array.isArray(query['portfolioId'])
    ? query['portfolioId'][0]
    : query['portfolioId'] || '';
  const assetId = Array.isArray(query['assetId'])
    ? query['assetId'][0]
    : query['assetId'] || '';

  useEffect(() => {
    realEstateDetailStore.resetInitialState();
  }, []);

  useEffect(() => {
    if (typeof assetId === 'undefined') router.push('/404');

    realEstateDetailStore.setAssetId(assetId);
    realEstateDetailStore.setPortfolioId(portfolioId);
  }, [assetId, portfolioId, router, realEstateDetailStore]);

  useEffect(() => {
    const fetchData = async () => {
      rootStore.startLoading();
      Promise.all([realEstateDetailStore.fetchOverviewData()]);
      rootStore.stopLoading();
    };
    if (portfolioId && assetId && realEstateDetailStore.needUpdateOverviewData) {
      fetchData();
      realEstateDetailStore.setUpdateOverviewData(false);
    }
  }, [portfolioId, assetId, realEstateDetailStore.needUpdateOverviewData]);

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
                content.breadCurmbs.portfolio,
                `/portfolio/${realEstateDetailStore.portfolioId}`,
                `/portfolio/${realEstateDetailStore.portfolioId}/real-estate/${realEstateDetailStore.assetDetail}`,
              ]}
              displayNameArr={[
                'Portfolio',
                realEstateDetailStore.portfolioInfo?.name ||
                realEstateDetailStore.portfolioId.toString(),
                realEstateDetailStore.assetDetail?.name ||
                realEstateDetailStore.assetId.toString(),
              ]}
            />
            <Typography sx={{ mb: 3 }} variant="h4">
              {realEstateDetailStore.assetDetail?.name || ''}
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
                    <REIntroSection />
                  </Suspense>
                </Grid>
                <Grid item lg={12} md={12} xl={12} xs={12} mt="1rem">
                  <Suspense fallback={<></>}>
                    <RETransactionHistory transactionHistoryData={realEstateDetailStore.transactionHistory} />
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
      <Tooltip title={content.addNewTransaction}>
        <IconButton
          onClick={() => {
            realEstateDetailStore.setOpenAddNewTransactionModal(
              !realEstateDetailStore.isOpenAddNewTransactionModal
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
});

export default RealEstateDetail;