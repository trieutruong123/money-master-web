import { Grid } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { lazy, Suspense, useEffect } from 'react';
import { rootStore, cashDetailStore } from 'shared/store';
import { CurrencyConverter } from '../currency-converter';
import { content as i18n } from 'i18n';
import { useRouter } from 'next/router';

const CDHistoricalMarketChart = lazy(() => import('./cd-historical-market-chart'));

const CDMarketData = observer(() => {
    const router = useRouter();
    const { locale, query } = router;
    const content = locale === 'vi' ? i18n['vi'].cashDetailPage : i18n['en'].cashDetailPage

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
                    <CDHistoricalMarketChart content={content} />
                </Suspense>
            </Grid>
        </>
    );
});

export default CDMarketData