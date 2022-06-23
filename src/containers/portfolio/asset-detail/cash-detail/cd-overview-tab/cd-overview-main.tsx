import { Grid } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { lazy, Suspense, useEffect } from 'react';
import { rootStore, cashDetailStore } from 'shared/store';
import { content as i18n } from 'i18n';
import { useRouter } from 'next/router';

const CDIntroSection = lazy(() => import('./cd-intro-section'));
const CDTransactionHistory = lazy(() => import('./cd-transaction-history-main'));

const CDOverviewMain = observer(() => {

    const router = useRouter();
    const { locale, query } = router;
    const content = locale === 'vi' ? i18n['vi'].cashDetailPage : i18n['en'].cashDetailPage;


    useEffect(() => {
        const fetchData = async () => {
            rootStore.startLoading();
            await cashDetailStore.fetchOverviewData();
            await cashDetailStore.resetTransaction();
            rootStore.stopLoading();
        };
        if (cashDetailStore.needUpdateOverviewData) {

            fetchData();
            cashDetailStore.setUpdateOverviewData(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cashDetailStore.needUpdateOverviewData]);


    return <>
        <Grid item lg={12} md={12} xl={12} xs={12} mt="1rem">
            <Suspense fallback={<></>}>
                <CDIntroSection content={content} assetDetail={cashDetailStore.cashDetail} />
            </Suspense>
        </Grid>
        <Grid item lg={12} md={12} xl={12} xs={12} mt="1rem">
            <Suspense fallback={<></>}>
                <CDTransactionHistory
                    content={content}
                    transactionHistoryData={cashDetailStore.transactionHistory}
                />
            </Suspense>
        </Grid>
    </>;
})

export default CDOverviewMain;