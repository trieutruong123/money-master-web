import { Grid, Typography } from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import AppWidgetSummary from './app-widget-summary';
import { coinGeckoService } from 'services/external-service/coingecko-service';


export default function TopStock() {
  const [topCoins, setTopCoins] = useState([]);
  const cardColors: Array<string> = ['primary', 'info', 'warning', 'error'];

  const fetchData = async function () {
    var rawData = await coinGeckoService.getTopCoins();
    setTopCoins(
      rawData.data.coins
        .map((rawCoin: any, index: number) => {
          var coin = rawCoin.item;
          return {
            title: coin.name,
            color: cardColors[index % 4],
            total: coin.market_cap_rank,
            icon: coin.thumb,
            id: coin.id,
          };
        })
        .sort((coina: any, coinb: any) => {
          return coina.total - coinb.total;
        })
        .slice(0, 4),
    );
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Fragment>
      <Typography variant="h5" sx={{ mt: 3, mb: 2 }}>
        Top Market Cap
      </Typography>
      <Grid container spacing={3}>
        {topCoins &&
          topCoins.map((coin: any, index) => (
            <Grid key={index} item xs={12} sm={6} md={3}>
              <AppWidgetSummary
                key={coin.id}
                title={coin.title}
                color={coin.color}
                total={coin.total}
                icon={coin.icon}
              />
            </Grid>
          ))}
      </Grid>
    </Fragment>
  );
}
