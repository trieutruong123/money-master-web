import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Container, Grid, IconButton, Tooltip, useMediaQuery, useTheme } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { realEstateDetailStore } from "shared/store";
import { UpdatedRealEstateItem } from "shared/types";
import { EditRealEstateDetail } from "./edit-real-estate-detail";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import { TabPanel } from "shared/components";

import { PAEstateBreadcrumbTabs } from "shared/constants/portfolio-asset";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import React from "react";
import TransactionHistory from "./transaction-history";
import { AddNewTransactionModal } from "./add-new-transaction-modal";
interface IProps {
  portfolioId: string;
  assetId: string;
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export const RealEstateDetail = observer(({ portfolioId, assetId }: IProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  useEffect(() => {
    const fetchData = async () => {
      Promise.all([realEstateDetailStore.updateTransactionHistoryData()]);
    };
    if (realEstateDetailStore.assetId && realEstateDetailStore.portfolioId)
      fetchData();
  }, [realEstateDetailStore.assetId, realEstateDetailStore.portfolioId]);

  const { assetDetail, isOpenAddNewTransactionModal, transactionHistoryData } =
    realEstateDetailStore;

  const handleFormSubmit = async (data: UpdatedRealEstateItem) => {
    const res = await realEstateDetailStore.updateAssetDetail(data);
    return res;
  };

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
              <Box sx={{ width: "100vw" }}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <Tabs
                    value={value}
                    onChange={handleTabChange}
                    aria-label="basic tabs example"
                  >
                    <Tab
                      label={PAEstateBreadcrumbTabs.overview}
                      {...a11yProps(0)}
                    />
                    <Tab
                      label={PAEstateBreadcrumbTabs.transactions}
                      {...a11yProps(1)}
                    />
                    <Tab
                      label={PAEstateBreadcrumbTabs.settings}
                      {...a11yProps(2)}
                    />
                  </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                  {typeof assetDetail !== "undefined" ? (
                    <EditRealEstateDetail
                      assetDetail={assetDetail}
                      handleFormSubmit={handleFormSubmit}
                    />
                  ) : (
                    <></>
                  )}
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <TransactionHistory
                    transactionHistoryData={transactionHistoryData}
                  />
                </TabPanel>
                <TabPanel value={value} index={2}>
                  Settings
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
              realEstateDetailStore.setOpenAddNewTransactionModal(
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
