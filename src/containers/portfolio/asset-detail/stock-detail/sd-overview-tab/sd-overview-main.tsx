import { Grid } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { lazy, Suspense, useEffect } from 'react';
import { rootStore, stockDetailStore } from 'shared/store';
import { content as i18n } from 'i18n';
import { useRouter } from 'next/router';

const SDIntroSection = lazy(() => import('./sd-intro-section'));
const SDTransactionHistory = lazy(() => import('./sd-transaction-history'));
const SDProfitLossChart = lazy(()=>import('./sd-profit-loss-chart'));

const SDOverviewTab = observer(() => {
  const router = useRouter();
  const { locale, query } = router;
  const content =
    locale === 'vi' ? i18n['vi'].stockDetailPage : i18n['en'].stockDetailPage;

  useEffect(() => {
    const fetchData = async () => {
      rootStore.startLoading();
      await stockDetailStore.fetchOverviewTabData();
      await stockDetailStore.refreshTransactionHistory();
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
        <Suspense fallback={<></>}>
          <SDIntroSection
            content={content}
            assetDetail={stockDetailStore.stockDetail}
          />
        </Suspense>
      </Grid>
      <Grid item lg={12} md={12} xl={12} xs={12} mt="1rem">
        <Suspense fallback={<></>}>
          <SDProfitLossChart />
        </Suspense>
      </Grid>
      <Grid item lg={12} md={12} xl={12} xs={12} mt="1rem">
        <Suspense fallback={<></>}>
          <SDTransactionHistory
            content={content}
            transactionHistoryData={stockDetailStore.transactionHistory}
          />
        </Suspense>
      </Grid>
    </>
  );
});

export default SDOverviewTab;
