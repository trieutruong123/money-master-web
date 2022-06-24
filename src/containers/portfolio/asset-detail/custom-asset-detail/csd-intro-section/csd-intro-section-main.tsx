import { observer } from "mobx-react-lite";
import { Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import { getCurrencyByCode } from 'shared/helpers';
import { precisionRound, roundAndAddDotAndCommaSeparator } from 'utils/number';
import { customAssetsDetailStore } from "shared/store";
import { content as i18n } from 'i18n';
import { useRouter } from 'next/router';

const CSDIntroSection = observer(() => {
    const router = useRouter();
    const { locale, query } = router;
    const content = locale === 'vi' ? i18n['vi'].customAssetDetailPage : i18n['en'].customAssetDetailPage;

    const customAssetDetail = customAssetsDetailStore.customAssetDetail;
    const categoryInfo = customAssetsDetailStore.categoryInfo;
    const renderTermRange = (termRange: number, unit: string) => {
        const years = Math.floor(termRange / 12);
        const months = termRange % 12;
        const displayText = `${years > 1 ? years + ' years ' : years === 1 ? years + ' year ' : ''
            }${years > 0 && months !== 0 ? '& ' : ''}${months > 1 ? months + ' months' : months === 1 ? '1 month' : ''
            }`;
        return displayText;
    };
    return (
        <Card
            sx={{
                borderRadius: '12px',
                padding: '5px 20px 20px 20px',
                boxShadow: '0 0 8px rgba(0,0,0,0.11)',
            }}
        >
            <Card
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    boxShadow: 'none',
                }}
            >
                <CardContent
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                    }}
                >
                    <Stack direction="column" spacing={1}>
                        <Grid
                            container
                            direction="row"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Typography
                                variant="h2"
                                fontWeight="bold"
                                textTransform="uppercase"
                            >
                                {getCurrencyByCode(customAssetDetail?.inputCurrency || '')?.symbol}
                                {roundAndAddDotAndCommaSeparator(customAssetDetail?.inputMoneyAmount || 0, 4)}
                            </Typography>
                        </Grid>
                        <Grid
                            container
                            direction="row"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Typography variant="body1">{content.introSection.name}: &nbsp;{customAssetDetail?.name}</Typography>
                        </Grid>
                        <Grid
                            container
                            direction="row"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Typography variant="body1">{content.introSection.category}: &nbsp;{categoryInfo?.categoryName}</Typography>
                        </Grid>
                        {customAssetDetail?.interestRate ? <Grid
                            container
                            direction="row"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Typography variant="body1">{content.introSection.interestRate}: &nbsp;{customAssetDetail?.interestRate}</Typography>
                        </Grid> : <></>}
                        {customAssetDetail?.termRange ? <Grid
                            container
                            direction="row"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Typography variant="body1">{content.introSection.termRanage}: &nbsp;{renderTermRange(customAssetDetail.termRange, 'months')}</Typography>
                        </Grid> : <></>
                        }
                    </Stack>
                </CardContent>
            </Card>
        </Card>);
});

export default CSDIntroSection;