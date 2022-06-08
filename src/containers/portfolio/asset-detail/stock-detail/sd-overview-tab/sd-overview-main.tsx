import { Grid } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { lazy, Suspense, useEffect } from 'react';
import { rootStore, stockDetailStore } from 'shared/store';

const SDIntroSection = lazy(() => import('./sd-intro-section'));
const SDTransactionHistory = lazy(() => import('./sd-transaction-history'));

const SDOverviewTab = observer(() => {

  useEffect(() => {
    const fetchData = async () => {
      rootStore.startLoading();
      await stockDetailStore.fetchOverviewTabData();
      rootStore.stopLoading();
    };
    if (stockDetailStore.needUpdateOverviewData) {
      fetchData();
      stockDetailStore.setUpdateOverviewData(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stockDetailStore.needUpdateOverviewData]);

  return (
    <>
      <Grid item lg={12} md={12} xl={12} xs={12} mt="1rem">
        <SDIntroSection assetDetail={stockDetailStore.stockDetail} />
      </Grid>
      <Grid item lg={12} md={12} xl={12} xs={12} mt="1rem">
        <Suspense fallback={<></>}>
          <SDTransactionHistory
            transactionHistoryData={stockDetailStore.transactionHistory}
          />
        </Suspense>
      </Grid>
    </>
  );
});

export default SDOverviewTab;
