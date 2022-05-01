import { Grid } from '@mui/material';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react-lite';
import { BankingInvestments } from './banking-detail';
import { CryptoInvestments } from './crypto-detail';
import { StockInvestments } from './stock-detail';
import { RealEstateInvesments } from './real-estate-detail';
import { CashInvestments } from './cash-detail';
import {
  RealEstateItem,
  BankSavingItem,
  CryptoItem,
  CashItem,
  StockItem,
  CustomAssetItemByCategory,
} from 'shared/models';
import { OtherCustomAssetInvestments } from './other-custom-asset-detail';
import { AssetType } from 'shared/types';
import { portfolioDetailStore, rootStore } from 'shared/store';
import { useEffect } from 'react';

interface IProps {
  content: any;
}

const PDHoldingsTab = observer(({ content }: IProps) => {
  const router = useRouter();
  const { locale } = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      rootStore.startLoading();
      await portfolioDetailStore.fetchInitialData();
      rootStore.stopLoading();
    };
    if (portfolioDetailStore.isMissingHoldingsData) fetchData();
  },[]);

  const {
    cryptoDetail,
    cashDetail,
    stockDetail,
    realEstateDetail,
    bankingDetail,
    customAssetDetail,
  } = portfolioDetailStore;

  const deleteAsset = (
    assetType: AssetType,
    assetId: string,
    portfolioId: string,
  ) => {
    portfolioDetailStore.setOpenDeleteAssetModal(true);
    portfolioDetailStore.setDeletedAssetInfo(assetType, assetId, portfolioId);
  };

  const transferAssetToInvestFund = (
    assetType: AssetType,
    assetId: string,
    portfolioId: string,
  ) => {};

  return (
    <Grid container item display="flex" justifyContent="center">
      {typeof cashDetail !== undefined && cashDetail?.length ? (
        <Grid item lg={12} md={12} xl={12} xs={12} mt="1rem">
          <CryptoInvestments
            content={content.cryptoTable}
            cryptoDetail={cryptoDetail}
            deleteAsset={deleteAsset}
            transferAssetToInvestFund={transferAssetToInvestFund}
          ></CryptoInvestments>
        </Grid>
      ) : (
        <></>
      )}
      {typeof stockDetail !== undefined && stockDetail?.length ? (
        <Grid item lg={12} md={12} xl={12} xs={12} mt="1rem">
          <StockInvestments
            content={content.stockTable}
            stockDetail={stockDetail}
            deleteAsset={deleteAsset}
            transferAssetToInvestFund={transferAssetToInvestFund}
          ></StockInvestments>
        </Grid>
      ) : (
        <></>
      )}
      {typeof bankingDetail !== undefined && bankingDetail?.length ? (
        <Grid item lg={12} md={12} xl={12} xs={12} mt="1rem">
          <BankingInvestments
            content={content.bankSavingsTable}
            bankingDetail={bankingDetail}
            deleteAsset={deleteAsset}
            transferAssetToInvestFund={transferAssetToInvestFund}
          ></BankingInvestments>
        </Grid>
      ) : (
        <></>
      )}

      <Grid
        container
        item
        spacing={2}
        sx={{ display: 'flex', alignItems: 'stretch' }}
      >
        {typeof cashDetail !== undefined &&
        cashDetail?.length &&
        typeof realEstateDetail !== undefined &&
        realEstateDetail?.length ? (
          <>
            <Grid item xl={4} lg={4} md={4} sm={4} xs={12} mt="1rem">
              <CashInvestments
                content={content.cashTable}
                cashDetail={cashDetail}
                deleteAsset={deleteAsset}
                transferAssetToInvestFund={transferAssetToInvestFund}
              ></CashInvestments>
            </Grid>
            <Grid item xl={8} lg={8} md={8} sm={8} xs={12} mt="1rem">
              <RealEstateInvesments
                content={content.realEstateTable}
                realEstateDetail={realEstateDetail}
                deleteAsset={deleteAsset}
                transferAssetToInvestFund={transferAssetToInvestFund}
              ></RealEstateInvesments>
            </Grid>
          </>
        ) : typeof cashDetail !== undefined && cashDetail?.length ? (
          <Grid item xs={12} mt="1rem">
            <CashInvestments
              content={content.cashTable}
              cashDetail={cashDetail}
              deleteAsset={deleteAsset}
              transferAssetToInvestFund={transferAssetToInvestFund}
            ></CashInvestments>
          </Grid>
        ) : (
          <Grid item xs={12} mt="1rem">
            <RealEstateInvesments
              content={content.realEstateTable}
              realEstateDetail={realEstateDetail}
              deleteAsset={deleteAsset}
              transferAssetToInvestFund={transferAssetToInvestFund}
            ></RealEstateInvesments>
          </Grid>
        )}
        {typeof bankingDetail !== undefined && bankingDetail?.length ? (
          <Grid item lg={12} md={12} xl={12} xs={12}>
            <OtherCustomAssetInvestments
              content={content.bankSavingsTable}
              customAssetDetail={customAssetDetail}
              deleteAsset={deleteAsset}
              transferAssetToInvestFund={transferAssetToInvestFund}
            ></OtherCustomAssetInvestments>
          </Grid>
        ) : (
          <></>
        )}
      </Grid>
    </Grid>
  );
});

export default PDHoldingsTab;
