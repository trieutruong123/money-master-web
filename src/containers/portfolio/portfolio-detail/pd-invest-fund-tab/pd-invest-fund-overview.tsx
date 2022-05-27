import { Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import { InvestFundResponse } from 'shared/models';

interface IProps{
    investFundDetail: InvestFundResponse,
}

const PDInvestFundOverview = ({investFundDetail}:IProps) => {
  return (
    <Card
      sx={{
        borderRadius: '12px',
        padding: '5px 20px 20px 20px',
        boxShadow: '0 0 8px rgba(0,0,0,0.11)',
        width: '100%',
        margin: 0,
        p: 0,
      }}
    >
      <Card
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          boxShadow: 'none',
          width: '100%',
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
                {getCurrencyByCode(assetDetail.currencyCode || '')?.symbol}
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
              <Typography variant="body1">Open @ avg. price: &nbsp;</Typography>
              <Typography variant="body1" color={'success.main'}>
                {assetDetail?.currentAmountHolding} @{' '}
                {getCurrencyByCode(assetDetail.currencyCode || '')?.symbol}
                {assetDetail?.currentPrice}
              </Typography>
            </Grid>
            <Grid
              container
              direction="row"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              {/* <Typography variant="body1">24H change: &nbsp;</Typography>
            {render24HChange()} */}
            </Grid>
            <Grid
              container
              direction="row"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              {/* <Typography variant="body1">Total P/L: &nbsp;</Typography>
            {renderTotalPL()} */}
            </Grid>
          </Stack>
        </CardContent>
      </Card>
    </Card>
  );
};

export default PDInvestFundOverview;
