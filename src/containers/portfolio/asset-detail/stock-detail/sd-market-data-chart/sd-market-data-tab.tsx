import { Grid } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { Suspense, useEffect } from 'react';
import { rootStore, stockDetailStore } from 'shared/store';
import { SDMarketChart } from './sd-market-chart';
import SDMarketInfo from './sd-market-info';

const SDMarketDataTab = observer(() => {
  useEffect(() => {
    const { portfolioId, stockId } = stockDetailStore;
    const fetchData = async () => {
      rootStore.startLoading();
      await stockDetailStore.fetchMarketData();
      rootStore.stopLoading();
    };
    if (
      portfolioId &&
      stockId &&
      (stockDetailStore.OHLC_data.length === 0 ||
        stockDetailStore.marketData == undefined)
    ) {
      fetchData();
    }
  }, []);

  return (
    <>
      <Grid item lg={12} md={12} xl={12} xs={12} mt="1rem">
        <SDMarketInfo />
      </Grid>
      <Grid item lg={12} md={12} xl={12} xs={12} mt="1rem">
        <Suspense fallback={<></>}>
          <SDMarketChart />
        </Suspense>
      </Grid>
    </>
  );
});

export default SDMarketDataTab;
