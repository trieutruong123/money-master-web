import { Grid } from '@mui/material';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react-lite';
import { BankingInvestments } from './banking-detail';
import { CryptoInvestments } from './crypto-detail';
import { StockInvestments } from './stock-detail';
import { RealEstateInvesments } from './real-estate-detail';
import { CashInvestments } from './cash-detail';
import { OtherCustomAssetInvestments } from './other-custom-asset-detail';
import { AssetType } from 'shared/types';
import { portfolioDetailStore, rootStore } from 'shared/store';
import { useEffect } from 'react';
import { content as i18n } from 'i18n';
interface IProps {
}

const PDHoldingsTab = observer(({ }: IProps) => {
  const router = useRouter();
  const { locale } = router;
  const content = locale === 'vi' ? i18n['vi'].portfolioDetailPage : i18n['en'].portfolioDetailPage;

  useEffect(() => {
    const fetchData = async () => {
      rootStore.startLoading();
      await portfolioDetailStore.fetchInitialData();
      rootStore.stopLoading();
    };

    if (portfolioDetailStore.isMissingHoldingsData) fetchData();
  }, [portfolioDetailStore.isMissingHoldingsData]);

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
    valueOfReferentialAssetBeforeCreatingTransaction:number
  ) => {
    portfolioDetailStore.setOpenTransferToInvestFundModal(true);
    portfolioDetailStore.setTransferedAssetInfo(
      assetType,
      assetId,
      portfolioId,
      valueOfReferentialAssetBeforeCreatingTransaction,
    );
  };

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
        {typeof cashDetail !== undefined && cashDetail?.length ? (
          <Grid item xs={12} mt="1rem">
            <CashInvestments
              content={content.cashTable}
              cashDetail={cashDetail}
              deleteAsset={deleteAsset}
              transferAssetToInvestFund={transferAssetToInvestFund}
            ></CashInvestments>
          </Grid>
        ) : null
        }
        {typeof realEstateDetail !== undefined && realEstateDetail?.length ? (
          <Grid item xs={12} >
            <RealEstateInvesments
              content={content.realEstateTable}
              realEstateDetail={realEstateDetail}
              deleteAsset={deleteAsset}
              transferAssetToInvestFund={transferAssetToInvestFund}
            ></RealEstateInvesments>
          </Grid>
        ) : null}
        {typeof customAssetDetail !== undefined && customAssetDetail?.length ? (
          <Grid item lg={12} md={12} xl={12} xs={12}>
            <OtherCustomAssetInvestments
              content={content.customAssetTable}
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
