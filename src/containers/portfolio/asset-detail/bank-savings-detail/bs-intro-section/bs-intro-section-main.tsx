import { observer } from "mobx-react-lite";
import { Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import { getCurrencyByCode } from 'shared/helpers';
import { precisionRound, roundAndAddDotAndCommaSeparator } from 'utils/number';
import { bankSavingsDetailStore } from "shared/store";
import { content as i18n } from 'i18n';
import { useRouter } from 'next/router';


const BSIntroSection = observer(() => {
    const router = useRouter();
    const { locale, query } = router;
    const content = locale === 'vi' ? i18n['vi'].bankSavingDetailPage : i18n['en'].bankSavingDetailPage;

    const assetDetail = bankSavingsDetailStore.assetDetail;
    const renderInterestRate = (interestRate: number) => {
        const rate = roundAndAddDotAndCommaSeparator(interestRate*100, 4);
        return <span style={{ color: '#0d6f3f' }}>&#43;{rate + '%'}</span>;
    };

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
                                {getCurrencyByCode(assetDetail?.inputCurrency || '')?.symbol}
                                {roundAndAddDotAndCommaSeparator(assetDetail?.inputMoneyAmount || 0, 4)}
                            </Typography>
                        </Grid>
                        <Grid
                            container
                            direction="row"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Typography variant="body1">{content.introSection.name}: &nbsp;{assetDetail?.name}</Typography>
                        </Grid>
                        <Grid
                            container
                            direction="row"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Typography variant="body1">{content.introSection.interestRate}: &nbsp;{renderInterestRate(assetDetail?.interestRate || 0)}</Typography>
                        </Grid>
                        <Grid
                            container
                            direction="row"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Typography variant="body1">{content.introSection.termRange}: &nbsp;{renderTermRange(assetDetail?.termRange || 0, 'months')}</Typography>
                        </Grid>
                        <Grid
                            container
                            direction="row"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Typography variant="body1" width='70%'>{content.introSection.description}: &nbsp;{assetDetail?.description}</Typography>
                        </Grid>
                    </Stack>
                </CardContent>
            </Card>
        </Card>);
});


export default BSIntroSection;