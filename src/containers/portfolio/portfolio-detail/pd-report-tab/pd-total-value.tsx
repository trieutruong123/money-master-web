import { Card, CardContent, Stack, Grid, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { getCurrencyByCode } from 'shared/helpers';
import { portfolioDetailStore } from 'shared/store';
import { roundAndAddDotAndCommaSeparator } from 'utils';


const PDTotalValue = observer(() => {
  const [totalValue, setTotalValue] = useState<number>(0);

  useEffect(() => {
    const data = portfolioDetailStore.pieChartData;
    if (!data) {
      return;
    }
    const total = data.reduce((prev, cur, idx) => {
      return prev + cur.sumValue;
    }, 0);
    setTotalValue(total);
  }, [portfolioDetailStore.pieChartData]);

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
                    getCurrencyByCode(
                      portfolioDetailStore.portfolioInfo?.initialCurrency ||
                        'USD',
                    )?.symbol
                  }
                  {roundAndAddDotAndCommaSeparator(totalValue, 4)}
                </Typography>
              </Grid>
            </Stack>
          </CardContent>
        </Card>
      </Card>
    );
});

export default PDTotalValue;
