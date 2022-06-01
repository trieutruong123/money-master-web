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

interface IProps {
  portfolioId: string;
  assetId: string;
}

export const BankSavingsDetail = observer(
  ({ portfolioId, assetId }: IProps) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const { assetDetail, isOpenAddNewTransactionModal } =
      bankSavingsDetailStore;

    const handleFormSubmit = async (data: UpdatedBankSavingItem) => {
      const res = await bankSavingsDetailStore.updateAssetDetail(data);
      return res;
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
                {typeof assetDetail !== "undefined" ? (
                  <EditBankSavingsDetail
                    assetDetail={assetDetail}
                    handleFormSubmit={handleFormSubmit}
                  />
                ) : (
                  <></>
                )}
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
