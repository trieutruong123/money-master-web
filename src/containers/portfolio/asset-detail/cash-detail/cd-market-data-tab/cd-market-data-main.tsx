import { Grid } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { lazy, Suspense, useEffect } from 'react';
import { rootStore, cashDetailStore } from 'shared/store';
import { CurrencyConverter } from '../currency-converter';
import CDMarketInfo from './cd-market-info';

const CDHistoricalMarketChart = lazy(() => import('./cd-historical-market-chart'));

const CDMarketData = observer(() => {

    useEffect(() => {
        const fetchData = async () => {
            rootStore.startLoading();
            await cashDetailStore.fetchMarketData();
            rootStore.stopLoading();
        };
        if (cashDetailStore.OHLC_data?.length === 0 ||
            cashDetailStore.forexMarketData === undefined) {
            fetchData();
        }
    }, []);

    return (
        <>
            <Grid item lg={12} md={12} xl={12} xs={12} mt="1rem">
                <CurrencyConverter />
            </Grid>
            <Grid item lg={12} md={12} xl={12} xs={12} mt="1rem">
                <Suspense fallback={<></>}>
                    <CDHistoricalMarketChart />
                </Suspense>
            </Grid>
        </>
    );
});

export default CDMarketData