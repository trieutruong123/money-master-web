import { Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import { precisionRound } from 'utils/number';

interface IProps {
  assetMarketData: any;
  assetDetail: any;
}

export const IntroSection = ({ assetMarketData, assetDetail }: IProps) => {
  const marketData = assetMarketData.market_data;
  const renderDailyPL = () => {
    const priceChange24h = marketData?.price_change_24h;
    const priceChangePercentage24h = marketData?.price_change_percentage_24h;
    if (priceChangePercentage24h < 0) {
      return (
        <Typography
          variant="body1"
          color={priceChangePercentage24h < 0 ? 'error.main' : 'success.main'}
        >
          -${precisionRound(priceChange24h,4)} ({precisionRound(priceChangePercentage24h, 4)}%)
        </Typography>
      );
    } else
      return (
        <Typography
          variant="body1"
          color={priceChangePercentage24h < 0 ? 'error.main' : 'success.main'}
        >
          +${precisionRound(priceChange24h,4)} (+{precisionRound(priceChangePercentage24h, 4)}%)
        </Typography>
      );
  };
  const renderOpenNetPL = () => {
    const priceChangePercentage1h =
      marketData?.price_change_percentage_1h_in_currency?.usd;
    if (priceChangePercentage1h < 0)
      return (
        <Typography variant="body1" color={'error.main'}>
          -$
          {precisionRound(
            assetDetail.quantity *
              marketData?.current_price?.usd *
              priceChangePercentage1h,
            4,
          )}{' '}
          ({precisionRound(priceChangePercentage1h, 4)}%)
        </Typography>
      );
    else
      return (
        <Typography variant="body1" color={'success.main'}>
          +$
          {precisionRound(
            assetDetail.quantity *
              marketData?.current_price?.usd *
              priceChangePercentage1h,
            4,
          )}{' '}
          (+{precisionRound(priceChangePercentage1h, 4)}%)
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
                  {assetDetail?.coinName} &nbsp;
                </Typography>

                <Typography variant="h2" fontWeight="bold">
                  $
                  {precisionRound(
                    assetDetail?.quantity * marketData?.current_price?.usd,
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
                  {assetDetail?.quantity} @ ${marketData?.current_price?.usd}
                </Typography>
              </Grid>
              <Grid
                container
                direction="row"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Typography variant="body1">Open Net P/L: &nbsp;</Typography>
                {renderOpenNetPL()}
              </Grid>
              <Grid
                container
                direction="row"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Typography variant="body1">Daily P/L: &nbsp;</Typography>
                {renderDailyPL()}
              </Grid>
            </Stack>
          </CardContent>
        </Card>
      </Card>
    </Grid>
  );
};