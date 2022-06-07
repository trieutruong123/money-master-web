import { observer } from "mobx-react-lite";
import { lazy, Suspense, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
    Box,
    Container,
    Grid,
    IconButton,
    Tooltip,
    useTheme,
    useMediaQuery,
    Typography,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { customAssetsDetailStore, rootStore } from 'shared/store';
import { BreadcrumbsLink, HypnosisLoading } from 'shared/components';
import CSDTransactionModal from "./csd-transaction-modal/csd-transaction-modal-main";

const CSDTransactionHistory = lazy(() => import('./csd-transaction-history/csd-transaction-history-main'));
const CSDIntroSection = lazy(() => import("./csd-intro-section/csd-intro-section-main"));

interface IProps { }


const CSDCustomAssetDetail = observer(({ }: IProps) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const router = useRouter();

    const { query } = router;
    const portfolioId = Array.isArray(query['portfolioId'])
        ? query['portfolioId'][0]
        : query['portfolioId'] || '';
    const assetId = Array.isArray(query['slug'])
        ? query['slug'][0]
        : query['slug'] || '';

    useEffect(() => {
        if (typeof assetId === 'undefined') router.push('/404');
        customAssetsDetailStore.setCustomAssetId(assetId);
        customAssetsDetailStore.setPortfolioId(portfolioId);
    }, [router, customAssetsDetailStore, portfolioId, assetId]);


    useEffect(() => {
        const fetchData = async () => {
            rootStore.startLoading();
            await customAssetsDetailStore.fetchOverviewTabData();
            rootStore.stopLoading();
        };
        if (portfolioId && assetId && customAssetsDetailStore.needUpdateOverviewData) {
            fetchData();
            console.log('fetch nè')
            customAssetsDetailStore.setUpdateOverviewData(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [portfolioId, assetId, customAssetsDetailStore.needUpdateOverviewData]);



    return (
        <Box
            sx={{
                display: 'flex',
                height: '100%',
                overflow: 'hidden',
                width: '100%',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    flex: '1 1 auto',
                    overflow: 'hidden',
                }}
            >
                <Box sx={{ overflow: 'auto', width: '100%' }}>
                    <Container>
                        <BreadcrumbsLink
                            urlArr={[
                                '/portfolio',
                                `/portfolio/${customAssetsDetailStore.portfolioId}`,
                                `/portfolio/${customAssetsDetailStore.portfolioId}/custom/${customAssetsDetailStore.customAssetId}`,
                            ]}
                            displayNameArr={[
                                'Portfolio',
                                customAssetsDetailStore.portfolioInfo?.name ||
                                customAssetsDetailStore.portfolioId.toString(),
                                customAssetsDetailStore.customAssetDetail?.name ||
                                customAssetsDetailStore.customAssetId.toString(),
                            ]}
                        />
                        <Typography sx={{ mb: 3 }} variant="h4">
                            {customAssetsDetailStore.customAssetDetail?.name || ''}
                        </Typography>
                    </Container>
                    <Box sx={{ overflow: 'hidden', width: '100%' }}>
                        <Container sx={{ padding: isMobile ? '0px' : 'initial' }}>
                            <Grid
                                display="flex"
                                justifyContent="center"
                                flexDirection="column"
                            >
                                <Grid item lg={12} md={12} xl={12} xs={12} mt="1rem">
                                    <Suspense fallback={<></>}>
                                        <CSDIntroSection />
                                    </Suspense>
                                </Grid>
                                <Grid item lg={12} md={12} xl={12} xs={12} mt="1rem">
                                    <Suspense fallback={<></>}>
                                        <CSDTransactionHistory transactionHistoryData={customAssetsDetailStore.transactionHistory} />
                                    </Suspense>
                                </Grid>
                            </Grid>
                        </Container>
                    </Box>
                </Box>

                <Box>
                    <CSDTransactionModal />
                </Box>
                <Tooltip title="Add new transaction">
                    <IconButton
                        onClick={() => {
                            customAssetsDetailStore.setOpenAddNewTransactionModal(
                                !customAssetsDetailStore.isOpenAddNewTransactionModal,
                            );
                        }}
                        color="success"
                        sx={{ position: 'absolute', right: '6vw', bottom: '6vh' }}
                    >
                        <AddCircleIcon sx={{ width: '4rem', height: '4rem' }} />
                    </IconButton>
                </Tooltip>
            </Box>
        </Box>
    );
});


export default CSDCustomAssetDetail