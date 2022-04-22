import { Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import { getCurrencyByCode } from 'shared/helpers';
import { precisionRound } from 'utils/number';
import { CashItem } from 'shared/models';

interface IProps {
  assetDetail: CashItem | undefined;
}

export const IntroSection = ({ assetDetail }: IProps) => {

  return (
    <Grid item lg={12} md={12} xl={12} xs={12}  mt="1rem">
      <Card
        sx={{
          borderRadius: '12px',
          padding: '5px 20px 20px 20px',
          boxShadow: '0 0 8px rgba(0,0,0,0.11)',
          width:'100%'
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
                <Typography variant="h3" fontWeight="bold">
                  {getCurrencyByCode(assetDetail?.currencyCode || '')?.symbol}
                  {assetDetail?.amount}
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
                  Name:
                </Typography>
                <Typography variant="body1" color={'success.main'}>
                  {assetDetail?.name}
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
                  Curency:
                </Typography>
                <Typography variant="body1" color={'success.main'}>
                  {getCurrencyByCode(assetDetail?.currencyCode || '')?.name}
                </Typography>
              </Grid>
            </Stack>
          </CardContent>
        </Card>
      </Card>
    </Grid>
  );
};
