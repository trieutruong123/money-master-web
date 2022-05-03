import { Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import { precisionRound } from 'utils/number';

interface IProps {
  assetMarketData: any;
  assetDetail: any;
}

const IntroSection = ({ assetMarketData, assetDetail }: IProps) => {
  const marketData = assetMarketData.response[0];
  const currentPrice=marketData.c;
  
  

  const renderDailyPL = () => {
    const priceChangePercentage24h:number=Number(marketData.cp.split('%')[0]);
   
    const priceChange24h:number=assetDetail?.quantity * currentPrice*(100+priceChangePercentage24h)/100;

    if (priceChangePercentage24h < 0) {
      return (
        <Typography
          variant="body1"
          color={priceChangePercentage24h < 0 ? 'error.main' : 'success.main'}
        >
          &#x2193; ${precisionRound(priceChange24h,4)} ({precisionRound(priceChangePercentage24h, 4)}%)
        </Typography>
      );
    } else
      return (
        <Typography
          variant="body1"
          color={priceChangePercentage24h < 0 ? 'error.main' : 'success.main'}
        >
          &#x2191; ${precisionRound(priceChange24h,4)} (+{precisionRound(priceChangePercentage24h, 4)}%)
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
                  {assetDetail?.currencyName} &nbsp;
                </Typography>

                <Typography variant="h2" fontWeight="bold">
                  $
                  {precisionRound(
                    assetDetail?.quantity * currentPrice,
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
                  {assetDetail?.quantity} @ ${currentPrice}
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
                  --
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


export default IntroSection;