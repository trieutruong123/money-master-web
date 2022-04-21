import { Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import { getCurrencyByCode } from 'shared/helpers';
import { precisionRound } from 'utils/number';

interface IProps {
  assetDetail: any | undefined;
}

export const IntroSection = ({ assetDetail }: IProps) => {
  const render24HChange = () => {
    const priceChange24h = assetDetail._24HChange;
    const priceChangePercentage24h = assetDetail._24HChangePercentage;
    const sign = priceChange24h > 0 ? '+' : '';
    const currencySymbol = getCurrencyByCode(assetDetail.currencyCode||'')?.symbol;

    return (
      <Typography
        variant="body1"
        color={priceChangePercentage24h < 0 ? 'error.main' : 'success.main'}
      >
        {currencySymbol}{sign}
        {precisionRound(priceChange24h, 4).toString()} ({sign}
        {precisionRound(priceChangePercentage24h, 4).toString()}%)
      </Typography>
    );
  };
  const renderTotalPL = () => {
    const totalPL = assetDetail.totalPL;
    const PLPercentage = assetDetail.PLPercentage;
    const sign = PLPercentage > 0 ? '+' : '';
    const currencySymbol = getCurrencyByCode(assetDetail.currencyCode||'')?.symbol;

    return (
      <Typography
        variant="body1"
        color={PLPercentage < 0 ? 'error.main' : 'success.main'}
      >
        {currencySymbol}{sign}
        {precisionRound(totalPL, 4).toString()} ({sign}
        {precisionRound(PLPercentage * 100, 4).toString()}
        %)
      </Typography>
    );
  };
  return (
    <Grid item lg={12} md={12} xl={12} xs={12} mt="1rem">
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
                  variant="h5"
                  fontWeight="bold"
                  textTransform="uppercase"
                >
                  {assetDetail?.cryptoCoinCode} &nbsp;
                </Typography>

                <Typography variant="h2" fontWeight="bold">
                  $
                  {precisionRound(
                    assetDetail?.currentAmountHolding * assetDetail?.currentPrice,
                    4,
                  )}
                </Typography>
              </Grid>
              <Grid
                container
                direction="row"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Typography variant="body1">
                  Open @ avg. price: &nbsp;
                </Typography>
                <Typography variant="body1" color={'success.main'}>
                  {assetDetail?.currentAmountHolding} @ ${assetDetail?.currentPrice}
                </Typography>
              </Grid>
              <Grid
                container
                direction="row"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Typography variant="body1">24H change: &nbsp;</Typography>
                {render24HChange()}
              </Grid>
              <Grid
                container
                direction="row"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Typography variant="body1">Total P/L: &nbsp;</Typography>
                {renderTotalPL()}
              </Grid>
            </Stack>
          </CardContent>
        </Card>
      </Card>
    </Grid>
  );
};
