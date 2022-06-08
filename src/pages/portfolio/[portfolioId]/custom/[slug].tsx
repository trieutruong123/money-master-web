import { lazy, Suspense, useEffect } from 'react';
import Head from 'next/head';
import {
    Box,
    Container,
} from '@mui/material';
import { useRouter } from 'next/router';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { content } from 'i18n';
import { DashboardLayout } from 'containers';
import { HypnosisLoading } from 'shared/components';

const CSDCustomAssetDetail = lazy(() => import('containers/portfolio/asset-detail/custom-asset-detail/csd-custom-asset-detail-main'));

const AssetDetailPage = () => {
    const router = useRouter();
    const { locale } = router;
    const detail = locale === 'vi' ? content['vi'] : content['en'];
    //const { assetVolatilityDetailPage } = detail;

    return (
        <>
            <Head>
                <title>Custom Asset | Money Master</title>
            </Head>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8,
                }}
            >
                <Container maxWidth="lg">
                    <Suspense fallback={<HypnosisLoading />}>
                        <CSDCustomAssetDetail />
                    </Suspense>
                </Container>
            </Box>
        </>
    );
};

AssetDetailPage.requireAuth = true;
AssetDetailPage.getLayout = (page: ReactJSXElement) => (
    <DashboardLayout>{page}</DashboardLayout>
);

export default AssetDetailPage;
