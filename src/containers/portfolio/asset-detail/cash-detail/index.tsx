import {
  Box,
  Container,
  Grid,
  IconButton,
  Tooltip,
  useTheme,
  Typography,
} from "@mui/material";
import { lazy, Suspense, useCallback, useEffect } from "react";
import React from "react";
import { observer } from "mobx-react-lite";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { cashDetailStore } from "shared/store";
import { HypnosisLoading, TabPanel } from "shared/components";
import { AddNewTransactionModal } from "./add-new-transaction-modal";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { PACashBreadcrumbTabs } from 'shared/constants/portfolio-asset';

const IntroSection = lazy(() => import("./intro-section"));
const HistoricalMarketChart = lazy(() => import("./historical-market-chart"));
const TransactionHistory = lazy(() => import("./transaction-history"));

interface IProps { }


function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export const CashDetail = observer(({ }: IProps) => {
  const theme = useTheme();
  const isMobile = theme.breakpoints.down("sm");
  useEffect(() => {
    const fetchData = async () => {
      await cashDetailStore.fetchCashDetail();
      //currencyCode được gán từ fetchCashDetail rồi nha
      Promise.all([
        cashDetailStore.fetchData(),
        cashDetailStore.fetchHistoricalMarketData(),
        cashDetailStore.updateTransactionHistoryData(),
      ]);
    };
    if (cashDetailStore.cashId && cashDetailStore.portfolioId) fetchData();
  }, [cashDetailStore.cashId, cashDetailStore.portfolioId]);

  const {
    isOpenAddNewTransactionModal,
    historicalMarketData,
    forexDetail,
    forexMarketData,
    transactionHistoryData,
  } = cashDetailStore;

  const handleTimeIntervalChanged = useCallback((interval: number) => {
    cashDetailStore.setTimeInterval(interval);
    cashDetailStore.fetchHistoricalMarketData();
  }, []);

  const [value, setValue] = React.useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
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
        <Box sx={{ overflow: "hidden" }}>
          <Container sx={{ padding: isMobile ? "0px" : "initial" }}>
            <Grid container display="flex" justifyContent="center">
              <Box sx={{ width: '100vw' }}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <Tabs
                    value={value}
                    onChange={handleTabChange}
                    aria-label="basic tabs example"
                  >
                    <Tab label={PACashBreadcrumbTabs.overview} {...a11yProps(0)} />
                    <Tab label={PACashBreadcrumbTabs.insight} {...a11yProps(1)} />
                    <Tab label={PACashBreadcrumbTabs.settings} {...a11yProps(2)} />
                  </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                  {forexDetail !== undefined && forexMarketData !== undefined ? (
                    <Suspense fallback={<HypnosisLoading></HypnosisLoading>}>
                      <IntroSection
                        assetDetail={forexDetail}
                        assetMarketData={forexMarketData}
                      />
                    </Suspense>
                  ) : (
                    <></>
                  )}
                  {forexDetail !== undefined && forexMarketData !== undefined ? (
                    <Suspense fallback={<HypnosisLoading></HypnosisLoading>}>
                      <TransactionHistory
                        assetMarketData={forexMarketData}
                        transactionHistoryData={transactionHistoryData}
                      />
                    </Suspense>
                  ) : (
                    <></>
                  )}
                </TabPanel>
                <TabPanel value={value} index={1}>
                  {historicalMarketData !== undefined ? (
                    <Suspense fallback={<HypnosisLoading></HypnosisLoading>}>
                      <HistoricalMarketChart
                        data={historicalMarketData}
                        handleTimeIntervalChanged={handleTimeIntervalChanged}
                      />
                    </Suspense>
                  ) : (
                    <></>
                  )}
                </TabPanel>
                <TabPanel value={value} index={2}>
                  Item Three
                </TabPanel>
              </Box>
            </Grid>
          </Container>
        </Box>
      </Box>
      <Box>
        <AddNewTransactionModal />
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
    </Box>
  );
});
