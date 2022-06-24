import { Grid } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { lazy, Suspense, useEffect } from 'react';
import { cashDetailStore, cryptoDetailStore, rootStore } from 'shared/store';
import { content as i18n } from 'i18n';
import { useRouter } from 'next/router';

const CDIntroSection = lazy(() => import('./cd-intro-section'));
const CDTransactionHistory = lazy(() => import('./cd-transaction-history'));
const CDProfitLossChart = lazy(()=>import ('./cd-profit-loss'));

const CDOverviewTab = observer(() => {
  const { portfolioId, cryptoId } = cryptoDetailStore;

  const router = useRouter();
  const { locale, query } = router;
  const content = locale === 'vi' ? i18n['vi'].cryptoDetailPage : i18n['en'].cryptoDetailPage;

  useEffect(()=>{
    const fetchData = async () => {
      await cryptoDetailStore.resetTransaction();
      await cryptoDetailStore.fetchCryptoProfitLoss('day');
    };
    fetchData();
  },[])

  useEffect(() => {
    async function fetchData() {
      rootStore.startLoading();
      await cryptoDetailStore.fetchOverviewTabData();
      await cryptoDetailStore.refreshTransactionHistory();
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

          <CDIntroSection content={content} assetDetail={cryptoDetailStore.cryptoDetail} />
        </Suspense>
      </Grid>
      <Grid item lg={12} md={12} xl={12} xs={12} mt="1rem">
        <Suspense fallback={<></>}>
          <CDProfitLossChart />
        </Suspense>
      </Grid>
      <Grid item lg={12} md={12} xl={12} xs={12} mt="1rem">
        <Suspense fallback={<></>}>
          <CDTransactionHistory
            content={content}
            transactionHistoryData={cryptoDetailStore.transactionHistory}
          />
        </Suspense>
      </Grid>
    </>
  );
});

export default CDOverviewTab;
