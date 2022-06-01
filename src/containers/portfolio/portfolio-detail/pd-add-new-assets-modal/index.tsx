import { Box, Modal } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useCallback, useEffect, useMemo, useState } from "react";
import { styled } from "@mui/material/styles";
import { portfolioDetailStore, rootStore } from "shared/store";
import { SearchingAssetsForm } from "./searching-assets-form";
import { ChooseTypesForm } from "./choose-types-form";
import {
  AddNewCryptoForm,
  AddNewStockForm,
  AddNewCashForm,
  AddNewRealEstateForm,
  AddNewBankSavingsForm,
  AddOtherAssetForm,
} from "./add-asset-forms";
import { AssetTypeName, TransactionFormType } from "shared/constants";
import { AssetType } from "shared/types";
import { UsingMoneySourceForm } from "./pd-using-money-form";

const StyledModal = styled(Box)(({ theme }: any) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  minWidth: "320px",
  height: "650px",
  maxHeight: "100vh",
  backgroundColor: "#FFFFFF",
  borderRadius: "12px",
  overflow: "hidden",
  //boxShadow: '0 0 0 50vmax rgba(0,0,0,.5);',
  [theme.breakpoints.up("md")]: {
    minWidth: "450px",
    width: "450px",
  },
  [theme.breakpoints.down("md")]: {
    width: "70vw",
  },
  [theme.breakpoints.down("sm")]: {
    width: "90vw",
    height: "570px",
    "@media (maxHeight: 570px)": {
      height: "100vh",
    },
  },
  "@media(maxHeight: 650px) and (minWidth:600px)": {
    height: "100vh",
  },
}));

interface IProps {
  content: any;
}

const fetchData = async () => {
  rootStore.startLoading();

  await portfolioDetailStore.fetchPersonalCustomAsset();

  rootStore.stopLoading();
};

export const AddNewAssetsModal = observer(({ content }: IProps) => {
  const [current, setCurrent] = useState<any>(null);
  useEffect(() => {
    //set initial form
    setCurrent(
      <ChooseTypesForm
        content={content.chooseType}
        openNextForm={openNextForm}
      />
    );
    if (typeof portfolioDetailStore.customAssetList === "undefined") {
      fetchData();
    }
  }, []);

  const { isOpenAddNewAssetModal } = portfolioDetailStore;

  const handleClose = useCallback(() => {
    portfolioDetailStore.setAddedAssetInfo({});
    portfolioDetailStore.setOpenAddNewAssetModal(false);
    setCurrent(
      <ChooseTypesForm
        content={content.chooseType}
        openNextForm={openNextForm}
      />
    );
  }, []);

  const openNextForm = () => {
    const selectedAsset = portfolioDetailStore.selectedAsset;
    console.log(selectedAsset);
    switch (selectedAsset?.formType) {
      case TransactionFormType.selectType:
        if (
          Array<any>(
            AssetTypeName.stock,
            AssetTypeName.cryptoCurrency
          ).includes(selectedAsset?.assetType)
        ) {
          openSearchingForm();
        } else if (
          Array<any>(
            AssetTypeName.realEstate,
            AssetTypeName.bankSaving,
            AssetTypeName.custom,
            AssetTypeName.cash
          ).includes(selectedAsset.assetType)
        ) {
          openSourceMoneyForm();
        }
        break;
      case TransactionFormType.selectMoneySource:
        openTransactionForm();
        break;
      case TransactionFormType.search:
        openSourceMoneyForm();
        break;
      default:
        openChooseTypesForm();
        break;
    }
  };

  const openPreviousForm = () => {
    const selectedAsset = portfolioDetailStore.selectedAsset;
    switch (selectedAsset?.formType) {
      case TransactionFormType.search:
        openChooseTypesForm();
        break;
      case TransactionFormType.transaction:
        openSourceMoneyForm();
        break;
      case TransactionFormType.selectMoneySource:
        if (
          Array<any>(
            AssetTypeName.stock,
            AssetTypeName.cryptoCurrency
          ).includes(selectedAsset?.assetType)
        ) {
          openSearchingForm();
        } else if (
          Array<any>(
            AssetTypeName.realEstate,
            AssetTypeName.bankSaving,
            AssetTypeName.custom,
            AssetTypeName.cash
          ).includes(selectedAsset?.assetType)
        ) {
          openChooseTypesForm();
        }
        break;
      default:
        openChooseTypesForm();
        break;
    }
  };

  const openTransactionForm = () => {
    const selectedAsset = portfolioDetailStore.selectedAsset;
    switch (selectedAsset?.assetType) {
      case AssetTypeName.cryptoCurrency:
        setCurrent(
          <AddNewCryptoForm
            content={content.cryptoTransaction}
            openPreviousForm={openPreviousForm}
            handleClose={handleClose}
          />
        );
        break;
      case AssetTypeName.stock:
        // const assetId = params.assetId;
        setCurrent(
          <AddNewStockForm
            content={content.stockTransaction}
            openPreviousForm={openPreviousForm}
            handleClose={handleClose}
          />
        );
        break;
      case AssetTypeName.cash:
        setCurrent(
          <AddNewCashForm
            content={content.cashTransaction}
            openPreviousForm={openPreviousForm}
            handleClose={handleClose}
          />
        );
        break;
      case AssetTypeName.realEstate:
        setCurrent(
          <AddNewRealEstateForm
            content={content.realEstateTransaction}
            handleClose={handleClose}
            openPreviousForm={openPreviousForm}
          />
        );
        break;
      case AssetTypeName.bankSaving:
        setCurrent(
          <AddNewBankSavingsForm
            content={content.bankSavingsTransaction}
            handleClose={handleClose}
            openPreviousForm={openPreviousForm}
          />
        );
        break;
      case AssetTypeName.custom:
        setCurrent(
          <AddOtherAssetForm
            content={content.otherCustomAssetTransaction}
            handleClose={handleClose}
            openPreviousForm={openPreviousForm}
          />
        );
    }
  };

  const openSourceMoneyForm = () => {
    setCurrent(
      <UsingMoneySourceForm
        content={content.searchAssets}
        openNextForm={openNextForm}
        openPreviousForm={openPreviousForm}
      />
    );
  };

  const openSearchingForm = () => {
    setCurrent(
      <SearchingAssetsForm
        content={content.searchAssets}
        openNextForm={openNextForm}
        openPreviousForm={openPreviousForm}
        searchData={searchData}
      />
    );
  };

  const openChooseTypesForm = () => {
    setCurrent(
      <ChooseTypesForm
        content={content.chooseType}
        openNextForm={openNextForm}
      />
    );
    portfolioDetailStore.setAddedAssetInfo({});
  };

  const searchData = async ({
    searchingText,
    searchingType,
  }: {
    searchingText: string;
    searchingType: AssetType;
  }) => {
    const res = await portfolioDetailStore.searchData({
      type: searchingType,
      searchingText: searchingText,
    });
    return res;
  };

  return (
    <Box>
      <Modal
        open={isOpenAddNewAssetModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <StyledModal>{current}</StyledModal>
      </Modal>
    </Box>
  );
});
