import { Card, CardContent, Stack, Grid, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { getCurrencyByCode } from 'shared/helpers';
import { cryptoDetailStore } from 'shared/store';
import { roundAndAddDotAndCommaSeparator } from 'utils';

interface IProps {
  content: any
}

const CDMarketInfo = observer(({ content }: IProps) => {
  const { marketData, cryptoDetail } = cryptoDetailStore;

  return (
    <>
      {typeof marketData !== 'undefined' ? (
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
                    {cryptoDetail?.cryptoCoinCode} &nbsp;
                  </Typography>

                  <Typography variant="h2" fontWeight="bold">
                    {getCurrencyByCode('USD')?.symbol}
                    {marketData?.c}
                  </Typography>
                </Grid>
                <Grid
                  container
                  direction="row"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Typography variant="body1">{content.marketDataTab.dailyChange}: &nbsp;</Typography>
                  <Typography
                    variant="body1"
                    color={marketData?.dp > 0 ? 'success.main' : 'error.main'}
                  >
                    {marketData?.dp > 0 ? <>&uarr;</> : <>&darr;</>}
                    {`${roundAndAddDotAndCommaSeparator(marketData?.dp, 4)}%`}
                    &nbsp;@&nbsp;
                    {getCurrencyByCode('USD')?.symbol}
                    {roundAndAddDotAndCommaSeparator(marketData?.d, 4)}
                  </Typography>
                </Grid>
                <Grid
                  container
                  direction="row"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Typography variant="body1">{content.marketDataTab.high}: &nbsp;</Typography>
                  <Typography variant="body1" color={'success.main'}>
                    {getCurrencyByCode('USD')?.symbol}
                    {marketData?.h}
                  </Typography>
                </Grid>
                <Grid
                  container
                  direction="row"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Typography variant="body1">{content.marketDataTab.low}: &nbsp;</Typography>
                  <Typography variant="body1" color={'success.main'}>
                    {getCurrencyByCode('USD')?.symbol}
                    {marketData?.l}
                  </Typography>
                </Grid>
              </Stack>
            </CardContent>
          </Card>
        </Card>
      ) : null}
    </>
  );
});

export default CDMarketInfo;
