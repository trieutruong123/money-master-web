import { Grid } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { Suspense, useEffect } from 'react';
import { rootStore, cryptoDetailStore } from 'shared/store';
import { CDMarketChart } from './cd-market-chart';
import CDMarketInfo from './cd-market-info';
import { content as i18n } from 'i18n';
import { useRouter } from 'next/router';

const CDMarketDataTab = observer(() => {
  const router = useRouter();
  const { locale, query } = router;
  const content = locale === 'vi' ? i18n['vi'].cryptoDetailPage : i18n['en'].cryptoDetailPage

  useEffect(() => {
    const { portfolioId, cryptoId } = cryptoDetailStore;
    const fetchData = async () => {
      rootStore.startLoading();
      await cryptoDetailStore.fetchMarketData();
      rootStore.stopLoading();
    };
    if (
      portfolioId &&
      cryptoId &&
      (cryptoDetailStore.OHLC_data.length === 0 ||
        cryptoDetailStore.marketData == undefined)
    ) {
      fetchData();
    }
  }, []);

  return (
    <>
      <Grid item lg={12} md={12} xl={12} xs={12} mt="1rem">
        <CDMarketInfo content={content} />
      </Grid>
      <Grid item lg={12} md={12} xl={12} xs={12} mt="1rem">
        <Suspense fallback={<></>}>
          <CDMarketChart content={content} />
        </Suspense>
      </Grid>
    </>
  );
});

export default CDMarketDataTab;
