import { Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import { getCurrencyByCode } from 'shared/helpers';
import { CashItem } from 'shared/models';
import { precisionRound } from 'utils/number';

interface IProps {
  assetDetail: CashItem | undefined;
}

const CDIntroSection = ({ assetDetail }: IProps) => {

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

                <Typography variant="h2" fontWeight="bold">
                  {getCurrencyByCode(assetDetail?.currencyCode || '')?.symbol}
                  {precisionRound(
                    assetDetail?.amount || 0,
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
                  Name: &nbsp;
                </Typography>
                <Typography variant="body1" color={'success.main'}>
                  {assetDetail?.name || '--'}
                </Typography>
              </Grid>
              <Grid
                container
                direction="row"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Typography variant="body1">Currency: &nbsp;</Typography>
                {getCurrencyByCode(assetDetail?.currencyCode || '')?.name}
              </Grid>
            </Stack>
          </CardContent>
        </Card>
      </Card>
    </Grid>
  );
};


export default CDIntroSection;