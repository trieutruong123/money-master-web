import { Grid } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { lazy, Suspense, useEffect } from 'react';
import { cryptoDetailStore, rootStore } from 'shared/store';

const CDIntroSection = lazy(() => import('./cd-intro-section'));
const CDTransactionHistory = lazy(() => import('./cd-transaction-history'));

const CDOverviewTab = observer(() => {
  const { portfolioId, cryptoId } = cryptoDetailStore;

  useEffect(() => {
    async function fetchData() {
      rootStore.startLoading();
      await cryptoDetailStore.fetchOverviewTabData();
      rootStore.stopLoading();
    };
    if (portfolioId && cryptoId && cryptoDetailStore.needUpdateOverviewData) {
      fetchData();
      cryptoDetailStore.setUpdateOverviewData(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [portfolioId, cryptoId, cryptoDetailStore.needUpdateOverviewData]);

  return (
    <>
      <Grid item lg={12} md={12} xl={12} xs={12} mt="1rem">
        <Suspense fallback={<></>}>

          <CDIntroSection assetDetail={cryptoDetailStore.cryptoDetail} />
        </Suspense>
      </Grid>
      <Grid item lg={12} md={12} xl={12} xs={12} mt="1rem">
        <Suspense fallback={<></>}>
          <CDTransactionHistory
            transactionHistoryData={cryptoDetailStore.transactionHistory}
          />
        </Suspense>
      </Grid>
    </>
  );
});

export default CDOverviewTab;
