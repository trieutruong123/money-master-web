import { Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import { getCurrencyByCode } from 'shared/helpers';
import { InvestFundResponse } from 'shared/models';
import { roundAndAddDotAndCommaSeparator } from 'utils';

interface IProps {
  investFundDetail: InvestFundResponse;
}

const PDInvestFundOverview = ({ investFundDetail }: IProps) => {
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

              <Typography variant="h3" fontWeight="bold">
                {
                  getCurrencyByCode(investFundDetail.initialCurrency || '')
                    ?.symbol
                }
                {roundAndAddDotAndCommaSeparator(
                  investFundDetail?.currentAmount,
                  4,
                )}
              </Typography>
            </Grid>
          </Stack>
        </CardContent>
      </Card>
    </Card>
  );
};

export default PDInvestFundOverview;
