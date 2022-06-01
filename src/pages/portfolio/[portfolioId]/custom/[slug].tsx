import { useEffect } from 'react';
import Head from 'next/head';
import {
    Box,
    Container,
    Typography,
    useTheme,
    useMediaQuery,
} from '@mui/material';
import { useRouter } from 'next/router';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { content } from 'i18n';
import { customAssetsDetailStore, realEstateDetailStore, rootStore } from 'shared/store';
import { BreadcrumbsLink } from 'shared/components';
import { DashboardLayout } from 'containers';
import { CSDCustomAssetDetail, RealEstateDetail } from 'containers/portfolio';

const fetchData = async (portfolioId: string, assetId: string) => {
    rootStore.startLoading();

    customAssetsDetailStore.setCustomAssetId(assetId);
    customAssetsDetailStore.setPortfolioId(portfolioId);

    rootStore.stopLoading();
};

const AssetDetailPage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const router = useRouter();

    const { locale, query } = router;
    const portfolioId = Array.isArray(query['portfolioId'])
        ? query['portfolioId'][0]
        : query['portfolioId'] || '';
    const assetId = Array.isArray(query['assetId'])
        ? query['assetId'][0]
        : query['assetId'] || '';

    useEffect(() => {
        if (typeof assetId === 'undefined') router.push('/404');

        fetchData(portfolioId, assetId);
    }, [assetId, portfolioId, router]);

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
                    <BreadcrumbsLink
                        urlArr={[
                            '/portfolio',
                            `/portfolio/${portfolioId}`,
                            `/portfolio/${portfolioId}/custom/${assetId}`,
                        ]}
                        displayNameArr={[
                            'Portfolio',
                            portfolioId,
                            customAssetsDetailStore.customAssetDetail?.name || assetId.toString(),
                        ]}
                    />
                    <Typography sx={{ mb: 3 }} variant="h4">
                        Custom Asset
                    </Typography>
                </Container>
                <Container sx={{ padding: isMobile ? '0px' : 'initial' }} maxWidth="lg">
                    <CSDCustomAssetDetail />
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
