import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Container,
  Grid,
  IconButton,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import { bankSavingsDetailStore } from "shared/store";
import { UpdatedBankSavingItem } from "shared/types";
import { AddNewTransactionModal } from "./add-new-transaction-modal";
import { EditBankSavingsDetail } from "./edit-bank-savings-detail";

import { TabPanel } from "shared/components";

import { PABankBreadcrumbTabs } from "shared/constants/portfolio-asset";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import React from "react";
import TransactionHistory from './transaction-history'

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

export const BankSavingsDetail = observer(
  ({ portfolioId, assetId }: IProps) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    useEffect(() => {
      const fetchData = async () => {
        Promise.all([
          bankSavingsDetailStore.updateTransactionHistoryData(),
        ]);
      };
      if (bankSavingsDetailStore.assetId && bankSavingsDetailStore.portfolioId) fetchData();
    }, [bankSavingsDetailStore.assetId, bankSavingsDetailStore.portfolioId]);

    const { assetDetail, isOpenAddNewTransactionModal,transactionHistoryData } =
      bankSavingsDetailStore;

    const handleFormSubmit = async (data: UpdatedBankSavingItem) => {
      const res = await bankSavingsDetailStore.updateAssetDetail(data);
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
              <Box sx={{ width: '100vw' }}>

                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <Tabs
                    value={value}
                    onChange={handleTabChange}
                    aria-label="basic tabs example"
                  >
                    <Tab
                      label={PABankBreadcrumbTabs.overview}
                      {...a11yProps(0)}
                    />
                    <Tab
                      label={PABankBreadcrumbTabs.trnsactions}
                      {...a11yProps(1)}
                    />
                    <Tab
                      label={PABankBreadcrumbTabs.settings}
                      {...a11yProps(2)}
                    />
                  </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                  {typeof assetDetail !== "undefined" ? (
                    <EditBankSavingsDetail
                      assetDetail={assetDetail}
                      handleFormSubmit={handleFormSubmit}
                    />
                  ) : (
                    <></>
                  )}
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <TransactionHistory transactionHistoryData={transactionHistoryData}/>
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
              bankSavingsDetailStore.setOpenAddNewTransactionModal(
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
  }
);
