import { observer } from "mobx-react-lite";
import { Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import { getCurrencyByCode } from 'shared/helpers';
import { precisionRound, roundAndAddDotAndCommaSeparator } from 'utils/number';
import { realEstateDetailStore } from "shared/store";

const REIntroSection = observer(() => {
    const realEstateDetail = realEstateDetailStore.assetDetail;
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
                                {getCurrencyByCode(realEstateDetail?.inputCurrency || '')?.symbol}
                                {roundAndAddDotAndCommaSeparator(realEstateDetail?.currentPrice || 0, 4)}
                            </Typography>
                        </Grid>
                        <Grid
                            container
                            direction="row"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Typography variant="body1">Name: &nbsp;{realEstateDetail?.name}</Typography>
                        </Grid>
                        <Grid
                            container
                            direction="row"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Typography variant="body1">Description: &nbsp;{realEstateDetail?.description}</Typography>
                        </Grid>
                    </Stack>
                </CardContent>
            </Card>
        </Card>);
});


export default REIntroSection;