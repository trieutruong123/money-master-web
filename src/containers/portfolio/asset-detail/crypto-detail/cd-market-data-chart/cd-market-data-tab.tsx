import { Grid } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { Suspense, useEffect } from 'react';
import { rootStore, cryptoDetailStore } from 'shared/store';
import { CDMarketChart } from './cd-market-chart';
import CDMarketInfo from './cd-market-info';

const CDMarketDataTab = observer(() => {
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
        <CDMarketInfo />
      </Grid>
      <Grid item lg={12} md={12} xl={12} xs={12} mt="1rem">
        <Suspense fallback={<></>}>
          <CDMarketChart />
        </Suspense>
      </Grid>
    </>
  );
});

export default CDMarketDataTab;
