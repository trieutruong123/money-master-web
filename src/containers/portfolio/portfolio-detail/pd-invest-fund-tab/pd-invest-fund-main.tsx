import { Grid } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { lazy, Suspense, useEffect } from 'react';
import { portfolioDetailStore, rootStore } from 'shared/store';

const PDInvestFundOverview = lazy(() => import('./pd-invest-fund-overview'));
const PDTransactionHistory = lazy(() => import('./pd-transaction-history'));

const PDInvestFundTab = observer(() => {
  useEffect(() => {
    const fetchData = async () => {
      rootStore.startLoading();
      Promise.all([portfolioDetailStore.fetchInvestFundTransactionHistory()]);
      rootStore.stopLoading();
    };
    if (portfolioDetailStore.isMissingInvestFundData) fetchData();
  }, []);

  const { investFundDetail, investFundTransactionHistory } =
    portfolioDetailStore;

  return (
    <Grid
      container
      item
      spacing={2}
      sx={{
        width: 'inherit',
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: 'center',
      }}
    >
      <Grid item lg={12} md={12} xl={12} xs={12} mt="1rem">
        {typeof investFundDetail !== 'undefined' ? (
          <Suspense fallback={<></>}>
            <PDInvestFundOverview investFundDetail ={investFundDetail}/>
          </Suspense>
        ) : null}
      </Grid>
      <Grid item lg={12} md={12} xl={12} xs={12} mt="1rem">
        {typeof investFundTransactionHistory !== 'undefined' &&
        investFundTransactionHistory?.length > 0 ? (
          <Suspense fallback={<></>}>
            <PDTransactionHistory />
          </Suspense>
        ) : null}
      </Grid>
    </Grid>
  );
});

export default PDInvestFundTab;
